import { motion } from 'motion/react'
import { content } from '../../data/content'
import { site } from '../../data/site'
import { useI18n } from '../../i18n/context'
import { SectionHeader } from '../layout/SectionHeader'
import { Reveal } from '../ui/Reveal'

const EASE = [0.16, 1, 0.3, 1] as const

export function NowSection() {
  const { lang, t } = useI18n()
  const { now, nowUpdated } = content[lang]
  const [build, doubt, improve] = t.now.steps

  return (
    <section id="ahora" aria-labelledby="now-title" className="relative border-t border-line py-24 md:py-36">
      <div className="shell grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <SectionHeader index="05" label={t.now.label} />
          <h2 id="now-title" className="mt-6 text-[clamp(2.25rem,5.4vw,4.75rem)] leading-[0.98] font-semibold">
            {t.now.title} <span className="text-muted">{t.now.titleMuted}</span>
          </h2>

          <ol className="mt-14 border-t border-line">
            {now.map((item, i) => (
              <motion.li
                key={i}
                className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 border-b border-line py-5 md:py-6"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 0.8, ease: EASE, delay: i * 0.07 }}
              >
                <span className="font-mono text-xs text-dim transition-colors group-hover:text-accent-2">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[17px] leading-snug transition-transform duration-500 ease-out-expo group-hover:translate-x-1 md:text-lg">
                  {item.text}
                </span>
                {item.active ? (
                  <span className="flex items-center gap-2 font-mono text-[10px] tracking-wide text-accent-2">
                    <span className="pulse-dot" aria-hidden />
                    <span className="hidden sm:inline">{t.now.focus}</span>
                    <span className="sr-only sm:hidden">{t.now.focus}</span>
                  </span>
                ) : (
                  <span aria-hidden className="h-px w-4 bg-line" />
                )}
              </motion.li>
            ))}
          </ol>
          <p className="mt-5 font-mono text-[10px] tracking-wide text-dim">
            {t.now.updated} · {nowUpdated}
          </p>
        </div>

        {/* Terminal-style snippet: a static, honest snapshot — not live activity. */}
        <Reveal delay={0.15} className="lg:col-span-5 lg:pt-28">
          <div className="overflow-hidden rounded-[4px] border border-line bg-ink-2">
            <div className="flex items-center justify-between border-b border-line px-4 py-3 font-mono text-[10px] text-dim">
              <span>~/akunot/now.md</span>
              <span>{site.location}</span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-[12px] leading-[1.9] text-muted md:p-6 md:text-[13px]">
              <code>
                <span className="text-dim">{t.now.comment}</span>
                {'\n'}
                <span className="text-accent-2">while</span> (learning) {'{'}
                {'\n'}
                {'  '}
                <span className="text-fg">build</span>();{'   '}
                <span className="text-dim">// {build}</span>
                {'\n'}
                {'  '}
                <span className="text-fg">doubt</span>();{'   '}
                <span className="text-dim">// {doubt}</span>
                {'\n'}
                {'  '}
                <span className="text-fg">improve</span>();{' '}
                <span className="text-dim">// {improve}</span>
                {'\n'}
                {'}'} <span className="text-accent-2">repeat</span>
                <span className="blink text-fg">;</span>
              </code>
            </pre>
          </div>
          <blockquote className="mt-10 border-l border-accent pl-6">
            <p className="font-display text-2xl leading-snug font-medium md:text-[1.75rem]">{t.now.quote}</p>
            <footer className="mt-3 font-mono text-[10px] tracking-[0.2em] text-dim uppercase">— {site.name}</footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  )
}
