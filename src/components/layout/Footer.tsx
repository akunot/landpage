import { site } from '../../data/site'
import { useI18n } from '../../i18n/context'

export function Footer() {
  const { t } = useI18n()
  return (
    <footer className="border-t border-line">
      <div className="shell flex flex-col gap-4 py-8 font-mono text-[10px] tracking-[0.18em] text-muted uppercase md:flex-row md:items-center md:justify-between">
        <p className="text-fg">
          {site.name} — {site.location}
        </p>
        <p>{t.footer.tagline}</p>
        <p className="flex items-center gap-4">
          <span>2026</span>
          <a href="#top" className="link-line tracking-normal normal-case hover:text-fg">
            {t.footer.top}
          </a>
        </p>
      </div>
    </footer>
  )
}
