import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const portada_gestortareas = new URL('../imgs/portada_gestortareas.png', import.meta.url).href
const port_antiguo = new URL('../imgs/port_antiguo.png', import.meta.url).href

type Project = {
    title: string
    description: string
    tags: string[]
    year: string
    img?: string
}

const projects: Project[] = [
    {
        img: portada_gestortareas,
        title: 'Gestor de tareas',
        description: 'Aplicación android básica que permite crear, asignar y completar tareas.',
        tags: ['Android', 'Kotlin', 'Android Studio'],
        year: '2026',
    },
    {
        title: 'App de Preguntas y Respuestas',
        description: 'Aplicación realizada en Spring Boot con Java implementando una API REST con JPA y MySQL.',
        tags: ['Spring Boot', 'Java', 'JPA', 'MySQL'],
        year: '2026',
    },
    {
        title: 'Portfolio antiguo',
        img: port_antiguo,
        description: 'Pagina web personal que realizé en mi primer año como desarrollador con conocimientos básicos.',
        tags: ['HTML', 'CSS', 'JavaScript'],
        year: '2025',
    },
]

const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)))

function ProjectCard({ project, index }: { project: Project; index: number }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)]/40 backdrop-blur-sm transition-all duration-300 hover:border-[var(--color-accent)]/20 hover:shadow-2xl"
        >
            {/* Image */}
            <div className="relative aspect-video overflow-hidden bg-[var(--color-surface-strong)]">
                {project.img ? (
                    <img
                        src={project.img}
                        alt={`Portada ${project.title}`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        width="600"
                        height="338"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--color-accent)]/10 to-[var(--color-accent-2)]/10">
                        <span className="text-4xl font-bold text-[var(--color-accent)]/30">{project.title.charAt(0)}</span>
                    </div>
                )}
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                {/* Year badge */}
                <span className="absolute right-3 top-3 rounded-full bg-[var(--color-bg)]/80 px-2.5 py-1 text-xs font-semibold text-[var(--color-muted-strong)] backdrop-blur-md">
                    {project.year}
                </span>
                {/* Hover metadata */}
                <div className="absolute bottom-3 left-3 right-3 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-sm font-medium text-white drop-shadow-lg">{project.description}</p>
                </div>
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col gap-3 p-5">
                <h3 className="text-lg font-semibold text-[var(--color-text-main)] transition-colors duration-200 group-hover:text-[var(--color-accent)]">
                    {project.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--color-muted)]">{project.description}</p>
                <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full border border-[var(--color-accent)]/15 bg-[var(--color-accent)]/8 px-2.5 py-0.5 text-xs font-medium text-[var(--color-muted-strong)]"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.article>
    )
}

