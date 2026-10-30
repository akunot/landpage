import { useEffect, useState } from 'react'

/** Returns the id of the section currently crossing the upper-middle of the viewport. */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el)
    if (!els.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      // A thin band at 35% of viewport height: only one section intersects at a time.
      { rootMargin: '-35% 0px -64% 0px' },
    )
    els.forEach((el) => observer.observe(el))

    const onScroll = () => {
      if (window.scrollY < window.innerHeight * 0.5) setActive(null)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [ids])

  return active
}
