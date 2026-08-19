import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Header.module.css'
import ToggleTheme from '../ToggleTheme/ToggleTheme'
import gsap from 'gsap'
import useScrollDetection from '../../hooks/useScrollDetection'
import Logo from '../Logo/Logo'
import NavHeader from '../NavHeader/NavHeader.jsx'
import clsx from 'clsx'


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
    })


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
            <Logo variant="small" />
            <span className={styles.logoText}>Volodimir Fushtei</span>
          </Link>

          {/* Desktop Navigation */}


          {/* Right Section */}
          <div className={styles.rightSection}>
            <ToggleTheme aria-label="Toggle dark/light mode" />

            <div className={clsx(
              styles.el,
              isActive && styles.elActive,
            )} onClick={handleClick} ref={labelRef}>
              <div
                className={clsx(
                  styles.burgerDesktop,
                  isActive && styles.burgerDesktopActive,
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

          </div>
        </div>
      </header>
      {isActive && <NavHeader />}


    </>
  )
}

export default Header