/* ──── Carousel ──── */
function ProjectCarousel() {
    const [current, setCurrent] = React.useState(0)
    const [direction, setDirection] = React.useState(0)
    const touchStartX = React.useRef(0)
    const carouselRef = React.useRef<HTMLDivElement>(null)

    const goTo = React.useCallback((index: number) => {
        setDirection(index > current ? 1 : -1)
        setCurrent(index)
    }, [current])

    const next = React.useCallback(() => {
        setDirection(1)
        setCurrent((c) => (c + 1) % projects.length)
    }, [])

    const prev = React.useCallback(() => {
        setDirection(-1)
        setCurrent((c) => (c - 1 + projects.length) % projects.length)
    }, [])

    // Keyboard
    React.useEffect(() => {
        const el = carouselRef.current
        if (!el) return
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') next()
            else if (e.key === 'ArrowLeft') prev()
        }
        el.addEventListener('keydown', onKey)
        return () => el.removeEventListener('keydown', onKey)
    }, [next, prev])

    const slideVariants = {
        enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
    }

    const project = projects[current]

    return (
        <div
            ref={carouselRef}
            className="relative mx-auto max-w-4xl"
            role="region"
            aria-label="Carrusel de proyectos"
            aria-roledescription="carousel"
            tabIndex={0}
            onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX }}
            onTouchEnd={(e) => {
                const diff = touchStartX.current - e.changedTouches[0].clientX
                if (Math.abs(diff) > 50) { diff > 0 ? next() : prev() }
            }}
        >
            <div className="relative overflow-hidden rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)]/30 backdrop-blur-sm">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={current}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                        className="relative"
                        role="group"
                        aria-roledescription="slide"
                        aria-label={`${current + 1} de ${projects.length}: ${project.title}`}
                    >
                        {/* Image */}
                        <div className="relative aspect-video overflow-hidden bg-[var(--color-surface-strong)]">
                            {project.img ? (
                                <img
                                    src={project.img}
                                    alt={`Portada ${project.title}`}
                                    loading="lazy"
                                    className="h-full w-full object-cover"
                                    width="800"
                                    height="450"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--color-accent)]/10 to-[var(--color-accent-2)]/10">
                                    <span className="text-6xl font-bold text-[var(--color-accent)]/20">{project.title.charAt(0)}</span>
                                </div>
                            )}
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                            {/* Content on overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <span className="mb-2 inline-block rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-semibold text-white/90 backdrop-blur-sm">
                                    {project.year}
                                </span>
                                <h3 className="mb-1.5 text-xl font-bold text-white sm:text-2xl">{project.title}</h3>
                                <p className="mb-3 max-w-lg text-sm text-white/80">{project.description}</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-medium text-white/90 backdrop-blur-sm">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Controls with arrows */}
            <div className="mt-4 flex items-center justify-between gap-4">
                <button
                    onClick={prev}
                    aria-label="Proyecto anterior"
                    className="grid h-10 w-10 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-weak)] text-[var(--color-text-main)] transition-all duration-200 hover:scale-110 hover:bg-[var(--color-surface-strong)] focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                >
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                    </svg>
                </button>

                {/* Dots */}
                <div className="flex items-center gap-2" role="tablist" aria-label="Indicadores del carrusel">
                    {projects.map((_, i) => (
                        <button
                            key={i}
                            role="tab"
                            aria-selected={i === current}
                            aria-label={`Ir al proyecto ${i + 1}`}
                            onClick={() => goTo(i)}
                            className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] ${i === current
                                    ? 'w-6 bg-[var(--color-accent)]'
                                    : 'w-2 bg-[var(--color-muted)]/40 hover:bg-[var(--color-muted)]/60'
                                }`}
                        />
                    ))}
                </div>

                <button
                    onClick={next}
                    aria-label="Siguiente proyecto"
                    className="grid h-10 w-10 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-weak)] text-[var(--color-text-main)] transition-all duration-200 hover:scale-110 hover:bg-[var(--color-surface-strong)] focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                >
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                        <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

/* ──── Main Projects Section ──── */
function ProjectsSectionComponent() {
    const [viewMode, setViewMode] = React.useState<'carousel' | 'grid'>('carousel')
    const [filterTag, setFilterTag] = React.useState<string | null>(null)

    const filteredProjects = filterTag ? projects.filter((p) => p.tags.includes(filterTag)) : projects

    return (
        <section className="px-4 py-20" id="proyectos">
            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="mb-10"
                >
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                        Proyectos destacados
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <h2 className="text-3xl font-bold text-[var(--color-text-main)] sm:text-4xl">
                            Casos reales, impacto medible.
                        </h2>
                        {/* View toggles */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setViewMode('carousel')}
                                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 ${viewMode === 'carousel'
                                        ? 'bg-[var(--color-accent)]/15 text-[var(--color-accent)]'
                                        : 'text-[var(--color-muted)] hover:text-[var(--color-text-main)]'
                                    }`}
                                aria-pressed={viewMode === 'carousel'}
                            >
                                Carrusel
                            </button>
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 ${viewMode === 'grid'
                                        ? 'bg-[var(--color-accent)]/15 text-[var(--color-accent)]'
                                        : 'text-[var(--color-muted)] hover:text-[var(--color-text-main)]'
                                    }`}
                                aria-pressed={viewMode === 'grid'}
                            >
                                Ver todos
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Filter tags (grid mode) */}
                <AnimatePresence>
                    {viewMode === 'grid' && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mb-8 flex flex-wrap gap-2 overflow-hidden"
                        >
                            <button
                                onClick={() => setFilterTag(null)}
                                className={`rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 ${!filterTag
                                        ? 'bg-[var(--color-accent)]/20 text-[var(--color-accent)] border border-[var(--color-accent)]/30'
                                        : 'border border-[var(--color-border-subtle)] text-[var(--color-muted)] hover:text-[var(--color-text-main)]'
                                    }`}
                            >
                                Todos
                            </button>
                            {allTags.map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => setFilterTag(filterTag === tag ? null : tag)}
                                    className={`rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 ${filterTag === tag
                                            ? 'bg-[var(--color-accent)]/20 text-[var(--color-accent)] border border-[var(--color-accent)]/30'
                                            : 'border border-[var(--color-border-subtle)] text-[var(--color-muted)] hover:text-[var(--color-text-main)]'
                                        }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Content */}
                {viewMode === 'carousel' ? (
                    <ProjectCarousel />
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredProjects.map((project, i) => (
                            <ProjectCard key={project.title} project={project} index={i} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

const ProjectsSection = React.memo(ProjectsSectionComponent)
export default ProjectsSection
