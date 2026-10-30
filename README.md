# akunot — portfolio

Portafolio personal de Sergio Castro (akunot). React 19 + TypeScript + Vite + Tailwind CSS v4 + Motion; escena 3D del hero con Three.js (carga diferida, con fallback SVG sin WebGL).

```bash
npm install
npm run dev      # desarrollo
npm run build    # build de producción → dist/
npm run lint
```

## Idiomas

Español por defecto, con opción de inglés (selector ES/EN en la barra superior). La elección se recuerda en el navegador y se puede enlazar directamente la versión en inglés con `?lang=en`.

## Editar contenido

Todo el contenido está separado de los componentes y existe en `es` y `en`:

| Archivo | Contenido |
| --- | --- |
| `src/i18n/ui.ts` | Textos de la interfaz: títulos de sección, botones, etiquetas, metadatos SEO |
| `src/data/site.ts` | Identidad y enlaces de contacto (GitHub, LinkedIn, email) |
| `src/data/projects.ts` | Proyectos (captura de Mallas en `public/projects/mallas.webp`) |
| `src/data/content.ts` | Filosofía, investigación (**publicaciones con placeholders: `pending: true`**), tecnologías y sección "Ahora" (`nowUpdated`) |

## Despliegue — Cloudflare

El proyecto ya incluye lo necesario: `.node-version` (Node 22), `public/_headers` (caché y cabeceras de seguridad) e imagen Open Graph.

### URL del sitio

La URL pública se define en **una sola variable**, `SITE_URL`, en `.env` (hoy `https://landpage.secastrob.workers.dev`). Con ella se generan al compilar la URL canónica, `og:url`/`og:image`, los `hreflang`, `robots.txt` y `sitemap.xml`. Cuando el dominio propio esté listo, basta con cambiar `SITE_URL` en `.env` (o definir la variable `SITE_URL` en la configuración de build de Cloudflare, que tiene prioridad) y volver a desplegar.

### Cómo se despliega

El sitio corre como un **Cloudflare Worker con assets estáticos** (`wrangler.jsonc`), conectado a este repositorio: **cada push a `main` se compila y se despliega solo**.

- Producción: https://landpage.secastrob.workers.dev
- `wrangler.jsonc` sirve `dist/`; las rutas que no existen devuelven `public/404.html` con estado 404.
- El nombre del Worker (`"name": "landpage"`) debe coincidir con el de Cloudflare; si se cambia aquí, se crea un Worker nuevo.

Para probar localmente con el mismo comportamiento de producción:

```bash
npm run build
npx wrangler dev
```

## Actualizar la imagen para redes

`public/og-image.png` (1200×630) se generó a partir de la identidad del sitio. Si cambias el titular, conviene regenerarla.
