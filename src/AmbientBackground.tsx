import React from 'react'

type Star = {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  alpha: number
  twinkleSpeed: number
  twinkleOffset: number
}

type ColorDrifter = {
  color: string
  radius: number
  opacityMin: number
  opacityMax: number
  x: number
  y: number
  vx: number
  vy: number
  driftAngle: number
  driftSpeed: number
  driftTurnRate: number
  flowPhaseX: number
  flowPhaseY: number
  flowFreqX: number
  flowFreqY: number
  pulseOffset: number
  pulseSpeed: number
}

type Theme = 'dark' | 'light'

type AmbientBackgroundProps = {
  theme: Theme
}

const MIN_STARS = 22
const MAX_STARS = 68
const MAX_DPR = 1.75
const DRIFTER_EDGE_MARGIN = 120
const MIN_DRIFTER_SPEED = 26
const MAX_DRIFTER_SPEED = 58
const FLOW_ACCEL = 28
const VELOCITY_BLEND = 3.4

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))

const getStarCount = (width: number, height: number) => {
  const count = Math.round((width * height) / 26000)
  return clamp(count, MIN_STARS, MAX_STARS)
}

const createStars = (width: number, height: number): Star[] => {
  const count = getStarCount(width, height)
  const stars: Star[] = []

  for (let index = 0; index < count; index += 1) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 0.6 + Math.random() * 1.4,
      speedX: (Math.random() - 0.5) * 8,
      speedY: 2 + Math.random() * 8,
      alpha: 0.22 + Math.random() * 0.42,
      twinkleSpeed: 0.5 + Math.random() * 1.5,
      twinkleOffset: Math.random() * Math.PI * 2,
    })
  }

  return stars
}

const getRandomAngle = () => Math.random() * Math.PI * 2
const getRandomSpeed = () => MIN_DRIFTER_SPEED + Math.random() * (MAX_DRIFTER_SPEED - MIN_DRIFTER_SPEED)

const createColorDrifters = (
  width: number,
  height: number,
  colors: string[]
): ColorDrifter[] => {
  const drifterColors = colors
  const centerY = height * 0.5
  const horizontalStep = width / (drifterColors.length + 1)

  return drifterColors.map((color, index) => {
    const baseX = horizontalStep * (index + 1)
    const baseY = centerY + (Math.random() - 0.5) * height * 0.24
    const driftAngle = getRandomAngle()
    const driftSpeed = getRandomSpeed()
    const vx = Math.cos(driftAngle) * driftSpeed
    const vy = Math.sin(driftAngle) * driftSpeed

    return {
      color,
      radius: 6 + Math.random() * 2.4,
      opacityMin: 0.44 + Math.random() * 0.1,
      opacityMax: 0.78 + Math.random() * 0.12,
      x: baseX + (Math.random() - 0.5) * 90,
      y: baseY,
      vx,
      vy,
      driftAngle,
      driftSpeed,
      driftTurnRate: (Math.random() - 0.5) * 0.36,
      flowPhaseX: Math.random() * Math.PI * 2,
      flowPhaseY: Math.random() * Math.PI * 2,
      flowFreqX: 0.32 + Math.random() * 0.34,
      flowFreqY: 0.28 + Math.random() * 0.38,
      pulseOffset: Math.random() * Math.PI * 2,
      pulseSpeed: 0.95 + Math.random() * 0.7,
    }
  })
}

