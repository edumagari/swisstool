import React, { useContext, useEffect, useRef } from 'react'
import { LangContext } from '../App.jsx'
import { useT } from '../i18n/translations.js'
import SEO from '../seo/SEO.jsx'

export default function Home() {
  const { lang } = useContext(LangContext)
  const t = useT(lang).home
  const rootRef = useRef(null)

  useEffect(() => {
    if (!rootRef.current) return
    // Use the same initialization for all languages to keep visuals identical
    initHomePT(rootRef.current)
  }, [lang])

  return (
    <main ref={rootRef}>
      <SEO
        lang={lang}
        title={t.heroTitle}
        description={t.heroSubtitle}
        image="/img/slide1.jpg"
        canonical={`/#/${lang}`}
        alternates={[
          { hrefLang: 'pt-BR', href: '/#/pt' },
          { hrefLang: 'en', href: '/#/en' },
          { hrefLang: 'es', href: '/#/es' },
          { hrefLang: 'x-default', href: '/#/en' },
        ]}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Swisstool',
            url: typeof window !== 'undefined' ? window.location.origin : '',
            logo: '/img/logo_swisstool.png'
          },
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Swisstool',
            url: typeof window !== 'undefined' ? window.location.origin : '',
            potentialAction: {
              '@type': 'SearchAction',
              target: (typeof window !== 'undefined' ? window.location.origin : '') + '/#/pt/produtos?query={search_term_string}',
              'query-input': 'required name=search_term_string'
            }
          }
        ]}
      />
      <HeroPT lang={lang} />
      <ProductsShowcase t={t} lang={lang} />
      <StatisticsPT lang={lang} />
      <FeaturesUnified lang={lang} />
      <CTA t={t} lang={lang} />
    </main>
  )
}

function HeroPT({ lang }) {
  const t = useT(lang).home
  return (
    <section className="hero" id="home">
      <div className="hero-container">
        <div className="hero-content" data-aos="fade-right">
          <h1>{t.heroTitle}</h1>
          <p>{t.heroSubtitle}</p>
          <div className="hero-buttons">
            <a href="#produtos" className="btn-primary-custom">{t.seeProducts}</a>
            <a href={lang === 'en' ? '#/en/company' : lang === 'es' ? '#/es/empresa' : '#/pt/empresa'} className="btn-secondary-custom">{t.ourHistory}</a>
          </div>
        </div>
        <div className="hero-image" data-aos="fade-left">
          <img src="/img/slide1.jpg" alt="Ferramentas Swisstool" />
        </div>
      </div>
    </section>
  )
}

function ProductsShowcase({ t, lang }) {
  const tabs = t.tabs
  const cards = t.cards
  const catKeys = lang === 'en'
    ? { drills: 'drills', mills: 'mills', reamers: 'reamers', special: 'special' }
    : (lang === 'es'
      ? { drills: 'brocas', mills: 'fresas', reamers: 'escariadores', special: 'especiales' }
      : { drills: 'brocas', mills: 'fresas', reamers: 'alargadores', special: 'especiais' })
  return (
    <section className="products-showcase" id="produtos">
      <div className={'products-container'}>
        <div className={'section-header'} data-aos="fade-up">
          <h2>{t.sectionProductsTitle}</h2>
          <p>{t.sectionProductsDesc}</p>
        </div>

        <div className={'products-tabs'} data-aos="fade-up">
          <button className={'tab-btn active'} data-filter="all">{tabs.all}</button>
          <button className={'tab-btn'} data-filter={catKeys.drills}>{tabs.drills}</button>
          <button className={'tab-btn'} data-filter={catKeys.mills}>{tabs.mills}</button>
          <button className={'tab-btn'} data-filter={catKeys.reamers}>{tabs.reamers}</button>
          <button className={'tab-btn'} data-filter={catKeys.special}>{tabs.special}</button>
        </div>

        <div className="products-grid" id="products-grid">
          {cards.map((c, idx) => {
            const href = detailHref(lang, c.slug)
            return (
            <div key={idx} className="product-card" data-category={c.cat} data-aos="zoom-in" data-aos-delay={(idx + 1) * 100}
                 onClick={() => navigateTo(href)}>
              <div className="product-image">
                <img src={c.img} alt={c.title} />
              </div>
              <div className="product-info">
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                <a href={href} className="product-link" onClick={(e)=>e.stopPropagation()}>
                  {lang === 'en' ? 'Details' : lang === 'es' ? 'Ver Detalles' : 'Ver Detalhes'} <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>)
          })}
        </div>
      </div>
    </section>
  )
}

function detailHref(lang, slug) {
  if (lang === 'en') return `#/en/products/${slug}`
  if (lang === 'es') return `#/es/productos/${slug}`
  return `#/pt/produtos/${slug}`
}

