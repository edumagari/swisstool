import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { productContent } from '../src/i18n/productContent.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const base = process.env.SITEMAP_BASE_URL || 'http://swisstool.com.br'

function url(loc, priority = 0.7, changefreq = 'weekly', lastmod = new Date().toISOString()) {
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority.toFixed(1)}</priority>\n  </url>`
}

const langs = [
  { code: 'pt', home: '/#/pt', products: '/#/pt/produtos', company: '/#/pt/empresa', services: '/#/pt/servicos', contact: '/#/pt/contato' },
  { code: 'en', home: '/#/en', products: '/#/en/products', company: '/#/en/company', services: '/#/en/services', contact: '/#/en/contact' },
  { code: 'es', home: '/#/es', products: '/#/es/productos', company: '/#/es/empresa', services: '/#/es/servicios', contact: '/#/es/contacto' },
]

const urls = []
for (const l of langs) {
  urls.push(url(base + l.home, 1.0, 'weekly'))
  urls.push(url(base + l.company, 0.8, 'monthly'))
  urls.push(url(base + l.products, 0.9, 'weekly'))
  urls.push(url(base + l.services, 0.7, 'monthly'))
  urls.push(url(base + l.contact, 0.7, 'monthly'))
}

const slugs = Object.keys(productContent || {})
for (const slug of slugs) {
  for (const l of langs) {
    urls.push(url(`${base}${l.products}/${slug}`, 0.6, 'monthly'))
  }
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`

const outPath = path.resolve(__dirname, '../public/sitemap.xml')
fs.writeFileSync(outPath, xml)
console.log('Sitemap generated:', outPath)
