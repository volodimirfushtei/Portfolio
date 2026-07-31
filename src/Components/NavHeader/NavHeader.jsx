import React, { useLayoutEffect, useRef, useState } from 'react'
import { NAV_ITEMS } from '../../constants/navigations.js'
import TransitionLink from '../../hooks/useTransitionLink.jsx'
import FullscreenButton from '../FullScreenButton/FullScreenButton.jsx'
import styles from './NavHeader.module.css'
import gsap from 'gsap'
import { motion } from 'framer-motion'
import HeaderImage from '../HeaderImage/HeaderImage.jsx'
import BottomBlur from '../BottomBlur/BottomBlur.jsx'
const SvgIcon = React.memo(({ id, className = '', width = 24, height = 24 }) => (
  <svg className={`${styles.icon} ${className}`} width={width} height={height} aria-hidden="true">
    <use href={`/sprite.svg#${id}`} />
  </svg>
))

const NavHeader = () => {
  const navRef = useRef(null)
  const [selectedLink, setSelectedLink] = useState(NAV_ITEMS[0])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      tl.fromTo(
        navRef.current,
        { clipPath: 'polygon(0 0,100% 0,100% 0,0 0)' },
        {
          clipPath: 'polygon(0 0,100% 0,100% 100%,0 100%)',
          duration: 1,
          ease: 'expo.out',
        },
      )
    }, navRef)

    return () => ctx.revert()
  }, [])

  const translate = {
    initial: { y: '100%', opacity: 0 },
    enter: i => ({
      y: 0,
      opacity: 1,
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1], delay: i[0] },
    }),
    exit: i => ({
      y: '100%',
      opacity: 0,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: i[1] },
    }),
  }

  return (
    <div className={styles.wrapper} ref={navRef}>
      <BottomBlur/>
      <div className={styles.noise} />
      {/* Хаотичні dividers */}
      <div className={styles.divider} style={{ top: '0%', left: '0%', width: '100%', transform: 'rotate(-2deg)' }} />
      <div className={styles.divider} style={{ top: '10%', right: '0%', height: '80%', transform: 'rotate(90deg)' }} />
      <div className={styles.divider} style={{ bottom: '0%', left: '0%', width: '100%', transform: 'rotate(3deg)' }} />
      <div className={styles.divider} style={{ top: '20%', left: '10%', height: '60%', transform: 'rotate(-85deg)' }} />

      <div className={styles.frame} />
      <div className={styles.fullscreenButton}>
        <FullscreenButton aria-label="Toggle fullscreen mode" />
      </div>

      <motion.nav className={styles.nav} custom={[0, 0]} variants={translate} initial="initial" animate="enter"
                  exit="exit">
        {NAV_ITEMS.map((item, index) => (
          <TransitionLink
            onMouseEnter={() => setSelectedLink(item)}
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`}

          >
            {item.label}
          </TransitionLink>
        ))}
      </motion.nav>

      <HeaderImage selectedLink={selectedLink} />

      <div className={styles.footer}>
        <motion.ul custom={[0.3, 0]} variants={translate} initial="initial" animate="enter" exit="exit">
          <li><span>Made by:</span> Studio Fush</li>
        </motion.ul>
        <motion.ul custom={[0.3, 0]} variants={translate} initial="initial" animate="enter" exit="exit">
          <li><span>Typography:</span> Google Fonts</li>
        </motion.ul>
        <motion.ul custom={[0.3, 0]} variants={translate} initial="initial" animate="enter" exit="exit">
          <li><span>Images:</span> Lummi</li>
        </motion.ul>
        <motion.ul custom={[0.3, 0]} variants={translate} initial="initial" animate="enter" exit="exit">
          <li>Privacy Policy</li>
          <li>Terms & Conditions 2026</li>
        </motion.ul>
      </div>
    </div>
  )
}

export default NavHeader
