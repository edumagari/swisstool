# Swisstool React (static build)

This React app preserves the exact visual layout and CSS of the existing static site while consolidating language handling for core pages.

- Framework: Vite + React + HashRouter
- Visual identity: original CSS and CDNs loaded unchanged
- Animations/JS: AOS, Bootstrap, Swiper via CDN
- Assets: now bundled locally under `public/` and served at root paths (`/css`, `/img`, `/fonts`, `/font-awesome`, `/js`) — no parent folder dependency
- Product detail pages: implemented in React with a single template and i18n (PT/EN/ES) — no language duplication; inline styles preserved for identical visuals

## Run locally

```
cd swisstool-react
npm install
npm run dev
```

Open the printed URL (default http://localhost:5173).

## Build static site

```
npm run build
```

Outputs to `swisstool-react/dist`. Deploy as static hosting.

This project is self-contained. All legacy static assets were copied into `public/` so absolute URLs like `/css/app.css` and `/img/...` continue to work in dev and build without referencing `../`.

## Routes

- Portuguese: `/#/pt`, `/#/pt/empresa`, `/#/pt/produtos`, `/#/pt/servicos`, `/#/pt/contato`
- English: `/#/en`, `/#/en/company`, `/#/en/products`, `/#/en/services`, `/#/en/contact`
- Spanish: `/#/es`, `/#/es/empresa`, `/#/es/productos`, `/#/es/servicios`, `/#/es/contacto`
- Product details route inside the app: PT `/#/pt/produtos/:slug`, EN `/#/en/products/:slug`, ES `/#/es/productos/:slug`.

## Notes

- `index-en.html` previously referenced `js/modern-enhancements.js` (jQuery dependency). It is intentionally not used here to avoid runtime errors; core behaviors are reproduced with AOS/Swiper/Bootstrap.
- If desired, product detail pages can be migrated into React later using the same i18n approach; not done here to guarantee zero visual drift and avoid duplication.
- To change language, use the globe button in the navbar. It keeps you on the parallel route.

## SEO

- Dynamic tags: a lightweight `SEO` component sets title, description, canonical, Open Graph, Twitter, hreflang, and JSON‑LD per route.
- Robots: `public/robots.txt` allows crawling and points to `/sitemap.xml`.
- Sitemap: generated at build from product data. The default domain is set to `http://swisstool.com.br`. You can override temporarily:

```
SITEMAP_BASE_URL="http://swisstool.com.br" npm run build
```

You can also regenerate manually: `npm run sitemap`. The sitemap includes all locales and product detail routes using hash URLs.
