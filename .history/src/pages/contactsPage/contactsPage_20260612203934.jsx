import React, { useEffect, useRef } from 'react'
import styles from './contactsPage.module.css'
import ContactForm from '../../Components/ContactForm/ContactForm'
import gsap from 'gsap/dist/gsap'
import AnimatedPage from '../../Components/AnimatedPage/AnimatedPage'

const ContactsPage = () => {
  const containerRef = useRef(null)
  const headerRef = useRef(null)
  const contentRef = useRef(null)
  const bgRef = useRef(null)

  const socialItems = [
    {
      icon: 'icon-facebook',
      label: 'Facebook',
      url: 'https://facebook.com',
    },
    {
      icon: 'icon-instagram',
      label: 'Instagram',
      url: 'https://instagram.com',
    },
    {
      icon: 'icon-telegram',
      label: 'Telegram',
      url: 'https://telegram.org',
    },
    {
      icon: 'icon-linkedin',
      label: 'LinkedIn',
      url: 'https://linkedin.com',
    },
    { icon: 'icon-github', label: 'GitHub', url: 'https://github.volodimirfushtei.com' },
  ]

  useEffect(() => {
    // ✅ ФІКС 1: Перевіра на null перед використанням
    if (!containerRef.current) {
      console.warn('[ContactsPage] Container ref is null')
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // Background entry
      tl.fromTo(
        bgRef.current,
        {
          scale: 1.4,
          opacity: 0,
          filter: 'grayscale(1) brightness(0) blur(10px)',
        },
        {
          scale: 1,
          opacity: 0.6,
          filter: 'grayscale(1) brightness(0.2) blur(2px)',
          duration: 2.5,
          ease: 'power2.out',
        },
      )

      // Background subtle drift (parallel)
      gsap.to(bgRef.current, {
        x: -20,
        y: -15,
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2.5,
      })

      // Header reveal
      tl.from(
        `.${styles.eyebrow}`,
        {
          opacity: 0,
          x: -20,
          duration: 1,
          ease: 'power3.out',
        },
        '-=1.5',
      )
        .from(
          `.${styles.headingLine} span`,
          {
            y: 120,
            rotateX: -95,
            opacity: 0,
            stagger: 0.15,
            duration: 1.5,
            ease: 'power4.out',
          },
          '-=0.8',
        )

        .from(
          `.${styles.textSection} .${styles.article}`,
          {
            opacity: 0,
            y: 40,
            stagger: 0.15,
            duration: 1,
            ease: 'power3.out',
          },
          '-=0.6',
        )

        .from(
          `.${styles.socials} a`,
          {
            opacity: 0,
            scale: 0.5,
            stagger: 0.08,
            duration: 0.6,
            ease: 'back.out(1.7)',
          },
          '-=0.4',
        )
        .from(
          `.${styles.formsContainer} > div:last-child`,
          {
            opacity: 0,
            x: 30,
            duration: 1,
            ease: 'power3.out',
          },
          '-=0.8',
        )
    }, containerRef)

    // ✅ Cleanup при розмонтуванні
    return () => ctx.revert()
  }, [])

  return (
    <AnimatedPage>
      <div className={styles.contactsPage} ref={containerRef}>
        {/* Visual Overlays */}
        <div className={styles.noise} aria-hidden="true" />
        <div className={styles.scanlines} aria-hidden="true" />
        <div className={styles.bg} ref={bgRef} aria-hidden="true" />

        <div className={styles.container}>
          {/* Header */}
          <header ref={headerRef} className={styles.header}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowLine} />
              <span className={styles.eyebrowText}>Open for opportunities</span>
            </div>
            <h1 className={styles.pageTitle}>
              <div className={styles.headingLine}>
                <span>Let's</span>{' '}
                <span className={styles.pageTitleAccent}>Connect</span>
              </div>
            </h1>
          </header>

          <div className={styles.formsContainer} ref={contentRef}>
            <div className={styles.textSection}>
              <div className={styles.glassBox}>
                <article className={styles.article}>
                  <h3 className={styles.title}>
                    <svg
                      className={styles.icon}
                      aria-hidden="true"
                      width={24}
                      height={24}
                    >
                      <use href={`/sprite.svg#icon-mail`} />
                    </svg>
                    Get in Touch
                  </h3>
                  <p className={styles.description}>
                    Drop me a line or follow my digital journey through social
                    media. I'm always open to discussing new projects, creative
                    idease, or opportunities to be part of your vision.
                  </p>
                </article>

                <article className={styles.article}>
                  <h3 className={styles.title}>
                    <svg className={styles.icon} aria-hidden="true" width={24} height={24}>
                      <use href={`/sprite.svg#icon-react`} />
                    </svg>
                    Modern Execution
                  </h3>
                  <p className={styles.description}>
                    Every interaction is crafted with precision, utilizing the
                    latest technologies to ensure a seamless and engaging user
                    experience.
                  </p>
                </article>

                <article className={styles.article}>
                  <h3 className={styles.title}>
                    <svg className={styles.icon} aria-hidden="true" width={24} height={24}>
                      <use href={`/sprite.svg#icon-discord`} />
                    </svg>
                    Collaboration
                  </h3>
                  <p className={styles.description}>
                    I believe in the power of collective creativity. Let's
                    combine our strengths to build something that truly stands
                    out in the digital landscape.
                  </p>
                </article>
<div>
               <ul className={styles.socials} aria-label="Social media links">
  {socialItems.map((item, index) => (
    <li
      key={index}
      href={item.url}
      className={styles.socialLink}
      aria-label={item.label}
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg
        className={styles.icon} 
        aria-hidden="true"
        width={24}
        height={24}
      >
        <use href={`/sprite.svg#${item.icon}`} />
      </svg>
    </li>
    
  ))}
                </ul>
                </div>
              </div>
            </div>

            <div>
              <ContactForm key="ContactForm" />
            </div>
          </div>

          <footer className={styles.infoContainer}>
            <p className={styles.copyright}>
              <svg className={styles.icon} aria-hidden="true" width={24} height={24}>
                <use href={`/sprite.svg#icon-copyright`} />
              </svg>
              2025 Volodymyr Fushtey
              <svg  
                className={styles.icon}
                aria-hidden="true"
                width={24}
                height={24}
              >
                <use href={`/sprite.svg#icon-heart`} />
              </svg>
            </p>
            <p className={styles.copyright}>
              Build with dedication{' '}
              <svg className={styles.icon} aria-hidden="true" width={24} height={24}>
                      <use href={`/sprite.svg#icon-discord`} />
                    </svg>
            </p>
          </footer>
        </div>
      </div>
    </AnimatedPage>
  )
}

export default ContactsPage
