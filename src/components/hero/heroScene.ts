import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

/**
 * Abstract "software architecture" sculpture: interlocking hollow cube frames
 * (components), thin construction lines (interfaces), small nodes (services)
 * and an orbiting sphere carrying the only blue light (data in motion).
 */

type Options = { reducedMotion: boolean; compact: boolean }

const ACCENT = new THREE.Color('#557BFF')

// Cube frames: [x, y, z, size]
const FRAMES: [number, number, number, number][] = [
  [0, 0, 0, 1.7],
  [0.85, 0.85, -0.85, 1.7],
  [-0.85, -0.85, 0.85, 1.7],
  [0.95, -0.95, 0.4, 1.15],
  [-0.6, 1.25, 0.3, 0.9],
]

function cubeEdges(cx: number, cy: number, cz: number, s: number) {
  const h = s / 2
  const v = [-h, h]
  const edges: [THREE.Vector3, THREE.Vector3][] = []
  for (const a of v)
    for (const b of v) {
      edges.push([new THREE.Vector3(-h, a, b), new THREE.Vector3(h, a, b)])
      edges.push([new THREE.Vector3(a, -h, b), new THREE.Vector3(a, h, b)])
      edges.push([new THREE.Vector3(a, b, -h), new THREE.Vector3(a, b, h)])
    }
  const c = new THREE.Vector3(cx, cy, cz)
  return edges.map(([p, q]) => [p.add(c), q.add(c)] as const)
}

