import { motion } from 'motion/react'
import { ArrowUpRightIcon, MailIcon } from 'lucide-react'
import { contacts, type ContactLink } from '../../data/site'
import { useI18n } from '../../i18n/context'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'
import { SectionHeader } from '../layout/SectionHeader'
import { Reveal, SplitText } from '../ui/Reveal'

const EASE = [0.16, 1, 0.3, 1] as const

const iconFor = (kind: ContactLink['kind']) =>
  kind === 'github' ? (
    <GithubIcon size={18} />
  ) : kind === 'linkedin' ? (
    <LinkedinIcon size={18} />
  ) : (
    <MailIcon size={18} strokeWidth={1.6} />
  )

function ContactRow({ c }: { c: ContactLink }) {
  const { t } = useI18n()
  const inner = (
    <>
      <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors duration-300 group-hover:border-accent group-hover:text-fg">
        {iconFor(c.kind)}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-lg font-medium">{c.label}</span>
        <span className="block truncate font-mono text-[11px] text-muted">{c.display}</span>
      </span>
      {c.href && (
        <ArrowUpRightIcon
          size={20}
          className="shrink-0 text-muted transition-transform duration-500 ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent-2"
          aria-hidden
        />
      )}
    </>
  )
  const cls = 'group flex items-center gap-5 border-b border-line py-5 transition-[padding] duration-500 ease-out-expo'
  if (!c.href) {
    return (
      <div className={`${cls} opacity-60`} aria-label={`${c.label}: ${t.contact.pending}`}>
        {inner}
      </div>
    )
  }
  const external = c.href.startsWith('http')
  return (
    <a
      href={c.href}
      className={`${cls} hover:pl-2`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {inner}
      {external && <span className="sr-only">{t.newTab}</span>}
    </a>
  )
}

export function ContactSection() {
  const { t } = useI18n()
  return (
    <section id="contacto" aria-labelledby="contact-title" className="relative overflow-hidden border-t border-line pt-24 md:pt-36">
      <div className="tech-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="shell relative grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <SectionHeader index="06" label={t.contact.label} />
          <SplitText
            id="contact-title"
            text={t.contact.title}
            mutedFrom={t.contact.mutedFrom}
            className="mt-6 max-w-[16ch] text-[clamp(2.6rem,6.4vw,5.75rem)] leading-[0.95] font-bold"
          />
          <Reveal delay={0.3}>
            <p className="mt-8 text-xl text-muted">{t.contact.subtitle}</p>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="self-end lg:col-span-5">
          <div className="border-t border-line">
            {contacts.map((c) => (
              <ContactRow key={c.kind} c={c} />
            ))}
          </div>
        </Reveal>
      </div>

      {/* Signature mark */}
      <div className="shell relative mt-20 md:mt-28">
        <motion.p
          aria-hidden
          className="font-display text-[clamp(7rem,30vw,26rem)] leading-[0.75] font-bold tracking-[-0.06em] text-ink-3 select-none"
          initial={{ y: '30%', opacity: 0 }}
          whileInView={{ y: '0%', opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: EASE }}
        >
          <span className="bg-gradient-to-b from-[#2a3242] to-ink-3 bg-clip-text text-transparent">ak</span>
          <span className="text-accent">.</span>
        </motion.p>
      </div>
    </section>
  )
}
