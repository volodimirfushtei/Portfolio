import React, {
  useCallback,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react'
import { NAV_ITEMS, socialLinks } from '../../constants/navigations.js'
import TransitionLink from '../../hooks/useTransitionLink.jsx'
import FullscreenButton from '../FullScreenButton/FullScreenButton.jsx'
import styles from './NavHeader.module.css'
import { motion } from 'framer-motion'
import HeaderImage from '../HeaderImage/HeaderImage.jsx'
import BottomBlur from '../BottomBlur/BottomBlur.jsx'

// ── SvgIcon компонент ──
const SvgIcon = React.memo(
  ({ id, className = '', width = 24, height = 24 }) => (
    <svg
      className={`${styles.icon} ${className}`}
      width={width}
      height={height}
      aria-hidden="true"
      role="img"
    >
      <use href={`/sprite.svg#${id}`} />
    </svg>
  ),
)

SvgIcon.displayName = 'SvgIcon'

// ── Divider компонент ──
const Divider = React.memo(({ top, left, right, bottom, width, height, rotate, index }) => (
  <motion.div
    className={styles.divider}
    style={{ top, left, right, bottom, width, height, transformOrigin: 'left' }}
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

  // ── Перевірка на мобільний пристрій ──
  useLayoutEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
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

  // ── Анімація для посилань при наведенні ──
  const linkVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.05 },
  }

  // ── Декоративні лінії ──
const dividers = [
  // TOP
  { top: "3%", left: "6%", width: "18%", rotate: 0 },
  { top: "3%", right: "8%", width: "12%", rotate: 0 },

  // RIGHT
  { top: "10%", right: "3%", height: "22%", rotate: 90 },
  { bottom: "12%", right: "3%", height: "18%", rotate: 90 },

  // BOTTOM
  { bottom: "3%", left: "8%", width: "14%", rotate: 0 },
  { bottom: "3%", right: "18%", width: "22%", rotate: 0 },

  // LEFT
  { top: "18%", left: "3%", height: "16%", rotate: 90 },
  { bottom: "18%", left: "3%", height: "24%", rotate: 90 },

  // Accent
  { top: "15%", left: "18%", width: "8%", rotate: -12 },
  { bottom: "22%", right: "20%", width: "10%", rotate: 14 },
];

  return (
    <motion.div 
      className={styles.wrapper}
      initial={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)', opacity: 0 }}
      animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', opacity: 1 }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* ── Фонові ефекти ── */}

      <div className={styles.noise} aria-hidden="true" />

      {/* ── Декоративні dividers ── */}
      <div className={styles.divider} style={{ top: '10%', left: '5%', transform: 'rotate(-15deg)' }} />
          <div className={styles.divider} style={{ top: '60%', right: '10%', transform: 'rotate(20deg)' }} />
          <div className={styles.divider} style={{ bottom: '20%', left: '15%', transform: 'rotate(5deg)' }} />
          <div className={styles.divider} style={{ top: '40%', right: '20%', transform: 'rotate(-25deg)' }} />

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
                aria-current={
                  selectedLink.path === item.path ? 'page' : undefined
                }
              >
                <span className={styles.linkText}>
                  <span className={styles.mask}>
                    <motion.span
                      whileHover={{
                        y: '-50%',
                      }}
                      transition={{
                        duration: 0.5,
                        ease: [0.76, 0, 0.24, 1],
                      }}
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
  
        {/* ── Header Image ── */}
        
          <div className={styles.headerImageWrapper}><HeaderImage selectedLink={selectedLink} /></div>
      
      

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
          custom={[0.5, 0]}
          variants={translateVariants}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <li>
            <span>Made by:</span> Studio Fush
          </li>
        </motion.ul>
        <motion.ul
          custom={[0.58, 0]}
          variants={translateVariants}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <li>
            <span>Typography:</span> Google Fonts
          </li>
        </motion.ul>
        <motion.ul
          custom={[0.66, 0]}
          variants={translateVariants}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <li>
            <span>Images:</span> Lummi
          </li>
        </motion.ul>
        <motion.ul
          custom={[0.74, 0]}
          variants={translateVariants}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <li>Privacy Policy</li>
          <li>Terms &amp; Conditions 2026</li>
        </motion.ul>
      </footer>
    </motion.div>
  )
}

export default NavHeader
