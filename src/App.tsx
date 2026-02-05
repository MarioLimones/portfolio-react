import React from 'react'
import AmbientBackground from './AmbientBackground'
import Portfolio from './portfolio.tsx'
import './App.css'

const LOADER_DURATION = 2200
const LOADER_EXIT_DURATION = 900
const loaderName = 'Mario Limones'

export default function App() {
  const [introStage, setIntroStage] = React.useState<'loading' | 'exiting' | 'done'>('loading')
  const [progress, setProgress] = React.useState(0)
  const [shouldRenderPortfolio, setShouldRenderPortfolio] = React.useState(false)
  const progressRef = React.useRef(0)

  React.useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    return () => {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto'
      }
    }
  }, [])

  React.useEffect(() => {
    const start = performance.now()
    let rafId = 0
    let doneTimer = 0
    let isComplete = false

    const tick = (now: number) => {
      if (isComplete) {
        return
      }
      const elapsed = now - start
      const percent = Math.min(100, Math.round((elapsed / LOADER_DURATION) * 100))
      if (percent !== progressRef.current) {
        progressRef.current = percent
        setProgress(percent)
      }

      if (percent < 100) {
        rafId = window.requestAnimationFrame(tick)
      } else {
        isComplete = true
        setIntroStage('exiting')
        doneTimer = window.setTimeout(() => setIntroStage('done'), LOADER_EXIT_DURATION)
      }
    }

    rafId = window.requestAnimationFrame(tick)
    return () => {
      window.cancelAnimationFrame(rafId)
      window.clearTimeout(doneTimer)
    }
  }, [])

  React.useEffect(() => {
    if (introStage === 'loading') {
      return
    }

    let rafA = 0
    let rafB = 0
    rafA = window.requestAnimationFrame(() => {
      rafB = window.requestAnimationFrame(() => setShouldRenderPortfolio(true))
    })

    return () => {
      window.cancelAnimationFrame(rafA)
      window.cancelAnimationFrame(rafB)
    }
  }, [introStage])

  React.useEffect(() => {
    const isBlocking = introStage !== 'done'
    const isLoading = introStage === 'loading'
    document.body.style.overflow = isBlocking ? 'hidden' : ''
    document.body.classList.toggle('is-loading', isLoading)
    return () => {
      document.body.style.overflow = ''
      document.body.classList.remove('is-loading')
    }
  }, [introStage])

  const isExiting = introStage !== 'loading'
  const isDone = introStage === 'done'
  const progressScale = progress / 100

  return (
    <div className="app-shell">
      <AmbientBackground />
      <div
        className={`intro-loader ${isExiting ? 'is-exiting' : ''} ${isDone ? 'is-gone' : ''}`}
        aria-hidden={isExiting}
      >
        <div className="intro-scene" aria-live="polite">
          <p className="intro-name">{loaderName}</p>
          <div className="intro-progress">
            <div className="intro-progress-bar" style={{ transform: `scaleX(${progressScale})` }} />
          </div>
          <span className="intro-percent">{progress}%</span>
        </div>
      </div>
      <div className={`app-content ${isDone ? 'is-revealing' : ''}`}>
        {shouldRenderPortfolio ? <Portfolio ready={isDone} /> : null}
      </div>
    </div>
  )
}
