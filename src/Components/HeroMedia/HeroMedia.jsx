import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './HeroMedia.module.css'

gsap.registerPlugin(ScrollTrigger)

const HeroMedia = () => {
  const containerRef = useRef(null)
  const imageRef = useRef(null)
  const overlayRef = useRef(null)
  const contentRef = useRef(null)
  const frameRef = useRef(null)
  const nameRef = useRef(null)
  const titleRef = useRef(null)
  const badgeRef = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Entry Animation ── */
      const tl = gsap.timeline({
        defaults: {
          ease: 'power4.out',
        },
      })

      tl

        .from(frameRef.current, {
          scale: 0.8,
          opacity: 0,
          duration: 1,
        })

        .from(imageRef.current, {
          scale: 1.3,
          yPercent: -10,
          opacity: 0,
          filter: 'blur(10px)',
          duration: 1.6,
        }, '<')

        .from(overlayRef.current, {
          opacity: 0,
          scale: 1.2,
          duration: 1,
        }, '<0.2')
        .from(titleRef.current, {
          x: -20,
          opacity: 0,
          duration: .6,
        }, '<0.1')
        .from(nameRef.current, {
          y: 40,
          opacity: 0,
          filter: 'blur(10px)',
          duration: .8,
        }, '-=0.8')

        .from(badgeRef.current, {
          x: 20,
          opacity: 0,
          duration: .6,
        }, '<0.1')

        .from(
          contentRef.current.querySelectorAll('[data-reveal]'),
          {
            x: 60,
            opacity: 0,
            rotateX: 15,
            scale: .95,
            filter: 'blur(8px)',
            stagger: .12,
            duration: 1,
          },
          '-=0.5',
        )

      /* ── Floating Animation ── */
      gsap.to(imageRef.current, {
        y: -20,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      gsap.to(overlayRef.current, {
        x: 20,
        y: -10,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }, containerRef)

    /* ── Magnetic Hover ── */
    const container = containerRef.current
    const image = imageRef.current

    const handleMove = (e) => {
      if (!container || !image) return
      const rect = container.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)

      gsap.to(image, {
        x: x * 30,
        y: y * 5,
        duration: 0.6,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }

    const handleLeave = () => {
      gsap.to(image, {
        x: 0,
        y: 0,
        duration: 1.2,
        ease: 'elastic.out(1, 0.3)',
      })
    }

    container.addEventListener('mousemove', handleMove)
    container.addEventListener('mouseleave', handleLeave)

    return () => {
      ctx.revert()
      container.removeEventListener('mousemove', handleMove)
      container.removeEventListener('mouseleave', handleLeave)

    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={styles.mediaContainer}
      data-cursor="hover"
      data-cursor-type="link"
      data-cursor-text="Hero"
    >
      <img
        ref={imageRef}
        src="/images/preview.webp"
        alt="Hero background"
        className={styles.image}
        loading="lazy"
      />
      <div className={styles.divider} />
      <div className={styles.overlayHalf} />
      <div ref={overlayRef} className={styles.overlay} />
      <div ref={frameRef} className={styles.frame} />

      <div className={styles.liveBadge} ref={badgeRef}>
        <span className={styles.liveDot} />
        LIVE
      </div>

      <span ref={nameRef} className={styles.name}>
        VOLODYMYR FUSHTEI
      </span>

      <div ref={contentRef} className={styles.footer}>
        <div className={styles.info}>
          <span className={styles.label} data-reveal>
            Creative Engineering
          </span>
          <h3 className={styles.title} ref={titleRef}>
            <span>Frontend</span>
            <span>Motion</span>
          </h3>
          <span className={styles.tags} data-reveal>
            React · Next.js · GSAP
          </span>
        </div>

        <div className={styles.right} data-reveal>
          <span className={styles.year}>2026</span>
          <a
            href="https://djinni.co/my/profile/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            View Work
          </a>
        </div>
      </div>
    </div>
  )
}

export default HeroMedia
