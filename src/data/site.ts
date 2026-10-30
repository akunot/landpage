// Identity and contact data (language-neutral). Interface strings live in src/i18n/ui.ts.

export const site = {
  handle: 'akunot',
  name: 'Sergio Castro',
  location: 'Manizales, Colombia',
  signature: {
    es: 'El buen código no se oye. Se siente cuando falta.',
    en: "The good code doesn't make noise. You feel it when it's missing.",
  },
  loop: ['<build/>', '<doubt/>', '<improve/>'],
} as const

export const navIds = ['proyectos', 'filosofia', 'investigacion', 'tecnologias', 'ahora', 'contacto'] as const
export type NavId = (typeof navIds)[number]

export type ContactLink = {
  kind: 'github' | 'linkedin' | 'email'
  label: string
  /** Text shown under the label. */
  display: string
  /** `null` = pending: renders as a non-interactive placeholder instead of a link. */
  href: string | null
}

export const contacts: ContactLink[] = [
  { kind: 'github', label: 'GitHub', display: 'github.com/akunot', href: 'https://github.com/akunot' },
  {
    kind: 'linkedin',
    label: 'LinkedIn',
    display: 'in/sergio-alejandro-castro-botero',
    href: 'https://www.linkedin.com/in/sergio-alejandro-castro-botero-76483a379/',
  },
  { kind: 'email', label: 'Email', display: 'castroboteros66@gmail.com', href: 'mailto:castroboteros66@gmail.com' },
]
