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

  const setRef = (el, i) => {
    if (el) {
      lettersRef.current[i] = el
    }
  }

  useEffect(() => {
    lettersRef.current = []
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 30%',
          end: 'bottom 60%',
          scrub: true, // Більш плавний скраб

        },
      })
      tl.fromTo(
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
        }
      )

      gsap.fromTo(
        footerRef.current,
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
        }
      )
    })

    const handleMouseMove = (e) => {
      const rect = footerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = ((y - centerY) / centerY) * 10
      const rotateY = -((x - centerX) / centerX) * 10
      gsap.to(footerRef.current, {
        rotateX,
        rotateY,
        duration: 0.5,
        ease: 'power3.out',
      })
    }

    return () => {
      footerRef.current?.removeEventListener('mousemove', handleMouseMove)
      ctx.revert()
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end start'],
  })

  // Зсув backgroundPositionY в залежності від скролу
  const bgPosition = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const bgPositionSpring = useSpring(bgPosition, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001,
    ease: 'easeInOut',
  })
  const bgPositionSpringText = useSpring(bgPosition, {

    stiffness: 50,
    damping: 20,
    restDelta: 0.001,
    ease: 'easeInOut',
  })
  return (
    <motion.footer
      className={styles.footer}
      role="contentinfo"
      ref={footerRef}
      aria-label="Footer"
      style={{
        backgroundPositionY: bgPositionSpring,
        position: 'relative',
        backgroundImage: 'url(/images/njeromin2.jpg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        zIndex: 1,
        opacity: 0.8,
      }}
    >
      {' '}
      {/* Градієнтні ефекти */}
      <div className={styles.gradientTop}></div>
      <div className={styles.gradientBottom}></div>
      <div className={styles.content}>
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
                <i className={social.icon}></i>
              </a>
            ))}
          </div>
        </div>

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

        <div className={styles.column}>
          <h4>Contact</h4>
          <address className={styles.contactInfo}>
            {contactInfo.map((item, index) => (
              <p key={index}>
                <i className={item.icon}></i>
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
      <div className={styles.getStarted} aria-label="Get Started" style={{ width: '100%', backgroundPositionY: bgPositionSpringText, position: 'absolute', bottom: '50px', left: '50%', transform: 'translateX(-50%)', zIndex: 3 }}>
        {'GET STARTED'.split('').map((char, i) => (
          <span key={i} ref={(el) => setRef(el, i)}>
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
      <div className={styles.copyright}>
        <img
          src="/images/Myphoto.jpg"
          alt="my_photo"
          className={styles.myPhoto}
        />
        © {currentYear} My Portfolio. All rights reserved.
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
  { icon: 'ri-discord-fill', label: 'Discord', url: '#' },
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
