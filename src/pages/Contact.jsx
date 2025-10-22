import React, { useContext } from 'react'
import { LangContext } from '../App.jsx'
import { useT } from '../i18n/translations.js'
import SEO from '../seo/SEO.jsx'

export default function Contact() {
  const { lang } = useContext(LangContext)
  const t = useT(lang).contact
  return (
    <main>
      <SEO
        lang={lang}
        title={t.headerTitle}
        description={t.headerDesc}
        image="/img/logo_swisstool.png"
        canonical={lang === 'en' ? '/#/en/contact' : lang === 'es' ? '/#/es/contacto' : '/#/pt/contato'}
        alternates={[
          { hrefLang: 'pt-BR', href: '/#/pt/contato' },
          { hrefLang: 'en', href: '/#/en/contact' },
          { hrefLang: 'es', href: '/#/es/contacto' },
          { hrefLang: 'x-default', href: '/#/en/contact' },
        ]}
        jsonLd={[{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: t.headerTitle,
          description: t.headerDesc
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
          <div className="row g-4">
            <div className="col-lg-3" data-aos="fade-up">
              <div className="contact-info-card">
                <div className="contact-icon"><i className="fas fa-map-marker-alt"></i></div>
                <h3>{t.address.title}</h3>
                <p style={{ whiteSpace: 'pre-line' }}>{t.address.body}</p>
              </div>
            </div>
            <div className="col-lg-3" data-aos="fade-up" data-aos-delay="100">
              <div className="contact-info-card">
                <div className="contact-icon"><i className="fas fa-phone-alt"></i></div>
                <h3>{t.phone.title}</h3>
                <p style={{ whiteSpace: 'pre-line' }}><strong>{t.phone.body.split('\n')[0]}</strong><br />{t.phone.body.split('\n').slice(1).join('\n')}</p>
              </div>
            </div>
            <div className="col-lg-3" data-aos="fade-up" data-aos-delay="100">
              <div className="contact-info-card">
                <div className="contact-icon"><i className="fa-brands fa-whatsapp"></i></div>
                <h3>{t.whatsapp.title}</h3>
                <br />
                <a href={lang === 'en' ? 'https://wa.me/551936513459?text=I%20would%20like%20to%20know%20more%20about%20your%20products.' : 'https://wa.me/551936513459?text=Tenho%20interesse%20em%20saber%20mais%20sobre%20os%20seus%20produtos.'} target="_blank" className="btn-primary-custom" rel="noreferrer">{t.whatsapp.button}</a>
              </div>
            </div>
            <div className="col-lg-3" data-aos="fade-up" data-aos-delay="200">
              <div className="contact-info-card">
                <div className="contact-icon"><i className="fas fa-envelope"></i></div>
                <h3>{t.email.title}</h3>
                <p><strong>{t.email.body}</strong><br /><a href={`mailto:${t.email.address}`} style={{ textDecoration: 'none', color: '#000' }}>{t.email.address}</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="container-modern">
          <div className="section-title">
            <h2 data-aos="fade-up">{t.mapTitle}</h2>
            <p data-aos="fade-up" data-aos-delay="100">{t.mapDesc}</p>
          </div>
          <div className="map-container" data-aos="zoom-in">
            <iframe src={lang === 'en' ? 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1847.333855213529!2d-46.7470103!3d-22.1767173!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c9adeceac5d7fb%3A0xa9e7d50ee106bbef!2sSwisstool%20Ind%C3%BAstria%20Com%C3%A9rcio!5e0!3m2!1sen!2sbr!4v1759165828818!5m2!1sen!2sbr' : lang === 'es' ? 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1847.333855213529!2d-46.7470103!3d-22.1767173!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c9adeceac5d7fb%3A0xa9e7d50ee106bbef!2sSwisstool%20Ind%C3%BAstria%20Com%C3%A9rcio!5e0!3m2!1ses!2sbr!4v1759165828818!5m2!1ses!2sbr' : 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1847.333855213529!2d-46.7470103!3d-22.1767173!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c9adeceac5d7fb%3A0xa9e7d50ee106bbef!2sSwisstool%20Ind%C3%BAstria%20Com%C3%A9rcio!5e0!3m2!1spt-BR!2sbr!4v1759165828818!5m2!1spt-BR!2sbr'} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"></iframe>
          </div>
        </div>
      </section>
    </main>
  )
}
