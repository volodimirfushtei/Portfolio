import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import styles from './NotFoundPage.module.css'

const socials = [
  {
    icon: 'ri-github-fill',
    href: 'https://github.com/volodimirfushtei',
    label: 'GitHub',
  },
  {
    icon: 'ri-linkedin-fill',
    href: 'https://linkedin.com/',
    label: 'LinkedIn',
  },
  {
    icon: 'ri-instagram-fill',
    href: 'https://instagram.com/',
    label: 'Instagram',
  },
]

export default function NotFoundPage() {
  const numRef = useRef(null)
  const titleRef = useRef(null)
  const descRef = useRef(null)
  const actionsRef = useRef(null)
  const glitchRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Glitch flicker on "404" ── */
      gsap.to(glitchRef.current, {
        opacity: 0,
        duration: 0.08,
        yoyo: true,
        repeat: -1,
        repeatDelay: 3.5,
        ease: 'steps(1)',
      })

      /* ── Initial reveal timeline ── */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from(numRef.current, {
        opacity: 0,
        y: 60,
        duration: 1,
        delay: 0.2,
      })
        .from(titleRef.current, { opacity: 0, y: 30, duration: 0.7 }, '-=0.4')
        .from(descRef.current, { opacity: 0, y: 20, duration: 0.6 }, '-=0.3')
        .from(
          actionsRef.current.children,
          {
            opacity: 0,
            y: 16,
            stagger: 0.1,
            duration: 0.5,
          },
          '-=0.2',
        )
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className={styles.page}>
      {/* Grain texture */}
      <div className={styles.grain} aria-hidden="true" />

      {/* Grid overlay */}
      <div className={styles.grid} aria-hidden="true" />

      {/* Scanlines */}
      <div className={styles.scanlines} aria-hidden="true" />

      {/* Background big number */}
      <span className={styles.bgNum} aria-hidden="true">
        404
      </span>

      {/* Content */}
      <div className={styles.content}>
        {/* Eyebrow */}
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowLine} />
          <span className={styles.eyebrowText}>Error · Page not found</span>
          <span className={styles.eyebrowLine} />
        </div>

        {/* 404 */}
        <div className={styles.numWrap} ref={numRef}>
          <h1 className={styles.num}>
            4
            <span
              ref={glitchRef}
              className={styles.numGlitch}
              aria-hidden="true"
            >
              0
            </span>
            <span className={styles.numReal}>0</span>4
          </h1>
        </div>

        {/* Title */}
        <h2 ref={titleRef} className={styles.title}>
          Lost in the void
        </h2>

        {/* Description */}
        <p ref={descRef} className={styles.desc}>
          This page doesn't exist — or maybe it never did.
          <br />
          The URL might be broken, or the page was moved.
        </p>

        {/* Actions */}
        <div ref={actionsRef} className={styles.actions}>
          <Link to="/" className={styles.btnPrimary}>
            <span>← Back Home</span>
          </Link>

          <div className={styles.socials}>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={s.label}
              >
                <i className={s.icon} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
