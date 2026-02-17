import React from 'react'
import { motion } from 'framer-motion'

const profilePhotoUrl = new URL('../imgs/mariofoto.png', import.meta.url).href
const cvUrl = new URL('../imgs/Cv-LimonesBernabe-Mario.pdf', import.meta.url).href

const heroBadges = ['Spring Boot', 'React Native', 'APIs REST', 'Arquitectura limpia']

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}

const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] } },
}

function HeroLandingComponent({ ready }: { ready: boolean }) {
    return (
        <section
            className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-visible px-4 py-16"
            id="inicio"
        >
            <motion.div
                className="relative z-10 flex max-w-4xl flex-col items-center gap-6 text-center"
                variants={containerVariants}
                initial="hidden"
                animate={ready ? 'visible' : 'hidden'}
            >
                {/* Greeting */}
                <motion.p
                    variants={itemVariants}
                    className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]"
                >
                    Hola, Soy
                </motion.p>

                {/* Name */}
                <motion.h1
                    variants={itemVariants}
                    className="bg-gradient-to-r from-[var(--color-text-main)] via-[#c4b5fd] to-[#22d3ee] bg-clip-text font-heading text-5xl font-bold uppercase leading-tight tracking-wide text-transparent sm:text-6xl lg:text-7xl"
                >
                    Mario <span className="block bg-gradient-to-r from-[#a78bfa] via-[#f472b6] to-[#22d3ee] bg-clip-text">Limones</span>
                </motion.h1>

                {/* Role */}
                <motion.div
                    variants={itemVariants}
                    className="text-2xl font-semibold text-[var(--color-text-main)] sm:text-3xl"
                >
                    Desarrollador de software
                </motion.div>

                {/* Photo */}
                <motion.div variants={itemVariants} className="flex justify-center">
                    <div
                        className="relative h-24 w-24 overflow-hidden rounded-full border border-[var(--color-accent)]/40 shadow-[0_0_26px_6px_rgba(167,139,250,0.2),0_0_58px_14px_rgba(139,92,246,0.15)]"
                        style={{ animation: 'portrait-glow 5.2s ease-in-out infinite' }}
                    >
                        <img
                            src={profilePhotoUrl}
                            alt="Foto de perfil de Mario Limones"
                            className="h-full w-full object-cover"
                            loading="eager"
                            width="96"
                            height="96"
                        />
                    </div>
                </motion.div>

                {/* Summary */}
                <motion.p
                    variants={itemVariants}
                    className="max-w-2xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg"
                >
                    Desarrollador Full Stack en formación, especializado en backend con Spring Boot y frontend con React Native.
                </motion.p>

                {/* Badges */}
                <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-2.5">
                    {heroBadges.map((badge) => (
                        <span
                            key={badge}
                            className="rounded-full border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/8 px-3.5 py-1.5 text-xs font-medium text-[var(--color-muted-strong)] transition-all duration-200 hover:bg-[var(--color-accent)]/15 hover:border-[var(--color-accent)]/30 hover:shadow-[0_0_20px_rgba(167,139,250,0.15)]"
                        >
                            {badge}
                        </span>
                    ))}
                </motion.div>

                {/* Social */}
                <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-3">
                    {[
                        { href: 'https://github.com/', label: 'GitHub', icon: 'M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.48 0-.24-.01-.88-.01-1.72-2.78.62-3.37-1.38-3.37-1.38-.45-1.18-1.11-1.49-1.11-1.49-.9-.64.07-.63.07-.63 1 .07 1.52 1.05 1.52 1.05.9 1.56 2.36 1.11 2.94.85.09-.67.35-1.11.63-1.37-2.22-.26-4.56-1.15-4.56-5.12 0-1.13.39-2.06 1.03-2.78-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.05.8-.23 1.66-.35 2.51-.35.85 0 1.71.12 2.51.35 1.9-1.32 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.65 1.03 2.78 0 3.98-2.34 4.86-4.57 5.12.36.31.68.92.68 1.86 0 1.34-.01 2.42-.01 2.75 0 .27.18.59.69.48A10.04 10.04 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z' },
                        { href: 'https://linkedin.com/', label: 'LinkedIn', icon: 'M6.94 8.5H3.28V21h3.66V8.5Zm.32-3.73c0 1.07-.86 1.94-2.12 1.94-1.24 0-2.12-.87-2.12-1.94 0-1.08.88-1.95 2.12-1.95 1.26 0 2.12.87 2.12 1.95ZM20.9 14.63V21h-3.64v-5.95c0-1.5-.54-2.52-1.88-2.52-1.03 0-1.64.7-1.91 1.37-.1.25-.12.6-.12.95V21H9.7s.05-10.44 0-11.5h3.65v1.63c.48-.75 1.34-1.82 3.25-1.82 2.38 0 4.16 1.57 4.16 4.92Z' },
                        { href: 'mailto:mario.limobe@gmail.com', label: 'Correo', icon: 'M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm0 2v.2l8 4.8 8-4.8V8H4Zm16 8V9.3l-7.5 4.5a1 1 0 0 1-1 0L4 9.3V16h16Z' },
                        { href: cvUrl, label: 'Descargar CV', icon: 'M12 3a1 1 0 0 1 1 1v8.59l2.3-2.29a1 1 0 1 1 1.4 1.42l-4.01 4a1 1 0 0 1-1.4 0l-4.01-4a1 1 0 1 1 1.41-1.42L11 12.59V4a1 1 0 0 1 1-1Zm-7 14a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Z' },
                    ].map(({ href, label, icon }) => (
                        <a
                            key={label}
                            href={href}
                            aria-label={label}
                            target={href.startsWith('http') ? '_blank' : undefined}
                            rel={href.startsWith('http') ? 'noreferrer' : undefined}
                            className="group relative grid h-11 w-11 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-weak)] text-[var(--color-text-main)] transition-all duration-300 hover:-translate-y-1.5 hover:scale-105 hover:shadow-[0_8px_24px_rgba(139,92,246,0.2)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                        >
                            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current" aria-hidden="true">
                                <path d={icon} />
                            </svg>
                            <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 -translate-y-1 rounded-full bg-[var(--color-bg-strong)]/90 px-2.5 py-1 text-xs font-semibold text-[var(--color-text-main)] opacity-0 shadow-lg backdrop-blur-md transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100" role="tooltip">
                                {label}
                            </span>
                        </a>
                    ))}
                </motion.div>

                {/* CTA */}
                <motion.a
                    variants={itemVariants}
                    href="#proyectos"
                    className="mt-2 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#8b5cf6] via-[#a855f7] to-[#06b6d4] px-8 py-3.5 text-base font-bold text-white shadow-[0_14px_36px_rgba(139,92,246,0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-[0_20px_48px_rgba(139,92,246,0.4)] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-text-main)]"
                >
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-white/20">
                        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                            <path d="M5 12h12.5l-4-4a1 1 0 1 1 1.4-1.4l5.7 5.7a1 1 0 0 1 0 1.4l-5.7 5.7a1 1 0 1 1-1.4-1.4l4-4H5a1 1 0 0 1 0-2Z" />
                        </svg>
                    </span>
                    Ver proyectos
                </motion.a>
            </motion.div>
        </section>
    )
}

const HeroLanding = React.memo(HeroLandingComponent)
export default HeroLanding
