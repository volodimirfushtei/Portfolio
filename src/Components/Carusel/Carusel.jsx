import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import styles from './Carusel.module.css'

const ACCORDION = [
  {
    title: 'Frontend Architecture',
    content: 'Building scalable apps using React, Zustand, and modular structure. Clean, maintainable and production-ready code.',
    icon: 'icon-code',
  },
  {
    title: 'Animations & UX',
    content: 'Advanced animations with GSAP & Framer Motion. Smooth scrolling, parallax, and micro-interactions.',
    icon: 'icon-motion',
  },
  {
    title: 'Performance',
    content: 'Optimized rendering, lazy loading, code splitting and smooth 60fps interactions.',
    icon: 'icon-speed',
  },
  {
    title: '3D & WebGL',
    content: 'Interactive 3D experiences using Three.js and React Three Fiber.',
    icon: 'icon-3d',
  },
]

export default function Carousel() {
  const [active, setActive] = useState(null)
  const contentRefs = useRef([])
  const panelRef = useRef(null)

  // Анімація входу
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(panelRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
      })
    }, panelRef)

    return () => ctx.revert()
  }, [])

  // Анімація акордеону
  useEffect(() => {
    contentRefs.current.forEach((el, i) => {
      if (!el) return

      if (active === i) {
        gsap.to(el, {
          height: el.scrollHeight,
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
        })
      } else {
        gsap.to(el, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: 'power2.inOut',
        })
      }
    })
  }, [active])

  return (
    <div className={styles.carousel}>
      {/* Хаотичні dividers */}
      <div className={styles.divider} style={{ top: '0%', left: '0%', width: '100%', transform: 'rotate(-3deg)' }} />
      <div className={styles.divider} style={{ top: '15%', right: '0%', height: '70%', transform: 'rotate(90deg)' }} />
      <div className={styles.divider} style={{ bottom: '0%', left: '0%', width: '100%', transform: 'rotate(2deg)' }} />

      <div className={styles.panel} ref={panelRef}>
        <h2 className={styles.title}>What I Do</h2>
        <h3 className={styles.subtitle}>
          Focused on modern UI, performance and interactive experiences.
        </h3>

        {/* Accordion */}
        <div className={styles.accordion}>
          {ACCORDION.map((item, i) => (
            <div
              key={i}
              className={`${styles.item} ${active === i ? styles.active : ''}`}
              onClick={() => setActive(active === i ? null : i)}
              style={{
                transform: `rotate(${i % 2 === 0 ? '1deg' : '-1deg'})`,
                zIndex: ACCORDION.length - i,
              }}
            >
              <div className={styles.header}>
                <span className={styles.icon}>
                  <svg width="20" height="20" aria-hidden="true">
                    <use href={`/sprite.svg#${item.icon}`} />
                  </svg>
                </span>
                <span className={styles.titleText}>{item.title}</span>
                <span className={styles.plus}>
                  {active === i ? '−' : '+'}
                </span>
              </div>

              <div
                ref={(el) => (contentRefs.current[i] = el)}
                className={styles.content}
              >
                <p>{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

