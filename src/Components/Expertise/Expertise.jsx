import { useEffect, useRef } from 'react'
import styles from './Expertise.module.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CardTech from '../CardTech/CardTech'
import LocationBadge from '../Location/Location'

gsap.registerPlugin(ScrollTrigger)

const Expertise = () => {
  // Refs
  const backgroundRef = useRef(null)
  const eyebrowRef = useRef(null)
  const eyebrowTextRef = useRef(null)
  const titleRef = useRef(null)
  const dividerRef = useRef(null)
  const locationRef = useRef(null)
  const cardRef = useRef(null)
  const sectionRef = useRef(null)
  const blurOrb1Ref = useRef(null)
  const blurOrb2Ref = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      // Entry Animation (Timeline)
      const tl = gsap.timeline({
        defaults: { ease: 'power4.out' },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          end: 'bottom 10%',
          once: true,
        },
      })

      // 1. Background reveal
      tl.from(backgroundRef.current, {
        autoAlpha: 0,
        scale: 1.15,
        filter: 'blur(50px)',
        duration: 1.6,
      })

      // 2. Eyebrow
      tl.from(eyebrowRef.current, {
        autoAlpha: 0,
        x: 40,
        duration: 0.8,
      }, '-=1')

      // 3. Divider
      tl.from(dividerRef.current, {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.9,
      }, '-=0.5')


      // 5. Location
      tl.from(locationRef.current, {
        autoAlpha: 0,
        x: -50,
        duration: 0.8,
      }, '-=0.8')

      // 6. Card (with bounce effect)
      tl.from(cardRef.current, {
        autoAlpha: 0,
        x: 50,
        scale: 0.9,
        rotateX: 10,
        duration: 1.4,
      })
        .to(cardRef.current, {
          y: -8,
          duration: 0.25,
          ease: 'power2.out',
        })
        .to(cardRef.current, {
          y: 0,
          duration: 0.4,
          ease: 'bounce.out',
        })

      // 7. Blur Orbs (parallax on scroll)
      gsap.to([blurOrb1Ref.current, blurOrb2Ref.current], {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      })

      // 8. Magnetic hover for card
      const card = cardRef.current
      if (card) {
        const handleMove = (e) => {
          const rect = card.getBoundingClientRect()
          const x = (e.clientX - rect.left - rect.width / 2) / rect.width
          const y = (e.clientY - rect.top - rect.height / 2) / rect.height
          gsap.to(card, {
            x: x * 30,
            y: y * 30,
            duration: 0.6,
            ease: 'power3.out',
          })
        }
        const handleLeave = () => {
          gsap.to(card, {
            x: 0,
            y: 0,
            duration: 0.8,
            ease: 'elastic.out(1, 0.3)',
          })
        }
        card.addEventListener('mousemove', handleMove)
        card.addEventListener('mouseleave', handleLeave)
        return () => {
          card.removeEventListener('mousemove', handleMove)
          card.removeEventListener('mouseleave', handleLeave)
        }
      }
    }, sectionRef)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} id="expertise" className={styles.expertise}>
      {/* Background Elements */}
      <div className={styles.background} aria-hidden="true" ref={backgroundRef} />
      <div className={styles.noise} aria-hidden="true" />
      <div className={styles.blurOrb1} aria-hidden="true" ref={blurOrb1Ref} />
      <div className={styles.blurOrb2} aria-hidden="true" ref={blurOrb2Ref} />

      {/* Corner Badge */}
      <div className={styles.cornerBadge} aria-hidden="true">
        <span className={styles.cornerBadgeNum}>02</span>
        <span className={styles.cornerBadgeLabel}>Expertise</span>
      </div>

      {/* Main Content */}
      <div className={styles.inner}>
        {/* Section Header */}
        <header className={styles.header}>
          <div className={styles.eyebrow} ref={eyebrowRef}>
            <span ref={eyebrowTextRef} className={styles.eyebrowText}>Skills & Technologies · 2026</span>
            <span className={styles.eyebrowDot} />
          </div>

          <h2 className={styles.title} ref={titleRef}>
            <span className={styles.titleLine}>
              <span className={styles.titleAccent}>My</span>
            </span>
            <span className={styles.titleLine}>
              <span className={styles.titlePlain}>Expertise</span>
            </span>
          </h2>

          <div className={styles.divider} ref={dividerRef} />

          <div className={styles.locationWrap} ref={locationRef}>
            <LocationBadge location="Located in Ivano-Frankivsk" />
          </div>
        </header>

        {/* Content Columns */}
        <div className={styles.columns}>
          <div className={styles.cardCol} ref={cardRef}>
            <CardTech />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Expertise
