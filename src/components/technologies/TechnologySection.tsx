import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ContainerIcon, DatabaseIcon, LayersIcon, ServerIcon, SparklesIcon, type LucideIcon } from 'lucide-react'
import { content, type TechGroupId } from '../../data/content'
import { getProjects } from '../../data/projects'
import { useI18n } from '../../i18n/context'
import { SectionHeader } from '../layout/SectionHeader'
import { Reveal } from '../ui/Reveal'

const EASE = [0.16, 1, 0.3, 1] as const

const icons: Record<TechGroupId, LucideIcon> = {
  backend: ServerIcon,
  data: DatabaseIcon,
  infra: ContainerIcon,
  engineering: LayersIcon,
  exploration: SparklesIcon,
}

type Hovered = { key: string; label: string }

export function TechnologySection() {
  const { lang, t } = useI18n()
  const [hovered, setHovered] = useState<Hovered | null>(null)
  const projects = getProjects(lang)
  // Hovering a tool reveals the projects (by tag) where it was actually used.
  const usedIn = (key: string) => projects.filter((p) => p.tags.includes(key)).map((p) => p.title)
  const related = hovered ? usedIn(hovered.key) : []

  return (
    <section id="tecnologias" aria-labelledby="tech-title" className="relative border-t border-line py-24 md:py-36">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionHeader index="04" label={t.tech.label} />
            <h2 id="tech-title" className="mt-6 max-w-[18ch] text-[clamp(2.25rem,5.4vw,4.75rem)] leading-[0.98] font-semibold">
              {t.tech.title} <span className="text-muted">{t.tech.titleMuted}</span>
            </h2>
          </div>
          <Reveal delay={0.2} className="self-end lg:col-span-4">
            <p className="leading-relaxed text-muted">{t.tech.intro}</p>
            <p aria-live="polite" className="mt-4 min-h-5 font-mono text-[11px] text-accent-2">
              <AnimatePresence mode="wait">
                {hovered && (
                  <motion.span
                    key={hovered.key}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="inline-block"
                  >
                    {hovered.label} →{' '}
                    {related.length ? related.join(' · ') : <span className="text-dim">{t.tech.notUsed}</span>}
                  </motion.span>
                )}
              </AnimatePresence>
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-px border-y border-line bg-line sm:grid-cols-3 md:mt-24 lg:grid-cols-5">
          {content[lang].techGroups.map((g, gi) => {
            const Icon = icons[g.id]
            return (
              <Reveal
                key={g.id}
                delay={gi * 0.08}
                className="group/col relative bg-ink px-4 py-8 last:col-span-2 sm:px-6 lg:py-10 lg:last:col-span-1"
              >
                {/* Accent line grows on column hover */}
                <span
                  aria-hidden
                  className="absolute top-0 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-700 ease-out-expo group-hover/col:scale-x-100"
                />
                <Icon size={20} strokeWidth={1.4} className="text-muted transition-colors group-hover/col:text-accent-2" aria-hidden />
                <h3 className="mt-6 font-mono text-[11px] tracking-[0.16em] text-fg uppercase">{g.label}</h3>
                <ul className="mt-5 space-y-2.5">
                  {g.items.map((item) => {
                    const isHovered = hovered?.key === item.key
                    return (
                      <li key={item.key}>
                        <button
                          type="button"
                          onMouseEnter={() => setHovered(item)}
                          onMouseLeave={() => setHovered(null)}
                          onFocus={() => setHovered(item)}
                          onBlur={() => setHovered(null)}
                          className={`flex items-center gap-2 text-left text-[15px] transition-colors duration-300 ${
                            isHovered ? 'text-fg' : 'text-muted hover:text-fg'
                          }`}
                        >
                          <motion.span
                            aria-hidden
                            className={`h-px shrink-0 bg-accent ${isHovered ? 'w-4' : 'w-0'}`}
                            layout
                            transition={{ duration: 0.4, ease: EASE }}
                          />
                          {item.label}
                          {usedIn(item.key).length > 0 && (
                            <span aria-hidden className="size-1 shrink-0 rounded-full bg-accent/60" />
                          )}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </Reveal>
            )
          })}
        </div>
        <p className="mt-6 flex items-center gap-2 font-mono text-[10px] text-dim">
          <span aria-hidden className="size-1 rounded-full bg-accent/60" /> {t.tech.legend}
        </p>
      </div>
    </section>
  )
}
