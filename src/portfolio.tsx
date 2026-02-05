import React from 'react'
import './App.css'

const cvUrl = new URL('./imgs/Cv-LimonesBernabe-Mario.pdf', import.meta.url).href
const profilePhotoUrl = new URL('./imgs/profile-placeholder.svg', import.meta.url).href

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
  { value: '10+', label: 'Anios construyendo producto', hint: 'Desde fintech hasta SaaS' },
  { value: '40+', label: 'Lanzamientos en produccion', hint: 'Equipos remotos y locales' },
  { value: '99.98%', label: 'Uptime en sistemas criticos', hint: 'Alta disponibilidad' },
]

const heroHighlights = [
  {
    title: 'Arquitectura escalable',
    text: 'Diseno sistemas resilientes con observabilidad, trazas y automatizacion completa.',
  },
  {
    title: 'Velocidad sin deuda',
    text: 'Roadmaps claros, entregas incrementales y calidad desde el primer commit.',
  },
  {
    title: 'Impacto medible',
    text: 'Optimizaciones que reducen costos y aceleran la entrega de valor.',
  },
]

const projects = [
  {
    title: 'Plataforma de pagos instantaneos',
    description:
      'Reinventamos el core con microservicios, colas y cache distribuido. Menos latencia, mas conversion.',
    tags: ['Microservicios', 'Event-driven', 'AWS', 'Go'],
    metric: '-35% latencia p95',
    year: '2025',
  },
  {
    title: 'Motor de recomendacion en tiempo real',
    description:
      'Pipeline de datos en streaming con features dinamicas y modelos online. Resultados visibles en horas.',
    tags: ['Streaming', 'Feature Store', 'Kubernetes', 'Python'],
    metric: '+22% CTR',
    year: '2024',
  },
  {
    title: 'Suite de observabilidad 360',
    description:
      'Unificamos logs, metricas y alertas con paneles ejecutivos y runbooks inteligentes.',
    tags: ['Observability', 'SRE', 'Grafana', 'Tempo'],
    metric: '-48% MTTR',
    year: '2024',
  },
  {
    title: 'Marketplace B2B global',
    description:
      'Arquitectura multi-tenant con permisos finos, facturacion y cumplimiento en varios paises.',
    tags: ['Multi-tenant', 'Billing', 'PostgreSQL', 'Node'],
    metric: 'x3 revenue',
    year: '2023',
  },
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

type PortfolioProps = {
  ready: boolean
}

function TopbarComponent() {
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
          <p className="brand-title">Nombre Apellido</p>
          <p className="brand-subtitle">Backend Engineer + Product Builder</p>
        </div>
      </div>
      <nav className="nav">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
      <a className="btn primary" href={cvUrl} target="_blank" rel="noreferrer">
        Descargar CV
      </a>
    </header>
  )
}

const Topbar = React.memo(TopbarComponent)

