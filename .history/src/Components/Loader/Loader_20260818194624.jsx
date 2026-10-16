import { useEffect, useRef, useState } from 'react'
import styles from './Loader.module.css'
import Logo from '../Logo/Logo'
import gsap from 'gsap'

const Loader = ({ onComplete }) => {
  const [isLoading, setIsLoading] = useState(true)
  const isMounted = useRef(false)

  const svgLogoRef = useRef(null)
  const overlayRef = useRef(null)
  const topBarRef = useRef(null)
  const bottomBarRef = useRef(null)
  const noiseRef = useRef(null)
  const nameRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const dividerRef = useRef(null)

  // ── Конфігурація входу ──
  const ENTRANCE_FROM = {
    opacity: 0,
    y: 30,
    scale: 0.9,
    filter: 'blur(8px)',
  }

  const ENTRANCE_TO = {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    duration: 1.0,
    ease: 'expo.out',
  }

  useEffect(() => {
    // Запобігаємо подвійному монтуванню
    if (isMounted.current) return
    isMounted.current = true

    const ctx = gsap.context(() => {
      const logo = svgLogoRef.current
      
      // ── Початковий стан ──
      gsap.set(overlayRef.current, {
        autoAlpha: 0,
        scale: 1.05,
        filter: 'blur(12px)',
      })

      gsap.set([topBarRef.current, bottomBarRef.current, nameRef.current], {
        ...ENTRANCE_FROM,
        opacity: 0,
        y: 30,
      })

      gsap.set(logo, {
        autoAlpha: 0,
        scale: 0.8,
        rotate: -5,
      })

      gsap.set([leftRef.current, rightRef.current], {
        xPercent: 0,
        opacity: 0,
      })

      gsap.set(dividerRef.current, {
        height: 0,
        opacity: 0,
      })

      // ── Головний таймлайн ──
      const tl = gsap.timeline({
        defaults: {
          ease: 'expo.out',
        },
        onComplete: () => {
          // Запускаємо вихід після паузи
          setTimeout(() => {
            exitTimeline.play()
          }, 1500)
        },
      })

      // ── Вхідна анімація ──
      tl.addLabel('enter')
        // Overlay
        .to(overlayRef.current, {
          autoAlpha: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.8,
        }, 'enter')

        // Logo
        .to(logo, {
          autoAlpha: 1,
          scale: 1,
          rotate: 0,
          duration: 1.2,
          ease: 'back.out(1.7)',
        }, 'enter+=0.2')

        // Top Bar
        .to(topBarRef.current, {
          ...ENTRANCE_TO,
        }, 'enter+=0.4')

        // Name
        .to(nameRef.current, {
          ...ENTRANCE_TO,
        }, 'enter+=0.5')

        // Bottom Bar
        .to(bottomBarRef.current, {
          ...ENTRANCE_TO,
        }, 'enter+=0.6')

        // Divider
        .to(dividerRef.current, {
          height: '100%',
          opacity: 0.3,
          duration: 1.5,
          ease: 'power4.out',
        }, 'enter+=0.3')

        // Panels (з'являються)
        .to([leftRef.current, rightRef.current], {
          opacity: 1,
          duration: 0.5,
        }, 'enter+=0.2')

      // ── Вихідна анімація ──
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
        .to([topBarRef.current, bottomBarRef.current, nameRef.current, logo], {
          opacity: 0,
          y: -30,
          scale: 0.9,
          filter: 'blur(10px)',
          duration: 0.6,
          stagger: 0.05,
          ease: 'power3.in',
        }, 'exit')

        // Divider зникає
        .to(dividerRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.in',
        }, 'exit+=0.1')

        // Panels роз'їжджаються
        .to(leftRef.current, {
          xPercent: -100,
          duration: 1.2,
          ease: 'power4.inOut',
        }, 'exit+=0.2')
        .to(rightRef.current, {
          xPercent: 100,
          duration: 1.2,
          ease: 'power4.inOut',
        }, 'exit+=0.2')

        // Overlay зникає
        .to(overlayRef.current, {
          autoAlpha: 0,
          scale: 1.02,
          filter: 'blur(20px)',
          duration: 1.0,
          ease: 'power4.inOut',
        }, 'exit+=0.2')

    }, overlayRef)

    return () => {
      ctx.revert()
      isMounted.current = false
    }
  }, [onComplete])

  if (!isLoading) return null

  return (
    <div className={styles.overlay} ref={overlayRef}>
      {/* ── Divider (вертикальна лінія) ── */}
      <div className={styles.divider} ref={dividerRef} />

      {/* ── Panels ── */}
      <div ref={noiseRef} className={styles.noise}>
        <div ref={leftRef} className={styles.panel} />
        <div ref={rightRef} className={styles.panel} />
      </div>

      {/* ── Top Bar ── */}
      <div className={styles.topBar} ref={topBarRef}>
        <span className={styles.brandName}>VF / PORTFOLIO</span>
        <span className={styles.year}>2026</span>
      </div>

      {/* ── Logo ── */}
      <div className={styles.logoWrap}>
        <Logo svgRef={svgLogoRef} className={styles.logoSvg} variant="large" />
      </div>

      {/* ── Name ── */}
      <div className={styles.nameWrap} ref={nameRef}>
        <span className={styles.name}>Volodymyr Fushtei</span>
      </div>

      {/* ── Bottom Bar ── */}
      <div className={styles.bottomBar} ref={bottomBarRef}>
        <span className={styles.statusText}>
          Frontend Engineer / Crafting Digital Excellence
        </span>
        <span className={styles.statusDot} />
      </div>
    </div>
  )
}

export default Loader
