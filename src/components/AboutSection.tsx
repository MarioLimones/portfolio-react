import React from 'react'
import { motion } from 'framer-motion'

const heroHighlights = [
    {
        title: 'Arquitectura escalable',
        text: 'Diseño aplicaciones backend con Spring Boot y APIs REST bien estructuradas, separando capas y preparando el código para crecer sin rehacerlo todo.',
    },
    {
        title: 'Velocidad sin deuda',
        text: 'Desarrollo funcionalidades de forma incremental, priorizando código claro, mantenible y funcional desde el primer commit.',
    },
    {
        title: 'Impacto medible',
        text: 'He construido proyectos completos que automatizan procesos, validan datos y reducen errores, mejorando la usabilidad y la fiabilidad de las aplicaciones.',
    },
]

const stats = [
    { value: '3+', label: 'Proyectos', hint: 'Aplicaciones backend y full-stack' },
    { value: 'DAM', label: 'Desarrollo de Aplicaciones Multiplataforma', hint: 'Formación técnica en curso' },
    { value: '0', label: 'Código claro y directo al problema' },
]

function AboutSectionComponent() {
    return (
        <section className="px-4 py-20" id="about">
            <div className="mx-auto max-w-6xl">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">Sobre mí</p>
                    <h2 className="text-3xl font-bold text-[var(--color-text-main)] sm:text-4xl">
                        Desarrollador de software en formación.
                    </h2>
                    <p className="mt-3 max-w-2xl text-base text-[var(--color-muted)]">
                        Trabajo para proyectos académicos y personales orientados a resolver problemas reales con tecnología. Mi enfoque es aprender y crecer como desarrollador, aportando valor a través de soluciones simples y efectivas.
                    </p>
                    <p className="mt-2 max-w-2xl text-sm text-[var(--color-muted-soft)]">
                        Diseño y desarrollo aplicaciones web completas, desde el backend con Java y Spring Boot hasta el frontend con JavaScript y React, creando APIs REST y interfaces claras y funcionales.
                    </p>
                </motion.div>

                {/* Metrics */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="mb-14 grid gap-4 sm:grid-cols-3"
                >
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="group rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)]/60 p-5 backdrop-blur-sm transition-all duration-300 hover:border-[var(--color-accent)]/30 hover:bg-[var(--color-surface-strong)]/80 hover:shadow-lg"
                        >
                            <p className="mb-1 text-2xl font-bold text-[var(--color-accent)]">{stat.value}</p>
                            <p className="text-sm font-medium text-[var(--color-text-main)]">{stat.label}</p>
                            {stat.hint && <p className="mt-1 text-xs text-[var(--color-muted-soft)]">{stat.hint}</p>}
                        </div>
                    ))}
                </motion.div>

                {/* Highlights */}
                <div className="grid gap-4 md:grid-cols-3">
                    {heroHighlights.map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, delay: i * 0.1 + 0.1 }}
                            className="group rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)]/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[var(--color-accent)]/20 hover:bg-[var(--color-surface-strong)]/60 hover:shadow-xl"
                        >
                            <h3 className="mb-2 text-lg font-semibold text-[var(--color-text-main)] transition-colors duration-200 group-hover:text-[var(--color-accent)]">
                                {item.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-[var(--color-muted)]">{item.text}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

const AboutSection = React.memo(AboutSectionComponent)
export default AboutSection