function PortfolioComponent({ ready }: PortfolioProps) {
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

  return (
    <div className="portfolio" id="inicio">
      <section className={`intro-landing hero-landing reveal ${ready ? 'is-ready' : ''}`}>
        <div className="hero-copy">
          <p className="hero-greeting">Hello, I'm</p>
          <h1 className="hero-name">
            MANIKANTA <span>DARAPUREDDY</span>
          </h1>
          <div className="hero-role">
            <span>Designer</span>
            <span className="hero-caret" aria-hidden="true">
              |
            </span>
          </div>
          <p className="hero-summary">
            I craft beautiful, responsive websites with modern technologies and a passion for
            creating engaging user experiences.
          </p>
          <div className="hero-social">
            <a className="social-btn" href="https://github.com/" aria-label="GitHub">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.48 0-.24-.01-.88-.01-1.72-2.78.62-3.37-1.38-3.37-1.38-.45-1.18-1.11-1.49-1.11-1.49-.9-.64.07-.63.07-.63 1 .07 1.52 1.05 1.52 1.05.9 1.56 2.36 1.11 2.94.85.09-.67.35-1.11.63-1.37-2.22-.26-4.56-1.15-4.56-5.12 0-1.13.39-2.06 1.03-2.78-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.05.8-.23 1.66-.35 2.51-.35.85 0 1.71.12 2.51.35 1.9-1.32 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.65 1.03 2.78 0 3.98-2.34 4.86-4.57 5.12.36.31.68.92.68 1.86 0 1.34-.01 2.42-.01 2.75 0 .27.18.59.69.48A10.04 10.04 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
              </svg>
            </a>
            <a className="social-btn" href="https://linkedin.com/" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6.94 8.5H3.28V21h3.66V8.5Zm.32-3.73c0 1.07-.86 1.94-2.12 1.94-1.24 0-2.12-.87-2.12-1.94 0-1.08.88-1.95 2.12-1.95 1.26 0 2.12.87 2.12 1.95ZM20.9 14.63V21h-3.64v-5.95c0-1.5-.54-2.52-1.88-2.52-1.03 0-1.64.7-1.91 1.37-.1.25-.12.6-.12.95V21H9.7s.05-10.44 0-11.5h3.65v1.63c.48-.75 1.34-1.82 3.25-1.82 2.38 0 4.16 1.57 4.16 4.92Z" />
              </svg>
            </a>
            <a className="social-btn" href="mailto:hello@example.com" aria-label="Email">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm0 2v.2l8 4.8 8-4.8V8H4Zm16 8V9.3l-7.5 4.5a1 1 0 0 1-1 0L4 9.3V16h16Z" />
              </svg>
            </a>
            <a className="social-btn" href={cvUrl} aria-label="Download CV">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 3a1 1 0 0 1 1 1v8.59l2.3-2.29a1 1 0 1 1 1.4 1.42l-4.01 4a1 1 0 0 1-1.4 0l-4.01-4a1 1 0 1 1 1.41-1.42L11 12.59V4a1 1 0 0 1 1-1Zm-7 14a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Z" />
              </svg>
            </a>
          </div>
          <button className="hero-cta" type="button">
            <span className="cta-icon" aria-hidden="true">
              ✦
            </span>
            My Services
          </button>
        </div>

        <div className="hero-visual">
          <div className="portrait-shell">
            <div className="portrait-ring">
              <div className="portrait-photo">
                <img src={profilePhotoUrl} alt="Foto de perfil" loading="lazy" />
                <span>Tu foto aqui</span>
              </div>
            </div>
            <div className="portrait-lines" aria-hidden="true" />
          </div>
        </div>
      </section>

      <Topbar />

      <section className="hero reveal">
        <div className="hero-copy">
          <div className="eyebrow">Disponible para proyectos 2026</div>
          <h1 className="hero-title">
            Construyo plataformas que escalan y productos que la gente ama.
          </h1>
          <p className="hero-tagline">
            Backend Engineering, arquitectura cloud y estrategia tecnica para equipos ambiciosos.
          </p>
          <p className="hero-lead">
            Aqui va tu descripcion breve: que haces, para quien y el impacto que has generado. Usa 2-3
            frases directas con resultados concretos.
          </p>
          <div className="hero-actions">
            <a className="btn primary" href="mailto:hola@tudominio.com">
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
            <div className="avatar">NA</div>
            <div>
              <p className="profile-name">Nombre Apellido</p>
              <p className="profile-role">Backend Engineer | Remote Friendly</p>
              <div className="profile-meta">
                <span>Madrid, ES</span>
                <span>+34 600 000 000</span>
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

      <section className="marquee reveal" aria-hidden="true">
        <div className="marquee-track">
          <span>Infra resiliente</span>
          <span>Observabilidad total</span>
          <span>Automatizacion inteligente</span>
          <span>Data en tiempo real</span>
          <span>Experiencia de usuario</span>
          <span>Performance extremo</span>
          <span>Infra resiliente</span>
          <span>Observabilidad total</span>
          <span>Automatizacion inteligente</span>
        </div>
      </section>

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
              <div className="project-media">
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
