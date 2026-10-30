import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Public URL of the site, read from `SITE_URL` (.env or the build environment).
 * Replaces `%SITE_URL%` in index.html and emits robots.txt + sitemap.xml.
 */
function siteUrl(raw: string | undefined): Plugin {
  if (!raw) throw new Error('SITE_URL is not set (see .env)')
  const url = new URL(raw).origin

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${url}/</loc>
    <xhtml:link rel="alternate" hreflang="es" href="${url}/" />
    <xhtml:link rel="alternate" hreflang="en" href="${url}/?lang=en" />
  </url>
</urlset>
`
  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${url}/sitemap.xml\n`

  return {
    name: 'site-url',
    transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', url),
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap })
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')
  return {
    plugins: [react(), tailwindcss(), siteUrl(env.SITE_URL)],
    build: {
      // three.js ships as its own lazily-loaded chunk (~136 kB gzip), only fetched for the hero.
      chunkSizeWarningLimit: 600,
    },
  }
})
