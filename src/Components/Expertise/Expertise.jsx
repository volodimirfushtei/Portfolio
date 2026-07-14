import { useEffect, useRef, useState } from 'react'
import styles from './Expertise.module.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CardTech from '../CardTech/CardTech'

import LocationBadge from '../Location/Location'

gsap.registerPlugin(ScrollTrigger)

const Expertise = () => {
  const backgroundRef = useRef(null)
  const eyebrowRef = useRef(null)
  const titleRef = useRef(null)
  const dividerRef = useRef(null)
  const locationRef = useRef(null)
  const cardRef = useRef(null)
  const sectionRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: 'power4.out',
        },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,

        },
      })

      tl

        // Background
        .from(backgroundRef.current, {
          autoAlpha: 0,
          scale: 1.12,
          filter: 'blur(40px)',
          duration: 1.4,
        })

        // Eyebrow
        .from(
          eyebrowRef.current,
          {
            autoAlpha: 0,
            y: 30,
            filter: 'blur(12px)',
            duration: 0.7,
          },
          '-=1',
        )

        // Divider
        .from(
          dividerRef.current,
          {
            scaleX: 0,
            transformOrigin: 'left center',
            duration: 0.8,
          },
          '-=0.4',
        )

        // Title
        .from(
          titleRef.current,
          {
            autoAlpha: 0,
            y: -90,
            rotateX: -35,
            transformOrigin: 'center bottom',
            duration: 1.2,
          },
          '-=0.45',
        )

        // Location
        .from(
          locationRef.current,
          {
            autoAlpha: 0,
            y: -90,
            duration: 0.8,
          },
          '-=0.8',
        )

        // Card
        .from(cardRef.current, {
          autoAlpha: 0,
          y: 120,
          scale: .92,
          rotateX: 8,
          filter: 'blur(10px)',
          duration: 1.2,
        })
        .to(cardRef.current, {
          y: -6,
          duration: .25,
          ease: 'power2.out',
        })
        .to(cardRef.current, {
          y: 0,
          duration: .35,
          ease: 'bounce.out',
        })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="expertise" className={styles.expertise}>
      {/* ── Background elements ── */}
      <div className={styles.noise} aria-hidden="true" ref={backgroundRef} />

      <div className={styles.background} aria-hidden="true" />

      {/* ── Corner section index ── */}
      <div className={styles.cornerBadge} aria-hidden="true">
        <span className={styles.cornerBadgeNum}>02</span>
        <span className={styles.cornerBadgeLabel}>Expertise</span>
      </div>

      {/* ── Main content ── */}
      <div className={styles.inner}>
        {/* Section header */}
        <header className={styles.header}>
          <div className={styles.eyebrow} ref={eyebrowRef}>
            <span className={styles.eyebrowText}>
              Skills & Technologies · 2025
            </span>
            <span className={styles.eyebrowDot} />
          </div>

          <h2 className={styles.title} ref={titleRef}>
            <span className={styles.titleLine}>
              <span className={styles.titleAccent}>My</span>
            </span>

            <span className={styles.titlePlain}>Expertise</span>
          </h2>

          <div className={styles.divider} ref={dividerRef} />

          <div className={styles.locationWrap} ref={locationRef}>
            <LocationBadge location="Located in Ivano-Frankivsk" />
          </div>
        </header>

        {/* Content columns */}

        <div className={styles.cardCol} ref={cardRef}>
          <CardTech />
        </div>
      </div>
    </section>
  )
}

export default Expertise
