import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useSpring } from 'motion/react'
import { content } from '../../data/content'
import { site } from '../../data/site'
import { useI18n } from '../../i18n/context'
import { SectionHeader } from '../layout/SectionHeader'
import { Reveal } from '../ui/Reveal'

const EASE = [0.16, 1, 0.3, 1] as const

type Item = { n: string; title: string; body: string }

function Principle({
  item,
  index,
  onActive,
  active,
}: {
  item: Item
  index: number
  onActive: (i: number) => void
  active: boolean
}) {
  const ref = useRef<HTMLLIElement>(null)
  // Active while the row crosses the middle band of the viewport.
  const inBand = useInView(ref, { margin: '-45% 0px -45% 0px' })
  useEffect(() => {
    if (inBand) onActive(index)
  }, [inBand, index, onActive])

  return (
    <li
      ref={ref}
      className={`relative grid grid-cols-[2.5rem_1fr] gap-x-5 py-10 transition-opacity duration-700 md:grid-cols-[6rem_1fr_1fr] md:gap-x-10 md:py-14 ${
        active ? 'opacity-100' : 'opacity-100 md:opacity-35'
      }`}
    >
      {/* Node on the spine */}
      <span
        aria-hidden
        className={`absolute top-[3.15rem] left-[calc(1.25rem-4px)] size-2 rounded-full border transition-colors duration-500 md:top-[4.4rem] md:left-[calc(3rem-4px)] ${
          active ? 'border-accent bg-accent' : 'border-fg/40 bg-ink'
        }`}
      />
      <span className="col-start-1 row-span-2 hidden pt-1 text-right font-mono text-xs text-dim md:block md:pr-14">
        {item.n}
      </span>
      <div className="col-start-2 md:col-start-2">
        <span className="font-mono text-xs text-accent-2 md:hidden">{item.n}</span>
        <h3 className="mt-1 text-[clamp(1.6rem,3.2vw,2.75rem)] leading-[1.02] font-semibold md:mt-0">{item.title}</h3>
      </div>
      <p className="col-start-2 mt-4 max-w-[46ch] leading-relaxed text-muted md:col-start-3 md:mt-1 md:text-lg">
        {item.body}
      </p>
    </li>
  )
}

export function PhilosophySection() {
  const { lang, t } = useI18n()
  const [active, setActive] = useState(0)
  const listRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 50%', 'end 50%'] })
  const spine = useSpring(scrollYProgress, { stiffness: 140, damping: 32 })

  // The signature is shown in the current language, with the other version beneath it.
  const primary = site.signature[lang]
  const secondary = site.signature[lang === 'es' ? 'en' : 'es']
  const splitAt = primary.indexOf('. ') + 1

  return (
    <section id="filosofia" aria-labelledby="philosophy-title" className="relative border-t border-line py-24 md:py-36">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionHeader index="02" label={t.philosophy.label} />
            <h2 id="philosophy-title" className="mt-6 text-[clamp(2.5rem,6.6vw,6rem)] leading-[0.95] font-bold">
              {t.philosophy.titleBefore}{' '}
              <motion.span
                key={lang}
                className="inline-block text-fg"
                initial={{ opacity: 1, filter: 'blur(0px)' }}
                whileInView={{ opacity: 0.2, filter: 'blur(1.5px)' }}
                viewport={{ once: true, margin: '0px 0px -30% 0px' }}
                transition={{ duration: 2.2, ease: EASE, delay: 0.6 }}
              >
                {t.philosophy.titleFaded}
              </motion.span>
            </h2>
          </div>
          <Reveal delay={0.2} className="self-end lg:col-span-4">
            <p className="font-mono text-sm leading-relaxed text-muted">
              {t.philosophy.pillars.map(([k, v]) => (
                <span key={k} className="block">
                  <span className="text-accent-2">{k}</span> — {v}
                </span>
              ))}
            </p>
          </Reveal>
        </div>

        <div className="relative mt-16 md:mt-24">
          <div aria-hidden className="absolute inset-y-0 left-5 w-px bg-line md:left-12" />
          <motion.div
            aria-hidden
            style={{ scaleY: spine }}
            className="absolute inset-y-0 left-5 w-px origin-top bg-gradient-to-b from-accent to-accent-2 md:left-12"
          />
          <ol ref={listRef} className="divide-y divide-line-soft">
            {content[lang].philosophy.map((p, i) => (
              <Principle key={p.n} item={p} index={i} active={active === i} onActive={setActive} />
            ))}
          </ol>
        </div>

        {/* Signature */}
        <Reveal className="mt-24 grid gap-6 border-t border-line pt-14 md:mt-32 lg:grid-cols-12">
          <span className="mono-label lg:col-span-3">{t.philosophy.signature}</span>
          <blockquote className="lg:col-span-9">
            <p lang={lang} className="font-display text-[clamp(1.9rem,4.4vw,3.75rem)] leading-[1.05] font-semibold tracking-tight">
              “{primary.slice(0, splitAt)} <span className="text-muted">{primary.slice(splitAt + 1)}”</span>
            </p>
            <p lang={lang === 'es' ? 'en' : 'es'} className="mt-5 font-mono text-xs text-dim">
              {secondary}
            </p>
            <p className="mt-8 font-mono text-sm text-accent-2" aria-label="build, doubt, improve, repeat">
              {site.loop.join('')} repeat<span className="blink">;</span>
            </p>
          </blockquote>
        </Reveal>
      </div>
    </section>
  )
}
