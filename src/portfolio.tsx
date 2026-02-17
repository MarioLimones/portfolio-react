import React from 'react'
import Topbar from './components/Topbar'
import HeroLanding from './components/HeroLanding'
import TechMarquee from './TechMarquee'
import ProjectsSection from './components/ProjectsSection'
import AboutSection from './components/AboutSection'
import ServicesSection from './components/ServicesSection'
import ExperienceSection from './components/ExperienceSection'
import ContactSection from './components/ContactSection'
import ScrollProgress from './components/ScrollProgress'
import { motion } from 'framer-motion'

type Theme = 'dark' | 'light'

type PortfolioProps = {
  ready: boolean
  theme: Theme
  onToggleTheme: () => void
}

function PortfolioComponent({ ready, theme, onToggleTheme }: PortfolioProps) {
  return (
    <div className="relative z-1 mx-auto w-full max-w-[1320px] px-2 pb-12 pt-4 sm:px-4" id="inicio">
      <ScrollProgress />
      <Topbar theme={theme} onToggleTheme={onToggleTheme} />

      <HeroLanding ready={ready} />

      {/* Skills marquee */}
      <section className="py-8" id="skills" aria-label="Tecnologías destacadas">
        <TechMarquee />
      </section>

      <ProjectsSection />
      <AboutSection />
      <ServicesSection />
      <ExperienceSection />
      <ContactSection />

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-16 border-t border-[var(--color-border-subtle)] px-4 py-8 text-center"
      >
        <p className="text-sm text-[var(--color-muted-soft)]">
          © 2026 Mario Limones. Todos los derechos reservados.
        </p>
        <p className="mt-1 text-xs text-[var(--color-muted-soft)]/60">
          Construido con foco en rendimiento, accesibilidad y detalle.
        </p>
      </motion.footer>
    </div>
  )
}

const Portfolio = React.memo(PortfolioComponent)

export default Portfolio
