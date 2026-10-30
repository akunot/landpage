// Interface strings for each language. Long-form content lives in src/data/.

const es = {
  meta: {
    title: 'akunot — Sergio Castro · Desarrollo backend',
    description:
      'Sergio Castro (akunot): desarrollo backend, arquitectura de software e investigación desde Manizales, Colombia. Proyectos, filosofía de ingeniería y stack.',
  },
  nav: {
    aria: 'Principal',
    skip: 'Saltar al contenido',
    open: 'Abrir menú',
    close: 'Cerrar menú',
    menu: 'Navegación',
    labels: {
      proyectos: 'Proyectos',
      filosofia: 'Filosofía',
      investigacion: 'Investigación',
      tecnologias: 'Tecnologías',
      ahora: 'Ahora',
      contacto: 'Contacto',
    },
  },
  lang: { label: 'Idioma', switchTo: 'Ver el portafolio en inglés' },
  newTab: '(abre en una pestaña nueva)',
  hero: {
    role: 'Desarrollo backend / Ingeniería de software',
    headline: 'Construir software es entender sistemas, no solamente escribir código.',
    mutedFrom: 5,
    introBefore: 'Soy ',
    introAfter:
      '. Desarrollo soluciones backend, exploro arquitecturas y me interesa construir software que tenga sentido tanto por dentro como por fuera.',
    ctaProjects: 'Ver proyectos',
    ctaPhilosophy: 'Conocer mi filosofía',
    github: 'GitHub de akunot',
    scroll: 'Bajar a proyectos',
    canvas:
      'Escultura 3D abstracta: marcos cúbicos entrelazados que representan la arquitectura de un sistema, con una esfera orbitando.',
    principles: ['Claridad', 'Estructura', 'Elegancia'],
  },
  projects: {
    label: 'Proyectos seleccionados',
    title: 'Lo que he construido.',
    mutedFrom: 3,
    intro:
      'Soluciones reales, con problemas reales. Para cada proyecto: qué problema aborda, qué aporté, qué decisiones técnicas importaron y cuál fue el resultado.',
    fields: { problem: 'Problema', contribution: 'Aporte', decisions: 'Decisiones', result: 'Resultado' },
    techList: 'Tecnologías',
    caseStudy: 'Ver caso de estudio ↓',
    placeholder: 'Ilustración abstracta · captura real pendiente',
  },
  featured: {
    label: 'Proyecto destacado',
    descBefore:
      'Una plataforma para la consulta y gestión de mallas curriculares universitarias. Un proyecto que pasó de ser una iniciativa académica a convertirse en una ',
    descHighlight: 'plataforma pública',
    cta: 'Visitar proyecto',
    reserved: 'Espacio reservado para captura real',
    details: [
      { k: 'Contexto', v: 'Proyecto académico con uso real dentro de la comunidad universitaria.' },
      { k: 'Mi participación', v: 'Desarrollo full-stack, modelado de base de datos, despliegue y mantenimiento.' },
      { k: 'Tecnologías', v: 'Laravel, Redis, Docker, MySQL y pruebas automatizadas.' },
      { k: 'Resultado', v: 'Una plataforma de acceso público para la información curricular.' },
    ],
  },
  philosophy: {
    label: 'Filosofía de ingeniería',
    titleBefore: 'La buena ingeniería suele ser',
    titleFaded: 'invisible.',
    pillars: [
      ['CLARIDAD', 'entender antes de construir.'],
      ['ESTRUCTURA', 'diseñar sistemas que puedan evolucionar.'],
      ['ELEGANCIA', 'resolver sin complejidad innecesaria.'],
    ],
    signature: 'Firma',
  },
  research: {
    label: 'Investigación',
    title: 'Más allá de la implementación.',
    intro:
      'Mi interés no termina en el código: también está en investigar, experimentar y generar conocimiento sobre cómo se construye el software.',
    pubs: 'Artículos de investigación',
    read: 'Leer',
  },
  tech: {
    label: 'Tecnologías',
    title: 'Las herramientas son una extensión del',
    titleMuted: 'pensamiento.',
    intro:
      'Agrupadas por propósito, no por nivel. Pasa el cursor (o enfoca) una herramienta para ver en qué proyecto la he usado.',
    notUsed: 'exploración / estudio',
    legend: 'usado en un proyecto de esta página',
  },
  now: {
    label: 'Ahora',
    title: 'En qué estoy',
    titleMuted: 'trabajando.',
    focus: 'foco actual',
    updated: 'Actualizado manualmente',
    comment: '# loop de trabajo',
    steps: ['construir', 'cuestionar', 'mejorar'],
    quote: 'Entender antes de construir.',
  },
  contact: {
    label: 'Conectar',
    title: 'El buen software se construye con intención.',
    mutedFrom: 4,
    subtitle: 'Construyamos algo con sentido.',
    pending: 'pendiente',
  },
  footer: {
    tagline: 'Desarrollo backend · Arquitectura de software · Investigación',
    top: 'Volver arriba ↑',
  },
}

