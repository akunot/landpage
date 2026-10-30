import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import type { HeroScene } from './heroScene'

function supportsWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

/** Static isometric fallback for devices without WebGL. */
function FallbackArt() {
  // Isometric projection of the same cube frames used by the 3D scene.
  const iso = (x: number, y: number, z: number) => [200 + (x - z) * 52, 210 + (x + z) * 30 - y * 60] as const
  const cube = (cx: number, cy: number, cz: number, s: number) => {
    const h = s / 2
    const v = [-h, h]
    const segs: string[] = []
    for (const a of v)
      for (const b of v) {
        segs.push([iso(cx - h, cy + a, cz + b), iso(cx + h, cy + a, cz + b)].map((p) => p.join(',')).join(' '))
        segs.push([iso(cx + a, cy - h, cz + b), iso(cx + a, cy + h, cz + b)].map((p) => p.join(',')).join(' '))
        segs.push([iso(cx + a, cy + b, cz - h), iso(cx + a, cy + b, cz + h)].map((p) => p.join(',')).join(' '))
      }
    return segs
  }
  const frames: [number, number, number, number][] = [
    [0, 0, 0, 1.7],
    [0.85, 0.85, -0.85, 1.7],
    [-0.85, -0.85, 0.85, 1.7],
    [0.95, -0.95, 0.4, 1.15],
  ]
  return (
    <svg viewBox="0 0 400 420" className="h-full w-full" aria-hidden>
      <ellipse cx="200" cy="210" rx="190" ry="120" fill="none" stroke="rgba(255,255,255,.08)" transform="rotate(-18 200 210)" />
      {frames.flatMap(([x, y, z, s], fi) =>
        cube(x, y, z, s).map((pts, i) => (
          <polyline key={`${fi}-${i}`} points={pts} stroke={fi === 0 ? '#c9d2e6' : '#7d879a'} strokeWidth={fi === 0 ? 2.2 : 1.4} fill="none" strokeLinecap="round" />
        )),
      )}
      <circle cx="58" cy="290" r="20" fill="#0d1220" stroke="rgba(139,165,255,.4)" />
      <circle cx="62" cy="286" r="3" fill="#557BFF" />
    </svg>
  )
}

export function HeroVisual({ label }: { label: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion() ?? false
  const [mode, setMode] = useState<'loading' | 'webgl' | 'fallback'>(() =>
    supportsWebGL() ? 'loading' : 'fallback',
  )
  const noWebGL = mode === 'fallback'

  useEffect(() => {
    if (noWebGL) return
    let scene: HeroScene | undefined
    let cancelled = false
    let visible = true
    let io: IntersectionObserver | undefined

    const onVisibility = () => {
      if (document.hidden) scene?.stop()
      else if (visible) scene?.start()
    }

    import('./heroScene')
      .then(({ createHeroScene }) => {
        if (cancelled || !canvasRef.current) return
        scene = createHeroScene(canvasRef.current, {
          reducedMotion: reduced,
          compact: window.matchMedia('(max-width: 767px)').matches,
        })
        setMode('webgl')
        // Pause rendering whenever the hero is off-screen or the tab is hidden.
        io = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting
          if (visible && !document.hidden) scene?.start()
          else scene?.stop()
        })
        io.observe(wrapRef.current!)
        document.addEventListener('visibilitychange', onVisibility)
      })
      .catch(() => !cancelled && setMode('fallback'))

    return () => {
      cancelled = true
      io?.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      scene?.dispose()
    }
  }, [reduced, noWebGL])

  return (
    <div ref={wrapRef} className="relative h-full w-full">
      {mode === 'fallback' ? (
        <FallbackArt />
      ) : (
        <motion.canvas
          ref={canvasRef}
          className="block h-full w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: mode === 'webgl' ? 1 : 0 }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
          role="img"
          aria-label={label}
        />
      )}
    </div>
  )
}
