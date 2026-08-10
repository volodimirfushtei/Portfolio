import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react'
import { NAV_ITEMS, socialLinks } from '../../constants/navigations.js'
import TransitionLink from '../../hooks/useTransitionLink.jsx'
import FullscreenButton from '../FullScreenButton/FullScreenButton.jsx'
import styles from './NavHeader.module.css'
import { motion } from 'framer-motion'
import HeaderImage from '../HeaderImage/HeaderImage.jsx'

// SvgIcon компонент
const SvgIcon = React.memo(({ id, className = '', width = 24, height = 24 }) => (
  <svg className={`${styles.icon} ${className}`} width={width} height={height} aria-hidden="true" role="img">
    <use href={`/sprite.svg#${id}`} />
  </svg>
))

SvgIcon.displayName = 'SvgIcon'

// Divider компонент
const Divider = React.memo(({ top, left, right, bottom, width, height, rotate, index }) => (
  <motion.div
    className={styles.divider}
    style={{
      top,
      left,
      right,
      bottom,
      width,
      height,
      transformOrigin: 'center',
    }}
    initial={{ scaleX: 0, opacity: 0, rotate }}
    animate={{ scaleX: 1, opacity: 0.3, rotate }}
    transition={{ duration: 1, delay: 0.1 * index, ease: 'easeOut' }}
    aria-hidden="true"
  />
))

Divider.displayName = 'Divider'

const NavHeader = () => {
  const [selectedLink, setSelectedLink] = useState(NAV_ITEMS[0])
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)


  // Перевірка на мобільний пристрій
  useLayoutEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleLinkHover = useCallback((item) => {
    setSelectedLink(item)
    setIsHovered(true)
  }, [])

  const handleLinkLeave = useCallback(() => {
    setIsHovered(false)
  }, [])

  const translateVariants = useMemo(
    () => ({
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
    }),
    [],
  )

  const linkVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.05 },
  }

  // Хаотичні dividers
  const dividers = [
    { top: '10%', left: '5%', width: '40%', rotate: '-15deg', index: 0 },
    { top: '60%', right: '10%', height: '30%', rotate: '20deg', index: 1 },
    { bottom: '20%', left: '15%', width: '35%', rotate: '5deg', index: 2 },
    { top: '40%', right: '20%', height: '40%', rotate: '-25deg', index: 3 },
    { top: '25%', left: '40%', width: '20%', rotate: '10deg', index: 4 },
    { bottom: '35%', right: '30%', height: '25%', rotate: '-10deg', index: 5 },
  ]

  return (
    <motion.div
      className={styles.wrapper}
      initial={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)', opacity: 0, scale: 0.96 }}
      animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', opacity: 1, scale: 1 }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Глоу ефект */}
      <motion.div
        className={styles.glow}
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.45, 0.2] }}
        transition={{ duration: 6, repeat: Infinity }}
      />


      {/* Noise overlay */}
      <motion.div
        className={styles.noise}
        aria-hidden="true"
        animate={{ y: [2, -2, 2], opacity: [0.1, 0.4, 0.2] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Хаотичні dividers */}
      {dividers.map((divider, index) => (
        <Divider
          key={index}
          top={divider.top}
          left={divider.left}
          right={divider.right}
          bottom={divider.bottom}
          width={divider.width}
          height={divider.height}
          rotate={divider.rotate}
          index={divider.index}
        />
      ))}

      <div className={styles.frame} aria-hidden="true" />

      <div className={styles.fullscreenButton}>
        <FullscreenButton
          aria-label="Toggle fullscreen mode"
          whileHover={{ scale: 1.08, rotate: 90 }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 400, damping: 18 }}
        />
      </div>

      {/* Навігація */}
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
                `${styles.navLink} ${isActive ? styles.active : ''}`}
              aria-current={selectedLink.path === item.path ? 'page' : undefined}
            >
              <span className={styles.mobileNum}>0{index + 1}</span>
              <span className={styles.linkText}>
                <span className={styles.mask}>
                  <motion.span
                    whileHover={{ y: '-50%' }}
                    transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                    className={styles.double}
                  >
                    <span>{item.label}</span>
                    <span>{item.label}</span>
                  </motion.span>
                </span>
              </span>
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

      {/* Header Image */}
      <div className={styles.headerImageWrapper}>
        <HeaderImage selectedLink={selectedLink} />
      </div>

      {/* Mobile Footer */}
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

      {/* Desktop Footer */}
      <footer className={styles.footer}>
        <motion.ul custom={[0.5, 0]} variants={translateVariants} initial="initial" animate="enter" exit="exit">
          <li><span>Made by:</span> Studio Fush</li>
        </motion.ul>
        <motion.ul custom={[0.58, 0]} variants={translateVariants} initial="initial" animate="enter" exit="exit">
          <li><span>Typography:</span> Google Fonts</li>
        </motion.ul>
        <motion.ul custom={[0.66, 0]} variants={translateVariants} initial="initial" animate="enter" exit="exit">
          <li><span>Images:</span> Lummi</li>
        </motion.ul>
        <motion.ul custom={[0.74, 0]} variants={translateVariants} initial="initial" animate="enter" exit="exit">
          <li>Privacy Policy</li>
          <li>Terms & Conditions 2026</li>
        </motion.ul>
      </footer>
    </motion.div>
  )
}

export default NavHeader
