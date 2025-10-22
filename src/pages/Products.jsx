import React, { useContext, useEffect, useMemo, useRef } from 'react'
import { LangContext } from '../App.jsx'
import { useT } from '../i18n/translations.js'
import SEO from '../seo/SEO.jsx'

export default function Products() {
  const { lang } = useContext(LangContext)
  const t = useT(lang).products
  const ref = useRef(null)
  const filters = t.filters
  const catKeys = lang === 'en'
    ? { drills: 'drills', mills: 'mills', reamers: 'reamers', saws: 'saws', special: 'special' }
    : (lang === 'es'
      ? { drills: 'brocas', mills: 'fresas', reamers: 'escariadores', saws: 'sierras', special: 'especiales' }
      : { drills: 'brocas', mills: 'fresas', reamers: 'alargadores', saws: 'serras', special: 'especiais' })

  useEffect(() => {
    const root = ref.current
    if (!root) return
    // Navbar scroll
    const onScroll = () => {
      const navbar = document.getElementById('navbar')
      if (navbar) (window.scrollY > 50 ? navbar.classList.add('scrolled') : navbar.classList.remove('scrolled'))
    }
    window.addEventListener('scroll', onScroll)
    onScroll()

    // Filter
    const filterBtns = root.querySelectorAll('.filter-btn')
    const productItems = root.querySelectorAll('.product-item')
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'))
        btn.classList.add('active')
        const filter = btn.getAttribute('data-filter')
        productItems.forEach((item, index) => {
          const category = item.getAttribute('data-category')
          item.style.opacity = '0'
          item.style.transform = 'scale(0.9)'
          setTimeout(() => {
            if (filter === 'all' || category === filter) {
              item.style.display = 'block'
              setTimeout(() => {
                item.style.opacity = '1'
                item.style.transform = 'scale(1)'
              }, index * 50)
            } else {
              item.style.display = 'none'
            }
          }, 300)
        })
      })
    })

    // Search
    const searchInput = root.querySelector('.search-input')
    const searchBtn = root.querySelector('.search-btn')
    const performSearch = () => {
      const term = (searchInput?.value || '').toLowerCase()
      root.querySelectorAll('.product-item').forEach(item => {
        const title = item.querySelector('h3')?.textContent.toLowerCase() || ''
        const description = item.querySelector('p')?.textContent.toLowerCase() || ''
        item.style.display = (title.includes(term) || description.includes(term)) ? 'block' : 'none'
      })
    }
    searchBtn?.addEventListener('click', performSearch)
    searchInput?.addEventListener('keyup', (e) => { if (e.key === 'Enter') performSearch() })

    return () => window.removeEventListener('scroll', onScroll)
  }, [lang])

  return (
    <main ref={ref}>
      <SEO
        lang={lang}
        title={t.headerTitle}
        description={t.headerDesc}
        image="/img/tools.jpg"
        canonical={lang === 'en' ? '/#/en/products' : lang === 'es' ? '/#/es/productos' : '/#/pt/produtos'}
        alternates={[
          { hrefLang: 'pt-BR', href: '/#/pt/produtos' },
          { hrefLang: 'en', href: '/#/en/products' },
          { hrefLang: 'es', href: '/#/es/productos' },
          { hrefLang: 'x-default', href: '/#/en/products' },
        ]}
        jsonLd={[{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: t.headerTitle,
          description: t.headerDesc,
          url: (typeof window !== 'undefined' ? window.location.origin : '') + (lang === 'en' ? '/#/en/products' : lang === 'es' ? '/#/es/productos' : '/#/pt/produtos')
        }]}
      />
      <section className="page-header">
        <div className="page-header-content">
          <h1 data-aos="fade-up">{t.headerTitle}</h1>
          <p data-aos="fade-up" data-aos-delay="100">{t.headerDesc}</p>
          <div className="breadcrumb-modern" data-aos="fade-up" data-aos-delay="200">
            <a href={lang === 'en' ? '#/en' : '#/pt'}>{t.breadcrumbHome}</a>
            <span>/</span>
            <span>{t.headerTitle}</span>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="container-modern">
          <div className="search-section" data-aos="fade-up">
            <h3 className="text-center mb-3">{lang === 'en' ? 'Search Products' : 'Buscar Produtos'}</h3>
            <div className="search-box">
              <input type="text" className="search-input" placeholder={t.searchPlaceholder} />
              <button className="search-btn"><i className="fas fa-search"></i> {t.searchButton}</button>
            </div>
          </div>

          <div className="product-filter" data-aos="fade-up" data-aos-delay="100">
            <button className="filter-btn active" data-filter="all">{filters.all}</button>
            <button className="filter-btn" data-filter={catKeys.drills}>{filters.drills}</button>
            <button className="filter-btn" data-filter={catKeys.mills}>{filters.mills}</button>
            <button className="filter-btn" data-filter={catKeys.reamers}>{filters.reamers}</button>
            <button className="filter-btn" data-filter={catKeys.saws}>{filters.saws}</button>
            <button className="filter-btn" data-filter={catKeys.special}>{filters.special}</button>
          </div>

          <div className="product-catalog" id="product-catalog">
            {t.items.map((it, idx) => {
              const href = detailHref(lang, it.slug)
              return (
              <div key={idx} className="product-item" data-category={it.cat} data-aos="zoom-in" data-aos-delay={(idx + 1) * 100}
                   onClick={() => navigateTo(href)}>
                <div className="product-item-image">
                  <img src={it.img} alt={it.title} />
                  <span className="product-category-badge">{it.badge}</span>
                </div>
                <div className="product-item-content">
                  <h3>{it.title}</h3>
                  <p>{it.desc}</p>
                  <div className="product-features">
                    {it.features.map((f, i) => <span key={i} className="feature-tag">{f}</span>)}
                  </div>
                  <div className="product-specs">
                    {it.specs.map((s, i) => <span key={i} className="spec-item"><i className="fas fa-ruler"></i> {s}</span>)}
                  </div>
                  <div className="product-action mt-3">
                    <a href={href} className="product-link" onClick={(e)=>e.stopPropagation()}>
                      {lang === 'en' ? 'Details' : lang === 'es' ? 'Ver Detalles' : 'Ver Detalhes'} <i className="fas fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            )})}
          </div>
        </div>
      </section>
    </main>
  )
}

function detailHref(lang, slug) {
  if (lang === 'en') return `#/en/products/${slug}`
  if (lang === 'es') return `#/es/productos/${slug}`
  return `#/pt/produtos/${slug}`
}
