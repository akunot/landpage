import { useMemo } from 'react'
import type { Project } from '../../data/projects'

/** Deterministic PRNG so the generated art is stable between renders. */
function rng(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }
}

/** Real screenshot of a project. */
export function Screenshot({ project }: { project: Project }) {
  return (
    <img
      src={project.screenshot}
      alt={project.screenshotAlt ?? ''}
      loading="lazy"
      decoding="async"
      className={`h-full w-full object-cover ${project.screenshotPosition === 'center' ? 'object-center' : 'object-top'}`}
    />
  )
}

/**
 * Abstract curriculum grid. Explicitly labelled as an illustration — it is NOT
 * the real interface. Replaced automatically when `project.screenshot` is set.
 */
type MallasProps = { project: Project; placeholder?: string }

export function MallasVisual({ project, placeholder }: MallasProps) {
  if (project.screenshot) return <Screenshot project={project} />
  const cols = 10
  const rows = 6
  const r = rng(7)
  const cells = Array.from({ length: cols * rows }, (_, i) => ({
    c: i % cols,
    row: Math.floor(i / cols),
    on: r() > 0.28,
    hi: r() > 0.9,
  }))
  return (
    <div className="relative h-full w-full bg-ink-2">
      <svg viewBox="0 0 600 360" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="mallas-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#11151C" stopOpacity="0" />
            <stop offset="1" stopColor="#11151C" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        {Array.from({ length: cols }, (_, c) => (
          <text key={c} x={46 + c * 54} y={74} fill="#5d6573" fontSize="9" fontFamily="JetBrains Mono, monospace">
            S{String(c + 1).padStart(2, '0')}
          </text>
        ))}
        {cells.map(({ c, row, on, hi }, i) =>
          on ? (
            <rect
              key={i}
              x={40 + c * 54}
              y={86 + row * 46}
              width={46}
              height={36}
              rx={2}
              fill={hi ? 'rgba(85,123,255,.22)' : 'rgba(255,255,255,.035)'}
              stroke={hi ? '#557BFF' : 'rgba(255,255,255,.12)'}
              strokeWidth={1}
            />
          ) : null,
        )}
        {/* prerequisite links */}
        <path d="M86 104 C 110 104, 110 150, 134 150 M194 196 C 214 196, 214 242, 242 242 M302 150 C 322 150, 322 104, 350 104" stroke="#8BA5FF" strokeOpacity=".55" fill="none" />
        <rect x="0" y="0" width="600" height="360" fill="url(#mallas-fade)" />
      </svg>
      {placeholder && (
        <span className="absolute bottom-3 left-3 rounded-sm border border-line bg-ink/80 px-2 py-1 font-mono text-[10px] tracking-wide text-muted backdrop-blur">
          {placeholder}
        </span>
      )}
    </div>
  )
}

