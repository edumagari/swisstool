import React, { useContext } from 'react'
import { LangContext } from '../App.jsx'
import { Link } from 'react-router-dom'

export default function Footer() {
  const { lang } = useContext(LangContext)
  const labels = getLabels(lang)
  const base = `/${lang}`
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>SWISSTOOL</h3>
            <p>{labels.brandText}</p>
            <div className="social-links">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
              <a href="#"><i className="fab fa-youtube"></i></a>
            </div>
          </div>

          <div className="footer-column">
            <h4>{labels.quickLinks}</h4>
            <ul>
              <li><Link to={`${base}${pathFor(lang,'empresa')}`}>{labels.company}</Link></li>
              <li><Link to={`${base}${pathFor(lang,'produtos')}`}>{labels.products}</Link></li>
              <li><Link to={`${base}${pathFor(lang,'servicos')}`}>{labels.services}</Link></li>
              <li><Link to={`${base}${pathFor(lang,'contato')}`}>{labels.contact}</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>{labels.products}</h4>
            <ul>
              <li><Link to={`${base}${pathFor(lang,'produtos')}`}>{labels.drills}</Link></li>
              <li><Link to={`${base}${pathFor(lang,'produtos')}`}>{labels.mills}</Link></li>
              <li><Link to={`${base}${pathFor(lang,'produtos')}`}>{labels.reamers}</Link></li>
              <li><Link to={`${base}${pathFor(lang,'produtos')}`}>{labels.saws}</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>{labels.contact}</h4>
            <ul>
              <li><i className="fas fa-map-marker-alt"></i> Espírito Santo do Pinhal/SP</li>
              <li><i className="fas fa-phone"></i> +55 19 3651-3459</li>
              <li><i className="fas fa-envelope"></i> swisstool@swisstool.com.br</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 Swisstool. {labels.allRights}</p>
        </div>
      </div>
    </footer>
  )
}

function getLabels(lang) {
  if (lang === 'en') return {
    quickLinks: 'Quick Links', company: 'Company', products: 'Products', services: 'Services', contact: 'Contact',
    drills: 'Drills', mills: 'Mills', reamers: 'Reamers', saws: 'Saws', allRights: 'All rights reserved.',
    brandText: 'Since 1995 producing precision tools with Swiss technology for multiple industry segments.'
  }
  if (lang === 'es') return {
    quickLinks: 'Enlaces', company: 'Empresa', products: 'Productos', services: 'Servicios', contact: 'Contacto',
    drills: 'Brocas', mills: 'Fresas', reamers: 'Escariadores', saws: 'Sierras', allRights: 'Todos los derechos reservados.',
    brandText: 'Desde 1995 fabricando herramientas de precisión con tecnología suiza para diversos segmentos.'
  }
  return {
    quickLinks: 'Links Rápidos', company: 'Empresa', products: 'Produtos', services: 'Serviços', contact: 'Contato',
    drills: 'Brocas', mills: 'Fresas', reamers: 'Alargadores', saws: 'Serras', allRights: 'Todos os direitos reservados.',
    brandText: 'Desde 1995 fabricando ferramentas de precisão com tecnologia Suíça, atendendo os mais diversos segmentos da indústria nacional.'
  }
}

function pathFor(lang, key) {
  const map = {
    pt: { empresa: '/empresa', produtos: '/produtos', servicos: '/servicos', contato: '/contato' },
    en: { empresa: '/company', produtos: '/products', servicos: '/services', contato: '/contact' },
    es: { empresa: '/empresa', produtos: '/productos', servicos: '/servicios', contato: '/contacto' },
  }
  return map[lang]?.[key] || '/'
}
