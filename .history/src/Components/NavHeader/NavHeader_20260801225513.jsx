import React, { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { NAV_ITEMS, socialLinks } from '../../constants/navigations.js'
import TransitionLink from '../../hooks/useTransitionLink.jsx'
import FullscreenButton from '../FullScreenButton/FullScreenButton.jsx'
import styles from './NavHeader.module.css'
import gsap from 'gsap'
import { motion } from 'framer-motion'
import HeaderImage from '../HeaderImage/HeaderImage.jsx'
import BottomBlur from '../BottomBlur/BottomBlur.jsx'

// ── SvgIcon компонент ──
const SvgIcon = React.memo(({ id, className = '', width = 24, height = 24 }) => (
  <svg
    className={`${styles.icon} ${className}`}
    width={width}
    height={height}
    aria-hidden="true"
    role="img"
  >
    <use href={`/sprite.svg#${id}`} />
  </svg>
))

SvgIcon.displayName = 'SvgIcon'

// ── Divider компонент ──
const Divider = React.memo(({ style }) => (
  <div className={styles.divider} style={style} aria-hidden="true" />
))

Divider.displayName = 'Divider'

const NavHeader = () => {
  const navRef = useRef(null)
  const [selectedLink, setSelectedLink] = useState(NAV_ITEMS[0])
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // ── Перевірка на мобільний пристрій ──
  useLayoutEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // ── GSAP анімація появи ──
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: 'expo.out',
          duration: 1.2,
        },
      })

      // Анімація появи навігації
      tl.fromTo(
        navRef.current,
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
          opacity: 0,
        },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          opacity: 1,
          duration: 1.4,
          ease: 'expo.out',
        },
      )

      // Анімація для divider елементів
      const dividers = document.querySelectorAll(`.${styles.divider}`)
      if (dividers.length > 0) {
        gsap.fromTo(
          dividers,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 0.3,
            duration: 1,
            stagger: 0.1,
            ease: 'power2.out',
            transformOrigin: 'left',
          },
        )
      }

      // Анімація для футера
      const footerItems = document.querySelectorAll(`.${styles.footer} ul`)
      if (footerItems.length > 0) {
        gsap.fromTo(
          footerItems,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: 'power3.out',
            delay: 0.5,
          },
        )
      }

    }, navRef)

    return () => ctx.revert()
  }, [])

  // ── Обробка вибору посилання ──
  const handleLinkHover = useCallback((item) => {
    setSelectedLink(item)
    setIsHovered(true)
  }, [])

  const handleLinkLeave = useCallback(() => {
    setIsHovered(false)
  }, [])

  // ── Мемоізовані варіанти анімації ──
  const translateVariants = useMemo(() => ({
    initial: { y: '100%', opacity: 0 },
    enter: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.76, 0, 0.24, 1],
        delay: i?.[0] || 0,
      },
    }),
    exit: (i) => ({
      y: '100%',
      opacity: 0,
      transition: {
        duration: 0.7,
        ease: [0.76, 0, 0.24, 1],
        delay: i?.[1] || 0,
      },
    }),
  }), [])

  // ── Анімація для посилань при наведенні ──
  const linkVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.05 },
  }

  // ── Декоративні лінії ──
  const dividers = useMemo(() => [
    { style: { top: '0%', left: '0%', width: '100%', transform: 'rotate(-2deg)' } },
    { style: { top: '10%', right: '0%', height: '80%', transform: 'rotate(90deg)' } },
    { style: { bottom: '0%', left: '0%', width: '100%', transform: 'rotate(3deg)' } },
    { style: { top: '20%', left: '10%', height: '60%', transform: 'rotate(-85deg)' } },
  ], [])

  return (
    <div className={styles.wrapper} ref={navRef}>
      {/* ── Фонові ефекти ── */}
      
      <div className={styles.noise} aria-hidden="true" />

      {/* ── Декоративні dividers ── */}
      {dividers.map((divider, index) => (
        <Divider key={index} style={divider.style} />
      ))}

      <div className={styles.frame} aria-hidden="true" />

      <div className={styles.fullscreenButton}>
        <FullscreenButton aria-label="Toggle fullscreen mode" />
      </div>

      {/* ── Навігація ── */}
      <motion.nav
        className={styles.nav}
        custom={[0, 0]}
        variants={translateVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        role="navigation"
        aria-label="Main navigation"
      >
        {NAV_ITEMS.map((item, index) => (
          <motion.div
            key={item.path}
            variants={linkVariants}
            initial="idle"
            whileHover="hover"
            transition={{ duration: 0.3 }}
          >
            <TransitionLink
              onMouseEnter={() => handleLinkHover(item)}
              onMouseLeave={handleLinkLeave}
              to={item.path}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ''}`
              }
              aria-current={selectedLink.path === item.path ? 'page' : undefined}
            >
              <span className={styles.linkText}><span className={styles.mask}>

        <motion.span
          whileHover={{
            y: '-50%',
          }}
          transition={{
            duration: .5,
            ease: [0.76, 0, 0.24, 1],
          }}
          className={styles.double}
        >
            <span>{item.label}</span>
            <span>{item.label}</span>
        </motion.span>

    </span></span>
              {selectedLink.path === item.path && (
                <motion.span
                  className={styles.linkIndicator}
                  layoutId="navIndicator"
                  transition={{ duration: 0.3 }}
                />
              )}
            </TransitionLink>
          </motion.div>
        ))}
      </motion.nav>

      {/* ── Header Image ── */}
      <HeaderImage selectedLink={selectedLink} />

      {/* ── Mobile Footer ── */}
      <div className={styles.mobileFooter}>
        <div className={styles.mobileSocial}>
          {socialLinks.map((social) => (
            <a
              key={social.url}
              href={social.url}
              aria-label={social.label}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mobileSocialLink}
            >
              <SvgIcon id={social.icon} width={24} height={24} />
            </a>
          ))}
        </div>
        <p className={styles.mobileFooterText}>
          Volodymyr Fushtei © {new Date().getFullYear()}
        </p>
      </div>

      {/* ── Desktop Footer ── */}
      <footer className={styles.footer}>
        <motion.ul
          custom={[0.3, 0]}
          variants={translateVariants}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <li><span>Made by:</span> Studio Fush</li>
        </motion.ul>
        <motion.ul
          custom={[0.3, 0]}
          variants={translateVariants}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <li><span>Typography:</span> Google Fonts</li>
        </motion.ul>
        <motion.ul
          custom={[0.3, 0]}
          variants={translateVariants}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <li><span>Images:</span> Lummi</li>
        </motion.ul>
        <motion.ul
          custom={[0.3, 0]}
          variants={translateVariants}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <li>Privacy Policy</li>
          <li>Terms &amp; Conditions 2026</li>
        </motion.ul>
      </footer>
    </div>
  )
}

export default NavHeader
