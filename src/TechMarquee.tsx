import React from 'react'
import type { IconType } from 'react-icons'
import { FaJava } from 'react-icons/fa'
import {
  SiAndroid,
  SiCss3,
  SiDocker,
  SiExpress,
  SiFigma,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiKotlin,
  SiMysql,
  SiNodedotjs,
  SiPostman,
  SiPython,
  SiReact,
  SiSpringboot,
  SiSwagger,
  SiTypescript,
  SiVuedotjs,
} from 'react-icons/si'
import { TbBrandCSharp, TbNetwork } from 'react-icons/tb'

type TechRow = {
  id: string
  items: TechItem[]
  direction: 'left' | 'right'
  speed: number
}

type TechItem = {
  name: string
  Icon: IconType
}

const techIconMap = {
  Java: FaJava,
  Node: SiNodedotjs,
  'Spring Boot': SiSpringboot,
  Python: SiPython,
  UDP: TbNetwork,
  Express: SiExpress,
  Android: SiAndroid,
  Kotlin: SiKotlin,
  'C#': TbBrandCSharp,
  HTML: SiHtml5,
  CSS: SiCss3,
  JavaScript: SiJavascript,
  React: SiReact,
  Vue: SiVuedotjs,
  Figma: SiFigma,
  TypeScript: SiTypescript,
  Docker: SiDocker,
  Swagger: SiSwagger,
  Git: SiGit,
  Postman: SiPostman,
  MySQL: SiMysql,
} satisfies Record<string, IconType>

const toItems = (names: Array<keyof typeof techIconMap>): TechItem[] =>
  names.map((name) => ({ name, Icon: techIconMap[name] }))

const techRows: TechRow[] = [
  {
    id: 'backend',
    items: toItems(['Java', 'Node', 'Spring Boot', 'Python', 'UDP', 'Express', 'Android', 'Kotlin', 'C#']),
    direction: 'right',
    speed: 36,
  },
  {
    id: 'frontend',
    items: toItems(['HTML', 'CSS', 'JavaScript', 'React', 'Vue', 'Figma', 'TypeScript']),
    direction: 'left',
    speed: 34,
  },
  {
    id: 'tools',
    items: toItems(['Docker', 'Swagger', 'Git', 'Postman', 'MySQL']),
    direction: 'right',
    speed: 32,
  },
]

function TechMarqueeComponent() {
  const containerRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    const container = containerRef.current
    if (!container) {
      return
    }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const rows = Array.from(container.querySelectorAll<HTMLDivElement>('.tech-marquee-row'))
    const cleanups: Array<() => void> = []

    rows.forEach((row) => {
      const track = row.querySelector<HTMLDivElement>('.tech-marquee-track')
      if (!track) {
        return
      }

      const baseItems = Array.from(track.querySelectorAll<HTMLElement>('[data-marquee-base="true"]'))
      if (baseItems.length === 0) {
        return
      }

      const rebuild = () => {
        Array.from(track.children).forEach((child) => {
          const element = child as HTMLElement
          if (!element.hasAttribute('data-marquee-base')) {
            track.removeChild(element)
          }
        })

        const computed = window.getComputedStyle(track)
        const gapValue = parseFloat(computed.columnGap || computed.gap || '0')
        const gap = Number.isNaN(gapValue) ? 0 : gapValue

        let baseWidth = 0
        baseItems.forEach((item, index) => {
          baseWidth += item.offsetWidth
          if (index < baseItems.length - 1) {
            baseWidth += gap
          }
        })

        if (baseWidth === 0) {
          return
        }

        const containerWidth = row.offsetWidth
        const minTrackWidth = Math.max(containerWidth * 2, baseWidth * 2)
        let currentWidth = baseWidth

        while (currentWidth < minTrackWidth) {
          const fragment = document.createDocumentFragment()
          baseItems.forEach((item) => {
            const clone = item.cloneNode(true) as HTMLElement
            clone.removeAttribute('data-marquee-base')
            fragment.appendChild(clone)
          })
          track.appendChild(fragment)
          currentWidth += baseWidth
        }

        const baseSpeed = Number(row.dataset.speed ?? 40)
        const speed = prefersReduced ? baseSpeed * 0.3 : baseSpeed
        const duration = Math.max(1, baseWidth / speed)

        row.style.setProperty('--marquee-distance', `${baseWidth}px`)
        row.style.setProperty('--marquee-duration', `${duration}s`)
      }

      rebuild()

      const resizeObserver = new ResizeObserver(() => rebuild())
      resizeObserver.observe(row)

      if (document.fonts?.ready) {
        document.fonts.ready.then(rebuild).catch(() => {})
      }

      cleanups.push(() => resizeObserver.disconnect())
    })

    return () => cleanups.forEach((cleanup) => cleanup())
  }, [])

  return (
    <section className="tech-marquee-section" aria-label="Tecnologias destacadas">
      <div className="tech-marquee" ref={containerRef}>
        {techRows.map((row) => (
          <div
            key={row.id}
            className={`tech-marquee-row tech-marquee-row--${row.direction}`}
            data-direction={row.direction}
            data-speed={row.speed}
          >
            <div className="tech-marquee-track" aria-hidden="true">
              {row.items.map(({ name, Icon }) => (
                <span key={`${row.id}-${name}`} className="tech-chip" data-marquee-base="true">
                  <Icon className="tech-chip-icon" aria-hidden="true" />
                  <span className="tech-chip-label">{name}</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

const TechMarquee = React.memo(TechMarqueeComponent)

export default TechMarquee
