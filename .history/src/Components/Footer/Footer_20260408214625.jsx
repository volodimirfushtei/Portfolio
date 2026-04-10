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
  const textContainerRef = useRef(null)

  const setRef = (el) => {
    if (el && !lettersRef.current.includes(el)) {
      lettersRef.current.push(el)
    }
  }

  // Анімація літер "GET STARTED"
  useEffect(() => {
    if (lettersRef.current.length === 0) return

    const ctx = gsap.context(() => {
      // Спочатку ховаємо всі літери
      gsap.set(lettersRef.current, {
        opacity: 0,
        y: 0,
        rotate: 0,
        filter: "blur(10px)"
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 70%',
          end: 'top 30%',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
      
      tl.to(lettersRef.current, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        rotate: 0,
        stagger: 0.03,
        duration: 1,
        ease: 'power2.out',
      })
    })

    return () => ctx.revert()
  }, [])

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end start'],
  })

  // Анімація фону
  const bgPosition = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const bgPositionSpring = useSpring(bgPosition, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Анімація для тексту
  const textPosition = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const textPositionSpring = useSpring(textPosition, {
    stiffness: 80,
    damping: 25,
  })

  return (
    <motion.footer
      className={styles.footer}
      role="contentinfo"
      ref={footerRef}
      aria-label="Footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
       style={{
        backgroundPositionY: bgPositionSpring,
        position: 'relative',
        backgroundImage: 'url(/images/njeromin2.jpg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        zIndex: 2,
        opacity: 0.5,
      }}
    >
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
              <motion.a
                key={index}
                href={social.url}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -3, scale: 1.1 }}
              >
                <i className={social.icon}></i>
              </motion.a>
            ))}
          </div>
        </div>

        <div className={styles.column}>
          <h4>Quick Links</h4>
          <ul className={styles.linkList}>
            {quickLinks.map((link, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <a href={link.url} className={styles.navLink}>
                  {link.name}
                </a>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className={styles.column}>
          <h4>Contact</h4>
          <address className={styles.contactInfo}>
            {contactInfo.map((item, index) => (
              <motion.p 
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <i className={item.icon}></i>
                {item.url ? (
                  <a href={item.url}>{item.text}</a>
                ) : (
                  <span>{item.text}</span>
                )}
              </motion.p>
            ))}
          </address>
        </div>
      </div>

      {/* GET STARTED секція */}
      <motion.div 
        className={styles.getStarted}
        style={{
          backgroundPositionY: textPositionSpring,
        }}
      >
        {'GET STARTED'.split('').map((char, i) => (
          <span 
            key={i} 
            ref={setRef}
            className={styles.letter}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </motion.div>

      <div className={styles.copyright}>
        <img
          src="/images/Myphoto.jpg"
          alt="my_photo"
          className={styles.myPhoto}
          loading="lazy"
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
  { icon: 'ri-discord-fill', label: 'Discord', url: 'https://discord.com/' },
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
]
