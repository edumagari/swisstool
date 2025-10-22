import React, { useContext } from 'react'
import { LangContext } from '../App.jsx'
import { useT } from '../i18n/translations.js'
import SEO from '../seo/SEO.jsx'

export default function Servicos() {
  const { lang } = useContext(LangContext)
  const t = useT(lang).services
  return (
    <main>
      <SEO
        lang={lang}
        title={t.headerTitle}
        description={t.headerDesc}
        image="/img/swisstool-servicos.jpg"
        canonical={lang === 'en' ? '/#/en/services' : lang === 'es' ? '/#/es/servicios' : '/#/pt/servicos'}
        alternates={[
          { hrefLang: 'pt-BR', href: '/#/pt/servicos' },
          { hrefLang: 'en', href: '/#/en/services' },
          { hrefLang: 'es', href: '/#/es/servicios' },
          { hrefLang: 'x-default', href: '/#/en/services' },
        ]}
        jsonLd={[{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: t.headerTitle,
          description: t.headerDesc,
        }]}
      />
      <section className="page-header">
        <div className="page-header-content">
          <h1 data-aos="fade-up">{t.headerTitle}</h1>
          <p data-aos="fade-up" data-aos-delay="100">{t.headerDesc}</p>
          <div className="breadcrumb-modern" data-aos="fade-up" data-aos-delay="200">
            <a href={lang === 'en' ? '#/en' : lang === 'es' ? '#/es' : '#/pt'}>{useT(lang).nav.home}</a>
            <span>/</span>
            <span>{t.headerTitle}</span>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="container-modern">
          <div className="section-title">
            <h2 data-aos="fade-up">{t.sectionTitle}</h2>
            <p data-aos="fade-up" data-aos-delay="100">{t.sectionDesc}</p>
          </div>
          <div className="row g-4">
            {t.cards.map((c, i) => (
              <div key={i} className="col-lg-6" data-aos="fade-up" data-aos-delay={(i + 1) * 100}>
                <div className="service-card">
                  <div className="service-icon"><i className={c.icon}></i></div>
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section bg-light">
        <div className="container-modern">
          <div className="section-title">
            <h2 data-aos="fade-up">{t.processTitle}</h2>
            <p data-aos="fade-up" data-aos-delay="100">{t.processDesc}</p>
          </div>
          <div className="process-timeline">
            {t.processSteps.map((s, i) => (
              <div key={i} className="process-step" data-aos="fade-right" data-aos-delay={i * 100}>
                <div className="process-number">{s.n}</div>
                <div className="process-content">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="container-modern text-center">
          <h2 className="mb-3" data-aos="fade-up">{t.ctaTitle}</h2>
          <p className="mb-4" data-aos="fade-up" data-aos-delay="100">{t.ctaDesc}</p>
          <div data-aos="fade-up" data-aos-delay="200">
            <a href={lang === 'en' ? '#/en/contact' : '#/pt/contato'} className="btn-primary-custom me-3">{t.ctaQuote}</a>
            <a href={lang === 'en' ? '#/en/products' : '#/pt/produtos'} className="btn-secondary-custom">{t.ctaView}</a>
          </div>
        </div>
      </section>
    </main>
  )
}
