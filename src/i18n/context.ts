import { createContext, useContext } from 'react'
import type { Dict } from './ui'

export type Lang = 'es' | 'en'
export const LANGS: Lang[] = ['es', 'en']

type I18n = { lang: Lang; setLang: (l: Lang) => void; t: Dict }

export const I18nContext = createContext<I18n | null>(null)

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>')
  return ctx
}
