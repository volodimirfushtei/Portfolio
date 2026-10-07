import React, { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './SectionsDeviders.module.css'

gsap.registerPlugin(ScrollTrigger)

const items = Array.from({ length: 72 })

const SectionsDividers = ({ top = false, bottom = false }) => {
  const containerRef = useRef(null)
  const honeyRef = useRef(null)

  useLayoutEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // Анімація горизонтальних ліній
      const lines = gsap.utils.toArray(
        `.${styles.horizontalTop}, .${styles.horizontalBottom}`,
      )

      if (lines.length) {
        gsap.fromTo(
          lines,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 0.25,
            duration: 1,
            stagger: 0.3,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              once: false,
              toggleActions: 'play none none reverse',
            },
          },
        )
      }

      // Анімація honeycomb
      gsap.fromTo(
        honeyRef.current,
        { scale: 0.2, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.8,
          ease: 'expo.inOut',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            once: false,
            toggleActions: 'play none none reverse',
          },
        },
      )

      // Анімація hexagon stroke
      gsap.fromTo(
        `.${styles.hexagon} polygon`,
        {
          strokeDasharray: 300,
          strokeDashoffset: 300,
          opacity: 0,
          yPercent: -20,
        },
        {
          strokeDashoffset: 0,
          opacity: 1,
          yPercent: 0,
          duration: 1.5,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            once: false,
            toggleActions: 'play none none reverse',
          },
        },
      )


    }, containerRef)

    return () => ctx.revert()
  }, [top, bottom])

  return (
    <div
      ref={containerRef}
      className={styles.container}
      aria-hidden="true"
    >
      {/* Горизонтальні лінії */}
      {top && <span className={styles.horizontalTop} />}
      {bottom && <span className={styles.horizontalBottom} />}


      {/* Honeycomb сітка */}
      <div className={styles.honeycomb} ref={honeyRef}>
        {items.map((_, index) => (

          <svg
            className={styles.hexagon}
            viewBox="0 0 100 100"
            aria-hidden="true"
            key={index}
            style={{
              transform: Math.floor(index / 12) % 2 ? 'translateX(40px)' : 'none',
              animationDelay: `${index * 0.05}s`,
            }}
          >
            <polygon
              points="25,7 75,7 100,50 75,93 25,93 0,50"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
        ))}
      </div>
    </div>
  )
}

export default SectionsDividers
