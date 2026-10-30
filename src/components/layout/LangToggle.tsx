import { motion } from 'motion/react'
import { LANGS, useI18n } from '../../i18n/context'

/** ES / EN segmented switch with a sliding indicator. */
export function LangToggle({ id }: { id: string }) {
  const { lang, setLang, t } = useI18n()
  return (
    <div
      role="group"
      aria-label={t.lang.label}
      title={t.lang.switchTo}
      className="relative flex rounded-full border border-line p-0.5 font-mono text-[10px] tracking-[0.14em]"
    >
      {LANGS.map((l) => {
        const active = l === lang
        return (
          <button
            key={l}
            type="button"
            lang={l}
            aria-pressed={active}
            onClick={() => setLang(l)}
            className={`relative z-0 min-w-9 rounded-full px-2.5 py-1.5 uppercase transition-colors duration-300 ${
              active ? 'text-ink' : 'text-muted hover:text-fg'
            }`}
          >
            {active && (
              <motion.span
                layoutId={`lang-pill-${id}`}
                className="absolute inset-0 -z-10 rounded-full bg-fg"
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              />
            )}
            {l}
          </button>
        )
      })}
    </div>
  )
}