export type Dict = typeof es

const en: Dict = {
  meta: {
    title: 'akunot — Sergio Castro · Backend Developer',
    description:
      'Sergio Castro (akunot): backend development, software architecture and research from Manizales, Colombia. Projects, engineering philosophy and stack.',
  },
  nav: {
    aria: 'Main',
    skip: 'Skip to content',
    open: 'Open menu',
    close: 'Close menu',
    menu: 'Navigation',
    labels: {
      proyectos: 'Projects',
      filosofia: 'Philosophy',
      investigacion: 'Research',
      tecnologias: 'Technologies',
      ahora: 'Now',
      contacto: 'Contact',
    },
  },
  lang: { label: 'Language', switchTo: 'Ver el portafolio en español' },
  newTab: '(opens in a new tab)',
  hero: {
    role: 'Backend Developer / Software Engineer',
    headline: 'Building software is understanding systems, not just writing code.',
    mutedFrom: 5,
    introBefore: "I'm ",
    introAfter:
      '. I build backend solutions, explore architectures and care about building software that makes sense both inside and out.',
    ctaProjects: 'See projects',
    ctaPhilosophy: 'Read my philosophy',
    github: "akunot's GitHub",
    scroll: 'Scroll to projects',
    canvas:
      'Abstract 3D sculpture: interlocking cube frames representing a system’s architecture, with an orbiting sphere.',
    principles: ['Clarity', 'Structure', 'Elegance'],
  },
  projects: {
    label: 'Selected projects',
    title: "What I've built.",
    mutedFrom: 2,
    intro:
      'Real solutions to real problems. For each project: the problem it addresses, what I contributed, which technical decisions mattered and what the result was.',
    fields: { problem: 'Problem', contribution: 'Contribution', decisions: 'Decisions', result: 'Result' },
    techList: 'Technologies',
    caseStudy: 'Read the case study ↓',
    placeholder: 'Abstract illustration · real screenshot pending',
  },
  featured: {
    label: 'Featured project',
    descBefore:
      'A platform for consulting and managing university curricula. A project that grew from an academic initiative into a ',
    descHighlight: 'public platform',
    cta: 'Visit project',
    reserved: 'Reserved for a real screenshot',
    details: [
      { k: 'Context', v: 'Academic project in real use within the university community.' },
      { k: 'My contribution', v: 'Full-stack development, database modeling, deployment and maintenance.' },
      { k: 'Technologies', v: 'Laravel, Redis, Docker, MySQL and automated testing.' },
      { k: 'Result', v: 'A publicly accessible platform for curricular information.' },
    ],
  },
  philosophy: {
    label: 'Engineering philosophy',
    titleBefore: 'Good engineering is often',
    titleFaded: 'invisible.',
    pillars: [
      ['CLARITY', 'understand before building.'],
      ['STRUCTURE', 'design systems that can evolve.'],
      ['ELEGANCE', 'solve problems without unnecessary complexity.'],
    ],
    signature: 'Signature',
  },
  research: {
    label: 'Research',
    title: 'Beyond implementation.',
    intro:
      "My interest doesn't end with code: it extends into research, experimentation and creating knowledge about how software gets built.",
    pubs: 'Research papers',
    read: 'Read',
  },
  tech: {
    label: 'Technologies',
    title: 'Tools are an extension of',
    titleMuted: 'thought.',
    intro: 'Grouped by purpose, not by level. Hover (or focus) a tool to see which project I used it in.',
    notUsed: 'exploration / study',
    legend: 'used in a project on this page',
  },
  now: {
    label: 'Now',
    title: "What I'm working",
    titleMuted: 'on.',
    focus: 'current focus',
    updated: 'Updated manually',
    comment: '# work loop',
    steps: ['build', 'question', 'improve'],
    quote: 'Understand before building.',
  },
  contact: {
    label: 'Connect',
    title: 'Good software is built with intention.',
    mutedFrom: 4,
    subtitle: "Let's build something meaningful.",
    pending: 'pending',
  },
  footer: {
    tagline: 'Backend development · Software architecture · Research',
    top: 'Back to top ↑',
  },
}

export const ui = { es, en }
