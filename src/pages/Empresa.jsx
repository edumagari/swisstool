import React, { useContext } from 'react'
import { LangContext } from '../App.jsx'
import { useT } from '../i18n/translations.js'
import SEO from '../seo/SEO.jsx'

export default function Empresa() {
  const { lang } = useContext(LangContext)
  const t = useT(lang).company
  const bullets = t.infraBullets
  const values = t.values
  return (
    <main>
      <SEO
        lang={lang}
        title={t.headerTitle}
        description={t.headerDesc}
        image="/img/slide2.jpg"
        canonical={lang === 'en' ? '/#/en/company' : lang === 'es' ? '/#/es/empresa' : '/#/pt/empresa'}
        alternates={[
          { hrefLang: 'pt-BR', href: '/#/pt/empresa' },
          { hrefLang: 'en', href: '/#/en/company' },
          { hrefLang: 'es', href: '/#/es/empresa' },
          { hrefLang: 'x-default', href: '/#/en/company' },
        ]}
        jsonLd={[{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: t.headerTitle,
          description: t.headerDesc,
          url: (typeof window !== 'undefined' ? window.location.origin : '') + (lang === 'en' ? '/#/en/company' : lang === 'es' ? '/#/es/empresa' : '/#/pt/empresa')
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
          <div className="mission-section" data-aos="fade-up">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <h2 className="mb-4">{t.missionTitle}</h2>
                <p className="lead">{t.missionLead}</p>
                <p>{t.missionBody}</p>
              </div>
              <div className="col-lg-6">
                <div className="stats-company">
                  <div className="stat-company"><div className="stat-company-number">{lang === 'en' ? '30+' : '+ de 30'}</div><div className="stat-company-label">{lang === 'en' ? 'Years in Market' : 'Anos de Mercado'}</div></div>
                  <div className="stat-company"><div className="stat-company-number">5000+</div><div className="stat-company-label">{lang === 'en' ? 'Active Clients' : 'Clientes Ativos'}</div></div>
                  <div className="stat-company"><div className="stat-company-number">50+</div><div className="stat-company-label">{lang === 'en' ? 'Employees' : 'Colaboradores'}</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="container-modern">
          <div className="section-title">
            <h2 data-aos="fade-up">{t.valuesTitle}</h2>
            <p data-aos="fade-up" data-aos-delay="100">{t.valuesDesc}</p>
          </div>
          <div className="values-grid">
            {values.map((v, idx) => (
              <div key={idx} className="value-card" data-aos="zoom-in" data-aos-delay={(idx + 1) * 100}>
                <div className="value-icon"><i className={v.icon}></i></div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="container-modern">
          <div className="section-title" data-aos="fade-up">
            <h2>{t.mapSpotTitle}</h2>
            <p>{t.mapSpotDesc}</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }} data-aos="zoom-in">
            <img src="/img/mapa.png" alt="Mapa Swisstool" style={{ maxWidth: 360, width: '100%', borderRadius: '50%', boxShadow: '0 10px 30px rgba(0,0,0,.12)' }} />
          </div>
        </div>
      </section>

      <section className="content-section bg-light">
        <div className="container-modern">
          <div className="row align-items-center">
            <div className="col-lg-6" data-aos="fade-right">
              <h2 className="mb-4">{t.infraTitle}</h2>
              <p className="lead">{t.infraLead}</p>
              <ul className="list-unstyled">
                {bullets.map((b, i) => (
                  <li key={i} className="mb-3"><i className="fas fa-check-circle text-primary me-2"></i> {b}</li>
                ))}
              </ul>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <img src="/img/slide2.jpg" alt="Facilities" className="img-fluid rounded-3 shadow" />
            </div>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="container-modern text-center">
          <h2 className="mb-3" data-aos="fade-up">{t.ctaTitle}</h2>
          <p className="mb-4" data-aos="fade-up" data-aos-delay="100">{t.ctaDesc}</p>
          <div data-aos="fade-up" data-aos-delay="200">
            <a href={lang === 'en' ? '#/en/contact' : '#/pt/contato'} className="btn-primary-custom me-3">{t.ctaContact}</a>
            <a href={lang === 'en' ? '#/en/products' : '#/pt/produtos'} className="btn-secondary-custom">{t.ctaProducts}</a>
          </div>
        </div>
      </section>
    </main>
  )
}
