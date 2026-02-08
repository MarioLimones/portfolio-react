const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const supportsSmoothScroll = 'scrollBehavior' in document.documentElement.style

let navOffset = 0
let activeRafId = 0
let activeTimeoutId = 0
let activeSnapRestore = null

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

const easeInOutCubic = (t) => (
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
)

const getRootScroller = () => document.scrollingElement || document.documentElement

const stopActiveScroll = () => {
  if (activeRafId) {
    cancelAnimationFrame(activeRafId)
    activeRafId = 0
  }
  if (activeTimeoutId) {
    clearTimeout(activeTimeoutId)
    activeTimeoutId = 0
  }
  if (activeSnapRestore) {
    activeSnapRestore()
    activeSnapRestore = null
  }
}

const disableScrollSnap = (container) => {
  if (!container) return null
  const style = getComputedStyle(container)
  if (style.scrollSnapType && style.scrollSnapType !== 'none') {
    const previous = container.style.scrollSnapType
    container.style.scrollSnapType = 'none'
    return () => {
      container.style.scrollSnapType = previous
    }
  }
  return null
}

const getScrollContainer = (element) => {
  if (!element) return getRootScroller()
  let current = element.parentElement
  while (current && current !== document.body && current !== document.documentElement) {
    const style = getComputedStyle(current)
    const overflow = `${style.overflow} ${style.overflowY}`
    if (/(auto|scroll|overlay)/.test(overflow) && current.scrollHeight > current.clientHeight + 1) {
      return current
    }
    current = current.parentElement
  }
  return getRootScroller()
}

const getScrollTop = (scrollTarget, rootScroller) => {
  if (scrollTarget === window) {
    return window.scrollY || rootScroller.scrollTop || 0
  }
  return scrollTarget.scrollTop
}

const setScrollTopAuto = (scrollTarget, top) => {
  if (scrollTarget === window) {
    window.scrollTo(0, top)
  } else {
    scrollTarget.scrollTop = top
  }
}

const setScrollTopSmooth = (scrollTarget, top) => {
  try {
    if (scrollTarget === window) {
      window.scrollTo({ top, behavior: 'smooth' })
      return true
    }
    if (typeof scrollTarget.scrollTo === 'function') {
      scrollTarget.scrollTo({ top, behavior: 'smooth' })
      return true
    }
    return false
  } catch (error) {
    return false
  }
}

const smoothScrollTo = (scrollTarget, targetTop) => {
  const rootScroller = getRootScroller()
  const maxScroll = scrollTarget === window
    ? rootScroller.scrollHeight - window.innerHeight
    : scrollTarget.scrollHeight - scrollTarget.clientHeight
  const clampedTop = clamp(targetTop, 0, Math.max(0, maxScroll))

  stopActiveScroll()

  if (prefersReducedMotion) {
    setScrollTopAuto(scrollTarget, clampedTop)
    return
  }

  const snapRestore = disableScrollSnap(scrollTarget === window ? rootScroller : scrollTarget)
  activeSnapRestore = snapRestore

  if (supportsSmoothScroll && setScrollTopSmooth(scrollTarget, clampedTop)) {
    if (snapRestore) {
      activeTimeoutId = window.setTimeout(() => {
        if (activeSnapRestore) {
          activeSnapRestore()
          activeSnapRestore = null
        }
        activeTimeoutId = 0
      }, 700)
    }
    return
  }

  const startTop = getScrollTop(scrollTarget, rootScroller)
  const distance = clampedTop - startTop

  if (Math.abs(distance) < 1) {
    stopActiveScroll()
    return
  }

  const duration = Math.min(900, Math.max(480, Math.abs(distance) * 0.6))
  const startTime = performance.now()

  const step = (now) => {
    const progress = Math.min(1, (now - startTime) / duration)
    const eased = easeInOutCubic(progress)
    setScrollTopAuto(scrollTarget, startTop + distance * eased)
    if (progress < 1) {
      activeRafId = requestAnimationFrame(step)
    } else {
      stopActiveScroll()
    }
  }

  activeRafId = requestAnimationFrame(step)
}

const scrollToElement = (target) => {
  if (!target) return
  const rootScroller = getRootScroller()
  const container = getScrollContainer(target)
  const isRoot = container === rootScroller
  const scrollTarget = isRoot ? window : container
  const offset = navOffset || 0

  let targetTop = 0
  if (isRoot) {
    targetTop = target.getBoundingClientRect().top + getScrollTop(window, rootScroller) - offset
  } else {
    const containerRect = container.getBoundingClientRect()
    const targetRect = target.getBoundingClientRect()
    targetTop = targetRect.top - containerRect.top + container.scrollTop - offset
  }

  smoothScrollTo(scrollTarget, targetTop)
}

const setNavOffset = (topbar) => {
  if (!topbar) return
  const update = () => {
    const rect = topbar.getBoundingClientRect()
    const topValue = parseFloat(getComputedStyle(topbar).top) || 0
    navOffset = Math.round(rect.height + topValue + 8)
    document.documentElement.style.setProperty('--nav-offset', `${navOffset}px`)
    document.documentElement.style.setProperty('--topbar-offset', `${navOffset}px`)
  }

  update()
  window.addEventListener('resize', () => requestAnimationFrame(update), { passive: true })
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => requestAnimationFrame(update)).catch(() => {})
  }
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

const handleAnchorClick = (event) => {
  if (event.defaultPrevented || event.button !== 0) return
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

  const target = event.target instanceof Element ? event.target : null
  const anchor = target ? target.closest('a[href^=\"#\"]') : null
  if (!anchor) return

  const href = anchor.getAttribute('href')
  if (!href || href === '#') return

  const targetEl = document.querySelector(href)
  if (!targetEl) return

  event.preventDefault()
  scrollToElement(targetEl)

  if (history.pushState) {
    history.pushState(null, '', href)
  } else {
    window.location.hash = href
  }
}

const init = () => {
  const topbar = document.querySelector('.topbar')
  if (!topbar) return false

  document.body.classList.add('nav-stable')
  setNavOffset(topbar)

  document.addEventListener('click', handleAnchorClick)

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
