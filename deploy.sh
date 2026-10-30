#!/usr/bin/env bash
# Actualiza la web en el homelab: trae los cambios y reconstruye el contenedor.
set -euo pipefail
cd "$(dirname "$0")"
git pull --ff-only
docker compose up -d --build
docker image prune -f >/dev/null
echo "Desplegado: $(git log -1 --format='%h %s')"
