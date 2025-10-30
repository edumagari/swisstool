import React, { useEffect, useMemo, useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import Empresa from './pages/Empresa.jsx'
import Servicos from './pages/Servicos.jsx'
import Contact from './pages/Contact.jsx'
import ProductDetail from './pages/ProductDetail.jsx'

export const LangContext = React.createContext({ lang: 'pt', setLang: () => {} })

function useLangFromPathname() {
  const { pathname } = useLocation()
  // Expect paths like /pt/... or /en/...
  const seg = pathname.split('/')[1]
  return seg === 'en' ? 'en' : seg === 'es' ? 'es' : 'pt'
}

export default function App() {
  const location = useLocation()
  const inferred = useLangFromPathname()
  const [lang, setLang] = useState(inferred)

  useEffect(() => setLang(inferred), [inferred])

  useEffect(() => {
    // Ensure AOS is loaded and DOM is ready
    const initializeAOS = () => {
      if (!window.AOS) {
        console.warn('AOS library not loaded yet')
        return
      }

      try {
        // Initialize AOS with more robust settings
        window.AOS.init({
          duration: 1000,
          once: false, // Changed to false to allow re-animation on route changes
          easing: 'ease-in-out',
          delay: 0,
          offset: 50,
          anchorPlacement: 'top-bottom',
          disable: false,
          startEvent: 'DOMContentLoaded',
          disableMutationObserver: false,
          throttleDelay: 99,
          debounceDelay: 50
        })

        // Use proper refresh method with adequate delay for DOM updates
        setTimeout(() => {
          try {
            window.AOS.refresh() // Correct method name
          } catch (e) {
            console.error('Error refreshing AOS:', e)
          }
        }, 100) // Increased delay for DOM stability
      } catch (error) {
        console.error('Error initializing AOS:', error)
      }
    }

    // Check if AOS is ready using our helper function
    if (window.isAOSReady && window.isAOSReady()) {
      initializeAOS()
    } else if (window.AOS) {
      // AOS exists but might not be fully ready
      setTimeout(initializeAOS, 100)
    } else {
      // Wait for AOS to load
      const checkAOS = setInterval(() => {
        if (window.isAOSReady ? window.isAOSReady() : window.AOS) {
          clearInterval(checkAOS)
          initializeAOS()
        }
      }, 100)

      // Also listen for aos-loaded event
      const handleAOSLoaded = () => {
        clearInterval(checkAOS)
        initializeAOS()
        window.removeEventListener('aos-loaded', handleAOSLoaded)
      }
      window.addEventListener('aos-loaded', handleAOSLoaded)

      // Cleanup after 3 seconds if AOS never loads
      setTimeout(() => {
        clearInterval(checkAOS)
        window.removeEventListener('aos-loaded', handleAOSLoaded)
      }, 3000)
    }
  }, [location])

  const ctx = useMemo(() => ({ lang, setLang }), [lang])

  return (
    <LangContext.Provider value={ctx}>
      <div className="app-root">
        <ScrollToTop />
        <DynamicCss />
        <Nav />
        <Routes>
          {/* Portuguese routes */}
          <Route path="/" element={<Navigate to="/pt" replace />} />
          <Route path="/pt" element={<Home />} />
          <Route path="/pt/empresa" element={<Empresa />} />
          <Route path="/pt/produtos" element={<Products />} />
          <Route path="/pt/produtos/:slug" element={<ProductDetail />} />
          <Route path="/pt/servicos" element={<Servicos />} />
          <Route path="/pt/contato" element={<Contact />} />


          {/* English routes */}
          <Route path="/en" element={<Home />} />
          <Route path="/en/company" element={<Empresa />} />
          <Route path="/en/products" element={<Products />} />
          <Route path="/en/products/:slug" element={<ProductDetail />} />
          <Route path="/en/services" element={<Servicos />} />
          <Route path="/en/contact" element={<Contact />} />

          {/* Spanish routes */}
          <Route path="/es" element={<Home />} />
          <Route path="/es/empresa" element={<Empresa />} />
          <Route path="/es/productos" element={<Products />} />
          <Route path="/es/productos/:slug" element={<ProductDetail />} />
          <Route path="/es/servicios" element={<Servicos />} />
          <Route path="/es/contacto" element={<Contact />} />
          {/* Product details are served as original static HTML for pixel parity */}

          <Route path="*" element={<Navigate to={`/${lang}`} replace />} />
        </Routes>
        <Footer />
      </div>
    </LangContext.Provider>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  const prevPathRef = React.useRef(pathname)
  useEffect(() => {
    const prev = prevPathRef.current
    const curr = pathname
    const prevParts = prev.split('/')
    const currParts = curr.split('/')
    const prevRest = prevParts.slice(2).join('/')
    const currRest = currParts.slice(2).join('/')
    const onlyLangChanged = prevRest === currRest && prevParts[1] !== currParts[1]

    if (!onlyLangChanged) {
      try { window.scrollTo({ top: 0, left: 0, behavior: 'auto' }) }
      catch { window.scrollTo(0, 0) }
    }
    prevPathRef.current = pathname
  }, [pathname])
  return null
}

function DynamicCss() {
  const { pathname } = useLocation()
  const lang = pathname.split('/')[1]
  const rest = pathname.split('/').slice(2).join('/')

  const cssSet = React.useMemo(() => {
    // Match original per-page CSS combinations exactly
    const at = (list) => list
    const isHome = rest === ''
    const isProducts = /^(produtos|products|productos)$/.test(rest)
    const isCompany = /^(empresa|company)$/.test(rest)
    const isServices = /^(servicos|services|servicios)$/.test(rest)
    const isContact = /^(contato|contact|contacto)$/.test(rest)
    const isProductDetail = /^(produtos|products|productos)\//.test(rest)

    if (isProductDetail) {
      // Original product pages load only global-modern.css + inline styles
      return at(['/css/global-modern.css'])
    }
    if (isHome) { return at(['/css/app.css']) }
    if (isProducts) return at(['/css/global-modern.css', '/css/app.css', '/css/produtos.css'])
    if (isCompany) return at(['/css/global-modern.css', '/css/app.css', '/css/empresa.css'])
    if (isServices) return at(['/css/global-modern.css', '/css/app.css', '/css/servicos.css'])
    if (isContact) return at(['/css/global-modern.css', '/css/app.css', '/css/contato.css'])
    // Default fallback
    return at(['/css/app.css'])
  }, [lang, rest])

  React.useEffect(() => {
    const registry = (window.__dynamicStyles = window.__dynamicStyles || {})
    const needed = new Set(cssSet)
    const toAdd = cssSet.filter(href => !registry[href])
    const toRemove = Object.keys(registry).filter(href => !needed.has(href))

    let loaded = 0
    const total = toAdd.length

    function cleanup() {
      // Remove leftovers only after new styles (if any) are loaded
      toRemove.forEach(href => {
        const el = registry[href]
        if (el && el.parentNode) el.parentNode.removeChild(el)
        delete registry[href]
      })

      // Refresh AOS after CSS changes are complete
      if (window.AOS) {
        setTimeout(() => {
          try {
            window.AOS.refresh()
          } catch (e) {
            console.error('Error refreshing AOS after CSS load:', e)
          }
        }, 50)
      }
    }

    if (total === 0) {
      cleanup()
      return
    }

    // Add loading state to prevent animations during CSS load
    document.body.classList.add('css-loading')

    toAdd.forEach(href => {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = href
      link.setAttribute('data-dynamic-style', 'yes')

      link.onload = () => {
        loaded++
        if (loaded === total) {
          cleanup()
          // Remove loading state and trigger animations
          setTimeout(() => {
            document.body.classList.remove('css-loading')
            if (window.AOS) {
              try {
                window.AOS.refresh()
              } catch (e) {
                console.error('Error refreshing AOS after CSS load:', e)
              }
            }
          }, 50)
        }
      }

      link.onerror = (error) => {
        console.error(`Failed to load CSS: ${href}`, error)
        loaded++
        if (loaded === total) {
          cleanup()
          document.body.classList.remove('css-loading')
        }
      }

      document.head.appendChild(link)
      registry[href] = link
    })
  }, [cssSet])
  return null
}
