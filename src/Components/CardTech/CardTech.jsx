import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import styles from './CardTech.module.css'

const techStack = [
  { name: 'React', icon: 'icon-react' },
  { name: 'JavaScript', icon: 'icon-javascript' },
  { name: 'Next.js', icon: 'icon-nextjs' },
  { name: 'Node.js', icon: 'icon-nodejs' },
  { name: 'Angular', icon: 'icon-angular' },

  { name: 'GSAP', icon: 'icon-gsap' },
  { name: 'Github', icon: 'icon-github' },
  { name: 'React Native', icon: 'icon-react-native' },
  { name: 'Framer', icon: 'icon-framer' },


]

const SvgIcon = ({ id, className, width = 24, height = 24 }) => (
  <svg className={className} width={width} height={height} aria-hidden="true">
    <use href={`/sprite.svg#${id}`} />
  </svg>
)

const CardTech = () => {
  const containerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText('fuschteyy@gmail.com')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.set(containerRef.current, { opacity: 0, y: 50 })

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

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const ctx = gsap.context(() => {
      // Анімація входу
      gsap.to(containerRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power4.out',
      })

      // Анімація tech items
      gsap.from('.techItem', {
        opacity: 0,
        y: 30,
        stagger: 0.08,
        duration: 1,
        ease: 'power3.out',
        delay: 0.5,
      })

    }, containerRef)

    return () => ctx.revert()
  }, [isVisible])

  return (
    <section
      ref={containerRef}
      className={styles.chaoticContainer}
      data-cursor="hover"
      data-cursor-type="link"
    >
      {/* Хаотичні dividers */}
      <div className={styles.divider} style={{ top: '10%', left: '5%', transform: 'rotate(-15deg)' }} />
      <div className={styles.divider} style={{ top: '60%', right: '10%', transform: 'rotate(25deg)' }} />
      <div className={styles.divider} style={{ bottom: '15%', left: '15%', transform: 'rotate(5deg)' }} />
      <div className={styles.divider} style={{ top: '40%', left: '80%', transform: 'rotate(-30deg)' }} />

      {/* Watermark */}
      <div className={styles.watermark} style={{ top: '20%', left: '8%' }}>
        FUSHTEI
      </div>

      {/* Аватарка (не по центру) */}
      <div className={styles.avatarWrap} style={{ top: '15%', left: '12%' }}>
        <img
          src="/images/preview.webp"
          alt="Volodymyr Fushtei"
          className={styles.avatar}
          loading="lazy"
          width="112"
          height="112"
        />
        <span className={styles.avatarStatus} />
      </div>

      {/* Інформація (асиметрично) */}
      <div className={styles.info} style={{ top: '12%', left: '35%' }}>
        <span className={styles.status}>
          <span className={styles.statusDot} />
          Available for freelance
        </span>
        <h2 className={styles.name}>Volodymyr<br />Fushtei</h2>
        <p className={styles.role}>Full Stack Developer</p>
      </div>

      {/* Біо (під кутом) */}
      <p className={styles.bio} style={{ top: '45%', left: '20%' }}>
        Building modern web experiences with React, Next.js, Node.js and motion-driven interfaces.
      </p>

      {/* Tech Stack (хаотично) */}
      <div className={styles.techStack}>
        {techStack.map((tech, index) => (
          <span
            key={tech.name}
            className={styles.techItem}
            style={{
              top: `${10 + index * 8}%`,
              right: '15%',
              transform: `rotate(${index % 2 === 0 ? '2deg' : '-2deg'})`,
              animationDelay: `${index * 0.1}s`,
            }}
          >
            <SvgIcon id={tech.icon} className={styles.svgIcon} />
            {tech.name}
          </span>
        ))}
      </div>

      {/* Кнопки (внизу, асиметрично) */}
      <div className={styles.actions} style={{ bottom: '10%', left: '25%' }}>
        <a
          href="https://github.com/volodimirfushtei"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.primaryBtn}
          aria-label="View on GitHub"
        >
          <SvgIcon id="icon-github" className={styles.svgIcon} />
          View GitHub
        </a>
        <button
          className={styles.secondaryBtn}
          onClick={handleCopyEmail}
          aria-label={copied ? 'Copied!' : 'Copy email'}
        >
          <SvgIcon id="icon-mail" className={styles.svgIcon} />
          {copied ? 'Copied!' : 'Email Me'}
        </button>
      </div>
    </section>
  )
}

export default CardTech