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

## Actualizar la web

En el Mac: edita, haz commit y push. En el homelab:

```bash
~/stacks/web/deploy.sh
```

Más adelante se puede automatizar con un webhook de GitHub a n8n que lance este script.
