import { motion } from 'motion/react'
import { ArrowRightIcon, ArrowDownIcon } from 'lucide-react'
import { HeroVisual } from './HeroVisual'
import { SplitText } from '../ui/Reveal'
import { ButtonLink } from '../ui/Button'
import { GithubIcon } from '../ui/BrandIcons'
import { site } from '../../data/site'
import { useI18n } from '../../i18n/context'

const EASE = [0.16, 1, 0.3, 1] as const

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: EASE, delay },
})

/** Monospace annotation that types itself in. */
function Annotation({ lines, delay, className = '' }: { lines: string[]; delay: number; className?: string }) {
  return (
    <motion.div
      aria-hidden
      className={`font-mono text-[11px] leading-[1.75] text-muted ${className}`}
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.18, delayChildren: delay } } }}
    >
      {lines.map((l) => (
        <motion.div
          key={l}
          variants={{
            hidden: { clipPath: 'inset(0 100% 0 0)' },
            show: { clipPath: 'inset(0 0% 0 0)', transition: { duration: 0.6, ease: 'linear' } },
          }}
        >
          {l}
        </motion.div>
      ))}
    </motion.div>
  )
}

export function HeroSection() {
  const { t } = useI18n()
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-16 md:pt-20">
      <div className="tech-grid pointer-events-none absolute inset-0 -z-10" aria-hidden />

      <div className="shell relative grid min-h-[calc(100svh-4rem)] grid-cols-1 content-center gap-y-6 pb-16 md:min-h-[calc(100svh-5rem)] lg:grid-cols-12 lg:pb-20">
        {/* Visual — top on mobile, right half on desktop */}
        <div className="relative order-1 -mx-5 h-[min(50vh,110vw)] sm:mx-0 lg:absolute lg:inset-y-0 lg:right-0 lg:left-[46%] lg:order-none lg:h-auto">
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/4 bg-gradient-to-t from-ink to-transparent lg:hidden" />
          <HeroVisual label={t.hero.canvas} />

          {/* Technical annotations framing the composition */}
          <Annotation
            lines={[...site.loop.map((l) => `< ${l.slice(1, -2)} />`), 'repeat;']}
            delay={1.1}
            className="absolute top-[10%] right-5 hidden sm:block lg:right-10 lg:text-fg/80 xl:right-16"
          />
          <motion.ul
            aria-hidden
            className="absolute top-[38%] right-5 hidden space-y-2 border-t border-line pt-4 font-mono text-[10px] tracking-[0.22em] text-muted uppercase sm:block lg:right-10 xl:right-16"
            {...fade(1.6)}
          >
            {t.hero.principles.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </motion.ul>
          <motion.span
            aria-hidden
            className="absolute bottom-[10%] right-5 hidden font-mono text-[10px] tracking-[0.2em] text-dim sm:block lg:right-10 xl:right-16"
            {...fade(1.8)}
          >
            // SYSTEMS&nbsp;&nbsp;<span className="text-muted">001</span>
          </motion.span>
          <motion.span
            aria-hidden
            className="absolute top-[6%] left-[8%] hidden font-mono text-[10px] text-dim lg:block"
            {...fade(1.9)}
          >
            x: 0.62 / y: −0.78 / z: 0.00
          </motion.span>
        </div>

        {/* Copy */}
        <div className="relative z-20 order-2 -mt-[6vh] sm:mt-0 lg:col-span-7 lg:mt-0">
          <motion.p className="mono-label flex flex-wrap items-center gap-x-3 gap-y-1" {...fade(0.3)}>
            <span className="text-accent-2">[ 01 ]</span>
            <span>{t.hero.role}</span>
          </motion.p>

          <SplitText
            as="h1"
            id="hero-title"
            immediate
            delay={0.4}
            text={t.hero.headline}
            mutedFrom={t.hero.mutedFrom}
            className="mt-6 text-[clamp(2.5rem,5vw,5.25rem)] leading-[0.94] font-bold"
          />

          <motion.p className="mt-8 max-w-[44ch] text-base leading-relaxed text-muted md:text-lg" {...fade(1.1)}>
            {t.hero.introBefore}
            <span className="text-fg">{site.name}</span>
            {t.hero.introAfter}
          </motion.p>

          <motion.div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4" {...fade(1.25)}>
            <ButtonLink href="#proyectos" icon={<ArrowRightIcon size={16} />}>
              {t.hero.ctaProjects}
            </ButtonLink>
            <ButtonLink href="#filosofia" variant="ghost">
              {t.hero.ctaPhilosophy}
            </ButtonLink>
          </motion.div>

          <motion.div className="mt-12 flex items-center gap-5 text-muted" {...fade(1.45)}>
            <a
              href="https://github.com/akunot"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t.hero.github} ${t.newTab}`}
              className="grid size-10 place-items-center rounded-full border border-line transition-colors duration-300 hover:border-accent hover:text-fg"
            >
              <GithubIcon size={16} />
            </a>
            <span className="h-4 w-px bg-line" aria-hidden />
            <span className="font-mono text-[11px] tracking-wide">
              {site.location} <span className="text-dim">· 5.07°N 75.52°W</span>
            </span>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#proyectos"
        aria-label={t.hero.scroll}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-dim uppercase transition-colors hover:text-fg md:flex"
        {...fade(2)}
      >
        scroll
        <ArrowDownIcon size={14} className="animate-bounce" />
      </motion.a>
    </section>
  )
}
