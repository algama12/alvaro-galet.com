#!/usr/bin/env bash
# Writes the homelab status JSON read by the portfolio's live panel (/status.json).
#
# Meant to run on the home server every few minutes from cron. It never exposes a
# service: it only writes a small static file that Caddy serves from a read-only
# volume. The log lives outside the published folder.
#
#   Usage: homelab-status.sh /path/to/status.json
#
#   cron:  */5 * * * * /home/alvaro/stacks/web/scripts/homelab-status.sh /home/alvaro/stacks/web-status/status.json >> /home/alvaro/stacks/scripts/homelab-status.log 2>&1
#
# Optional environment:
#   HOMELAB_BACKUP_STAMP  File whose mtime marks the last successful backup.
#                         Backrest touches it from its on-success hook.
#                         Default: ~/stacks/backrest/data/last-backup-ok
#
# Output schema (aggregated data only; every metric may be null when unavailable):
#   { "schema": 2, "generatedAt": ISO-8601 UTC, "uptimeSeconds": int | null,
#     "cpu": { "tempC": int | null }, "gpu": { "tempC": int | null } | null,
#     "services": { "running": int } | null, "lastBackupAt": ISO-8601 UTC | null }
#
# Deliberately leaves out container names, hostnames, IPs, paths and versions.
# Prints a one-line summary on success; errors go to stderr with a nonzero exit.

set -eu

trap 'echo "homelab-status: failed at line $LINENO" >&2' ERR

target="${1:-}"
if [ -z "$target" ]; then
  echo "usage: $0 /path/to/status.json" >&2
  exit 64
fi

backup_stamp="${HOMELAB_BACKUP_STAMP:-$HOME/stacks/backrest/data/last-backup-ok}"

# Prints its argument if it is a plain non-negative integer, otherwise "null".
int_or_null() {
  case "${1:-}" in
    ''|*[!0-9]*) echo null ;;
    *) echo "$1" ;;
  esac
}

# Millidegrees from a sysfs temperature file, rounded to whole degrees, or "null".
read_millideg() {
  local raw
  raw=$(cat "$1" 2>/dev/null || true)
  if [ "$(int_or_null "$raw")" = null ]; then
    echo null
  else
    echo $(( (raw + 500) / 1000 ))
  fi
}

iso_from_epoch() {
  date -u -d "@$1" +%Y-%m-%dT%H:%M:%SZ 2>/dev/null || echo null
}

# Uptime in whole seconds.
uptime_s=null
if [ -r /proc/uptime ]; then
  uptime_s=$(int_or_null "$(cut -d. -f1 /proc/uptime)")
fi

# CPU temperature from the package sensor driver (k10temp's temp1 is Tctl).
# Falls back to the x86_pkg_temp thermal zone; no lm-sensors needed.
cpu_temp=null
for dir in /sys/class/hwmon/hwmon*; do
  [ -r "$dir/name" ] || continue
  case "$(cat "$dir/name" 2>/dev/null)" in
    k10temp|coretemp|zenpower) ;;
    *) continue ;;
  esac
  input="$dir/temp1_input"
  if [ ! -r "$input" ]; then
    input=$(find "$dir" -maxdepth 1 -name 'temp*_input' 2>/dev/null | sort | head -n 1)
  fi
  if [ -n "$input" ]; then
    cpu_temp=$(read_millideg "$input")
    [ "$cpu_temp" = null ] || break
  fi
done
if [ "$cpu_temp" = null ]; then
  for zone in /sys/class/thermal/thermal_zone*; do
    [ "$(cat "$zone/type" 2>/dev/null)" = x86_pkg_temp ] || continue
    cpu_temp=$(read_millideg "$zone/temp")
    [ "$cpu_temp" = null ] || break
  done
fi

# GPU temperature, only if nvidia-smi is present and answers.
gpu=null
gpu_temp=null
if command -v nvidia-smi >/dev/null 2>&1; then
  if line=$(nvidia-smi --query-gpu=temperature.gpu --format=csv,noheader,nounits 2>/dev/null | head -n 1) && [ -n "$line" ]; then
    gpu_temp=$(int_or_null "$(printf '%s' "$line" | tr -d ' ')")
    gpu=$(printf '{ "tempC": %s }' "$gpu_temp")
  fi
fi

# Running services: a count of running containers, nothing else.
services=null
running=null
if command -v docker >/dev/null 2>&1; then
  if ids=$(docker ps -q 2>/dev/null); then
    running=$(int_or_null "$(printf '%s' "$ids" | grep -c . || true)")
    services=$(printf '{ "running": %s }' "$running")
  fi
fi

# Last backup, from the stamp file's modification time.
last_backup=null
if [ -e "$backup_stamp" ]; then
  stamp_epoch=$(stat -c %Y "$backup_stamp" 2>/dev/null || true)
  if [ -n "$stamp_epoch" ]; then
    iso=$(iso_from_epoch "$stamp_epoch")
    [ "$iso" = null ] || last_backup="\"$iso\""
  fi
fi

generated_at=$(date -u +%Y-%m-%dT%H:%M:%SZ)

# Atomic publish: write a temp file in the same directory (same filesystem, so
# mv is a rename) and move it over the target, so Caddy never serves a partial
# file. mktemp gives each run a unique name that is never "status.json".
target_dir=$(dirname "$target")
mkdir -p "$target_dir"
tmp=$(mktemp "$target_dir/.status.json.XXXXXX")
trap 'rm -f "$tmp"' EXIT

cat > "$tmp" <<JSON
{
  "schema": 2,
  "generatedAt": "$generated_at",
  "uptimeSeconds": $uptime_s,
  "cpu": { "tempC": $cpu_temp },
  "gpu": $gpu,
  "services": $services,
  "lastBackupAt": $last_backup
}
JSON

chmod 644 "$tmp"
mv -f "$tmp" "$target"
trap - EXIT

echo "$generated_at homelab-status: wrote $target (uptime_s=$uptime_s cpu_c=$cpu_temp gpu_c=$gpu_temp services=$running backup=${last_backup//\"/})"
