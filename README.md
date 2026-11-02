# alvaro-galet.com

Portfolio personal. Astro estático, bilingüe (español en `/`, inglés en `/en/`), servido con Caddy desde el homelab a través de Cloudflare Tunnel.

## Editar contenido

Todo el texto está en `src/i18n/content.ts`, con las versiones `es` y `en` una debajo de otra. No hace falta tocar nada más para cambiar textos, proyectos o experiencia.

CVs: deja los PDFs en `public/cv/` con estos nombres:

- `alvaro-galet-cv-es.pdf`
- `alvaro-galet-cv-en.pdf`

## Desarrollo local

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # genera dist/
```

## Puesta en marcha en el homelab

1. **Repo en GitHub.** Crea `algama12/alvaro-galet.com` y sube este proyecto.

2. **Clonar en el homelab.**
   ```bash
   ssh homelab
   cd ~/stacks
   git clone git@github.com:algama12/alvaro-galet.com.git web
   ```

3. **Comprobar la red de Docker** donde vive `cloudflared`:
   ```bash
   docker network ls | grep homelab
   ```
   Si no se llama `homelab_default`, cambia el nombre en `compose.yaml`.

4. **Levantar el contenedor.**
   ```bash
   cd ~/stacks/web
   docker compose up -d --build
   docker run --rm --network homelab_default curlimages/curl -sI http://portfolio
   ```
   La última línea debe devolver `HTTP/1.1 200 OK`. Aparecerá también en Dockge.

5. **DNS.** En Cloudflare, borra los registros A/AAAA/CNAME antiguos de `alvaro-galet.com` y `www` (los de cuando la web no funcionaba). No toques `ia.alvaro-galet.com`.

6. **Rutas del túnel.** En Zero Trust → Networks → Tunnels → `home-server` → Public hostnames, añade:
   - `alvaro-galet.com` → HTTP → `portfolio:80`
   - `www.alvaro-galet.com` → HTTP → `portfolio:80`

   Cloudflare crea los registros DNS solo.

7. **Redirigir `www` al dominio raíz.** Rules → Redirect Rules → plantilla "Redirect from WWW to root".

8. **Monitorización.** Monitor HTTP en Uptime Kuma y otro en UptimeRobot para `https://alvaro-galet.com`.

## Estado en vivo del homelab

El panel de estado lee `/status.json`. En el servidor lo genera `scripts/homelab-status.sh` cada 5 minutos con datos agregados (uptime, temperaturas, nº de servicios, última copia); Caddy sirve solo ese fichero desde `~/stacks/web-status`, montado de solo lectura. En local, `npm run dev` usa el mock `public/status.json` (`"sample": true`), que no entra en la imagen de Docker.

1. **Carpeta del estado** (el log va fuera de ella, en `~/stacks/scripts`):
   ```bash
   mkdir -p ~/stacks/web-status ~/stacks/scripts
   ```

2. **Probar el script a mano** y revisar el JSON:
   ```bash
   ~/stacks/web/scripts/homelab-status.sh ~/stacks/web-status/status.json
   cat ~/stacks/web-status/status.json
   ```

3. **Cron** (`crontab -e`):
   ```
   */5 * * * * /home/alvaro/stacks/web/scripts/homelab-status.sh /home/alvaro/stacks/web-status/status.json >> /home/alvaro/stacks/scripts/homelab-status.log 2>&1
   ```

4. **Reconstruir el contenedor** para montar el volumen:
   ```bash
   cd ~/stacks/web
   docker compose up -d --build
   ```

5. **Comprobar** que `/status.json` devuelve el JSON y que nada más de esa carpeta se sirve (las dos últimas deben dar `404`):
   ```bash
   docker run --rm --network homelab_default curlimages/curl -s http://portfolio/status.json
   docker run --rm --network homelab_default curlimages/curl -s -o /dev/null -w '%{http_code}\n' http://portfolio/status.json.tmp
   docker run --rm --network homelab_default curlimages/curl -s -o /dev/null -w '%{http_code}\n' http://portfolio/status.json/x
   ```

## Actualizar la web

En el Mac: edita, haz commit y push. En el homelab:

```bash
~/stacks/web/deploy.sh
```

Más adelante se puede automatizar con un webhook de GitHub a n8n que lance este script.
