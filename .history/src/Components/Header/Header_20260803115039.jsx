import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import styles from './Header.module.css'
import ToggleTheme from '../ToggleTheme/ToggleTheme'
import gsap from 'gsap'
import useScrollDetection from '../../hooks/useScrollDetection'
import Logo from '../Logo/Logo'
import { NAV_ITEMS, socialLinks } from '../../constants/navigations'
import NavHeader from '../NavHeader/NavHeader.jsx'
import clsx from 'clsx'

// ✅ Reusable SVG Icon component with memo

const SvgIcon = React.memo(({ id, className = '', width = 24, height = 24 }) => (
  <svg className={`${styles.icon} ${className}`} width={width} height={height} aria-hidden="true">
    <use href={`/sprite.svg#${id}`} />
  </svg>
))
const Header = () => {
  const headerRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const location = useLocation()
  const animationRef = useRef(null) // ✅ For GSAP cleanup
  const burgerRef = useRef(null)
  const labelRef = useRef(null)
  const isScrolled = useScrollDetection(50)
  const [scrollDirection, setScrollDirection] = useState('up')
  const prevScrollRef = useRef(0)
  const wrapperRef = useRef(null)
 


  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY

      // ✅ Виправлена логіка напрямку
      if (currentScroll > prevScrollRef.current) {
        setScrollDirection('down')
      } else if (currentScroll < prevScrollRef.current) {
        setScrollDirection('up')
      }
      prevScrollRef.current = currentScroll


    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

// ✅ Виправлена логіка приховування
  useEffect(() => {
    // Ховаємо лише якщо скролимо ВНИЗ і вже прокрутили > 50px
    const shouldHide = isScrolled && scrollDirection === 'down'
    setHidden(shouldHide)
  }, [isScrolled, scrollDirection])


  // Close menu on page change
  useEffect(() => {
    if (menuOpen) {
      setMenuOpen(false)
      document.body.style.overflow = ''
    }
  }, [location.pathname])

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => {
      const next = !prev
      document.body.style.overflow = next ? 'hidden' : ''
      return next
    })
  }, [])

  const handleClick = () => {
    setIsActive(prev => !prev)
    const next = !isActive
    setIsActive(next)

    const tl = gsap.timeline({
      defaults: {
        duration: 0.45,
        ease: 'power3.out',
      },
    })

tl.to(wrapperRef.current, {
  yPercent: next ? -50 : 0,
  duration: 0.4,
});


  }


  return (
    <>
      <header
        ref={headerRef}
        className={`${styles.header} ${isScrolled ? styles.scrolled : ''} ${hidden ? styles.hidden : ''}`}
      >
        <div className={styles.container}>
          {/* Logo */}
          <Link to="/about" className={styles.logo} aria-label="Volodimir Fushtei - Home">
            <Logo />
            <span className={styles.logoText}>Volodimir Fushtei</span>
          </Link>

          {/* Desktop Navigation */}


          {/* Right Section */}
          <div className={styles.rightSection}>
            <ToggleTheme aria-label="Toggle dark/light mode" />

            <div className={styles.el} onClick={handleClick} ref={labelRef}>
             <div
  className={clsx(
    styles.burgerDesktop,
    isActive && styles.burgerDesktopActive
  )}
>
  <span></span>
  <span></span>
  <span></span>
</div>


              <div className={styles.words}>
  <div ref={wrapperRef}>
    <p>Menu</p>
    <p>Close</p>
  </div>
</div>
            </div>
            {/* Burger Button */}
            <button
              className={`${styles.burger} ${menuOpen ? styles.open : ''}`}
              onClick={toggleMenu}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}

            >
              <SvgIcon
                id={menuOpen ? 'icon-close' : 'icon-menu'}
                width={16}
                height={16}
              />
            </button>

          </div>
        </div>
      </header>
      {isActive && <NavHeader />}

      {/* Mobile Menu */}
      <div
        className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}

      >
        <div className={styles.mobileMenuInner}>
          <h4 className={styles.mobileMenuTitle}>Menu</h4>
          <nav className={styles.mobileNav}>
            {NAV_ITEMS.map((item, index) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `${styles.mobileNavLink} ${isActive ? styles.active : ''}`
                }
                onClick={toggleMenu}
                aria-label={`Go to ${item.label}`}
              >
                <span className={styles.mobileNum}>0{index + 1}</span>
                <span className={styles.mobileLabel}>{item.label}</span>
                <span className={styles.mobileArrow} aria-hidden="true">→</span>
              </NavLink>
            ))}
          </nav>

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
        </div>
      </div>
    </>
  )
}

export default Header
