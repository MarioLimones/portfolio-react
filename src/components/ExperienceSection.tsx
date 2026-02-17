import React from 'react'
import { motion } from 'framer-motion'

const expAlphaImg = new URL('../imgs/exp_alpha.svg', import.meta.url).href
const expBetaImg = new URL('../imgs/exp_beta.svg', import.meta.url).href
const expGammaImg = new URL('../imgs/airbusCompañeros.jpeg', import.meta.url).href

const experience = [
    {
        role: 'Desarrollador de Software',
        company: 'Core Networks',
        time: '2024 - Actualidad',
        summary: 'Desarrollo de aplicaciones backend con tecnologías modernas y arquitectura escalable.',
        image: expAlphaImg,
        imageAlt: 'Dashboard de arquitectura y rendimiento para Core Networks',
    },
    {
        role: 'Lab Sevilla',
        company: 'Desarrollador Frontend con WordPress',
        time: '2025 - 2025',
        summary: 'Desarrollo de temas y plugins para WordPress en entornos de producción.',
        image: expBetaImg,
        imageAlt: 'Panel de despliegues y observabilidad para Lab Sevilla',
    },
    {
        role: 'Montador de aviones',
        company: 'Airbus',
        time: '2022 - 2024',
        summary: 'Montaje de aviones comerciales y mantenimiento de componentes críticos.',
        image: expGammaImg,
        imageAlt: 'Compañeros de trabajo en Airbus',
    },
]

function ExperienceSectionComponent() {
    const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null)

    return (
        <section className="px-4 py-20" id="experiencia">
            <div className="mx-auto max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">Experiencia</p>
                    <h2 className="text-3xl font-bold text-[var(--color-text-main)] sm:text-4xl">
                        Trayectoria enfocada en impacto.
                    </h2>
                </motion.div>

                {/* Timeline */}
                <div className="relative space-y-0">
                    {/* Vertical line */}
                    <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-[var(--color-accent)]/40 via-[var(--color-border)] to-transparent md:left-8 md:block" aria-hidden="true" />

                    {experience.map((item, i) => (
                        <motion.div
                            key={`${item.role}-${item.company}`}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="relative pb-8 last:pb-0 md:pl-20"
                        >
                            {/* Timeline dot */}
                            <div className="absolute left-2.5 top-1.5 hidden h-3 w-3 rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-bg)] md:left-6.5 md:block" aria-hidden="true" />

                            <div className="group rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)]/40 p-5 backdrop-blur-sm transition-all duration-300 hover:border-[var(--color-accent)]/20 hover:bg-[var(--color-surface-strong)]/60 hover:shadow-lg sm:p-6">
                                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                                    <div>
                                        <h3 className="text-lg font-semibold text-[var(--color-text-main)]">{item.role}</h3>
                                        <p className="text-sm font-medium text-[var(--color-accent)]">{item.company}</p>
                                    </div>
                                    <span className="shrink-0 rounded-full bg-[var(--color-surface-strong)] px-3 py-1 text-xs font-medium text-[var(--color-muted-strong)]">
                                        {item.time}
                                    </span>
                                </div>
                                <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{item.summary}</p>

                                {/* Expandable image */}
                                <button
                                    type="button"
                                    onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                                    className="mt-3 text-xs font-medium text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent)]/80 focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                                    aria-expanded={expandedIndex === i}
                                    aria-label={expandedIndex === i ? 'Ocultar imagen' : 'Ver imagen'}
                                >
                                    {expandedIndex === i ? '▲ Ocultar imagen' : '▼ Ver imagen'}
                                </button>

                                {expandedIndex === i && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="mt-3 overflow-hidden rounded-xl"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.imageAlt}
                                            loading="lazy"
                                            className="h-auto w-full rounded-xl object-cover"
                                        />
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

const ExperienceSection = React.memo(ExperienceSectionComponent)
export default ExperienceSection
