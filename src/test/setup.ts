import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

type MatchMediaResult = {
  matches: boolean
  media: string
  onchange: ((event: MediaQueryListEvent) => void) | null
  addListener: (listener: (event: MediaQueryListEvent) => void) => void
  removeListener: (listener: (event: MediaQueryListEvent) => void) => void
  addEventListener: (type: string, listener: (event: MediaQueryListEvent) => void) => void
  removeEventListener: (type: string, listener: (event: MediaQueryListEvent) => void) => void
  dispatchEvent: (event: Event) => boolean
}

if (!window.matchMedia) {
  window.matchMedia = (query: string): MatchMediaResult => {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }
  }
}

if (!window.IntersectionObserver) {
  class MockIntersectionObserver implements IntersectionObserver {
    readonly root: Element | Document | null = null
    readonly rootMargin = ''
    readonly thresholds: number[] = []
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords(): IntersectionObserverEntry[] {
      return []
    }
  }

  window.IntersectionObserver = MockIntersectionObserver
}

if (!window.ResizeObserver) {
  class MockResizeObserver implements ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  window.ResizeObserver = MockResizeObserver
}

if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (callback: FrameRequestCallback): number => {
    callback(0)
    return 0
  }
}

if (!window.cancelAnimationFrame) {
  window.cancelAnimationFrame = () => {}
}