/** Generated citation network: roots → trunk → leaves, echoing Tree of Science. */
export function NetworkVisual() {
  const { nodes, edges } = useMemo(() => {
    const r = rng(42)
    const nodes: { x: number; y: number; k: 'root' | 'trunk' | 'leaf' }[] = []
    const edges: [number, number][] = []
    // trunk
    const trunk = [0, 1, 2, 3].map((i) => {
      nodes.push({ x: 300 + (r() - 0.5) * 30, y: 270 - i * 55, k: 'trunk' })
      return nodes.length - 1
    })
    trunk.slice(1).forEach((n, i) => edges.push([trunk[i], n]))
    // roots
    for (let i = 0; i < 9; i++) {
      nodes.push({ x: 140 + i * 40 + (r() - 0.5) * 20, y: 320 + r() * 30, k: 'root' })
      edges.push([nodes.length - 1, trunk[r() > 0.5 ? 0 : 1]])
    }
    // leaves
    for (let i = 0; i < 26; i++) {
      const a = Math.PI * (1.05 + r() * 0.9)
      const d = 70 + r() * 150
      nodes.push({ x: 300 + Math.cos(a) * d * 1.5, y: 110 + Math.sin(a) * d * 0.55, k: 'leaf' })
      const id = nodes.length - 1
      edges.push([id, trunk[2 + (r() > 0.55 ? 1 : 0)]])
      if (r() > 0.6 && id > 15) edges.push([id, id - 1 - Math.floor(r() * 3)])
    }
    return { nodes, edges }
  }, [])

  return (
    <svg viewBox="0 0 600 360" preserveAspectRatio="xMidYMid slice" className="h-full w-full bg-ink-2" aria-hidden>
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke={nodes[a].k === 'trunk' || nodes[b].k === 'trunk' ? 'rgba(139,165,255,.35)' : 'rgba(255,255,255,.1)'}
          strokeWidth={1}
          className="net-edge"
          style={{ animationDelay: `${(i % 9) * 0.25}s` }}
        />
      ))}
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={n.k === 'trunk' ? 6 : n.k === 'root' ? 3 : 2.6}
          fill={n.k === 'trunk' ? '#557BFF' : n.k === 'root' ? '#929BAA' : '#F0F2F6'}
          fillOpacity={n.k === 'leaf' ? 0.75 : 1}
        />
      ))}
      {nodes
        .filter((n) => n.k === 'trunk')
        .map((n, i) => (
          <circle key={`h${i}`} cx={n.x} cy={n.y} r={14} fill="none" stroke="#557BFF" strokeOpacity=".3" />
        ))}
      <g fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#5d6573">
        <text x="20" y="30">LEAVES</text>
        <text x="20" y="215">TRUNK</text>
        <text x="20" y="345">ROOTS</text>
      </g>
    </svg>
  )
}

/** Agent topology: an agent core connected to Skills, Plugins and MCP servers. */
export function AgentsVisual() {
  const satellites = [
    { x: 110, y: 90, label: 'skill://review' },
    { x: 120, y: 270, label: 'plugin.hooks' },
    { x: 480, y: 80, label: 'mcp://docs' },
    { x: 500, y: 200, label: 'mcp://db' },
    { x: 470, y: 300, label: 'skill://tests' },
  ]
  return (
    <svg viewBox="0 0 600 360" preserveAspectRatio="xMidYMid slice" className="h-full w-full bg-ink-2" aria-hidden>
      <g stroke="rgba(255,255,255,.06)">
        {Array.from({ length: 12 }, (_, i) => (
          <line key={i} x1={i * 50} y1={0} x2={i * 50} y2={360} />
        ))}
      </g>
      {satellites.map((s, i) => (
        <path
          key={i}
          d={`M300 180 C ${(300 + s.x) / 2} 180, ${(300 + s.x) / 2} ${s.y}, ${s.x} ${s.y}`}
          stroke="rgba(139,165,255,.4)"
          fill="none"
          strokeDasharray="3 5"
          className="flow-dash"
        />
      ))}
      {satellites.map((s, i) => (
        <g key={`n${i}`} transform={`translate(${s.x} ${s.y})`}>
          <rect x={-52} y={-13} width={104} height={26} rx={3} fill="#171C25" stroke="rgba(255,255,255,.14)" />
          <text textAnchor="middle" y={4} fontSize="10" fontFamily="JetBrains Mono, monospace" fill="#929BAA">
            {s.label}
          </text>
        </g>
      ))}
      <circle cx="300" cy="180" r="44" fill="none" stroke="rgba(85,123,255,.25)" />
      <circle cx="300" cy="180" r="28" fill="#0d1220" stroke="#557BFF" />
      <text x="300" y="184" textAnchor="middle" fontSize="11" fontFamily="JetBrains Mono, monospace" fill="#F0F2F6">
        agent
      </text>
      <text x="300" y="250" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono, monospace" fill="#5d6573">
        plan → act → verify
      </text>
    </svg>
  )
}

export function ProjectVisual({ project }: { project: Project }) {
  if (project.screenshot) return <Screenshot project={project} />
  // The card renders its own (unclipped) placeholder label.
  if (project.visual === 'mallas') return <MallasVisual project={project} />
  if (project.visual === 'network') return <NetworkVisual />
  return <AgentsVisual />
}
