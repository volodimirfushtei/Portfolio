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

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Entry timeline ── */
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      // Frame clip-path reveal
      tl.fromTo(
        containerRef.current,
        { clipPath: 'inset(12% 12% 12% 12% round 24px)', opacity: 0 },
        {
          clipPath: 'inset(0% 0% 0% 0% round 24px)',
          opacity: 1,
          duration: 1.4,
        },
      )
        .fromTo(
          imageRef.current,
          {
            clipPath: 'inset(100% 0% 0% 0%)',
            scale: 1.2,
          },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            scale: 1,
            duration: 1.8,
            ease: 'expo.inOut',
          },
          '-=1',
        )
        // Overlay fade
        .fromTo(
          overlayRef.current,
          { opacity: 0, filter: 'blur(20px)' },
          { opacity: 1, filter: 'blur(0px)', duration: 1.5 },

          '-=1.4',
        )
        // Accent frame
        .fromTo(
          frameRef.current,
          { scaleX: 0, scaleY: 0, opacity: 0 },
          { scaleX: 1, scaleY: 1, opacity: 1, duration: 1, ease: 'power3.out' },
          '-=1.2',
        )

      // Content stagger
      gsap.fromTo(
        contentRef.current.querySelectorAll('[data-reveal]'),
        {
          opacity: 0,
          y: 80,
          rotateX: 12,
          transformOrigin: 'top center',
          filter: 'blur(12px)',
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: 'blur(0px)',
          stagger: 0.08,
          duration: 1.4,
          ease: 'expo.out',
        },
      )

      // Scroll-driven parallax on image
      /* ─────────────────────────────
         FLOATING PARALLAX
      ───────────────────────────── */

      gsap.to(imageRef.current, {
        y: -18,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }, containerRef)

    /* ── Magnetic hover ── */
    const el = containerRef.current
    const handleMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height
      gsap.to(imageRef.current, {
        x: x * 14,
        y: y * 10,
        duration: 0.8,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }
    const handleLeave = () => {
      gsap.to(imageRef.current, {
        x: 0,
        y: 0,
        duration: 1,
        ease: 'elastic.out(1,0.4)',
      })
    }
    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)

    return () => {
      ctx.revert()
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  return (
    <div ref={containerRef} className={styles.mediaContainer} data-cursor="hover" data-cursor-type="link" data-cursor-text="Hero">
      <img
        ref={imageRef}
        src="/images/preview.webp"
        alt=""
        className={styles.image}
      />

      <div ref={overlayRef} className={styles.overlay} />

      <div className={styles.liveBadge}>
        <span className={styles.liveDot} />
        LIVE
      </div>

      <div ref={frameRef} className={styles.frame} />

      <div ref={contentRef} className={styles.footer}>
        <div className={styles.info}>
          <span className={styles.label} data-reveal>
            Creative Engineering
          </span>

          <h3 className={styles.title} data-reveal>
            Frontend
            <br />
            Motion
          </h3>

          <span className={styles.tags} data-reveal>
            React · Next.js · GSAP
          </span>
        </div>

        <div className={styles.right} data-reveal>
          <span className={styles.year}>2025</span>

          <a
            href="https://djinni.co/my/profile/"
            target="_blank"
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
