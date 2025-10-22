import React, { useContext, useEffect, useMemo, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { LangContext } from '../App.jsx'
import { aliasToCanonical, productContent, productTexts } from '../i18n/productContent.js'
import SEO from '../seo/SEO.jsx'

export default function ProductDetail() {
  const { lang } = useContext(LangContext)
  const { slug } = useParams()
  const canonical = aliasToCanonical[slug] || slug
  const meta = productContent[canonical]
  const text = (productTexts[lang] || productTexts.pt)[canonical]
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    // Lightbox functions
    const openLightbox = (src) => {
      const lb = root.querySelector('#lightbox')
      const img = root.querySelector('#lightboxImage')
      if (img) img.src = src
      if (lb) lb.classList.add('active')
      document.body.style.overflow = 'hidden'
    }
    const closeLightbox = () => {
      const lb = root.querySelector('#lightbox')
      if (lb) lb.classList.remove('active')
      document.body.style.overflow = 'auto'
    }
    root.querySelectorAll('[data-thumb]').forEach(el => {
      el.addEventListener('click', () => {
        const src = el.getAttribute('data-thumb')
        const main = root.querySelector('#mainImage')
        if (main) main.src = src
        root.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'))
        el.classList.add('active')
      })
    })
    const mainWrap = root.querySelector('.main-image')
    mainWrap?.addEventListener('click', () => openLightbox(root.querySelector('#mainImage')?.src))
    root.querySelector('#lightbox')?.addEventListener('click', closeLightbox)
    root.querySelector('#lightboxImage')?.addEventListener('click', e => e.stopPropagation())
    return () => {
      root.querySelector('#lightbox')?.removeEventListener('click', closeLightbox)
    }
  }, [lang, slug])

  const related = (meta?.related || []).slice(0, 4)

  const image0 = meta?.images?.[0]
  const langPath = (l) => (l === 'en' ? '/#/en/products' : l === 'es' ? '/#/es/productos' : '/#/pt/produtos')
  const canonPath = `${langPath(lang)}/${canonical}`
  const alternates = [
    { hrefLang: 'pt-BR', href: `${langPath('pt')}/${canonical}` },
    { hrefLang: 'en', href: `${langPath('en')}/${canonical}` },
    { hrefLang: 'es', href: `${langPath('es')}/${canonical}` },
    { hrefLang: 'x-default', href: `${langPath('en')}/${canonical}` },
  ]

  return (
    <main ref={rootRef}>
      <SEO
        lang={lang}
        title={text?.title}
        description={text?.description}
        image={image0}
        type="product"
        canonical={canonPath}
        alternates={alternates}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: text?.title,
            description: text?.description,
            image: meta?.images || [],
            brand: { '@type': 'Brand', name: 'Swisstool' }
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: (typeof window !== 'undefined' ? window.location.origin : '') + (lang === 'en' ? '/#/en' : lang === 'es' ? '/#/es' : '/#/pt') },
              { '@type': 'ListItem', position: 2, name: 'Products', item: (typeof window !== 'undefined' ? window.location.origin : '') + langPath(lang) },
              { '@type': 'ListItem', position: 3, name: text?.title, item: (typeof window !== 'undefined' ? window.location.origin : '') + canonPath },
            ]
          }
        ]}
      />
      <StyleBlock />
      <section className="product-hero">
        <div className="container-modern">
          <div className="row g-4 align-items-start">
            <div className="col-lg-6">
              <div className="product-gallery">
                <div className="main-image">
                  <img id="mainImage" src={meta?.images?.[0]} alt={text?.title} />
                </div>
                <div className="gallery-thumbs">
                  {meta?.images?.map((src, i) => (
                    <div key={i} className={`gallery-thumb ${i===0?'active':''}`} data-thumb={src}>
                      <img src={src} alt="thumb" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="product-info">
                <span className="product-badge">{text?.badge}</span>
                <h1>{text?.title}</h1>
                <p className="product-description">{text?.description}</p>
                <div className="feature-grid">
                  <div className="feature-card"><i className="fas fa-cogs"></i><h4>{label(lang,'precision')}</h4><p>{label(lang,'precisionDesc')}</p></div>
                  <div className="feature-card"><i className="fas fa-shield-alt"></i><h4>{label(lang,'durability')}</h4><p>{label(lang,'durabilityDesc')}</p></div>
                  <div className="feature-card"><i className="fas fa-chart-line"></i><h4>{label(lang,'performance')}</h4><p>{label(lang,'performanceDesc')}</p></div>
                  <div className="feature-card"><i className="fas fa-certificate"></i><h4>{label(lang,'warranty')}</h4><p>{label(lang,'warrantyDesc')}</p></div>
                </div>
                <div className="mt-4">
                  <a href={ctaHref(lang)} className="btn-primary-custom"><i className="fas fa-envelope"></i> {label(lang,'quote')}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section" id="specs">
        <div className="container-modern">
          <div className="specs-tabs mt-3">
            <ul className="nav nav-tabs" role="tablist">
              {text?.tabs?.map((tab, i) => (
                <li key={i} className="nav-item" role="presentation">
                  <button className={`nav-link ${i===0?'active':''}`} data-bs-toggle="tab" data-bs-target={`#tab-${tab.id}`}>{tab.title}</button>
                </li>
              ))}
            </ul>
            <div className="tab-content">
              {text?.tabs?.map((tab, i) => (
                <div key={i} className={`tab-pane fade ${i===0?'show active':''}`} id={`tab-${tab.id}`}>
                  <ul className="specs-list">
                    {tab.items.map((it, idx) => (
                      <li key={idx}><i className="fas fa-check-circle"></i><span>{it}</span></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="related-products">
        <div className="container-modern">
          <div className="section-title">
            <h2>{label(lang,'relatedTitle')}</h2>
            <p>{label(lang,'relatedDesc')}</p>
          </div>
          <div className="product-carousel">
            {related.map((slug, i) => (
              <a key={slug} href={detailHref(lang, slug)} className="related-product-card" data-aos="fade-up" data-aos-delay={i*100}>
                <img src={productContent[slug]?.images?.[0]} alt={productTexts[lang]?.[slug]?.title || slug} />
                <div className="related-product-info">
                  <h4>{productTexts[lang]?.[slug]?.title || productTexts.pt[slug]?.title}</h4>
                  <p>{productTexts[lang]?.[slug]?.description || productTexts.pt[slug]?.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="lightbox" id="lightbox"><span className="lightbox-close">×</span><img id="lightboxImage" alt="lightbox" /></div>
    </main>
  )
}

function label(lang, key) {
  const dict = {
    precision: { pt: 'Alta Precisão', en: 'High Precision', es: 'Alta Precisión' },
    precisionDesc: { pt: 'Tolerâncias rigorosas', en: 'Tight tolerances', es: 'Tolerancias estrictas' },
    durability: { pt: 'Durabilidade', en: 'Durability', es: 'Durabilidad' },
    durabilityDesc: { pt: 'Material de alta qualidade', en: 'High quality material', es: 'Material de alta calidad' },
    performance: { pt: 'Performance', en: 'Performance', es: 'Rendimiento' },
    performanceDesc: { pt: 'Máxima eficiência', en: 'Maximum efficiency', es: 'Máxima eficiencia' },
    warranty: { pt: 'Garantia', en: 'Warranty', es: 'Garantía' },
    warrantyDesc: { pt: 'Qualidade certificada', en: 'Certified quality', es: 'Calidad certificada' },
    quote: { pt: 'Solicitar Orçamento', en: 'Request a Quote', es: 'Solicitar Cotización' },
    relatedTitle: { pt: 'Produtos Relacionados', en: 'Related Products', es: 'Productos Relacionados' },
    relatedDesc: { pt: 'Conheça outras ferramentas da nossa linha', en: 'Explore more tools from our line', es: 'Conozca otras herramientas de nuestra línea' },
  }
  return dict[key]?.[lang] || dict[key]?.pt || key
}

function ctaHref(lang) { return lang === 'en' ? '#/en/contact' : lang === 'es' ? '#/es/contacto' : '#/pt/contato' }
function detailHref(lang, slug) {
  if (lang === 'en') return `#/en/products/${slugAlias('en', slug)}`
  if (lang === 'es') return `#/es/productos/${slugAlias('es', slug)}`
  return `#/pt/produtos/${slug}`
}
function slugAlias(lang, canonical) {
  // For simplicity, keep canonical slug in EN/ES routes too
  return canonical
}

function StyleBlock() {
  return (
    <style dangerouslySetInnerHTML={{ __html: `
      .product-hero{margin-top:70px;padding:120px 0 60px;background:linear-gradient(135deg,#f8f8f8 0%,#e8e8e8 100%);position:relative;overflow:hidden}
      .product-gallery{position:relative}
      .main-image{width:100%;border-radius:20px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.1);cursor:zoom-in;transition:transform .3s ease}
      .main-image:hover{transform:scale(1.02)}
      .main-image img{width:100%;height:auto}
      .gallery-thumbs{display:flex;gap:1rem;margin-top:1.5rem}
      .gallery-thumb{flex:1;border-radius:10px;overflow:hidden;cursor:pointer;border:3px solid transparent;transition:all .3s ease}
      .gallery-thumb.active{border-color:var(--primary)}
      .gallery-thumb:hover{transform:translateY(-3px);box-shadow:0 10px 20px rgba(0,0,0,.08)}
      .gallery-thumb img{width:100%;height:auto}
      .product-info h1{font-size:2.5rem;font-weight:700;color:var(--text-dark);margin-bottom:1rem}
      .product-badge{display:inline-block;background:var(--gradient);color:#fff;padding:.5rem 1rem;border-radius:50px;font-size:.875rem;font-weight:600;margin-bottom:1.5rem}
      .product-description{font-size:1.125rem;color:var(--text-light);line-height:1.8;margin-bottom:2rem}
      .specs-tabs{margin-top:3rem}
      .nav-tabs{border:none;background:#f8f8f8;border-radius:15px;padding:.5rem}
      .nav-tabs .nav-link{border:none;color:var(--text-dark);padding:1rem 2rem;border-radius:10px;font-weight:600;transition:all .3s ease}
      .nav-tabs .nav-link:hover{background:#fff}
      .nav-tabs .nav-link.active{background:#fff;color:var(--primary);box-shadow:0 5px 15px rgba(0,0,0,.06)}
      .tab-content{padding:2rem 0}
      .specs-list{list-style:none;padding:0}
      .specs-list li{padding:1rem;border-bottom:1px solid #e0e0e0;display:flex;align-items:center}
      .specs-list li:last-child{border-bottom:none}
      .specs-list i{color:var(--primary);margin-right:1rem;font-size:1.2rem}
      .feature-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:2rem;margin-top:2rem}
      .feature-card{text-align:center;padding:2rem;background:linear-gradient(135deg,#f8f8f8 0%,#fff 100%);border-radius:15px;transition:all .3s ease}
      .feature-card:hover{transform:translateY(-5px);box-shadow:0 10px 30px rgba(0,0,0,.08)}
      .feature-card i{font-size:3rem;color:var(--primary);margin-bottom:1rem}
      .feature-card h4{font-size:1.25rem;margin-bottom:.5rem}
      .cta-section{background:var(--gradient);padding:80px 0;color:#fff;text-align:center}
      .related-products{padding:80px 0;background:#f8f8f8}
      .product-carousel{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:2rem;margin-top:3rem}
      .related-product-card{background:#fff;border-radius:15px;overflow:hidden;transition:all .3s ease;text-decoration:none;color:inherit}
      .related-product-card:hover{transform:translateY(-10px);box-shadow:0 20px 40px rgba(0,0,0,.12)}
      .related-product-card img{width:100%;height:200px;object-fit:cover}
      .related-product-info{padding:1.5rem}
      .related-product-info h4{font-size:1.25rem;margin-bottom:.5rem;color:var(--text-dark)}
      .related-product-info p{color:var(--text-light);font-size:.95rem}
      .lightbox{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.9);display:none;justify-content:center;align-items:center;z-index:2000;cursor:zoom-out}
      .lightbox.active{display:flex}
      .lightbox img{max-width:90%;max-height:90%;border-radius:10px}
      .lightbox-close{position:absolute;top:30px;right:30px;font-size:2rem;color:#fff;cursor:pointer;transition:transform .3s ease}
      .lightbox-close:hover{transform:rotate(90deg)}
    `}} />
  )
}
