import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { I18nContext, LANGS, type Lang } from './context'
import { ui } from './ui'

const STORAGE_KEY = 'akunot-lang'

/** Spanish by default. `?lang=en` in the URL wins, then the visitor's last choice. */
function initialLang(): Lang {
  const param = new URLSearchParams(window.location.search).get('lang')
  if (param && LANGS.includes(param as Lang)) return param as Lang
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && LANGS.includes(stored as Lang)) return stored as Lang
  } catch {
    /* storage unavailable */
  }
  return 'es'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem(STORAGE_KEY, l)
    } catch {
      /* storage unavailable */
    }
    // Keep a shareable URL in sync without adding history entries.
    const url = new URL(window.location.href)
    if (l === 'es') url.searchParams.delete('lang')
    else url.searchParams.set('lang', l)
    window.history.replaceState(null, '', url)
  }, [])

  const t = ui[lang]

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = t.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description)
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', lang === 'es' ? 'es_CO' : 'en_US')
  }, [lang, t])

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
