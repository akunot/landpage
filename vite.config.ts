import { readFileSync } from 'node:fs'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Public URL of the site, read from `SITE_URL` (.env, or the build environment, which wins).
 * It may include a path (e.g. https://akunot.github.io/landpage for a GitHub Pages project site):
 * the path becomes Vite's `base`.
 */
function parseSiteUrl(raw: string | undefined) {
  if (!raw) throw new Error('SITE_URL is not set (see .env)')
  const { origin, pathname } = new URL(raw)
  const path = pathname.replace(/\/+$/, '')
  return { url: origin + path, base: path + '/' }
}

/**
 * Replaces `%SITE_URL%` in index.html and emits robots.txt, sitemap.xml and
 * 404.html (from 404.template.html, with `%BASE_URL%` resolved).
 */
function siteFiles({ url, base }: { url: string; base: string }): Plugin {
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
    name: 'site-files',
    transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', url),
    generateBundle() {
      const notFound = readFileSync('404.template.html', 'utf8').replaceAll('%BASE_URL%', base)
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap })
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots })
      this.emitFile({ type: 'asset', fileName: '404.html', source: notFound })
    },
  }
}

export default defineConfig(({ mode }) => {
  const site = parseSiteUrl(loadEnv(mode, '.', '').SITE_URL)
  return {
    base: site.base,
    plugins: [react(), tailwindcss(), siteFiles(site)],
    build: {
      // three.js ships as its own lazily-loaded chunk (~136 kB gzip), only fetched for the hero.
      chunkSizeWarningLimit: 600,
    },
  }
})
