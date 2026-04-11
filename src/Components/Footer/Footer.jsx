import React, { useEffect, useRef } from 'react'
import styles from './Footer.module.css'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const footerRef = useRef(null)
  const lettersRef = useRef([])
  const getStartedRef = useRef(null)

  const setRef = (el, i) => {
    if (el) {
      lettersRef.current[i] = el
    }
  }

  useEffect(() => {
    lettersRef.current = []

    const ctx = gsap.context(() => {
      // Анімація для GET STARTED тексту
      if (lettersRef.current.length > 0) {
        gsap.fromTo(
          lettersRef.current,
          {
            opacity: 0,
            y: 80,
            filter: "blur(10px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 80%',
              end: 'top 30%',
              scrub: 1,
            }
          }
        )
      }

      // Анімація для всього футера
      gsap.fromTo(
        footerRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            end: 'top 70%',
            scrub: 1,
          }
        }
      )
    }, footerRef)

    // 3D ефект при русі миші (тільки на десктопі)
    const handleMouseMove = (e) => {
      if (!footerRef.current || window.innerWidth < 1024) return

      const rect = footerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = ((y - centerY) / centerY) * 3
      const rotateY = -((x - centerX) / centerX) * 3

      gsap.to(footerRef.current, {
        rotateX,
        rotateY,
        duration: 0.8,
        ease: 'power3.out',
      })
    }

    const handleMouseLeave = () => {
      if (!footerRef.current) return
      gsap.to(footerRef.current, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)',
      })
    }

    if (footerRef.current) {
      footerRef.current.addEventListener('mousemove', handleMouseMove)
      footerRef.current.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      if (footerRef.current) {
        footerRef.current.removeEventListener('mousemove', handleMouseMove)
        footerRef.current.removeEventListener('mouseleave', handleMouseLeave)
      }
      ctx.revert()
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end start'],
  })

  const bgPosition = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const bgPositionSpring = useSpring(bgPosition, {
    stiffness: 50,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.footer
      className={styles.footer}
      role="contentinfo"
      ref={footerRef}
      aria-label="Footer"
      style={{
        backgroundPositionY: bgPositionSpring,
        backgroundImage: 'url(/images/njeromin2.jpg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      {/* Градієнтні ефекти */}
      <div className={styles.gradientTop} aria-hidden="true" />
      <div className={styles.gradientBottom} aria-hidden="true" />
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.content}>
        {/* Колонка 1 - Логотип та соціальні мережі */}
        <div className={styles.column}>
          <div className={styles.logo}>
            <h4 className={styles.portfolio}>Portfolio</h4>
            <p className={styles.description}>
              Modern web development solutions tailored to your needs
            </p>
          </div>
          <div className={styles.socialLinks}>
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <i className={social.icon} />
              </a>
            ))}
          </div>
        </div>

        {/* Колонка 2 - Швидкі посилання */}
        <div className={styles.column}>
          <h4>Quick Links</h4>
          <ul className={styles.linkList}>
            {quickLinks.map((link, index) => (
              <li key={index}>
                <a href={link.url} className={styles.navLink}>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Колонка 3 - Контакти */}
        <div className={styles.column}>
          <h4>Contact</h4>
          <address className={styles.contactInfo}>
            {contactInfo.map((item, index) => (
              <p key={index}>
                <i className={item.icon} />
                {item.url ? (
                  <a href={item.url}>{item.text}</a>
                ) : (
                  <span>{item.text}</span>
                )}
              </p>
            ))}
          </address>
        </div>
      </div>

      {/* GET STARTED текст */}
      <div ref={getStartedRef} className={styles.getStarted} aria-label="Get Started">
        {'GET STARTED'.split('').map((char, i) => (
          <span
            key={i}
            ref={(el) => setRef(el, i)}
            className={styles.getStartedChar}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>

      {/* Copyright */}
      <div className={styles.copyright}>
        <img
          src="/images/Myphoto.jpg"
          alt="my_photo"
          className={styles.myPhoto}
        />
        <span>© {currentYear} My Portfolio. All rights reserved.</span>
      </div>
    </motion.footer>
  )
}

export default Footer

const socialLinks = [
  {
    icon: 'ri-github-fill',
    label: 'GitHub',
    url: 'https://github.com/volodimirfushtei',
  },
  {
    icon: 'ri-linkedin-fill',
    label: 'LinkedIn',
    url: 'https://linkedin.com/in/yourprofile',
  },
  {
    icon: 'ri-slack-fill',
    label: 'Slack',
    url: 'https://random-x1r5268.slack.com/team/U07UCAKB1RV',
  },
  {
    icon: 'ri-discord-fill',
    label: 'Discord',
    url: 'https://discord.gg/'
  },
]

const quickLinks = [
  { name: 'Home', url: '#home' },
  { name: 'Projects', url: '#projects' },
  { name: 'Tech', url: '#tech' },
  { name: 'Contacts', url: '#contacts' },
]

const contactInfo = [
  { icon: 'ri-map-pin-line', text: 'Ivano-Frankivsk, Ukraine' },
  {
    icon: 'ri-mail-line',
    text: 'fushteyy@gmail.com',
    url: 'mailto:fushteyy@gmail.com',
  },
  {
    icon: 'ri-phone-line',
    text: '+380 95 877 71 07',
    url: 'tel:+380958777107',
  },
  {
    icon: 'ri-telegram-line',
    text: 'Telegram',
    url: 'https://t.me/volodimirfushtei',
  },
]
