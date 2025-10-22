export const aliasToCanonical = {
  // PT slugs
  'brocas': 'brocas',
  'fresas-topo': 'fresas-topo',
  'alargadores': 'alargadores',
  'micro-brocas': 'micro-brocas',
  'serras-circulares': 'serras-circulares',
  'ferramentas-perfil': 'ferramentas-perfil',
  'fresas-circulares': 'fresas-circulares',
  'fresas-woodruff': 'fresas-woodruff',
  'puncoes': 'puncoes',
  'brocas-alargadoras': 'brocas-alargadoras',
  // EN slugs
  'drills': 'brocas',
  'endmills': 'fresas-topo',
  'reamers': 'alargadores',
  'micro-drills': 'micro-brocas',
  'circular-saws': 'serras-circulares',
  'grooving-tools': 'ferramentas-perfil',
  'circular-cutters': 'fresas-circulares',
  'woodruff-cutters': 'fresas-woodruff',
  'punches': 'puncoes',
  'reamer-drills': 'brocas-alargadoras',
}

export const productContent = {
  'brocas': {
    images: ['/img/brocas.jpg', '/img/brocas2.jpg', '/img/brocas-home.jpg'],
    related: ['alargadores', 'micro-brocas', 'brocas-alargadoras', 'fresas-topo']
  },
  'fresas-topo': {
    images: ['/img/fresas-topo-home.jpg', '/img/fresas-topo-home.jpg', '/img/fresas-circulares-home.jpg'],
    related: ['fresas-circulares', 'fresas-woodruff', 'brocas', 'alargadores']
  },
  'alargadores': {
    images: ['/img/alargador-home.jpg', '/img/brocas-alargadoras-home.jpg', '/img/brocas-home.jpg'],
    related: ['brocas', 'brocas-alargadoras', 'serras-circulares', 'ferramentas-perfil']
  },
  'micro-brocas': {
    images: ['/img/mini-brocas-home.jpg', '/img/brocas-home.jpg', '/img/brocas2.jpg'],
    related: ['brocas', 'fresas-topo', 'fresas-circulares', 'alargadores']
  },
  'serras-circulares': {
    images: ['/img/serras-circulares-home.jpg', '/img/serras-circulares-home.jpg', '/img/fresas-circulares-home.jpg'],
    related: ['fresas-circulares', 'brocas', 'alargadores', 'ferramentas-perfil']
  },
  'ferramentas-perfil': {
    images: ['/img/ferramentas-perfil-home.jpg', '/img/fresas-circulares-home.jpg', '/img/serras-circulares-home.jpg'],
    related: ['serras-circulares', 'fresas-circulares', 'brocas', 'alargadores']
  },
  'fresas-circulares': {
    images: ['/img/fresas-circulares-home.jpg', '/img/fresas-topo-home.jpg', '/img/serras-circulares-home.jpg'],
    related: ['serras-circulares', 'fresas-topo', 'brocas', 'alargadores']
  },
  'fresas-woodruff': {
    images: ['/img/fresas-woodruff-home.jpg', '/img/fresas-circulares-home.jpg', '/img/fresas-topo-home.jpg'],
    related: ['fresas-circulares', 'fresas-topo', 'brocas', 'alargadores']
  },
  'puncoes': {
    images: ['/img/puncoes-home-en.jpg', '/img/prod-puncoes.jpg', '/img/brocas-home.jpg'],
    related: ['brocas', 'ferramentas-perfil', 'fresas-circulares', 'serras-circulares']
  },
  'brocas-alargadoras': {
    images: ['/img/brocas-alargadoras-home.jpg', '/img/alargador-home.jpg', '/img/brocas-home.jpg'],
    related: ['brocas', 'alargadores', 'fresas-topo', 'ferramentas-perfil']
  },
}

