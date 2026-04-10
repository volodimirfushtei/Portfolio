import React, { useRef } from 'react'
import styles from './Footer.module.css'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const footerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end start'],
  })

  // Зсув backgroundPositionY в залежності від скролу
  const bgPosition = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const bgPositionSpring = useSpring(bgPosition, {
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
        zIndex: 2,
        opacity: 0.5,
      }}
    >
      {' '}
      <div className="absolute top-60 right-10 md:right-40 w-72 h-72 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 md:left-40 w-84 h-84 bg-gradient-to-tr from-blue-300 to-purple-500 rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
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
      <h2 className={styles.getStarted}>GET STARTED NOW</h2>
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
]
