import { useEffect, useRef, useState } from 'react'
import styles from './Loader.module.css'
import Logo from '../Logo/Logo'
import gsap from 'gsap'

const Loader = ({ onComplete }) => {
  const [isLoading, setIsLoading] = useState(true)

  const svgLogoRef = useRef(null)
  const overlayRef = useRef(null)
  const topBarRef = useRef(null)
  const bottomBarRef = useRef(null)
  const noiseRef = useRef(null)
  const nameRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const dividerRef = useRef(null)

  const animationDone = useRef(false)

  useEffect(() => {
    if (animationDone.current) return
    animationDone.current = true

    const ctx = gsap.context(() => {
      // ── Початковий стан: все приховано ──
      gsap.set(overlayRef.current, {
        autoAlpha: 0,
        scale: 1.05,
        filter: 'blur(12px)',
      })

      gsap.set([topBarRef.current, bottomBarRef.current, nameRef.current], {
        opacity: 0,
        y: 30,
        scale: 0.9,
        filter: 'blur(8px)',
      })

      gsap.set(svgLogoRef.current, {
        autoAlpha: 0,
        scale: 0.8,
        rotate: -5,
      })

      // ── Панелі: приховані ──
      gsap.set([leftRef.current, rightRef.current], {
        xPercent: 0,
        opacity: 0,
      })

      // ── Лінія: прихована ──
      gsap.set(dividerRef.current, {
        height: 0,
        opacity: 0,
      })

      // ── Основний таймлайн ──
      const tl = gsap.timeline({
        defaults: {
          ease: 'expo.out',
        },
      })

      // ── ВХІД ──
      tl.addLabel('enter')
        // Overlay
        .to(overlayRef.current, {
          autoAlpha: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.8,
        }, 'enter')

        // Logo
        .to(svgLogoRef.current, {
          autoAlpha: 1,
          scale: 1,
          rotate: 0,
          duration: 1.2,
          ease: 'back.out(1.7)',
        }, 'enter+=0.2')

        // Top Bar
        .to(topBarRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.8,
        }, 'enter+=0.4')

        // Name
        .to(nameRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.8,
        }, 'enter+=0.5')

        // Bottom Bar
        .to(bottomBarRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.8,
        }, 'enter+=0.6')

        // Панелі з'являються
        .to([leftRef.current, rightRef.current], {
          opacity: 1,
          duration: 0.5,
        }, 'enter+=0.2')

        // Лінія з'являється після панелей
        .to(dividerRef.current, {
          height: '100%',
          opacity: 0.3,
          duration: 1.5,
          ease: 'power4.out',
        }, 'enter+=0.2')

      // ── Затримка перед виходом ──
      tl.to({}, {
        duration: 1.5,
      })

      // ── ВИХІД ──
      tl.addLabel('exit')
        // Ховаємо текст та лого
        .to([topBarRef.current, bottomBarRef.current, nameRef.current, svgLogoRef.current], {
          opacity: 0,
          y: -30,
          scale: 0.9,
          filter: 'blur(10px)',
          duration: 0.6,
          stagger: 0.25,
          ease: 'power3.in',
        }, 'exit')

        // Лінія зникає (спочатку)
        .to(dividerRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.in',
        }, 'exit+=0.1')

        // Панелі роз'їжджаються
        .to(leftRef.current, {
          xPercent: -100,
          duration: 1.2,
          ease: 'power4.inOut',
        }, 'exit+=0.3')
        .to(rightRef.current, {
          xPercent: 100,
          duration: 1.2,
          ease: 'power4.inOut',
        }, 'exit+=0.3')

        // Overlay зникає
        .to(overlayRef.current, {
          autoAlpha: 0,
          scale: 1.02,
          filter: 'blur(20px)',
          duration: 0.8,
          ease: 'power4.inOut',
          onComplete: () => {
            setIsLoading(false)
            onComplete?.()
          },
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
      {/* Лінія посередині */}
      <div className={styles.divider} ref={dividerRef} />
      
      {/* Шум */}
      <div ref={noiseRef} className={styles.noise}>
        <div ref={leftRef} className={styles.panel} />
        <div ref={rightRef} className={styles.panel} />
      </div>

      {/* Top Bar */}
      <div className={styles.topBar} ref={topBarRef}>
        <span className={styles.brandName}>VF / PORTFOLIO</span>
        <span className={styles.year}>2026</span>
      </div>

      {/* Logo */}
      <div className={styles.logoWrap}>
        <Logo svgRef={svgLogoRef} className={styles.logoSvg} variant="large" />
      </div>

      {/* Name */}
      <div className={styles.nameWrap} ref={nameRef}>
        <span className={styles.name}>Volodymyr Fushtei</span>
      </div>

      {/* Bottom Bar */}
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
