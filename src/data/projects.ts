// Project content. Only facts provided by Sergio — no invented metrics or responsibilities.
import type { Lang } from '../i18n/context'

type ProjectText = {
  title: string
  org: string
  summary: string
  problem: string
  contribution: string
  decisions: string[]
  result: string
  /** Label for the external link (when `href` is set). */
  linkLabel?: string
  /** Shown when there is no public link. */
  linkNote?: string
  /** Alt text for `screenshot`. */
  screenshotAlt?: string
}

type ProjectSource = {
  id: string
  index: string
  tags: string[]
  href?: string
  visual: 'mallas' | 'network' | 'agents'
  /** Path to a real screenshot in /public. Leave undefined to show the labelled placeholder. */
  screenshot?: string
  /** Which part of the screenshot stays visible when the frame crops it. Default: top. */
  screenshotPosition?: 'top' | 'center'
} & Record<Lang, ProjectText>

export type Project = Omit<ProjectSource, Lang> & ProjectText

const sources: ProjectSource[] = [
  {
    id: 'mallas',
    index: '01',
    tags: ['Laravel', 'MySQL', 'Redis', 'Docker', 'Testing'],
    href: 'https://mallacurricular.manizales.unal.edu.co/',
    visual: 'mallas',
    screenshot: '/projects/mallas.webp',
    es: {
      title: 'Proyecto Mallas',
      org: 'Universidad Nacional de Colombia',
      summary: 'Plataforma web para la consulta y gestión de mallas curriculares universitarias.',
      problem:
        'Consultar y gestionar la estructura curricular de los programas académicos de forma clara y accesible.',
      contribution:
        'Desarrollo full-stack, modelado de datos, pruebas automatizadas, despliegue, mantenimiento y comunicación con los interesados.',
      decisions: [
        'Laravel como base de la aplicación',
        'Redis en la capa de datos',
        'Docker para entornos y despliegue',
        'Pruebas automatizadas',
      ],
      result: 'Pasó de ser una iniciativa académica a una aplicación de acceso público.',
      linkLabel: 'Ver proyecto',
      screenshotAlt:
        'Captura de pantalla de la página de inicio de Mallas Curriculares, Universidad Nacional de Colombia, Sede Manizales.',
    },
    en: {
      title: 'Proyecto Mallas',
      org: 'Universidad Nacional de Colombia',
      summary: 'A web platform for consulting and managing university curricular structures.',
      problem: 'Consulting and managing the curricular structure of academic programs in a clear, accessible way.',
      contribution:
        'Full-stack development, database modeling, automated testing, deployment, maintenance and stakeholder communication.',
      decisions: [
        'Laravel as the application foundation',
        'Redis in the data layer',
        'Docker for environments and deployment',
        'Automated testing',
      ],
      result: 'Moved from an academic initiative to a publicly accessible application.',
      linkLabel: 'View project',
      screenshotAlt:
        'Screenshot of the Mallas Curriculares home page, Universidad Nacional de Colombia, Manizales campus.',
    },
  },
  {
    id: 'tree-of-science',
    index: '02',
    tags: ['Python', 'Django', 'DRF', 'NetworkX', 'REST'],
    // The repository is private: link to the paper instead.
    href: '#investigacion',
    visual: 'network',
    // Captured from the local build (not deployed yet): a generated tree with its classified articles.
    screenshot: '/projects/tree-of-science.webp',
    screenshotPosition: 'center',
    es: {
      title: 'Tree of Science',
      org: 'Investigación · Universidad Nacional de Colombia',
      summary:
        'Plataforma para procesar, clasificar estructuralmente y visualizar redes de citación científica según la metáfora raíz–tronco–hojas.',
      problem:
        'Las bases bibliográficas (Web of Science, Scopus, gestores de referencias) exportan en formatos incompatibles, y la deduplicación difusa ingenua escala de forma cuadrática.',
      contribution:
        'Inicié y desarrollé la plataforma en solitario; después se unió el desarrollador José Miguel López Zuluaga. Trabajo en backend, APIs REST, procesamiento de datos y análisis de grafos.',
      decisions: [
        'Ingesta multiformato (WoS, Scopus CSV, BibTeX, RIS) hacia un esquema común',
        'Deduplicación por bloques con similitud Jaro-Winkler y Union-Find',
        'Clasificación estructural de raíces, tronco y hojas con NetworkX',
        'API con Django + Django REST Framework',
      ],
      result:
        'Funciona en entorno local y su despliegue está próximo. El framework de clasificación se documenta en un artículo de investigación.',
      linkLabel: 'Ver artículo',
      linkNote: 'Repositorio privado',
      screenshotAlt:
        'Captura de Tree of Science: un árbol generado a partir de 90 artículos, con hojas, tronco y raíces, junto a la lista de artículos clasificados por relevancia.',
    },
    en: {
      title: 'Tree of Science',
      org: 'Research · Universidad Nacional de Colombia',
      summary:
        'A platform for processing, structurally classifying and visualizing scientific citation networks using the root–trunk–leaf metaphor.',
      problem:
        'Bibliographic databases (Web of Science, Scopus, reference managers) export incompatible formats, and naive fuzzy deduplication scales quadratically.',
      contribution:
        'I started and built the platform on my own; developer José Miguel López Zuluaga joined later. Backend work, REST APIs, data processing and graph analysis.',
      decisions: [
        'Multi-format ingestion (WoS, Scopus CSV, BibTeX, RIS) into a common schema',
        'Blocked deduplication with Jaro-Winkler similarity and Union-Find',
        'Root, trunk and leaf structural classification with NetworkX',
        'API built with Django + Django REST Framework',
      ],
      result:
        'Running locally, with deployment coming soon. The classification framework is documented in a research paper.',
      linkLabel: 'Read the paper',
      linkNote: 'Private repository',
      screenshotAlt:
        'Tree of Science screenshot: a tree generated from 90 articles, showing leaves, trunk and roots next to the list of articles ranked by relevance.',
    },
  },
  {
    id: 'ai-assisted',
    index: '03',
    tags: ['Agentic AI', 'MCP', 'Skills', 'Plugins', 'Tooling'],
    href: '#investigacion',
    visual: 'agents',
    es: {
      title: 'Desarrollo asistido por IA',
      org: 'Investigación académica · IBERAMIA',
      summary:
        'Un entorno de desarrollo asistido por IA agéntica, orientado a construir software de calidad: configuración de modelos, Skills, Plugins y servidores MCP.',
      problem:
        'Usar un LLM como simple generador de código produce resultados inconsistentes y de calidad variable.',
      contribution:
        'Coautor del artículo que documenta el entorno y una metodología reproducible, desde la elicitación de requisitos hasta la verificación previa al despliegue.',
      decisions: [
        'Enrutamiento de modelos según la naturaleza de cada tarea',
        'Skills que codifican disciplinas: TDD, depuración sistemática y revisión de código',
        'Plugins con comandos y agentes especializados',
        'Servidores MCP para documentación, navegador, observabilidad y despliegue',
      ],
      result:
        'Artículo de investigación que replantea el rol del modelo: de “autor de código” a orquestador de un proceso de calidad.',
      linkLabel: 'Ver artículo',
    },
    en: {
      title: 'AI-Assisted Software Development',
      org: 'Academic research · IBERAMIA',
      summary:
        'An agentic AI-assisted development environment for building quality software: model configuration, Skills, Plugins and MCP servers.',
      problem: 'Using an LLM as a mere code generator produces inconsistent results of variable quality.',
      contribution:
        'Co-author of the paper documenting the environment and a reproducible methodology, from requirements elicitation to pre-deployment verification.',
      decisions: [
        'Model routing according to the nature of each task',
        'Skills that encode disciplines: TDD, systematic debugging and code review',
        'Plugins bundling commands and specialized agents',
        'MCP servers for documentation, browser, observability and deployment',
      ],
      result:
        'A research paper that reframes the model’s role from “code author” to orchestrator of a quality process.',
      linkLabel: 'Read the paper',
    },
  },
]

const cache = {} as Record<Lang, Project[]>

export function getProjects(lang: Lang): Project[] {
  return (cache[lang] ??= sources.map(({ es, en, ...base }) => ({ ...base, ...(lang === 'es' ? es : en) })))
}
