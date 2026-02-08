import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import Portfolio from '../portfolio'

const ensureMatchMedia = () => {
  if (typeof window.matchMedia === 'function') {
    return
  }
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }),
  })
}

describe('Portfolio', () => {
  it('renders the topbar with navigation', () => {
    render(<Portfolio ready={false} theme="dark" onToggleTheme={vi.fn()} />)

    expect(screen.getAllByText('Mario Limones')[0]).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Proyectos' })).toBeInTheDocument()
  })

  it('links to the Contacto section anchor', () => {
    render(<Portfolio ready={false} theme="dark" onToggleTheme={vi.fn()} />)

    const target = document.getElementById('contacto')
    expect(target).toBeTruthy()

    const [link] = screen.getAllByRole('link', { name: 'Contacto' })
    expect(link).toHaveAttribute('href', '#contacto')
  })

  it('smoothly scrolls to the target section when clicking a nav link', async () => {
    ensureMatchMedia()

    const user = userEvent.setup()
    render(<Portfolio ready={false} theme="dark" onToggleTheme={vi.fn()} />)

    const target = document.getElementById('experiencia') as HTMLElement
    expect(target).toBeTruthy()

    const scrollIntoViewMock = vi.fn()
    target.scrollIntoView = scrollIntoViewMock

    const [link] = screen.getAllByRole('link', { name: 'Experiencia' })
    await user.click(link)

    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' })
    expect(window.location.hash).toBe('#experiencia')
  })
})
