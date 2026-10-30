import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowUpRightIcon } from 'lucide-react'
import type { Project } from '../../data/projects'
import { ProjectVisual } from './ProjectVisuals'
import { useI18n } from '../../i18n/context'

const EASE = [0.16, 1, 0.3, 1] as const

type Props = { project: Project; featured?: boolean }

export function ProjectCard({ project, featured = false }: Props) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // Subtle parallax of the visual inside its frame.
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  const { t } = useI18n()
  const headingId = `project-${project.id}`
  const external = project.href?.startsWith('http')

  return (
    <article
      ref={ref}
      aria-labelledby={headingId}
      className={`group relative grid gap-6 ${featured ? 'lg:grid-cols-12 lg:gap-10' : ''}`}
    >
      {/* Visual */}
      <motion.div
        className={`relative overflow-hidden rounded-[3px] border border-line bg-ink-2 ${
          featured ? 'aspect-[16/10] lg:col-span-7' : 'aspect-[16/11]'
        }`}
        initial={{ clipPath: 'inset(12% 0 12% 0)', opacity: 0 }}
        whileInView={{ clipPath: 'inset(0% 0 0% 0)', opacity: 1 }}
        viewport={{ once: true, margin: '0px 0px -15% 0px' }}
        transition={{ duration: 1.3, ease: EASE }}
      >
        <motion.div
          style={{ y }}
          className="absolute -inset-y-[7%] inset-x-0 transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.045]"
        >
          <ProjectVisual project={project} />
        </motion.div>

        {/* Corner index + crosshair marks */}
        <span className="absolute top-3 left-3 rounded-sm bg-ink/70 px-1.5 py-0.5 font-mono text-[10px] tracking-[0.2em] text-muted">
          {project.index} / {project.visual.toUpperCase()}
        </span>
        <span aria-hidden className="absolute top-3 right-3 size-2 border-t border-r border-fg/40" />
        {project.visual === 'mallas' && !project.screenshot && (
          <span className="absolute bottom-3 left-3 rounded-sm border border-line bg-ink/80 px-2 py-1 font-mono text-[10px] tracking-wide text-muted backdrop-blur">
            {t.projects.placeholder}
          </span>
        )}
        <span aria-hidden className="absolute right-3 bottom-3 size-2 border-r border-b border-fg/40" />
      </motion.div>

      {/* Copy */}
      <div className={featured ? 'flex flex-col lg:col-span-5' : 'flex flex-col'}>
        <div className="flex items-start gap-5">
          <span
            aria-hidden
            className="relative block overflow-hidden font-display text-[clamp(3rem,6vw,5.5rem)] leading-[0.8] font-bold tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(240,242,246,0.28)]"
          >
            <motion.span
              className="block"
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
            >
              {project.index}
            </motion.span>
            {/* Filled numeral sweeps in on hover */}
            <span className="absolute inset-0 text-accent [-webkit-text-stroke:0] [clip-path:inset(100%_0_0_0)] transition-[clip-path] duration-700 ease-out-expo group-hover:[clip-path:inset(0_0_0_0)]">
              {project.index}
            </span>
          </span>
          <div className="pt-1">
            <p className="font-mono text-[11px] tracking-wide text-accent-2">{project.org}</p>
            <h3 id={headingId} className="mt-2 text-[clamp(1.6rem,2.6vw,2.4rem)] leading-none font-semibold">
              {project.title}
            </h3>
          </div>
        </div>

        <p className="mt-5 max-w-[48ch] leading-relaxed text-muted">{project.summary}</p>

        <dl className={`mt-6 grid gap-x-6 gap-y-4 border-t border-line pt-5 text-sm ${featured ? 'sm:grid-cols-2' : ''}`}>
          {[
            [t.projects.fields.problem, project.problem],
            [t.projects.fields.contribution, project.contribution],
            [t.projects.fields.decisions, project.decisions.join(' · ')],
            [t.projects.fields.result, project.result],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="mono-label !text-[10px] text-dim">{k}</dt>
              <dd className="mt-1.5 leading-relaxed text-fg/85">{v}</dd>
            </div>
          ))}
        </dl>

        <ul className="mt-6 flex flex-wrap gap-1.5" aria-label={t.projects.techList}>
          {project.tags.map((t, i) => (
            <li
              key={t}
              className="rounded-sm border border-line px-2 py-1 font-mono text-[10px] text-muted transition-[border-color,color,transform] duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:border-accent/40 group-hover:text-fg"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-x-8 gap-y-3 pt-7">
          {featured && (
            <a href="#caso-mallas" className="link-line text-sm font-medium text-fg">
              {t.projects.caseStudy}
            </a>
          )}
          {project.href ? (
            <a
              href={project.href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="link-line text-sm font-medium text-accent-2 hover:text-fg"
            >
              {project.linkLabel}
              {external ? (
                <ArrowUpRightIcon size={15} className="transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              ) : (
                <span aria-hidden>↓</span>
              )}
              <span className="sr-only">
                : {project.title} {external && t.newTab}
              </span>
            </a>
          ) : null}
          {project.linkNote && (
            <span className="font-mono text-[11px] tracking-wide text-dim">{project.linkNote}</span>
          )}
        </div>
      </div>
    </article>
  )
}
