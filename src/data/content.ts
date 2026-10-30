// Philosophy, research, technologies and "now" content, per language.
import type { Lang } from '../i18n/context'

export type Publication = {
  topic: string
  /** Papers keep their original (English) title in both languages. */
  title: string
  /** Conference or journal; `null` when not yet known. */
  venue: string | null
  authors: string
  year: string
  /** Public URL (DOI, proceedings, PDF). `null` = no public link yet. */
  href: string | null
  /** Shown while the paper is not yet published; set to `null` once it is. */
  status: string | null
}

// Authors listed in the order printed on each paper.
const PUBLICATIONS = (lang: Lang): Publication[] => [
  {
    topic: lang === 'es' ? 'Redes de citación · Tree of Science' : 'Citation networks · Tree of Science',
    title:
      'Scalable Structural Classification of Citation Networks: An Implementation Framework for Knowledge Discovery',
    venue:
      lang === 'es'
        ? 'CCC — 20.º Congreso Colombiano de Computación'
        : 'CCC — 20th Colombian Computing Conference',
    authors: 'Sergio Alejandro Castro Botero, Néstor Darío Duque Méndez',
    year: '2026',
    href: null,
    status: lang === 'es' ? 'Pendiente de publicación' : 'Awaiting publication',
  },
  {
    topic: lang === 'es' ? 'Desarrollo asistido por IA' : 'AI-assisted development',
    title:
      'An Agentic AI-Assisted Development Environment for Building Quality Software: Model Configuration, Skills, Plugins, and MCP Servers',
    venue: 'IBERAMIA',
    authors: 'Néstor Darío Duque Méndez, Brayan David Collazos Escobedo, Sergio Alejandro Castro Botero',
    year: '2026',
    href: null,
    status: lang === 'es' ? 'Pendiente de publicación' : 'Awaiting publication',
  },
]

export type TechGroupId = 'backend' | 'data' | 'infra' | 'engineering' | 'exploration'

/** `key` matches project tags (src/data/projects.ts); `label` is what is displayed. */
type TechItem = { key: string; label: string }

const shared = (keys: string[]): TechItem[] => keys.map((k) => ({ key: k, label: k }))

type Content = {
  philosophy: { n: string; title: string; body: string }[]
  researchLines: { title: string; body: string }[]
  publications: Publication[]
  techGroups: { id: TechGroupId; label: string; items: TechItem[] }[]
  nowUpdated: string
  now: { text: string; active: boolean }[]
}

const es: Content = {
  philosophy: [
    {
      n: '01',
      title: 'Entender antes de construir',
      body: 'Comprender el problema vale más que apresurarse a implementar.',
    },
    {
      n: '02',
      title: 'La arquitectura es cuestión de decisiones',
      body: 'La buena arquitectura no consiste en añadir más capas o patrones, sino en tomar decisiones que permitan que los sistemas evolucionen.',
    },
    {
      n: '03',
      title: 'La calidad vive bajo la superficie',
      body: 'Seguridad, pruebas, rendimiento y mantenibilidad son partes fundamentales de un producto, aunque los usuarios no puedan verlas.',
    },
    {
      n: '04',
      title: 'La IA es una herramienta. La ingeniería es una responsabilidad.',
      body: 'La inteligencia artificial está cambiando el desarrollo de software, pero los ingenieros siguen siendo responsables de comprender, evaluar y validar lo que construyen.',
    },
    { n: '05', title: 'Iterar siempre', body: 'Construir, cuestionar, aprender y mejorar.' },
  ],
  researchLines: [
    {
      title: 'Redes de citación científica',
      body: 'Procesamiento y análisis estructural de redes de citación con Tree of Science.',
    },
    {
      title: 'Desarrollo asistido por IA',
      body: 'Trabajo académico sobre entornos de desarrollo de software asistidos por IA agéntica.',
    },
    {
      title: 'Eventos de investigación',
      body: 'Participación en eventos de investigación en computación, como el 20.º Congreso Colombiano de Computación (CCC).',
    },
  ],
  publications: PUBLICATIONS('es'),
  techGroups: [
    { id: 'backend', label: 'Backend', items: shared(['PHP', 'Laravel', 'Python', 'Django', 'Flask']) },
    { id: 'data', label: 'Datos', items: shared(['MySQL', 'PostgreSQL', 'Redis']) },
    { id: 'infra', label: 'Infraestructura', items: shared(['Docker', 'Linux', 'Jenkins']) },
    {
      id: 'engineering',
      label: 'Ingeniería',
      items: [
        { key: 'REST', label: 'APIs REST' },
        { key: 'Testing', label: 'Pruebas automatizadas' },
        { key: 'architecture', label: 'Arquitectura de software' },
        { key: 'performance', label: 'Optimización de rendimiento' },
      ],
    },
    {
      id: 'exploration',
      label: 'Exploración',
      items: [
        { key: 'Agentic AI', label: 'IA agéntica' },
        { key: 'MCP', label: 'MCP' },
        { key: 'Tooling', label: 'Herramientas para desarrolladores' },
      ],
    },
  ],
  // Actualiza `nowUpdated` cada vez que cambie esta lista. `active` = foco principal actual.
  nowUpdated: 'Octubre 2026',
  now: [
    { text: 'Consolidando mis habilidades de ingeniería backend.', active: true },
    { text: 'Explorando arquitectura y calidad de software.', active: true },
    { text: 'Investigando el desarrollo de software asistido por IA.', active: true },
    { text: 'Preparando el despliegue de Tree of Science.', active: true },
    { text: 'Construyendo y mejorando aplicaciones reales.', active: false },
    { text: 'Aprendiendo y experimentando con nuevas tecnologías.', active: false },
  ],
}

