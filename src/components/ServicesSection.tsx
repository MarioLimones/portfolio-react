import React from 'react'
import { motion } from 'framer-motion'

const services = [
    {
        title: 'Backend de alto rendimiento',
        text: 'APIs, colas, cache y bases de datos optimizadas para trafico real.',
        icon: '⚡',
    },
    {
        title: 'Arquitectura y escalado',
        text: 'Diseno de sistemas distribuidos, patrones de resiliencia y SLOs claros.',
        icon: '🏗️',
    },
    {
        title: 'Data y automatizacion',
        text: 'ETLs, pipelines en tiempo real y automatizaciones que liberan al equipo.',
        icon: '🔄',
    },
    {
        title: 'Consultoria tecnica',
        text: 'Auditorias, roadmap tecnico y coaching para equipos senior y mid-level.',
        icon: '💡',
    },
]

const processSteps = [
    {
        title: 'Exploracion',
        text: 'Entendemos el negocio, usuarios y fricciones reales antes de escribir codigo.',
    },
    {
        title: 'Diseno del sistema',
        text: 'Definimos arquitectura, riesgos, roadmap y metricas de exito.',
    },
    {
        title: 'Entrega incremental',
        text: 'Sprints cortos con resultados medibles y feedback continuo.',
    },
    {
        title: 'Optimiza y escala',
        text: 'Observabilidad, ajustes de performance y automatizacion continua.',
    },
]

function ServicesSectionComponent() {
    return (
        <section className="px-4 py-20" id="servicios">
            <div className="mx-auto max-w-6xl">
                {/* Services */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="mb-10"
                >
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">Servicios</p>
                    <h2 className="text-3xl font-bold text-[var(--color-text-main)] sm:text-4xl">
                        Una caja de herramientas lista para desafios complejos.
                    </h2>
                    <p className="mt-2 text-sm text-[var(--color-muted-soft)]">Adaptable a equipos, productos y etapas de crecimiento.</p>
                </motion.div>

                <div className="mb-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {services.map((service, i) => (
                        <motion.article
                            key={service.title}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            className="group relative overflow-hidden rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)]/40 p-5 backdrop-blur-sm transition-all duration-300 hover:border-[var(--color-accent)]/20 hover:bg-[var(--color-surface-strong)]/60 hover:shadow-xl"
                        >
                            <span className="mb-3 block text-2xl">{service.icon}</span>
                            <span className="mb-2 block text-xs font-bold text-[var(--color-accent)]/60">0{i + 1}</span>
                            <h3 className="mb-2 text-base font-semibold text-[var(--color-text-main)] transition-colors duration-200 group-hover:text-[var(--color-accent)]">
                                {service.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-[var(--color-muted)]">{service.text}</p>
                        </motion.article>
                    ))}
                </div>

                {/* Process */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="mb-10"
                >
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">Proceso</p>
                    <h2 className="text-3xl font-bold text-[var(--color-text-main)] sm:text-4xl">
                        Metodo claro, entregas consistentes.
                    </h2>
                    <p className="mt-2 text-sm text-[var(--color-muted-soft)]">Transparencia total y foco en impacto.</p>
                </motion.div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {processSteps.map((step, i) => (
                        <motion.article
                            key={step.title}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            className="group relative rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)]/40 p-5 backdrop-blur-sm transition-all duration-300 hover:border-[var(--color-accent)]/20 hover:bg-[var(--color-surface-strong)]/60 hover:shadow-xl"
                        >
                            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-accent)]/15 to-[var(--color-accent-2)]/15 text-sm font-bold text-[var(--color-accent)]">
                                0{i + 1}
                            </div>
                            <h3 className="mb-2 text-base font-semibold text-[var(--color-text-main)] transition-colors duration-200 group-hover:text-[var(--color-accent)]">
                                {step.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-[var(--color-muted)]">{step.text}</p>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    )
}

const ServicesSection = React.memo(ServicesSectionComponent)
export default ServicesSection