export const productTexts = {
  pt: {
    'brocas': {
      badge: 'Brocas',
      title: 'Brocas',
      description: 'Brocas de alta performance com geometria otimizada para diversos materiais.',
      tabs: [
        { id: 'helicoidais', title: 'Brocas Helicoidais', items: [
          'Design helicoidal otimizado para evacuação de cavacos',
          'Ângulo de hélice para máxima performance',
          'Disponível em diversas dimensões e comprimentos',
        ]},
        { id: 'tecnicas', title: 'Características Técnicas', items: [
          'HSS e Metal Duro', 'Opções com ou sem refrigeração interna', 'Revestimentos: TiN, TiAlN, TiCN, DLC'
        ]},
        { id: 'aplicacoes', title: 'Aplicações', items: [
          'Automotiva: blocos, transmissão, suspensão', 'Aeroespacial: ligas especiais, turbinas, estruturas'
        ]}
      ]
    },
    'fresas-topo': {
      badge: 'Fresas', title: 'Fresas de Topo', description: 'Versatilidade para contornos, canais e acabamento com alta qualidade.',
      tabs: [
        { id: 'especificacoes', title: 'Especificações', items: ['2-4 Cortes', 'HSS-Co', 'AlTiN'] },
        { id: 'tecnicas', title: 'Características Técnicas', items: ['Geometria otimizada', 'Acabamento superior'] },
        { id: 'aplicacoes', title: 'Aplicações', items: ['Moldes e matrizes', 'Usinagem geral'] }
      ]
    },
    'alargadores': {
      badge: 'Alargadores', title: 'Alargadores de Precisão', description: 'Acabamento de furos com tolerâncias H7 e excelente precisão.',
      tabs: [
        { id: 'especificacoes', title: 'Especificações', items: ['Ø 3-20mm', 'DIN 212'] },
        { id: 'tecnicas', title: 'Características Técnicas', items: ['6-12 canais', 'Material HSS'] },
        { id: 'aplicacoes', title: 'Aplicações', items: ['Montagem de precisão', 'Automotiva'] }
      ]
    },
    'micro-brocas': { badge: 'Brocas', title: 'Micro Brocas', description: 'Soluções para micro usinagem de alta precisão.', tabs: [ {id:'especificacoes', title:'Especificações', items:['Diâmetros reduzidos', 'Materiais especiais']} ] },
    'serras-circulares': { badge: 'Serras', title: 'Serras Circulares', description: 'Corte preciso e durável em diversos materiais.', tabs: [ {id:'especificacoes', title:'Especificações', items:['Ø 63-315mm','DIN 1837']} ] },
    'ferramentas-perfil': { badge: 'Especiais', title: 'Ferramentas de Perfil', description: 'Soluções customizadas conforme desenho.', tabs: [ {id:'especificacoes', title:'Especificações', items:['Sob desenho','Geometria dedicada']} ] },
    'fresas-circulares': { badge: 'Fresas', title: 'Fresas Circulares', description: 'Ranhuramento e corte circular de precisão.', tabs: [ {id:'especificacoes', title:'Especificações', items:['DIN 885']} ] },
    'fresas-woodruff': { badge: 'Fresas', title: 'Fresas Woodruff', description: 'Para rasgos de chaveta tipo meia-lua.', tabs: [ {id:'especificacoes', title:'Especificações', items:['Ø 13-32mm','DIN 850']} ] },
    'puncoes': { badge: 'Especiais', title: 'Punções', description: 'Ferramentas especiais para marcação e perfuração.', tabs: [ {id:'especificacoes', title:'Especificações', items:['Sob medida']} ] },
    'brocas-alargadoras': { badge: 'Alargadores', title: 'Brocas Alargadoras', description: 'Duas operações em uma única ferramenta.', tabs: [ {id:'especificacoes', title:'Especificações', items:['Ø 4-16mm']} ] },
  },
  en: {
    'brocas': { badge: 'Drills', title: 'Drills', description: 'High-performance drills with optimized geometry.', tabs: [ {id:'specs', title:'Specifications', items:['Helical design','Various dimensions']} ] },
    'fresas-topo': { badge: 'Mills', title: 'Endmills', description: 'Versatile for contouring, slots and finishing.', tabs: [ {id:'specs', title:'Specifications', items:['2-4 Flute','HSS-Co','AlTiN']} ] },
    'alargadores': { badge: 'Reamers', title: 'Reamers', description: 'H7 tolerance hole finishing.', tabs: [ {id:'specs', title:'Specifications', items:['Ø 3-20mm','DIN 212']} ] },
    'micro-brocas': { badge: 'Drills', title: 'Micro Drills', description: 'Precision for micro machining.', tabs: [ {id:'specs', title:'Specifications', items:['Small diameters']} ] },
    'serras-circulares': { badge: 'Saws', title: 'Carbide Circular Saws', description: 'Clean and precise cutting.', tabs: [ {id:'specs', title:'Specifications', items:['Ø 63-315mm','DIN 1837']} ] },
    'ferramentas-perfil': { badge: 'Special', title: 'Grooving Tools', description: 'Custom profiles per drawing.', tabs: [ {id:'specs', title:'Specifications', items:['Custom']} ] },
    'fresas-circulares': { badge: 'Mills', title: 'Circular Cutters', description: 'Precision circular milling.', tabs: [ {id:'specs', title:'Specifications', items:['DIN 885']} ] },
    'fresas-woodruff': { badge: 'Mills', title: 'Woodruff Cutters', description: 'Keyway half-moon slots.', tabs: [ {id:'specs', title:'Specifications', items:['Ø 13-32mm','DIN 850']} ] },
    'puncoes': { badge: 'Special', title: 'Punches', description: 'Special marking and punching tools.', tabs: [ {id:'specs', title:'Specifications', items:['Custom']} ] },
    'brocas-alargadoras': { badge: 'Reamers', title: 'Reamer Drills', description: 'Drilling + reaming in one tool.', tabs: [ {id:'specs', title:'Specifications', items:['Ø 4-16mm']} ] },
  },
  es: {
    'brocas': { badge: 'Brocas', title: 'Brocas', description: 'Brocas de alto rendimiento con geometría optimizada.', tabs: [ {id:'especificaciones', title:'Especificaciones', items:['Diseño helicoidal','Varias dimensiones']} ] },
    'fresas-topo': { badge: 'Fresas', title: 'Fresas de Extremo', description: 'Versátiles para contornos, ranuras y acabado.', tabs: [ {id:'especificaciones', title:'Especificaciones', items:['2-4 Cortes','HSS-Co','AlTiN']} ] },
    'alargadores': { badge: 'Escariadores', title: 'Escariadores', description: 'Acabado de agujeros con tolerancia H7.', tabs: [ {id:'especificaciones', title:'Especificaciones', items:['Ø 3-20mm','DIN 212']} ] },
    'micro-brocas': { badge: 'Brocas', title: 'Micro Brocas', description: 'Precisión para micro mecanizado.', tabs: [ {id:'especificaciones', title:'Especificaciones', items:['Diámetros pequeños']} ] },
    'serras-circulares': { badge: 'Sierras', title: 'Sierras Circulares', description: 'Corte limpio y preciso.', tabs: [ {id:'especificaciones', title:'Especificaciones', items:['Ø 63-315mm','DIN 1837']} ] },
    'ferramentas-perfil': { badge: 'Especiales', title: 'Herramientas de Perfil', description: 'Perfiles personalizados según plano.', tabs: [ {id:'especificaciones', title:'Especificaciones', items:['Personalizado']} ] },
    'fresas-circulares': { badge: 'Fresas', title: 'Fresas Circulares', description: 'Fresado circular de precisión.', tabs: [ {id:'especificaciones', title:'Especificaciones', items:['DIN 885']} ] },
    'fresas-woodruff': { badge: 'Fresas', title: 'Fresas Woodruff', description: 'Ranuras de chaveta tipo media luna.', tabs: [ {id:'especificaciones', title:'Especificaciones', items:['Ø 13-32mm','DIN 850']} ] },
    'puncoes': { badge: 'Especiales', title: 'Punzones', description: 'Herramientas especiales para marcado y perforación.', tabs: [ {id:'especificaciones', title:'Especificaciones', items:['A medida']} ] },
    'brocas-alargadoras': { badge: 'Escariadores', title: 'Brocas Escariadoras', description: 'Perforación + escariado en una herramienta.', tabs: [ {id:'especificaciones', title:'Especificaciones', items:['Ø 4-16mm']} ] },
  }
}
