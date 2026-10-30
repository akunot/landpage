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

La URL pública se define en **una sola variable**, `SITE_URL`, en `.env` (hoy `https://landpage.akunot.workers.dev`). Con ella se generan al compilar la URL canónica, `og:url`/`og:image`, los `hreflang`, `robots.txt` y `sitemap.xml`. Cuando el dominio propio esté listo, basta con cambiar `SITE_URL` en `.env` (o definir la variable `SITE_URL` en la configuración de build de Cloudflare, que tiene prioridad) y volver a desplegar.

### Cómo se despliega

Cada push a `main` despliega el sitio en **dos lugares**:

| Destino | URL | Cómo |
| --- | --- | --- |
| Cloudflare Worker | https://landpage.akunot.workers.dev | Workers Builds conectado al repo; usa `wrangler.jsonc` y `SITE_URL` de `.env` |
| GitHub Pages | https://akunot.github.io/landpage/ | `.github/workflows/pages.yml`; toma la URL de la configuración de Pages |

- `SITE_URL` puede incluir una ruta (como `/landpage` en GitHub Pages): esa ruta se usa como `base` de Vite, así que el mismo código funciona en la raíz o en una subruta.
- La página 404 se genera desde `404.template.html` (con `%BASE_URL%` resuelto) y ambos destinos la devuelven con estado 404.
- El nombre del Worker (`"name": "landpage"`) debe coincidir con el de Cloudflare.
- GitHub Pages necesita activarse una vez: *Settings → Pages → Source: GitHub Actions*.

Para probar localmente con el comportamiento de Cloudflare:

```bash
npm run build
npx wrangler dev
```

Para probar la variante de GitHub Pages:

```bash
SITE_URL=https://akunot.github.io/landpage npm run build
SITE_URL=https://akunot.github.io/landpage npx vite preview   # → http://localhost:4173/landpage/
```

## Actualizar la imagen para redes

`public/og-image.png` (1200×630) se generó a partir de la identidad del sitio. Si cambias el titular, conviene regenerarla.
