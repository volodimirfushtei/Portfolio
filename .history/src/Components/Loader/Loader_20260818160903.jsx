import { useEffect, useRef, useState } from 'react'
import styles from './Loader.module.css'
import Logo from '../Logo/Logo'
import gsap from 'gsap'

const Loader = ({ onComplete }) => {
  const [isLoading, setIsLoading] = useState(true)
  const animationDone = useRef(false)

  const svgLogoRef = useRef(null)
  const overlayRef = useRef(null)
  const topBarRef = useRef(null)
  const bottomBarRef = useRef(null)
  const noiseRef = useRef(null)
  const nameRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const dividerRef = useRef(null)
  const centerLineRef = useRef(null)

  // ── Конфігурація входу ──
  const ENTRANCE_FROM = {
    opacity: 0,
    x: -30,
    scale: 0.8,
    filter: 'blur(6px)',
  }

  const ENTRANCE_TO = {
    opacity: 1,
    scale: 1,
    x: 0,
    filter: 'blur(0px)',
    duration: 1.0,
    ease: 'expo.out',
  }

  useEffect(() => {
    if (animationDone.current) return
    animationDone.current = true

    const ctx = gsap.context(() => {
      const logo = svgLogoRef.current
      const overlay = overlayRef.current
      
      if (!logo || !overlay) return

      // ── Початковий стан ──
      gsap.set(logo, {
        autoAlpha: 0,
        scale: 0.6,
        rotate: -10,
        transformOrigin: 'center center',
      })

      gsap.set([topBarRef.current, bottomBarRef.current], {
        opacity: 0,
        y: 30,
        filter: 'blur(8px)',
      })

      gsap.set(dividerRef.current, {
        height: 0,
        opacity: 0,
        y: 100,
      })

      gsap.set(centerLineRef.current, {
        height: 0,
        opacity: 0,
      })

      gsap.set([leftRef.current, rightRef.current], {
        xPercent: 0,
        filter: 'blur(0px)',
      })

      // ── Основний Timeline ──
      const tl = gsap.timeline({
        defaults: {
          overwrite: 'auto',
          ease: 'expo.out',
        },
        onComplete: () => {
          // Запускаємо вихід після паузи
          setTimeout(() => {
            exitTimeline.play()
          }, 1500)
        },
      })

      // ── Вхід ──
      tl.addLabel('enter')
        // Overlay
        .fromTo(overlay, {
          autoAlpha: 0,
          scale: 1.06,
          filter: 'blur(16px)',
        }, {
          autoAlpha: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'expo.out',
        }, 'enter')

        // Logo
        .to(logo, {
          autoAlpha: 1,
          scale: 1,
          rotate: 0,
          duration: 1.4,
          ease: 'back.out(1.7)',
        }, 'enter+=0.2')

        // Top Bar
        .to(topBarRef.current, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.0,
          ease: 'expo.out',
        }, 'enter+=0.4')

        // Bottom Bar
        .to(bottomBarRef.current, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.0,
          ease: 'expo.out',
        }, 'enter+=0.5')

        // Центральна лінія (знизу вверх)
        .to(centerLineRef.current, {
          height: '100%',
          opacity: 1,
          duration: 1.8,
          ease: 'power4.out',
        }, 'enter+=0.6')

        // Divider (знизу вверх)
        .to(dividerRef.current, {
          height: '100%',
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power4.out',
        }, 'enter+=0.8')

      // ── Вихід ──
      const exitTimeline = gsap.timeline({
        paused: true,
        defaults: {
          ease: 'power4.inOut',
        },
        onComplete: () => {
          setIsLoading(false)
          onComplete?.()
        },
      })

      exitTimeline.addLabel('exit')
        // Ховаємо всі елементи
        .to([topBarRef.current, bottomBarRef.current, logo], {
          opacity: 0,
          y: -30,
          filter: 'blur(12px)',
          duration: 0.6,
          stagger: 0.05,
          ease: 'power3.in',
        }, 'exit')

        // Ховаємо лінії
        .to(centerLineRef.current, {
          opacity: 0,
          duration: 0.4,
          ease: 'power2.in',
        }, 'exit+=0.1')
        
        .to(dividerRef.current, {
          opacity: 0,
          y: -50,
          duration: 0.5,
          ease: 'power2.in',
        }, 'exit+=0.1')

        // Роз'їжджаються панелі
        .to(leftRef.current, {
          xPercent: -100,
          filter: 'blur(20px)',
          duration: 1.2,
          ease: 'power4.inOut',
        }, 'exit+=0.2')
        
        .to(rightRef.current, {
          xPercent: 100,
          filter: 'blur(20px)',
          duration: 1.2,
          ease: 'power4.inOut',
        }, 'exit+=0.2')

        // Зникає оверлей
        .to(overlay, {
          autoAlpha: 0,
          scale: 1.04,
          filter: 'blur(20px)',
          duration: 1.4,
          ease: 'power4.inOut',
        }, 'exit+=0.3')

    }, overlayRef)

    return () => {
      ctx.revert()
      animationDone.current = false
    }
  }, [onComplete])

  if (!isLoading) return null

  return (
    <div className={styles.overlay} ref={overlayRef}>
      {/* ── Панелі ── */}
      <div className={styles.panelsWrapper}>
        <div ref={leftRef} className={`${styles.panel} ${styles.panelLeft}`} />
        <div ref={rightRef} className={`${styles.panel} ${styles.panelRight}`} />
      </div>

      {/* ── Шум ── */}
      <div ref={noiseRef} className={styles.noise} />

      {/* ── Центральна лінія (знизу вверх) ── */}
      <div ref={centerLineRef} className={styles.centerLine} />

      {/* ── Divider (знизу вверх) ── */}
      <div ref={dividerRef} className={styles.divider} />

      {/* ── Top Bar ── */}
      <div ref={topBarRef} className={styles.topBar}>
        <span className={styles.brandName}>VF / PORTFOLIO</span>
        <span className={styles.year}>2026</span>
      </div>

      {/* ── Logo ── */}
      <div className={styles.logoWrap}>
        <Logo svgRef={svgLogoRef} className={styles.logoSvg} variant="large" />
      </div>

      {/* ── Bottom Bar ── */}
      <div ref={bottomBarRef} className={styles.bottomBar}>
        <span className={styles.statusText}>
          <span className={styles.statusDot} />
          Frontend Engineer / Crafting Digital Excellence
        </span>
      </div>
    </div>
  )
}

export default Loader