export function createHeroScene(canvas: HTMLCanvasElement, { reducedMotion, compact }: Options) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, compact ? 1.5 : 1.75))
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 0.92

  const scene = new THREE.Scene()
  const pmrem = new THREE.PMREMGenerator(renderer)
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
  scene.environment = envTex

  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100)
  camera.position.set(0, 0, 11.5)

  const root = new THREE.Group()
  root.rotation.set(0.62, -0.78, 0)
  scene.add(root)

  const sculpture = new THREE.Group()
  root.add(sculpture)

  // ── Beams (instanced) ──
  const edges = FRAMES.flatMap(([x, y, z, s]) => cubeEdges(x, y, z, s).map((e) => ({ e, s })))
  const beamGeo = new THREE.BoxGeometry(1, 1, 1)
  const beamMat = new THREE.MeshPhysicalMaterial({
    color: '#8e99b0',
    metalness: 1,
    roughness: 0.24,
    clearcoat: 1,
    clearcoatRoughness: 0.12,
    envMapIntensity: 0.85,
  })
  const beams = new THREE.InstancedMesh(beamGeo, beamMat, edges.length)
  const m = new THREE.Matrix4()
  const q = new THREE.Quaternion()
  const up = new THREE.Vector3(0, 1, 0)
  edges.forEach(({ e: [a, b], s }, i) => {
    const dir = b.clone().sub(a)
    const len = dir.length()
    const t = s > 1.5 ? 0.075 : 0.05
    q.setFromUnitVectors(up, dir.normalize())
    m.compose(a.clone().lerp(b, 0.5), q, new THREE.Vector3(t, len + t, t))
    beams.setMatrixAt(i, m)
  })
  sculpture.add(beams)

  // ── Glass panels (faint faces on the main frames) ──
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: '#8ba5ff',
    metalness: 0,
    roughness: 0.05,
    transparent: true,
    opacity: 0.06,
    side: THREE.DoubleSide,
    depthWrite: false,
    envMapIntensity: 1.6,
  })
  FRAMES.slice(0, 3).forEach(([x, y, z, s]) => {
    const box = new THREE.Mesh(new THREE.BoxGeometry(s, s, s), glassMat)
    box.position.set(x, y, z)
    sculpture.add(box)
  })

  // ── Construction lines: thin axes extending beyond the structure ──
  const linePts: number[] = []
  const ext = 1.6
  FRAMES.slice(0, 3).forEach(([x, y, z, s]) => {
    const h = s / 2
    linePts.push(x - h - ext, y + h, z + h, x + h + ext * 0.4, y + h, z + h)
    linePts.push(x + h, y - h - ext * 0.6, z - h, x + h, y + h + ext, z - h)
    linePts.push(x - h, y - h, z - h - ext, x - h, y - h, z + h + ext * 0.5)
  })
  const lineGeo = new THREE.BufferGeometry()
  lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePts, 3))
  const lineMat = new THREE.LineBasicMaterial({ color: '#8ba5ff', transparent: true, opacity: 0.22 })
  sculpture.add(new THREE.LineSegments(lineGeo, lineMat))

  // Wireframe echo of the main cube, slightly larger
  const echo = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(2.6, 2.6, 2.6)),
    new THREE.LineBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.08 }),
  )
  sculpture.add(echo)

  // ── Nodes at selected vertices ──
  const nodeGeo = new THREE.SphereGeometry(0.045, 12, 12)
  const nodeMat = new THREE.MeshBasicMaterial({ color: '#dfe6ff' })
  const accentNodeMat = new THREE.MeshBasicMaterial({ color: ACCENT })
  const nodePositions: [number, number, number][] = [
    [0.85, 0.85, 0.85],
    [-0.85, 0.85, -0.85],
    [1.7, 1.7, -1.7],
    [-1.7, -1.7, 1.7],
    [1.525, -1.525, 0.975],
    [-1.05, 1.7, 0.75],
  ]
  nodePositions.forEach((p, i) => {
    const n = new THREE.Mesh(nodeGeo, i === 2 ? accentNodeMat : nodeMat)
    n.position.set(...p)
    sculpture.add(n)
  })

  // ── Orbit: ring + sphere with the blue light ──
  const orbit = new THREE.Group()
  orbit.rotation.set(1.15, 0.2, 0.35)
  scene.add(orbit)
  const ringR = 3.6
  const ringGeo = new THREE.BufferGeometry().setFromPoints(
    new THREE.EllipseCurve(0, 0, ringR, ringR, 0, Math.PI * 2).getPoints(160).map((p) => new THREE.Vector3(p.x, p.y, 0)),
  )
  const ringMat = new THREE.LineBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.14 })
  orbit.add(new THREE.LineLoop(ringGeo, ringMat))

  const ring2 = new THREE.LineLoop(ringGeo, new THREE.LineBasicMaterial({ color: '#8ba5ff', transparent: true, opacity: 0.07 }))
  ring2.scale.setScalar(1.22)
  ring2.rotation.set(0.5, 0.3, 0)
  orbit.add(ring2)

  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.42, 48, 48),
    new THREE.MeshPhysicalMaterial({
      color: '#0d1220',
      metalness: 0.2,
      roughness: 0.08,
      clearcoat: 1,
      envMapIntensity: 1.4,
    }),
  )
  const core = new THREE.Mesh(new THREE.SphereGeometry(0.06, 16, 16), new THREE.MeshBasicMaterial({ color: '#9fb4ff' }))
  core.position.z = 0.36
  sphere.add(core)
  const blue = new THREE.PointLight(ACCENT, 30, 9, 1.4)
  sphere.add(blue)
  orbit.add(sphere)

  // ── Lights ──
  scene.add(new THREE.AmbientLight('#8090b0', 0.25))
  const key = new THREE.DirectionalLight('#dfe6ff', 1.1)
  key.position.set(4, 6, 5)
  scene.add(key)
  const rim = new THREE.DirectionalLight('#557bff', 2.2)
  rim.position.set(-6, -2, -4)
  scene.add(rim)

  // ── Interaction & loop ──
  const pointer = { x: 0, y: 0 }
  const smooth = { x: 0, y: 0 }
  const onPointer = (e: PointerEvent) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1
  }
  if (!reducedMotion) window.addEventListener('pointermove', onPointer, { passive: true })

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas
    if (!w || !h) return
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.position.z = w / h < 0.9 ? 14 : 13.2
    camera.updateProjectionMatrix()
  }
  const ro = new ResizeObserver(resize)
  ro.observe(canvas)
  resize()

  const timer = new THREE.Timer()
  let raf = 0
  let running = false
  let intro = reducedMotion ? 1 : 0

  const setOrbit = (t: number) => {
    const a = t * 0.35 + 2.4
    sphere.position.set(Math.cos(a) * ringR, Math.sin(a) * ringR, 0)
  }

  const frame = (timestamp: number) => {
    timer.update(timestamp)
    const dt = Math.min(timer.getDelta(), 0.05)
    const t = timer.getElapsed()
    intro = Math.min(1, intro + dt * 0.55)
    const e = 1 - Math.pow(1 - intro, 4)

    smooth.x += (pointer.x - smooth.x) * 0.045
    smooth.y += (pointer.y - smooth.y) * 0.045

    sculpture.rotation.y = t * 0.08 + (1 - e) * -1.2
    sculpture.scale.setScalar(0.82 + 0.18 * e)
    root.rotation.x = 0.62 + smooth.y * 0.18
    root.rotation.z = smooth.x * -0.08
    root.position.y = Math.sin(t * 0.6) * 0.08
    orbit.rotation.z = 0.35 + smooth.x * 0.15
    setOrbit(t)
    blue.intensity = 28 + Math.sin(t * 1.4) * 6

    renderer.render(scene, camera)
    raf = requestAnimationFrame(frame)
  }

  const start = () => {
    if (running || reducedMotion) return
    running = true
    // Skip the time spent paused (off-screen or hidden tab).
    timer.reset()
    raf = requestAnimationFrame(frame)
  }
  const stop = () => {
    running = false
    cancelAnimationFrame(raf)
  }

  if (reducedMotion) {
    setOrbit(0.6)
    renderer.render(scene, camera)
    // Re-render on resize so the static frame stays sharp.
    ro.disconnect()
    const staticRo = new ResizeObserver(() => {
      resize()
      renderer.render(scene, camera)
    })
    staticRo.observe(canvas)
    return {
      start,
      stop,
      dispose() {
        staticRo.disconnect()
        renderer.dispose()
        envTex.dispose()
        pmrem.dispose()
      },
    }
  }

  return {
    start,
    stop,
    dispose() {
      stop()
      ro.disconnect()
      window.removeEventListener('pointermove', onPointer)
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh || o instanceof THREE.Line) {
          o.geometry.dispose()
          const mat = o.material as THREE.Material | THREE.Material[]
          ;(Array.isArray(mat) ? mat : [mat]).forEach((x) => x.dispose())
        }
      })
      envTex.dispose()
      pmrem.dispose()
      renderer.dispose()
    },
  }
}

export type HeroScene = ReturnType<typeof createHeroScene>