function navigateTo(href) {
  if (!href) return
  if (href.startsWith('#')) {
    window.location.hash = href.replace(/^#/, '')
  } else {
    window.location.href = href
  }
}

function StatisticsPT({ lang = 'pt' }) {
  const t = useT(lang).home
  return (
    <section className="statistics">
      <div className="stats-grid">
        <div className="stat-card" data-aos="fade-up" data-aos-delay="100">
          <div className="stat-number">{t.statsYears}</div>
          <div className="stat-label">{t.labelsYears}</div>
        </div>
        <div className="stat-card" data-aos="fade-up" data-aos-delay="200">
          <div className="stat-number" data-counter="5000">0</div>
          <div className="stat-label">{t.labelsClients}</div>
        </div>
        <div className="stat-card" data-aos="fade-up" data-aos-delay="300">
          <div className="stat-number" data-counter="50000">0</div>
          <div className="stat-label">{t.labelsProducts}</div>
        </div>
      </div>
    </section>
  )
}

function StatisticsEN() {
  return (
    <section className="stats-section">
      <div className="container">
        <div className="row text-center">
          <div className="col-md-3 col-6">
            <div className="stat-box" data-aos="zoom-in">
              <i className="fas fa-industry"></i>
              <h3 className="counter" data-target="30">0</h3>
              <p>Years of Experience</p>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="stat-box" data-aos="zoom-in" data-aos-delay="100">
              <i className="fas fa-box"></i>
              <h3 className="counter" data-target="10000">0</h3>
              <p>Products Delivered</p>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="stat-box" data-aos="zoom-in" data-aos-delay="200">
              <i className="fas fa-users"></i>
              <h3 className="counter" data-target="500">0</h3>
              <p>Satisfied Clients</p>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="stat-box" data-aos="zoom-in" data-aos-delay="300">
              <i className="fas fa-award"></i>
              <h3 className="counter" data-target="100">0</h3>
              <p>Quality Certified</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FeaturesUnified({ lang }) {
  const base = useT(lang).home
  const items = base.whyItems
  return (
    <section className="features" id="sobre">
      <div className="section-header" data-aos="fade-up">
        <h2>{useT(lang).home.whyTitle || useT('pt').home.whyTitle}</h2>
        <p>{useT(lang).home.whyDesc || useT('pt').home.whyDesc}</p>
      </div>
      <div className="features-grid">
        {items?.map((it, idx) => (
          <div key={idx} className="feature-card" data-aos="fade-up" data-aos-delay={(idx + 1) * 100}>
            <div className="feature-icon"><i className={it.icon}></i></div>
            <h3>{it.title}</h3>
            <p>{it.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function CTA({ t, lang }) {
  return (
    <section className="cta-section">
      <div className="cta-container" data-aos="zoom-in">
        <h2>{t.ctaTitle}</h2>
        <p>{t.ctaDesc}</p>
        <a href={lang === 'en' ? '#/en/contact' : lang === 'es' ? '#/es/contacto' : '#/pt/contato'} className="btn-primary-custom">{t.ctaButton}</a>
      </div>
    </section>
  )
}

function initCommon() {
  // Navbar scroll shrink (already handled globally, but keep to match inline behavior)
  const onScroll = () => {
    const navbar = document.getElementById('navbar')
    if (!navbar) return
    if (window.scrollY > 50) navbar.classList.add('scrolled')
    else navbar.classList.remove('scrolled')
  }
  window.removeEventListener('scroll', onScroll)
  window.addEventListener('scroll', onScroll)
  onScroll()
}

function initHomePT(root) {
  initCommon()
  // Mobile menu toggle
  const mobile = document.getElementById('mobile-menu')
  const navMenu = document.getElementById('nav-menu')
  if (mobile && navMenu) mobile.onclick = () => navMenu.classList.toggle('active')

  // Counters on scroll using IntersectionObserver
  const counters = root.querySelectorAll('[data-counter]')
  if (counters.length) {
    const speed = 200
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          counters.forEach(counter => {
            const target = +counter.getAttribute('data-counter')
            const update = () => {
              const count = +counter.innerText
              const inc = target / speed
              if (count < target) {
                counter.innerText = Math.ceil(count + inc)
                setTimeout(update, 1)
              } else {
                counter.innerText = target
              }
            }
            update()
          })
          obs.disconnect()
        }
      })
    }, { threshold: 0.2 })
    const stats = root.querySelector('.statistics')
    if (stats) observer.observe(stats)
  }

  // Smooth scroll for internal anchors (IDs only, not router hashes like #/pt/...)
  root.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href') || ''
      if (href.startsWith('#/') || href.length <= 1) return // let router handle or ignore empty
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  })

  // Product filter (tabs)
  const tabBtns = root.querySelectorAll('.tab-btn')
  const productCards = root.querySelectorAll('.product-card')
  const filterProducts = (category) => {
    productCards.forEach((card, index) => {
      const cardCategory = card.getAttribute('data-category')
      card.style.opacity = '0'
      card.style.transform = 'scale(0.9)'
      setTimeout(() => {
        if (category === 'all' || cardCategory === category) {
          card.style.display = 'block'
          setTimeout(() => {
            card.style.opacity = '1'
            card.style.transform = 'scale(1)'
          }, index * 50)
        } else {
          card.style.display = 'none'
        }
      }, 300)
    })
  }
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'))
      btn.classList.add('active')
      filterProducts(btn.getAttribute('data-filter'))
    })
  })
}

// initHomeEN removed; we use one unified initializer
