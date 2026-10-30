import { ArrowUpRightIcon } from 'lucide-react'
import { content } from '../../data/content'
import { useI18n } from '../../i18n/context'
import { SectionHeader } from '../layout/SectionHeader'
import { Reveal } from '../ui/Reveal'

export function ResearchSection() {
  const { lang, t } = useI18n()
  const { researchLines, publications } = content[lang]

  return (
    <section id="investigacion" aria-labelledby="research-title" className="relative border-t border-line bg-ink-2 py-24 md:py-36">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeader index="03" label={t.research.label} />
            <h2 id="research-title" className="mt-6 text-[clamp(2.25rem,5.4vw,4.75rem)] leading-[0.98] font-semibold">
              {t.research.title}
            </h2>
          </div>
          <Reveal delay={0.2} className="self-end lg:col-span-4 lg:col-start-9">
            <p className="leading-relaxed text-muted">{t.research.intro}</p>
          </Reveal>
        </div>

        {/* Research lines */}
        <ol className="mt-16 grid border-t border-line md:mt-24 md:grid-cols-3">
          {researchLines.map((r, i) => (
            <Reveal
              as="li"
              key={i}
              delay={i * 0.1}
              className="group border-b border-line py-8 md:border-r md:border-b-0 md:px-8 md:py-10 md:first:pl-0 md:last:border-r-0"
            >
              <span className="font-mono text-[11px] text-accent-2">R.{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-4 text-xl font-semibold transition-colors group-hover:text-accent-2">{r.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{r.body}</p>
            </Reveal>
          ))}
        </ol>

        {/* Publications — placeholders until real bibliographic data is provided */}
        <div className="mt-20 md:mt-28">
          <h3 className="mono-label">{t.research.pubs}</h3>

          <ol className="mt-6 border-t border-line">
            {publications.map((p, i) => {
              const body = (
                <>
                  <span className="font-mono text-[11px] text-dim lg:col-span-1">{p.year}</span>
                  <div className="lg:col-span-6">
                    <p className="font-mono text-[10px] tracking-wide text-accent-2 uppercase">{p.topic}</p>
                    <p lang="en" className="mt-2 text-lg leading-snug font-medium">
                      {p.title}
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed text-muted lg:col-span-3">
                    {p.venue && (
                      <>
                        <span className="font-mono text-[11px] tracking-wide text-fg">{p.venue}</span>
                        <br />
                      </>
                    )}
                    <span className="text-dim">{p.authors}</span>
                  </p>
                  <span className="flex items-center gap-2 lg:col-span-2 lg:justify-end">
                    {p.status && (
                      <span className="rounded-sm border border-dashed border-line px-2 py-1 font-mono text-[10px] whitespace-nowrap text-dim">
                        {p.status}
                      </span>
                    )}
                    {p.href && (
                      <span className="link-line text-sm text-accent-2">
                        {t.research.read} <ArrowUpRightIcon size={14} />
                      </span>
                    )}
                  </span>
                </>
              )
              const cls = 'grid gap-3 border-b border-line py-7 transition-colors lg:grid-cols-12 lg:items-baseline lg:gap-6'
              return (
                <Reveal as="li" key={i} delay={i * 0.08}>
                  {p.href ? (
                    <a href={p.href} target="_blank" rel="noopener noreferrer" className={`${cls} hover:bg-ink-3/50`}>
                      {body}
                    </a>
                  ) : (
                    <div className={cls}>{body}</div>
                  )}
                </Reveal>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
