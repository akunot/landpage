import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { ArrowUpRightIcon } from 'lucide-react'
import { getProjects } from '../../data/projects'
import { useI18n } from '../../i18n/context'
import { ButtonLink } from '../ui/Button'
import { Reveal, SplitText } from '../ui/Reveal'
import { MallasVisual } from './ProjectVisuals'

const EASE = [0.16, 1, 0.3, 1] as const

export function FeaturedProject() {
  const { lang, t } = useI18n()
  const mallas = getProjects(lang)[0]
  const url = mallas.href!
  const listRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 55%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <section
      id="caso-mallas"
      aria-labelledby="featured-title"
      className="relative overflow-hidden border-t border-line bg-ink-2 py-24 md:py-36"
    >
      <div className="tech-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div className="shell relative grid gap-14 lg:grid-cols-12 lg:gap-10">
        {/* Left — identity */}
        <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <p className="mono-label">
            <span className="text-accent-2">01</span> / {t.featured.label}
          </p>
          <SplitText
            id="featured-title"
            text={mallas.title}
            className="mt-6 text-[clamp(2.6rem,5vw,4.5rem)] leading-[0.95] font-bold"
          />
          <Reveal delay={0.15}>
            <p className="mt-3 text-lg text-muted">{mallas.org}</p>
            <p className="mt-8 max-w-[40ch] leading-relaxed text-fg/85">
              {t.featured.descBefore}
              <span className="text-fg underline decoration-accent decoration-1 underline-offset-4">
                {t.featured.descHighlight}
              </span>
              .
            </p>
            <div className="mt-10">
              <ButtonLink href={url} icon={<ArrowUpRightIcon size={16} />}>
                {t.featured.cta}
                <span className="sr-only"> {t.newTab}</span>
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        {/* Middle — case study progression */}
        <div className="relative lg:col-span-3">
          <div aria-hidden className="absolute top-2 bottom-2 left-[3px] w-px bg-line" />
          <motion.div
            aria-hidden
            style={{ scaleY: progress }}
            className="absolute top-2 bottom-2 left-[3px] w-px origin-top bg-accent"
          />
          <ol ref={listRef} className="space-y-12 pl-8">
            {t.featured.details.map((d, i) => (
              <motion.li
                key={d.k}
                className="relative"
                initial={{ opacity: 0.25, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ margin: '0px 0px -40% 0px' }}
                transition={{ duration: 0.8, ease: EASE }}
              >
                <span aria-hidden className="absolute top-1.5 -left-8 size-[7px] rounded-full border border-accent bg-ink-2" />
                <h3 className="font-mono text-[11px] tracking-[0.16em] text-accent-2 uppercase">
                  <span className="text-dim">0{i + 1} — </span>
                  {d.k}
                </h3>
                <p className="mt-2 leading-relaxed text-fg/85">{d.v}</p>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* Right — screenshot (or labelled placeholder) */}
        <Reveal delay={0.1} className="lg:col-span-5">
          <figure>
            <div className="group relative overflow-hidden rounded-[4px] border border-line bg-ink shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
              <div className="flex items-center gap-2 border-b border-line px-4 py-3">
                <span className="size-2 rounded-full bg-fg/15" />
                <span className="size-2 rounded-full bg-fg/15" />
                <span className="size-2 rounded-full bg-fg/15" />
                <span className="ml-3 truncate font-mono text-[10px] text-dim">mallacurricular.manizales.unal.edu.co</span>
              </div>
              <div className="aspect-[4/3] overflow-hidden">
                <div className="h-full w-full transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.03]">
                  <MallasVisual project={mallas} placeholder={t.projects.placeholder} />
                </div>
              </div>
            </div>
            <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-muted">
              <a href={url} target="_blank" rel="noopener noreferrer" className="link-line hover:text-fg">
                mallacurricular.manizales.unal.edu.co
                <ArrowUpRightIcon size={13} />
                <span className="sr-only">{t.newTab}</span>
              </a>
              {!mallas.screenshot && <span className="text-dim">{t.featured.reserved}</span>}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}
