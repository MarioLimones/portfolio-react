import React from 'react'
import TechMarquee from './TechMarquee'

const portada_gestortareas = new URL('./imgs/portada_gestortareas.png', import.meta.url).href
const port_antiguo = new URL('./imgs/port_antiguo.png', import.meta.url).href
const cvUrl = new URL('./imgs/Cv-LimonesBernabe-Mario.pdf', import.meta.url).href
const profilePhotoUrl = new URL('./imgs/mariofoto.png', import.meta.url).href

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Stack', href: '#stack' },
  { label: 'Experiencia', href: '#experiencia' },
  { label: 'Contacto', href: '#contacto' },
]

const stats = [
  { value: '3+', label: 'Proyectos', hint: 'Aplicaciones backend y full-stack' },
  { value: 'DAM', label: 'Desarrollo de Aplicaciones Multiplataforma', hint: 'Formación técnica en curso' },
  { value: '0', label: 'Código claro y directo al problema' },
]

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

type Project = {
  title: string
  description: string
  tags: string[]
  year: string
  img?: string
  mediaClass?: string
  metric?: string
}

const projects: Project[] = [
  {
    img: portada_gestortareas,
    title: 'Gestor de tareas',
    description:
      'Aplicación android básica que permite crear, asignar y completar tareas.',
    tags: ['Android', 'Kotlin', 'Android Studio'],
    year: '2026',
  },
  {
    title: 'App de Preguntas y Respuestas',
    description:
      'Aplicación realizada en Spring Boot con Java implementando una API REST con JPA y MySQL.',
    tags: ['Spring Boot', 'Java', 'JPA', 'MySQL'],
    year: '2026',
  },
  {
    title: 'Portfolio antiguo',
    img: port_antiguo,
    mediaClass: 'project-media--zoom',
    description:
      'Pagina web personal que realizé en mi primer año como desarrollador con conocimientos básicos.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    year: '2025',
  }
]

const services = [
  {
    title: 'Backend de alto rendimiento',
    text: 'APIs, colas, cache y bases de datos optimizadas para trafico real.',
  },
  {
    title: 'Arquitectura y escalado',
    text: 'Diseno de sistemas distribuidos, patrones de resiliencia y SLOs claros.',
  },
  {
    title: 'Data y automatizacion',
    text: 'ETLs, pipelines en tiempo real y automatizaciones que liberan al equipo.',
  },
  {
    title: 'Consultoria tecnica',
    text: 'Auditorias, roadmap tecnico y coaching para equipos senior y mid-level.',
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

const stack = [
  {
    group: 'Backend',
    items: ['Go', 'Node.js', 'Python', 'TypeScript', 'GraphQL', 'gRPC'],
  },
  {
    group: 'Infra & DevOps',
    items: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'SRE'],
  },
  {
    group: 'Data',
    items: ['PostgreSQL', 'Redis', 'Kafka', 'ClickHouse', 'Airflow', 'dbt'],
  },
  {
    group: 'Product',
    items: ['Figma', 'Notion', 'Miro', 'Jira', 'Roadmapping'],
  },
]

const testimonials = [
  {
    quote:
      'Transformo un sistema inestable en una plataforma confiable en semanas. Resultado: equipo feliz y negocio creciendo.',
    name: 'Nombre Apellido',
    role: 'CTO, Empresa Ejemplo',
  },
  {
    quote:
      'Excelente comunicacion, roadmap claro y mejoras medibles desde el primer mes.',
    name: 'Nombre Apellido',
    role: 'Product Lead, Startup Ejemplo',
  },
  {
    quote:
      'Su obsesion por la calidad y el rendimiento cambio nuestra operacion.',
    name: 'Nombre Apellido',
    role: 'Head of Engineering, Scaleup Ejemplo',
  },
]

const experience = [
  {
    role: 'Lead Backend Engineer',
    company: 'Empresa Alpha',
    time: '2023 - Actual',
    summary:
      'Rediseno del core y migracion a arquitectura orientada a eventos con foco en resiliencia.',
  },
  {
    role: 'Senior Software Engineer',
    company: 'Empresa Beta',
    time: '2020 - 2023',
    summary:
      'Escalado de plataforma global, automatizacion de despliegues y mejora de observabilidad.',
  },
  {
    role: 'Backend Developer',
    company: 'Empresa Gamma',
    time: '2018 - 2020',
    summary:
      'Diseno de APIs, integraciones con proveedores y optimizacion de consultas criticas.',
  },
]

const awards = [
  { title: 'Top 3 en Hackathon Fintech', year: '2025' },
  { title: 'Speaker en conferencia de Arquitectura', year: '2024' },
  { title: 'Mencion en revista de tecnologia', year: '2023' },
]

const socials = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/tuusuario' },
  { label: 'GitHub', href: 'https://github.com/tuusuario' },
  { label: 'Twitter', href: 'https://twitter.com/tuusuario' },
]

