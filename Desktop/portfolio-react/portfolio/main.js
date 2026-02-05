const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

const smoothBehavior = prefersReducedMotion ? 'auto' : 'smooth'

const smoothScrollTop = () => {
  window.scrollTo({ top: 0, behavior: smoothBehavior })
}

const setNavOffset = (topbar) => {
  if (!topbar) return
  const update = () => {
    const rect = topbar.getBoundingClientRect()
    const topValue = parseFloat(getComputedStyle(topbar).top) || 0
    const offset = Math.round(rect.height + topValue + 8)
    document.documentElement.style.setProperty('--nav-offset', `${offset}px`)
  }

  update()
  window.addEventListener('resize', () => requestAnimationFrame(update), { passive: true })
}

const releaseScrollIfLocked = () => {
  const html = document.documentElement
  if (document.body.style.overflow === 'hidden' || html.style.overflow === 'hidden') {
    document.body.style.overflow = ''
    html.style.overflow = ''
  }
  document.body.classList.remove('is-loading')
}

const ensureContentReady = () => {
  document.body.classList.add('content-ready')
}

const init = () => {
  const topbar = document.querySelector('.topbar')
  if (!topbar) return false

  document.body.classList.add('nav-stable')
  setNavOffset(topbar)

  const homeLink = document.querySelector('a[href="#inicio"]')
  if (homeLink) {
    homeLink.addEventListener('click', (event) => {
      event.preventDefault()
      smoothScrollTop()
    })
  }

  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#inicio') {
      smoothScrollTop()
    }
  })

  const appContent = document.querySelector('.app-content')
  if (appContent) {
    const onDone = (event) => {
      if (event.animationName === 'content-reveal') {
        ensureContentReady()
      }
    }
    appContent.addEventListener('animationend', onDone, { once: true })
    window.setTimeout(ensureContentReady, 2000)
  }

  window.setTimeout(releaseScrollIfLocked, 4500)
  return true
}

const boot = () => {
  let attempts = 0
  const tryInit = () => {
    const ready = init()
    if (ready) return
    attempts += 1
    if (attempts < 30) {
      requestAnimationFrame(tryInit)
    }
  }
  tryInit()
}

window.addEventListener('DOMContentLoaded', boot)
