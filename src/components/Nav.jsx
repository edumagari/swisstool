import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { LangContext } from '../App.jsx'

export default function Nav() {
  const { lang, setLang } = useContext(LangContext)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => {
      const navbar = document.getElementById('navbar')
      if (!navbar) return
      if (window.scrollY > 50) navbar.classList.add('scrolled')
      else navbar.classList.remove('scrolled')
    }
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    // Close mobile menu on route change
    setMobileOpen(false)
  }, [location])

  const linksPT = (
    <ul className={`nav-menu ${mobileOpen ? 'active' : ''}`} id="nav-menu">
      <li><NavLink to="/pt" className="nav-link nav-cta">Home</NavLink></li>
      <li><NavLink to="/pt/empresa" className="nav-link">Empresa</NavLink></li>
      <li><NavLink to="/pt/produtos" className="nav-link">Produtos</NavLink></li>
      <li><NavLink to="/pt/servicos" className="nav-link">Serviços</NavLink></li>
      <li><NavLink to="/pt/contato" className="nav-link">Contato</NavLink></li>
    </ul>
  )

  const linksEN = (
    <ul className={`nav-menu ${mobileOpen ? 'active' : ''}`} id="nav-menu">
      <li><NavLink to="/en" className="nav-link nav-cta">Home</NavLink></li>
      <li><NavLink to="/en/company" className="nav-link">Company</NavLink></li>
      <li><NavLink to="/en/products" className="nav-link">Products</NavLink></li>
      <li><NavLink to="/en/services" className="nav-link">Services</NavLink></li>
      <li><NavLink to="/en/contact" className="nav-link">Contact</NavLink></li>
    </ul>
  )

  const linksES = (
    <ul className={`nav-menu ${mobileOpen ? 'active' : ''}`} id="nav-menu">
      <li><NavLink to="/es" className="nav-link nav-cta">Inicio</NavLink></li>
      <li><NavLink to="/es/empresa" className="nav-link">Empresa</NavLink></li>
      <li><NavLink to="/es/productos" className="nav-link">Productos</NavLink></li>
      <li><NavLink to="/es/servicios" className="nav-link">Servicios</NavLink></li>
      <li><NavLink to="/es/contacto" className="nav-link">Contacto</NavLink></li>
    </ul>
  )

  const toggleLang = () => {
    const next = lang === 'pt' ? 'en' : lang === 'en' ? 'es' : 'pt'
    setLang(next)
    // Compute parallel path: swap '/pt' <-> '/en'
    const parts = location.pathname.split('/')
    if (['pt','en','es'].includes(parts[1])) {
      parts[1] = next
    } else {
      parts.splice(1, 0, next)
    }
    const target = parts.join('/') || `/${next}`
    window.location.hash = `#${target}`
  }

  const switchTo = (targetLang) => {
    if (targetLang === lang) return
    setLang(targetLang)
    const parts = location.pathname.split('/')
    if (['pt','en','es'].includes(parts[1])) parts[1] = targetLang
    else parts.splice(1, 0, targetLang)
    const target = parts.join('/') || `/${targetLang}`
    window.location.hash = `#${target}`
  }

  return (
    <nav className="navbar-modern" id="navbar">
      <div className="nav-container">
        <Link to={`/${lang}`} className="logo">
          <img src="/img/logo_swisstool.png" alt="Swisstool" style={{ width: '200px', height: 'auto' }} />
        </Link>
        {lang === 'pt' ? linksPT : lang === 'en' ? linksEN : linksES}
        <div className="mobile-menu-toggle" id="mobile-menu" onClick={() => setMobileOpen(!mobileOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="lang-flags" style={{ display: 'flex', gap: 8, marginLeft: 12 }}>
          <button aria-label="Português" className="btn btn-sm btn-outline-secondary" onClick={() => switchTo('pt')} title="Português (BR)">🇧🇷</button>
          <button aria-label="English" className="btn btn-sm btn-outline-secondary" onClick={() => switchTo('en')} title="English">🇺🇸</button>
          <button aria-label="Español" className="btn btn-sm btn-outline-secondary" onClick={() => switchTo('es')} title="Español">🇪🇸</button>
        </div>
      </div>
    </nav>
  )
}