type Theme = 'dark' | 'light'

type PortfolioProps = {
  ready: boolean
  theme: Theme
  onToggleTheme: () => void
}

type TopbarProps = {
  theme: Theme
  onToggleTheme: () => void
}

function TopbarComponent({ theme, onToggleTheme }: TopbarProps) {
  const [isHidden, setIsHidden] = React.useState(false)
  const isHiddenRef = React.useRef(false)

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

  return (
    <header className={`topbar reveal ${isHidden ? 'topbar--hidden' : ''}`}>
      <div className="brand">
        <span className="brand-mark">ML</span>
        <div>
          <p className="brand-title">Mario Limones</p>
          <p className="brand-subtitle">Desarrollador de Software</p>
        </div>
      </div>
      <nav className="nav">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
      <button
        className="theme-toggle"
        type="button"
        onClick={onToggleTheme}
        aria-pressed={theme === 'light'}
        aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
        title={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
      >
        {theme === 'dark' ? (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 4.75a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 12 4.75Zm5.657 2.343a.75.75 0 0 1 1.06 0l.354.353a.75.75 0 1 1-1.06 1.06l-.354-.353a.75.75 0 0 1 0-1.06ZM19.25 12a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1-.75-.75Zm-1.533 5.407a.75.75 0 0 1 1.06 1.06l-.353.354a.75.75 0 1 1-1.06-1.06l.353-.354ZM12 19.25a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1-.75-.75ZM5.923 17.77a.75.75 0 0 1 0-1.06l.353-.354a.75.75 0 1 1 1.06 1.06l-.353.354a.75.75 0 0 1-1.06 0ZM4.75 12a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1-.75-.75Zm1.173-6.154a.75.75 0 0 1 1.06-1.06l.353.354a.75.75 0 1 1-1.06 1.06l-.353-.354ZM12 7.25A4.75 4.75 0 1 0 12 16.75 4.75 4.75 0 0 0 12 7.25Z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M21 14.5A8.5 8.5 0 1 1 9.5 3a6.5 6.5 0 0 0 11.5 11.5Z" />
          </svg>
        )}
      </button>
      <a className="btn primary" href={cvUrl} target="_blank" rel="noreferrer">
        Descargar CV
      </a>
    </header>
  )
}

const Topbar = React.memo(TopbarComponent)

function PortfolioComponent({ ready, theme, onToggleTheme }: PortfolioProps) {
  const heroRef = React.useRef<HTMLElement | null>(null)

  React.useEffect(() => {
    if (!ready) {
      return
    }
    const elements = Array.from(document.querySelectorAll('.reveal'))

    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ready])

  React.useEffect(() => {
    const hero = heroRef.current
    if (!hero) {
      return
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    let rafId = 0
    let isAnimating = false
    let targetX = 0
    let targetY = 0
    let targetPX = 0
    let targetPY = 0
    let currentX = 0
    let currentY = 0
    let currentPX = 0
    let currentPY = 0

    const animate = () => {
      const ease = 0.12
      currentX += (targetX - currentX) * ease
      currentY += (targetY - currentY) * ease
      currentPX += (targetPX - currentPX) * ease
      currentPY += (targetPY - currentPY) * ease

      hero.style.setProperty('--hero-mx', currentX.toFixed(3))
      hero.style.setProperty('--hero-my', currentY.toFixed(3))
      hero.style.setProperty('--hero-px', `${currentPX.toFixed(1)}px`)
      hero.style.setProperty('--hero-py', `${currentPY.toFixed(1)}px`)

      const stillMoving =
        Math.abs(targetX - currentX) > 0.001 ||
        Math.abs(targetY - currentY) > 0.001 ||
        Math.abs(targetPX - currentPX) > 0.08 ||
        Math.abs(targetPY - currentPY) > 0.08

      if (stillMoving) {
        rafId = window.requestAnimationFrame(animate)
      } else {
        isAnimating = false
        rafId = 0
      }
    }

    const updateTarget = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect()
      if (!rect.width || !rect.height) {
        return
      }
      const x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width))
      const y = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height))
      targetX = (x - 0.5) * 2
      targetY = (y - 0.5) * 2
      const lightRange = 48
      targetPX = (x - 0.5) * lightRange
      targetPY = (y - 0.5) * lightRange

      if (!isAnimating) {
        isAnimating = true
        rafId = window.requestAnimationFrame(animate)
      }
    }

    const resetTarget = () => {
      targetX = 0
      targetY = 0
      targetPX = 0
      targetPY = 0
      if (!isAnimating) {
        isAnimating = true
        rafId = window.requestAnimationFrame(animate)
      }
    }

    hero.addEventListener('pointermove', updateTarget, { passive: true })
    hero.addEventListener('pointerenter', updateTarget, { passive: true })
    hero.addEventListener('pointerleave', resetTarget, { passive: true })

    return () => {
      hero.removeEventListener('pointermove', updateTarget)
      hero.removeEventListener('pointerenter', updateTarget)
      hero.removeEventListener('pointerleave', resetTarget)
      window.cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div className="portfolio" id="inicio">
      <section
        ref={heroRef}
        className={`intro-landing hero-landing reveal is-interactive ${ready ? 'is-ready' : ''}`}
      >
        <div className="hero-copy">
          <p className="hero-greeting">Hola, Soy</p>
          <h1 className="hero-name">
            Mario <span>Limones</span>
          </h1>
          <div className="hero-role">
            <span>Desarrollador de software</span>
          </div>
          <div className="hero-inline-portrait">
            <div className="portrait-shell">
              <div className="portrait-photo">
                <img src={profilePhotoUrl} alt="Foto de perfil" loading="lazy" />
              </div>
            </div>
          </div>
          <p className="hero-summary">
            Desarrollador Full Stack en formación, especializado en backend con Spring Boot y frontend con React Native.
          </p>
          <div className="hero-social">
            <a className="social-btn" href="https://github.com/" aria-label="GitHub">
              <span className="social-tooltip" role="tooltip">GitHub</span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.48 0-.24-.01-.88-.01-1.72-2.78.62-3.37-1.38-3.37-1.38-.45-1.18-1.11-1.49-1.11-1.49-.9-.64.07-.63.07-.63 1 .07 1.52 1.05 1.52 1.05.9 1.56 2.36 1.11 2.94.85.09-.67.35-1.11.63-1.37-2.22-.26-4.56-1.15-4.56-5.12 0-1.13.39-2.06 1.03-2.78-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.05.8-.23 1.66-.35 2.51-.35.85 0 1.71.12 2.51.35 1.9-1.32 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.65 1.03 2.78 0 3.98-2.34 4.86-4.57 5.12.36.31.68.92.68 1.86 0 1.34-.01 2.42-.01 2.75 0 .27.18.59.69.48A10.04 10.04 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
              </svg>
            </a>
            <a className="social-btn" href="https://linkedin.com/" aria-label="LinkedIn">
              <span className="social-tooltip" role="tooltip">LinkedIn</span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6.94 8.5H3.28V21h3.66V8.5Zm.32-3.73c0 1.07-.86 1.94-2.12 1.94-1.24 0-2.12-.87-2.12-1.94 0-1.08.88-1.95 2.12-1.95 1.26 0 2.12.87 2.12 1.95ZM20.9 14.63V21h-3.64v-5.95c0-1.5-.54-2.52-1.88-2.52-1.03 0-1.64.7-1.91 1.37-.1.25-.12.6-.12.95V21H9.7s.05-10.44 0-11.5h3.65v1.63c.48-.75 1.34-1.82 3.25-1.82 2.38 0 4.16 1.57 4.16 4.92Z" />
              </svg>
            </a>
            <a className="social-btn" href="mailto:mario.limobe@gmail.com" aria-label="Correo">
              <span className="social-tooltip" role="tooltip">Correo</span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm0 2v.2l8 4.8 8-4.8V8H4Zm16 8V9.3l-7.5 4.5a1 1 0 0 1-1 0L4 9.3V16h16Z" />
              </svg>
            </a>
            <a className="social-btn" href={cvUrl} aria-label="Descargar CV">
              <span className="social-tooltip" role="tooltip">Descargar CV</span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 3a1 1 0 0 1 1 1v8.59l2.3-2.29a1 1 0 1 1 1.4 1.42l-4.01 4a1 1 0 0 1-1.4 0l-4.01-4a1 1 0 1 1 1.41-1.42L11 12.59V4a1 1 0 0 1 1-1Zm-7 14a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Z" />
              </svg>
            </a>
          </div>
          <button className="hero-cta" type="button">
            <span className="cta-icon" aria-hidden="true">
              ?
            </span>
            My Services
          </button>
        </div>
      </section>

      <Topbar theme={theme} onToggleTheme={onToggleTheme} />

      <section className="hero reveal">
        <div className="hero-copy">
          <div className="eyebrow">Disponible para proyectos 2026</div>
          <h1 className="hero-title">
            Desarrollador de software en formación.
          </h1>
          <p className="hero-tagline">
            Trabajo para proyectos académicos y personales orientados a resolver problemas reales con tecnología. Mi enfoque es aprender y crecer como desarrollador, aportando valor a través de soluciones simples y efectivas.
          </p>
          <p className="hero-lead">
            Diseño y desarrollo aplicaciones web completas, desde el backend con Java y Spring Boot hasta el frontend con JavaScript y React, creando APIs REST y interfaces claras y funcionales
          </p>
          <div className="hero-actions">
            <a className="btn primary" href="mailto:mario.limobe@gmail.com">
              Hablemos
            </a>
            <a className="btn ghost" href="#proyectos">
              Ver proyectos
            </a>
          </div>
          <div className="hero-metrics">
            {stats.map((stat) => (
              <div key={stat.label} className="metric-card">
                <p className="metric-value">{stat.value}</p>
                <p className="metric-label">{stat.label}</p>
                <p className="metric-hint">{stat.hint}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual">
          <div className="profile-card">
            <div className="avatar">ML</div>
            <div>
              <p className="profile-name">Mario Limones</p>
              <p className="profile-role">Desarrollador de Software</p>
              <div className="profile-meta">
                <span>Sevilla, ES</span>
                <span>+34 644 48 44 82</span>
              </div>
            </div>
          </div>
          <div className="highlight-grid">
            {heroHighlights.map((item) => (
              <div key={item.title} className="highlight-card">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TechMarquee />

      <section className="section reveal" id="proyectos">
        <div className="section-head">
          <div>
            <p className="section-kicker">Proyectos destacados</p>
            <h2>Casos reales, impacto medible.</h2>
          </div>
          <p className="section-note">
            Aqui puedes reemplazar con tus proyectos reales. Cada tarjeta incluye el problema, la
            solucion y el resultado.
          </p>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <article key={project.title} className="project-card">
              <div className={`project-media ${project.mediaClass ?? ''}`.trim()}>
                {project.img ? (
                  <img src={project.img} alt={`Portada ${project.title}`} loading="lazy" />
                ) : null}
                <span>{project.year}</span>
              </div>
              <div className="project-body">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="project-metric">{project.metric}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section reveal" id="servicios">
        <div className="section-head">
          <div>
            <p className="section-kicker">Servicios</p>
            <h2>Una caja de herramientas lista para desafios complejos.</h2>
          </div>
          <p className="section-note">Adaptable a equipos, productos y etapas de crecimiento.</p>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <article key={service.title} className="service-card">
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section reveal" id="proceso">
        <div className="section-head">
          <div>
            <p className="section-kicker">Proceso</p>
            <h2>Metodo claro, entregas consistentes.</h2>
          </div>
          <p className="section-note">Transparencia total y foco en impacto.</p>
        </div>
        <div className="process-grid">
          {processSteps.map((step, index) => (
            <article key={step.title} className="process-card">
              <div className="process-number">0{index + 1}</div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section reveal" id="stack">
        <div className="section-head">
          <div>
            <p className="section-kicker">Stack</p>
            <h2>Tecnologia elegida por resultados.</h2>
          </div>
          <p className="section-note">Personaliza las herramientas y actualiza con tu stack real.</p>
        </div>
        <div className="stack-grid">
          {stack.map((group) => (
            <article key={group.group} className="stack-card">
              <h3>{group.group}</h3>
              <div className="stack-tags">
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section reveal" id="experiencia">
        <div className="section-head">
          <div>
            <p className="section-kicker">Experiencia</p>
            <h2>Trayectoria enfocada en impacto.</h2>
          </div>
          <p className="section-note">Incluye tu experiencia mas relevante y medible.</p>
        </div>
        <div className="timeline">
          {experience.map((item) => (
            <div key={item.role} className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3>{item.role}</h3>
                  <span>{item.time}</span>
                </div>
                <p className="timeline-company">{item.company}</p>
                <p>{item.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section reveal">
        <div className="section-head">
          <div>
            <p className="section-kicker">Reconocimientos</p>
            <h2>Momentos clave y visibilidad.</h2>
          </div>
          <p className="section-note">Anade premios, charlas o publicaciones.</p>
        </div>
        <div className="award-grid">
          {awards.map((award) => (
            <div key={award.title} className="award-card">
              <h3>{award.title}</h3>
              <span>{award.year}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section reveal" id="testimonios">
        <div className="section-head">
          <div>
            <p className="section-kicker">Testimonios</p>
            <h2>Lo que dicen quienes trabajaron conmigo.</h2>
          </div>
          <p className="section-note">Reemplaza con comentarios reales y concisos.</p>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((item) => (
            <article key={item.name} className="testimonial-card">
              <p className="testimonial-quote">"{item.quote}"</p>
              <div>
                <p className="testimonial-name">{item.name}</p>
                <p className="testimonial-role">{item.role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-section reveal" id="contacto">
        <div className="cta-card">
          <div>
            <p className="section-kicker">Contacto</p>
            <h2>Listo para tu proximo gran proyecto.</h2>
            <p className="section-note">
              Comparte tu idea, objetivo o desafio. Respondo en menos de 48 horas.
            </p>
          </div>
          <div className="cta-actions">
            <a className="btn primary" href="mailto:hola@tudominio.com">
              Escribeme
            </a>
            <a className="btn ghost" href={cvUrl} target="_blank" rel="noreferrer">
              Descargar CV
            </a>
          </div>
          <div className="social-row">
            {socials.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer reveal">
        <p>(c) 2026 Nombre Apellido. Todos los derechos reservados.</p>
        <p>Construido con foco en rendimiento, accesibilidad y detalle.</p>
      </footer>
    </div>
  )
}

const Portfolio = React.memo(PortfolioComponent)

export default Portfolio

