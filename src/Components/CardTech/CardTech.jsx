import { useCallback, useEffect, useRef, useState } from 'react'
import styles from './CardTech.module.css'
import { gsap } from 'gsap'

// ✅ Updated with sprite IDs
const techStack = [
  { name: 'React', icon: 'icon-react' },
  { name: 'Next.js', icon: 'icon-nextjs' },
  { name: 'Node.js', icon: 'icon-nodejs' },
  { name: 'JavaScript', icon: 'icon-javascript' },
  { name: 'CSS3', icon: 'icon-css' },
  { name: 'HTML5', icon: 'icon-html' },
  { name: 'GSAP', icon: 'icon-gsap' },
  { name: 'Github', icon: 'icon-github' },
  { name: 'React Native', icon: 'icon-react-native' },
  { name: 'Tailwind CSS', icon: 'icon-tailwindcss' },
  { name: 'Framer', icon: 'icon-framer' },
]

const CardTech = () => {
  const profileCardRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText('fuschteyy@gmail.com')
      setCopied(true)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }, [])

  useEffect(() => {
    let timer
    if (copied) {
      timer = setTimeout(() => setCopied(false), 2000)
    }
    return () => clearTimeout(timer)
  }, [copied])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.set(profileCardRef.current, {
      opacity: 0,
      filter: 'blur(8px)',
      scale: 0.95,
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    if (profileCardRef.current) {
      observer.observe(profileCardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const ctx = gsap.context(() => {
      gsap.to(profileCardRef.current, {
        opacity: 1,
        filter: 'blur(0)',
        scale: 1,
        duration: 1,
        ease: 'power4.out',
      })
    }, profileCardRef)

    return () => ctx.revert()
  }, [isVisible])

  // ✅ SVG Icon Component (reusable)
  const SvgIcon = ({ id, className, width = 24, height = 24 }) => (
    <svg className={className} width={width} height={height} aria-hidden="true">
      <use href={`/sprite.svg#${id}`} />
    </svg>
  )

  return (
    <section lang="en" className={styles.profileCard} ref={profileCardRef}>
      <div className={styles.profileCardNoise} aria-hidden="true" />
      <div className={styles.devider} aria-hidden="true" />
      <div className={styles.overlayHalf} aria-hidden="true" />
      <div className={styles.watermark} aria-hidden="true">
        FUSHTEI
      </div>

      <div className={styles.profileHeader}>
        <div className={styles.avatarWrap}>
          <img
            src="/images/preview.webp"
            alt="Volodymyr Fushtei"
            className={styles.avatar}
            loading="lazy"
            width="112"
            height="112"
          />
          <span className={styles.avatarStatus} aria-hidden="true" />
        </div>

        <div className={styles.info}>
          <span className={styles.status}>
            <span className={styles.statusDot} aria-hidden="true" />
            Available for freelance
          </span>

          <h2 className={styles.name}>Volodymyr Fushtei</h2>
          <p className={styles.role}>Full Stack Developer</p>
        </div>
      </div>

      <p className={styles.bio}>
        Building modern web experiences with React, Next.js, Node.js and
        motion-driven interfaces.
      </p>

      <div className={styles.techStack}>
        {techStack.map((tech) => (
          <span key={tech.name} className={styles.techItem}>
            <SvgIcon id={tech.icon} className={styles.svgIcon} />
            {tech.name}
          </span>
        ))}
      </div>

      <div className={styles.actions}>
        <a
          href="https://github.com/volodimirfushtei"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.primaryBtn}
          aria-label="View Volodymyr Fushtei on GitHub (opens in new tab)"
        >
          <SvgIcon id="icon-github" className={styles.svgIcon} />
          View GitHub
        </a>

        <button
          className={styles.secondaryBtn}
          onClick={handleCopyEmail}
          aria-label={copied ? 'Email copied to clipboard!' : 'Copy email address'}
        >
          <SvgIcon id="icon-mail" className={styles.svgIcon} />
          {copied ? 'Copied!' : 'Email Me'}
        </button>
      </div>
    </section>
  )
}

export default CardTech
