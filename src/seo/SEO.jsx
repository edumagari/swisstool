import React, { useEffect } from 'react'

function setOrCreateMeta(attr, key, content) {
  if (!content && content !== '') return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setOrCreateLink(rel, attrs) {
  const selector = Object.entries({ rel, ...attrs }).map(([k, v]) => `[${k}="${v}"]`).join('')
  let el = document.head.querySelector(`link${selector}`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v))
    document.head.appendChild(el)
  } else if (attrs.href) {
    el.setAttribute('href', attrs.href)
  }
}

function ensureJsonLd(id, data) {
  const scriptId = `jsonld-${id}`
  let el = document.getElementById(scriptId)
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = scriptId
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

function absUrl(pathOrHash) {
  try {
    const origin = window.location.origin
    if (pathOrHash.startsWith('http')) return pathOrHash
    if (pathOrHash.startsWith('/#')) return origin + pathOrHash
    if (pathOrHash.startsWith('#/')) return origin + '/' + pathOrHash
    if (pathOrHash.startsWith('/')) return origin + pathOrHash
    return origin + '/' + pathOrHash
  } catch {
    return pathOrHash
  }
}

export default function SEO({
  lang = 'pt',
  title,
  description,
  image = '/img/logo_swisstool.png',
  type = 'website',
  canonical,
  alternates = [], // [{ hrefLang, href }]
  robots = 'index,follow',
  jsonLd = [], // array of objects
}) {
  useEffect(() => {
    // html lang
    const htmlLang = lang === 'en' ? 'en' : (lang === 'es' ? 'es' : 'pt-BR')
    document.documentElement.setAttribute('lang', htmlLang)

    // title
    const finalTitle = title ? `${title} | Swisstool` : 'Swisstool'
    if (finalTitle) document.title = finalTitle

    // description
    if (description) setOrCreateMeta('name', 'description', description)

    // robots
    if (robots) setOrCreateMeta('name', 'robots', robots)

    // Open Graph
    setOrCreateMeta('property', 'og:site_name', 'Swisstool')
    const ogLocale = lang === 'en' ? 'en_US' : (lang === 'es' ? 'es_ES' : 'pt_BR')
    setOrCreateMeta('property', 'og:locale', ogLocale)
    if (finalTitle) setOrCreateMeta('property', 'og:title', finalTitle)
    if (description) setOrCreateMeta('property', 'og:description', description)
    if (type) setOrCreateMeta('property', 'og:type', type)
    const imgAbs = image ? absUrl(image) : undefined
    if (imgAbs) setOrCreateMeta('property', 'og:image', imgAbs)
    setOrCreateMeta('property', 'og:url', window.location.href)

    // Twitter
    setOrCreateMeta('name', 'twitter:card', 'summary_large_image')
    if (finalTitle) setOrCreateMeta('name', 'twitter:title', finalTitle)
    if (description) setOrCreateMeta('name', 'twitter:description', description)
    if (imgAbs) setOrCreateMeta('name', 'twitter:image', imgAbs)

    // Canonical
    const canonicalHref = absUrl(canonical || window.location.hash || '/')
    setOrCreateLink('canonical', { href: canonicalHref })

    // Alternates
    alternates.forEach(({ hrefLang, href }) => setOrCreateLink('alternate', { href: absUrl(href), hreflang: hrefLang }))

    // JSON-LD
    jsonLd.forEach((obj, idx) => ensureJsonLd(idx, obj))
  }, [lang, title, description, image, type, canonical, JSON.stringify(alternates), JSON.stringify(jsonLd), robots])

  return null
}