function AmbientBackgroundComponent({ theme }: AmbientBackgroundProps) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    const context = canvas.getContext('2d', { alpha: true, desynchronized: true })
    if (!context) {
      return
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let reducedMotion = mediaQuery.matches
    let width = 0
    let height = 0
    let stars: Star[] = []
    let drifters: ColorDrifter[] = []
    const drifterPalette =
      theme === 'light' ? ['#1aa997', '#3b6aff', '#ff9b3f'] : ['#2dd7b7', '#4c7dff', '#ffb357']
    const starColor = theme === 'light' ? '#5a667f' : '#d8e5ff'
    let rafId = 0
    let resizeRaf = 0
    let lastFrameTime = performance.now()

    const resize = () => {
      const nextWidth = window.innerWidth
      const nextHeight = window.innerHeight
      const dpr = clamp(window.devicePixelRatio || 1, 1, MAX_DPR)

      if (nextWidth === width && nextHeight === height) {
        return
      }

      width = nextWidth
      height = nextHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)

      stars = createStars(width, height)
      drifters = createColorDrifters(width, height, drifterPalette)
    }

    const drawFrame = (time: number, deltaSeconds: number) => {
      context.clearRect(0, 0, width, height)
      const seconds = time * 0.001

      for (let index = 0; index < drifters.length; index += 1) {
        const drifter = drifters[index]
        drifter.driftAngle += drifter.driftTurnRate * deltaSeconds
        const driftVx = Math.cos(drifter.driftAngle) * drifter.driftSpeed
        const driftVy = Math.sin(drifter.driftAngle) * drifter.driftSpeed
        const flowX = Math.cos(seconds * drifter.flowFreqX + drifter.flowPhaseX) * FLOW_ACCEL
        const flowY = Math.sin(seconds * drifter.flowFreqY + drifter.flowPhaseY) * FLOW_ACCEL
        const targetVx = driftVx + flowX
        const targetVy = driftVy + flowY

        const blend = clamp(VELOCITY_BLEND * deltaSeconds, 0, 1)
        drifter.vx += (targetVx - drifter.vx) * blend
        drifter.vy += (targetVy - drifter.vy) * blend

        const speed = Math.hypot(drifter.vx, drifter.vy) || 0.0001
        if (speed > MAX_DRIFTER_SPEED) {
          const ratio = MAX_DRIFTER_SPEED / speed
          drifter.vx *= ratio
          drifter.vy *= ratio
        } else if (speed < MIN_DRIFTER_SPEED) {
          const ratio = MIN_DRIFTER_SPEED / speed
          drifter.vx *= ratio
          drifter.vy *= ratio
        }

        drifter.x += drifter.vx * deltaSeconds
        drifter.y += drifter.vy * deltaSeconds

        if (drifter.x < -DRIFTER_EDGE_MARGIN) drifter.x = width + DRIFTER_EDGE_MARGIN
        if (drifter.x > width + DRIFTER_EDGE_MARGIN) drifter.x = -DRIFTER_EDGE_MARGIN
        if (drifter.y < -DRIFTER_EDGE_MARGIN) drifter.y = height + DRIFTER_EDGE_MARGIN
        if (drifter.y > height + DRIFTER_EDGE_MARGIN) drifter.y = -DRIFTER_EDGE_MARGIN

        const pulseWave = 0.5 + Math.sin(seconds * drifter.pulseSpeed + drifter.pulseOffset) * 0.5
        const alpha = drifter.opacityMin + (drifter.opacityMax - drifter.opacityMin) * pulseWave

        context.globalAlpha = alpha
        context.fillStyle = drifter.color
        context.beginPath()
        context.arc(drifter.x, drifter.y, drifter.radius, 0, Math.PI * 2)
        context.fill()
      }

      context.fillStyle = starColor
      for (let index = 0; index < stars.length; index += 1) {
        const star = stars[index]

        star.x += star.speedX * deltaSeconds
        star.y += star.speedY * deltaSeconds

        if (star.x > width + 2) star.x = -2
        if (star.x < -2) star.x = width + 2
        if (star.y > height + 2) star.y = -2

        const twinkle = 0.72 + Math.sin(time * 0.0014 * star.twinkleSpeed + star.twinkleOffset) * 0.28
        context.globalAlpha = star.alpha * twinkle
        context.fillRect(star.x, star.y, star.size, star.size)
      }

      context.globalAlpha = 1
    }

    const render = (time: number) => {
      const deltaSeconds = clamp((time - lastFrameTime) / 1000, 0, 0.05)
      lastFrameTime = time
      drawFrame(time, deltaSeconds)
      rafId = window.requestAnimationFrame(render)
    }

    const renderStatic = () => {
      drawFrame(0, 0)
    }

    const startLoop = () => {
      lastFrameTime = performance.now()
      rafId = window.requestAnimationFrame(render)
    }

    const stopLoop = () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId)
        rafId = 0
      }
    }

    const handleResize = () => {
      if (resizeRaf !== 0) {
        return
      }

      resizeRaf = window.requestAnimationFrame(() => {
        resizeRaf = 0
        resize()
        if (reducedMotion) {
          renderStatic()
        }
      })
    }

    const handleMotionChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches
      stopLoop()
      if (reducedMotion) {
        renderStatic()
      } else {
        startLoop()
      }
    }

    resize()
    if (reducedMotion) {
      renderStatic()
    } else {
      startLoop()
    }

    window.addEventListener('resize', handleResize, { passive: true })
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleMotionChange)
    } else {
      mediaQuery.addListener(handleMotionChange)
    }

    return () => {
      stopLoop()
      window.cancelAnimationFrame(resizeRaf)
      window.removeEventListener('resize', handleResize)
      if (typeof mediaQuery.removeEventListener === 'function') {
        mediaQuery.removeEventListener('change', handleMotionChange)
      } else {
        mediaQuery.removeListener(handleMotionChange)
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
