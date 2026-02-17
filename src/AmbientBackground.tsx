import React from 'react'

type Theme = 'dark' | 'light'
type AmbientBackgroundProps = { theme: Theme }

/* ─── Types ─── */
type AuroraBlob = {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  r: number
  g: number
  b: number
  baseAlpha: number
  phaseX: number
  phaseY: number
  freqX: number
  freqY: number
  pulsePhase: number
  pulseSpeed: number
}

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  twinkleSpeed: number
  twinklePhase: number
}

/* ─── Constants ─── */
const MAX_DPR = 1.25       // lower DPR = much less pixels to push
const MIN_PARTICLES = 25
const MAX_PARTICLES = 55   // reduced from 120
const BLOB_COUNT = 5       // reduced from 6

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))

/* ─── Color palettes (pre-parsed RGB to avoid string ops in hot loop) ─── */
const DARK_BLOBS: [number, number, number, number][] = [
  [139, 92, 246, 0.22],   // violet
  [6, 182, 212, 0.18],    // cyan
  [236, 72, 153, 0.16],   // magenta
  [99, 102, 241, 0.20],   // indigo
  [34, 211, 238, 0.17],   // bright cyan
]

const LIGHT_BLOBS: [number, number, number, number][] = [
  [124, 58, 237, 0.11],
  [6, 182, 212, 0.09],
  [219, 39, 119, 0.08],
  [79, 70, 229, 0.10],
  [14, 165, 233, 0.08],
]

/* ─── Generators ─── */
const createBlobs = (w: number, h: number, palette: [number, number, number, number][]): AuroraBlob[] => {
  const blobs: AuroraBlob[] = []
  for (let i = 0; i < BLOB_COUNT; i++) {
    const angle = Math.random() * Math.PI * 2
    const speed = 6 + Math.random() * 12
    const [r, g, b, baseAlpha] = palette[i % palette.length]
    blobs.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: Math.max(w, h) * (0.25 + Math.random() * 0.20),
      r, g, b, baseAlpha,
      phaseX: Math.random() * Math.PI * 2,
      phaseY: Math.random() * Math.PI * 2,
      freqX: 0.12 + Math.random() * 0.18,
      freqY: 0.10 + Math.random() * 0.20,
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.25 + Math.random() * 0.35,
    })
  }
  return blobs
}

const createParticles = (w: number, h: number, isDark: boolean): Particle[] => {
  const count = clamp(Math.round((w * h) / 22000), MIN_PARTICLES, MAX_PARTICLES)
  const particles: Particle[] = []
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 10,
      vy: (Math.random() - 0.5) * 10,
      size: 0.8 + Math.random() * 1.5,
      alpha: isDark ? 0.25 + Math.random() * 0.4 : 0.12 + Math.random() * 0.25,
      twinkleSpeed: 0.4 + Math.random() * 1.5,
      twinklePhase: Math.random() * Math.PI * 2,
    })
  }
  return particles
}

