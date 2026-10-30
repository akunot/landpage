import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { MenuIcon, XIcon } from 'lucide-react'
import { navIds, site } from '../../data/site'
import { useI18n } from '../../i18n/context'
import { LangToggle } from './LangToggle'
import { useActiveSection } from '../../hooks/useActiveSection'

const EASE = [0.16, 1, 0.3, 1] as const

export function Navigation() {
  const { t } = useI18n()
  const active = useActiveSection(navIds)
  const nav = navIds.map((id) => ({ id, label: t.nav.labels[id] }))
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    document.documentElement.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.documentElement.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <a
        href="#main"
        className="fixed top-3 left-3 z-[80] -translate-y-20 rounded bg-fg px-4 py-2 text-sm text-ink focus:translate-y-0"
      >
        {t.nav.skip}
      </a>

      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 0.1 }}
        className={`fixed inset-x-0 top-0 z-[65] transition-[background,border-color,backdrop-filter] duration-500 ${
          scrolled && !open
            ? 'border-b border-line-soft bg-ink/75 backdrop-blur-xl'
            : 'border-b border-transparent'
        }`}
      >
        <nav aria-label={t.nav.aria} className="shell flex h-16 items-center justify-between md:h-20">
          <a href="#top" className="group flex items-center gap-3 font-display text-lg font-semibold tracking-tight">
            {site.handle}
            <span
              aria-hidden
              className="h-px w-6 bg-muted transition-all duration-500 ease-out-expo group-hover:w-10 group-hover:bg-accent"
            />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => {
              const isActive = active === item.id
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? 'location' : undefined}
                    className={`relative block px-3.5 py-2 text-[13px] transition-colors duration-300 ${
                      isActive ? 'text-fg' : 'text-muted hover:text-fg'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-x-3.5 -bottom-px h-px bg-accent"
                        transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                      />
                    )}
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-3 sm:gap-5">
            <span className="hidden items-center gap-2.5 font-mono text-[11px] tracking-wide text-muted xl:flex">
              <span className="pulse-dot" aria-hidden />
              {site.location}
            </span>
            <LangToggle id="header" />
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.nav.close : t.nav.open}
              className="relative z-[70] -mr-2 grid size-11 place-items-center rounded-full text-fg transition-colors hover:bg-ink-3 lg:hidden"
            >
              {open ? <XIcon size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t.nav.menu}
            className="fixed inset-0 z-[60] flex flex-col bg-ink lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="tech-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden />
            <ul className="shell relative mt-24 flex flex-col">
              {nav.map((item, i) => (
                <li key={item.id} className="overflow-hidden border-b border-line-soft">
                  <motion.a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-4 font-display text-[clamp(2rem,9vw,3rem)] font-semibold tracking-tight"
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.15 + i * 0.05 }}
                  >
                    <span className="font-mono text-xs font-normal text-accent-2">0{i + 1}</span>
                    {item.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div
              className="shell relative mt-auto mb-10 flex items-center justify-between font-mono text-[11px] tracking-wide text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
              exit={{ opacity: 0 }}
            >
              <span className="flex items-center gap-2.5">
                <span className="pulse-dot" aria-hidden />
                {site.location}
              </span>
              <span>{site.loop.join(' ')} repeat;</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