const en: Content = {
  philosophy: [
    {
      n: '01',
      title: 'Understand before building',
      body: 'Understanding the problem is more valuable than rushing into implementation.',
    },
    {
      n: '02',
      title: 'Architecture is about decisions',
      body: 'Good architecture is not about adding more layers or patterns. It is about making decisions that allow systems to evolve.',
    },
    {
      n: '03',
      title: 'Quality lives beneath the surface',
      body: 'Security, testing, performance and maintainability are fundamental parts of a product, even when users cannot see them.',
    },
    {
      n: '04',
      title: 'AI is a tool. Engineering is a responsibility.',
      body: 'Artificial intelligence is changing software development, but engineers remain responsible for understanding, evaluating and validating what they build.',
    },
    { n: '05', title: 'Always iterate', body: 'Build, question, learn and improve.' },
  ],
  researchLines: [
    {
      title: 'Scientific citation networks',
      body: 'Processing and structural analysis of citation networks with Tree of Science.',
    },
    {
      title: 'AI-assisted development',
      body: 'Academic work on agentic AI-assisted software development environments.',
    },
    {
      title: 'Research events',
      body: 'Participation in computing research events, such as the 20th Colombian Computing Conference (CCC).',
    },
  ],
  publications: PUBLICATIONS('en'),
  techGroups: [
    { id: 'backend', label: 'Backend', items: shared(['PHP', 'Laravel', 'Python', 'Django', 'Flask']) },
    { id: 'data', label: 'Data', items: shared(['MySQL', 'PostgreSQL', 'Redis']) },
    { id: 'infra', label: 'Infrastructure', items: shared(['Docker', 'Linux', 'Jenkins']) },
    {
      id: 'engineering',
      label: 'Engineering',
      items: [
        { key: 'REST', label: 'REST APIs' },
        { key: 'Testing', label: 'Automated testing' },
        { key: 'architecture', label: 'Software architecture' },
        { key: 'performance', label: 'Performance optimization' },
      ],
    },
    {
      id: 'exploration',
      label: 'Exploration',
      items: [
        { key: 'Agentic AI', label: 'Agentic AI' },
        { key: 'MCP', label: 'MCP' },
        { key: 'Tooling', label: 'Developer tooling' },
      ],
    },
  ],
  nowUpdated: 'October 2026',
  now: [
    { text: 'Consolidating my backend engineering skills.', active: true },
    { text: 'Exploring software architecture and quality.', active: true },
    { text: 'Investigating AI-assisted software development.', active: true },
    { text: 'Preparing Tree of Science for deployment.', active: true },
    { text: 'Building and improving real-world applications.', active: false },
    { text: 'Learning and experimenting with new technologies.', active: false },
  ],
}

export const content: Record<Lang, Content> = { es, en }