/* ─── Component ─── */
function AmbientBackgroundComponent({ theme }: AmbientBackgroundProps) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const mqReduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let reduced = mqReduced.matches
    const isDark = theme === 'dark'

    let w = 0
    let h = 0
    let dpr = 1
    let blobs: AuroraBlob[] = []
    let particles: Particle[] = []
    let rafId = 0
    let resizeRaf = 0
    let lastTime = performance.now()

    const palette = isDark ? DARK_BLOBS : LIGHT_BLOBS

    /* ─ Pre-render each blob to an offscreen canvas (drawn once, reused every frame) ─ */
    let blobCanvases: HTMLCanvasElement[] = []

    const buildBlobCanvases = () => {
      blobCanvases = blobs.map((b) => {
        const size = Math.ceil(b.radius * 2 * dpr)
        const offscreen = document.createElement('canvas')
        offscreen.width = size
        offscreen.height = size
        const octx = offscreen.getContext('2d')
        if (octx) {
          const cx = size / 2
          const cy = size / 2
          const r = size / 2
          const grad = octx.createRadialGradient(cx, cy, 0, cx, cy, r)
          grad.addColorStop(0, `rgba(${b.r},${b.g},${b.b},1)`)
          grad.addColorStop(0.35, `rgba(${b.r},${b.g},${b.b},0.5)`)
          grad.addColorStop(1, `rgba(${b.r},${b.g},${b.b},0)`)
          octx.fillStyle = grad
          octx.fillRect(0, 0, size, size)
        }
        return offscreen
      })
    }

    const resize = () => {
      const nw = window.innerWidth
      const nh = window.innerHeight
      dpr = clamp(window.devicePixelRatio || 1, 1, MAX_DPR)
      if (nw === w && nh === h) return
      w = nw
      h = nh
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      blobs = createBlobs(w, h, palette)
      particles = createParticles(w, h, isDark)
      buildBlobCanvases()
    }

    const particleColor = isDark ? 'rgba(210,215,240,' : 'rgba(40,50,80,'

    const draw = (time: number, dt: number) => {
      ctx.clearRect(0, 0, w, h)
      const sec = time * 0.001

      // ── Aurora blobs (pre-rendered, just drawImage with alpha) ──
      for (let i = 0; i < blobs.length; i++) {
        const b = blobs[i]

        // Organic drift
        b.x += (b.vx + Math.sin(sec * b.freqX + b.phaseX) * 12) * dt
        b.y += (b.vy + Math.cos(sec * b.freqY + b.phaseY) * 12) * dt

        // Wrap
        const m = b.radius * 0.4
        if (b.x < -m) b.x = w + m
        if (b.x > w + m) b.x = -m
        if (b.y < -m) b.y = h + m
        if (b.y > h + m) b.y = -m

        // Pulse
        const pulse = 0.5 + Math.sin(sec * b.pulseSpeed + b.pulsePhase) * 0.5
        ctx.globalAlpha = b.baseAlpha * (0.7 + pulse * 0.3)

        // Draw pre-rendered blob
        const oc = blobCanvases[i]
        if (oc) {
          ctx.drawImage(oc, b.x - b.radius, b.y - b.radius, b.radius * 2, b.radius * 2)
        }
      }

      // ── Particles (simple rects, no arcs, no connections) ──
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx * dt
        p.y += p.vy * dt

        if (p.x > w + 3) p.x = -3
        if (p.x < -3) p.x = w + 3
        if (p.y > h + 3) p.y = -3
        if (p.y < -3) p.y = h + 3

        const twinkle = 0.6 + Math.sin(time * 0.002 * p.twinkleSpeed + p.twinklePhase) * 0.4
        ctx.globalAlpha = p.alpha * twinkle
        ctx.fillStyle = particleColor + '1)'
        ctx.fillRect(p.x, p.y, p.size, p.size)
      }

      ctx.globalAlpha = 1
    }

    const render = (time: number) => {
      const dt = clamp((time - lastTime) / 1000, 0, 0.05)
      lastTime = time
      draw(time, dt)
      rafId = window.requestAnimationFrame(render)
    }

    const renderStatic = () => draw(0, 0)

    const start = () => {
      lastTime = performance.now()
      rafId = window.requestAnimationFrame(render)
    }

    const stop = () => {
      if (rafId) { window.cancelAnimationFrame(rafId); rafId = 0 }
    }

    const onResize = () => {
      if (resizeRaf) return
      resizeRaf = window.requestAnimationFrame(() => {
        resizeRaf = 0
        resize()
        if (reduced) renderStatic()
      })
    }

    const onMotion = (e: MediaQueryListEvent) => {
      reduced = e.matches
      stop()
      reduced ? renderStatic() : start()
    }

    resize()
    reduced ? renderStatic() : start()

    window.addEventListener('resize', onResize, { passive: true })
    if (typeof mqReduced.addEventListener === 'function') {
      mqReduced.addEventListener('change', onMotion)
    } else {
      mqReduced.addListener(onMotion)
    }

    return () => {
      stop()
      window.cancelAnimationFrame(resizeRaf)
      window.removeEventListener('resize', onResize)
      if (typeof mqReduced.removeEventListener === 'function') {
        mqReduced.removeEventListener('change', onMotion)
      } else {
        mqReduced.removeListener(onMotion)
      }
    }
  }, [theme])

  return (
    <div className="global-ambient-bg" aria-hidden="true">
      <canvas ref={canvasRef} className="ambient-canvas" />
      <span className="ambient-grid" />
      <span className="ambient-vignette" />
    </div>
  )
}

const AmbientBackground = React.memo(AmbientBackgroundComponent)
export default AmbientBackground
