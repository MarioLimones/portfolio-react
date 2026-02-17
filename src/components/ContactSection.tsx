import React from 'react'
import { motion } from 'framer-motion'

const contactChannels = [
    {
        id: 'email',
        label: 'Email',
        title: 'Escríbeme un email',
        description: 'Comparte el contexto inicial por email y te respondo con enfoque claro y directo.',
        cta: 'Enviar email',
        href: 'mailto:mario.limobe@gmail.com',
        icon: 'M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm0 2v.2l8 4.8 8-4.8V8H4Zm16 8V9.3l-7.5 4.5a1 1 0 0 1-1 0L4 9.3V16h16Z',
    },
    {
        id: 'linkedin',
        label: 'LinkedIn',
        title: 'Conectemos en LinkedIn',
        description: 'Comparte el contexto inicial por mensaje y te respondo con enfoque claro y directo.',
        cta: 'Enviar mensaje',
        href: 'https://linkedin.com/in/tuusuario',
        icon: 'M6.94 8.5H3.28V21h3.66V8.5Zm.32-3.73c0 1.07-.86 1.94-2.12 1.94-1.24 0-2.12-.87-2.12-1.94 0-1.08.88-1.95 2.12-1.95 1.26 0 2.12.87 2.12 1.95ZM20.9 14.63V21h-3.64v-5.95c0-1.5-.54-2.52-1.88-2.52-1.03 0-1.64.7-1.91 1.37-.1.25-.12.6-.12.95V21H9.7s.05-10.44 0-11.5h3.65v1.63c.48-.75 1.34-1.82 3.25-1.82 2.38 0 4.16 1.57 4.16 4.92Z',
    },
    {
        id: 'github',
        label: 'GitHub',
        title: 'Mira mi código en GitHub',
        description: 'Creamos un canal privado para mantener la conversación y el seguimiento del proyecto.',
        cta: 'Ver GitHub',
        href: 'https://github.com/',
        icon: 'M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.48 0-.24-.01-.88-.01-1.72-2.78.62-3.37-1.38-3.37-1.38-.45-1.18-1.11-1.49-1.11-1.49-.9-.64.07-.63.07-.63 1 .07 1.52 1.05 1.52 1.05.9 1.56 2.36 1.11 2.94.85.09-.67.35-1.11.63-1.37-2.22-.26-4.56-1.15-4.56-5.12 0-1.13.39-2.06 1.03-2.78-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.05.8-.23 1.66-.35 2.51-.35.85 0 1.71.12 2.51.35 1.9-1.32 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.65 1.03 2.78 0 3.98-2.34 4.86-4.57 5.12.36.31.68.92.68 1.86 0 1.34-.01 2.42-.01 2.75 0 .27.18.59.69.48A10.04 10.04 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z',
    },
]

function ContactSectionComponent() {
    const [activeChannelId, setActiveChannelId] = React.useState(contactChannels[0].id)
    const activeChannel = contactChannels.find((c) => c.id === activeChannelId) ?? contactChannels[0]

    return (
        <section className="px-4 py-20" id="contacto">
            <div className="mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="mb-10 text-center"
                >
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">Contacto</p>
                    <h2 className="text-3xl font-bold text-[var(--color-text-main)] sm:text-4xl">
                        ¿Hablamos?
                    </h2>
                    <p className="mx-auto mt-3 max-w-lg text-base text-[var(--color-muted)]">
                        Selecciona la vía que prefieras y accede a un flujo diseñado para responder rápido y con claridad.
                    </p>
                </motion.div>

                {/* Contact card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="relative overflow-hidden rounded-3xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)]/40 p-1 backdrop-blur-xl"
                >
                    {/* Top orbs */}
                    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                        <span className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-[var(--color-accent)]/10 blur-[80px]" />
                        <span className="absolute -bottom-16 -right-16 h-36 w-36 rounded-full bg-[var(--color-accent-2)]/10 blur-[80px]" />
                    </div>

                    {/* Tabs */}
                    <div className="relative flex gap-1 rounded-2xl bg-[var(--color-surface)]/60 p-1" role="tablist" aria-label="Canales de contacto">
                        {contactChannels.map((channel) => (
                            <button
                                key={channel.id}
                                role="tab"
                                type="button"
                                aria-selected={activeChannelId === channel.id}
                                aria-controls={`contact-panel-${channel.id}`}
                                id={`contact-tab-${channel.id}`}
                                onClick={() => setActiveChannelId(channel.id)}
                                className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${activeChannelId === channel.id
                                        ? 'bg-[var(--color-accent)]/15 text-[var(--color-accent)] shadow-sm'
                                        : 'text-[var(--color-muted)] hover:text-[var(--color-text-main)]'
                                    }`}
                            >
                                {channel.label}
                            </button>
                        ))}
                    </div>

                    {/* Panel */}
                    <div
                        className="relative p-6 sm:p-8"
                        id={`contact-panel-${activeChannel.id}`}
                        role="tabpanel"
                        aria-labelledby={`contact-tab-${activeChannel.id}`}
                    >
                        <div className="flex flex-col items-center gap-6 text-center">
                            {/* Icon */}
                            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-accent-2)]/20 text-[var(--color-accent)]">
                                <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current" aria-hidden="true">
                                    <path d={activeChannel.icon} />
                                </svg>
                            </div>

                            <div>
                                <h3 className="mb-2 text-xl font-bold text-[var(--color-text-main)]">{activeChannel.title}</h3>
                                <p className="text-sm text-[var(--color-muted)]">{activeChannel.description}</p>
                            </div>

                            <a
                                href={activeChannel.href}
                                target={activeChannel.href.startsWith('http') ? '_blank' : undefined}
                                rel={activeChannel.href.startsWith('http') ? 'noreferrer' : undefined}
                                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] px-6 py-3 text-sm font-bold text-[#0b0e18] shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-xl active:scale-[0.98]"
                            >
                                {activeChannel.cta}
                                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                                    <path d="M5 12h12.5l-4-4a1 1 0 1 1 1.4-1.4l5.7 5.7a1 1 0 0 1 0 1.4l-5.7 5.7a1 1 0 1 1-1.4-1.4l4-4H5a1 1 0 0 1 0-2Z" />
                                </svg>
                            </a>

                            {/* Availability */}
                            <div className="mt-2 flex flex-col items-center gap-1 text-center sm:flex-row sm:gap-6">
                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-muted-soft)]">
                                        Disponibilidad
                                    </p>
                                    <p className="text-sm font-medium text-[var(--color-text-main)]">Lun - Vie · 09:00 - 19:00</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-muted-soft)]">
                                        Tiempo de respuesta
                                    </p>
                                    <p className="text-sm font-medium text-[var(--color-text-main)]">Menos de 48 horas</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

const ContactSection = React.memo(ContactSectionComponent)
export default ContactSection
