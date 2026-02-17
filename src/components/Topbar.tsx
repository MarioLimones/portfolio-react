import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Theme = 'dark' | 'light'

type TopbarProps = {
    theme: Theme
    onToggleTheme: () => void
}

const navLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Proyectos', href: '#proyectos' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experiencia', href: '#experiencia' },
    { label: 'Contacto', href: '#contacto' },
]

const cvUrl = new URL('../imgs/Cv-LimonesBernabe-Mario.pdf', import.meta.url).href

function TopbarComponent({ theme, onToggleTheme }: TopbarProps) {
    const [isHidden, setIsHidden] = React.useState(false)
    const [mobileOpen, setMobileOpen] = React.useState(false)
    const [activeSection, setActiveSection] = React.useState('')
    const isHiddenRef = React.useRef(false)

    const handleNavClick = React.useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
        const anchor = event.currentTarget
        const href = anchor.getAttribute('href')
        if (!href || !href.startsWith('#')) return

        const target = document.querySelector<HTMLElement>(href)
        if (!target) return

        event.preventDefault()
        setMobileOpen(false)

        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' })
        window.history.pushState(null, '', href)
    }, [])

    React.useEffect(() => {
        let lastY = window.scrollY
        let ticking = false

        const onScroll = () => {
            if (ticking) return
            ticking = true

            window.requestAnimationFrame(() => {
                const currentY = window.scrollY
                const shouldHide = currentY > lastY && currentY > 80

                if (shouldHide !== isHiddenRef.current) {
                    isHiddenRef.current = shouldHide
                    setIsHidden(shouldHide)
                }

                lastY = currentY
                ticking = false
            })
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    // Track active section
    React.useEffect(() => {
        const sectionIds = navLinks.map(l => l.href.slice(1)).filter(Boolean)
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id)
                    }
                })
            },
            { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
        )

        sectionIds.forEach((id) => {
            const el = document.getElementById(id)
            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
    }, [])

    return (
        <>
            <header
                className={`sticky top-3 z-[2000] mx-auto flex max-w-5xl items-center justify-between gap-3 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-strong)]/80 px-4 py-2.5 shadow-lg backdrop-blur-xl transition-all duration-300 ${isHidden ? '-translate-y-[140%] opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
                    }`}
            >
                {/* Brand */}
                <div className="flex items-center gap-2.5">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-2)] text-sm font-bold text-[#0a0b11]">
                        ML
                    </span>
                    <div className="hidden sm:block">
                        <p className="text-sm font-semibold text-[var(--color-text-main)]">Mario Limones</p>
                        <p className="text-xs text-[var(--color-muted)]">Desarrollador de Software</p>
                    </div>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden items-center gap-1 md:flex" role="navigation" aria-label="Navegación principal">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={handleNavClick}
                            className={`relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200 hover:text-[var(--color-text-main)] ${activeSection === link.href.slice(1)
                                    ? 'text-[var(--color-accent)] bg-[var(--color-accent)]/10'
                                    : 'text-[var(--color-muted)]'
                                }`}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <button
                        className="grid h-9 w-9 place-items-center rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-surface-weak)] text-[var(--color-text-main)] transition-all duration-200 hover:scale-105 hover:bg-[var(--color-surface-strong)] focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                        type="button"
                        onClick={onToggleTheme}
                        aria-pressed={theme === 'light'}
                        aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
                    >
                        {theme === 'dark' ? (
                            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                                <path d="M12 4.75a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 12 4.75Zm5.657 2.343a.75.75 0 0 1 1.06 0l.354.353a.75.75 0 1 1-1.06 1.06l-.354-.353a.75.75 0 0 1 0-1.06ZM19.25 12a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1-.75-.75Zm-1.533 5.407a.75.75 0 0 1 1.06 1.06l-.353.354a.75.75 0 1 1-1.06-1.06l.353-.354ZM12 19.25a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1-.75-.75ZM5.923 17.77a.75.75 0 0 1 0-1.06l.353-.354a.75.75 0 1 1 1.06 1.06l-.353.354a.75.75 0 0 1-1.06 0ZM4.75 12a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1-.75-.75Zm1.173-6.154a.75.75 0 0 1 1.06-1.06l.353.354a.75.75 0 1 1-1.06 1.06l-.353-.354ZM12 7.25A4.75 4.75 0 1 0 12 16.75 4.75 4.75 0 0 0 12 7.25Z" />
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                                <path d="M21 14.5A8.5 8.5 0 1 1 9.5 3a6.5 6.5 0 0 0 11.5 11.5Z" />
                            </svg>
                        )}
                    </button>

                    <a
                        className="hidden rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] px-4 py-2 text-sm font-bold text-[#0a0b11] shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl sm:inline-flex"
                        href={cvUrl}
                        target="_blank"
                        rel="noreferrer"
                    >
                        Descargar CV
                    </a>

                    {/* Mobile hamburger */}
                    <button
                        className="grid h-9 w-9 place-items-center rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-surface-weak)] text-[var(--color-text-main)] md:hidden"
                        type="button"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Abrir menú"
                        aria-expanded={mobileOpen}
                    >
                        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                            {mobileOpen ? (
                                <path d="M6.4 6.4l11.2 11.2m0-11.2L6.4 17.6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                            ) : (
                                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                            )}
                        </svg>
                    </button>
                </div>
            </header>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-[1999] bg-black/60 backdrop-blur-sm md:hidden"
                            onClick={() => setMobileOpen(false)}
                        />
                        <motion.nav
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="fixed right-0 top-0 z-[2001] flex h-full w-72 flex-col gap-2 border-l border-[var(--color-border)] bg-[var(--color-bg-strong)]/95 p-6 pt-20 backdrop-blur-2xl md:hidden"
                            role="navigation"
                            aria-label="Menú móvil"
                        >
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.href}
                                    href={link.href}
                                    onClick={handleNavClick}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 + 0.1 }}
                                    className={`rounded-xl px-4 py-3 text-base font-medium transition-colors ${activeSection === link.href.slice(1)
                                            ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]'
                                            : 'text-[var(--color-muted)] hover:text-[var(--color-text-main)]'
                                        }`}
                                >
                                    {link.label}
                                </motion.a>
                            ))}
                            <a
                                className="mt-4 rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] px-4 py-3 text-center text-sm font-bold text-[#0a0b11]"
                                href={cvUrl}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Descargar CV
                            </a>
                        </motion.nav>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}

const Topbar = React.memo(TopbarComponent)
export default Topbar
