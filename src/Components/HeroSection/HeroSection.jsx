import React, { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './HeroSection.module.css'
import Button from '../Button/Button.jsx'
import DotBand from '../DotBand/DotBand.jsx'

gsap.registerPlugin(ScrollTrigger)

const HeroMedia = lazy(() => import('../HeroMedia/HeroMedia.jsx'))

const Divider = React.memo(
  ({ position, offset, width, height, type }) => {
    const style = {
      [position]: offset,
      ...(width ? { width } : {}),
      ...(height ? { height } : {}),
    }

    if (type === 'horizontal') {
      style.left = style.left ?? '5%'
    }

    if (type === 'vertical') {
      style.top = style.top ?? '5%'
    }

    return (
      <div
        className={`${styles.divider} ${
          type === 'horizontal'
            ? styles.horizontal
            : styles.vertical
        }`}
        style={style}
        aria-hidden="true"
      />
    )
  },
)

Divider.displayName = 'Divider'


const HeroSection = ({ loading }) => {
  const sectionRef = useRef(null)
  const bgRef = useRef(null)
  const bgImageRef = useRef(null)
  const textRef = useRef(null)
  const eyebrowRef = useRef(null)
  const contentRef = useRef(null)
  const buttonsRef = useRef(null)
  const mediaRef = useRef(null)
  const cornerRef = useRef(null)
  const scrollIndicatorRef = useRef(null)
  const scrollLineRef = useRef(null)
  const titleRef = useRef(null)
  const gridBlur1Ref = useRef(null)
  const gridBlur2Ref = useRef(null)
  const gridBlur3Ref = useRef(null)
  const bottomRightRef = useRef(null)
  const bottomLeftRef = useRef(null)
  const topRightRef = useRef(null)
  const topLeftRef = useRef(null)
  const cornersRef = useRef(null)
  const dividersRef = useRef(null)
  const light = useRef()

  const [animationsReady, setAnimationsReady] = useState(false)

  // ── Анімація світла за курсором ──
  useLayoutEffect(() => {
    const move = (e) => {
      gsap.to(light.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
      })
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [])

  // ── Запуск анімацій після завершення завантаження ──
  useEffect(() => {
    if (!loading) {
      // Затримка перед запуском анімацій
      const timer = setTimeout(() => {
        setAnimationsReady(true)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [loading])

  // ── GSAP анімації ──
  useLayoutEffect(() => {
    if (!sectionRef.current || !animationsReady) return
    // Горизонтальні ділителі
    const horizontal = gsap.utils.toArray(`.${styles.horizontal}`)
    const vertical = gsap.utils.toArray(`.${styles.vertical}`)
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({
        defaults: { ease: 'power4.out', duration: 0.5 },
      })

      // Поява секції
      intro.from(sectionRef.current, {
        opacity: 1,
        scale: 0.92,
        duration: 1.5,
        ease: 'bounce.out',
        delay: 0.5,
        filter: 'blur(12px)',
      })

      // Фонове зображення
      intro.fromTo(
        bgImageRef.current,
        {
          opacity: 0,
          backgroundPosition: '50% 0%',
          filter: 'blur(16px)',
        },
        {
          opacity: 0.25,
          backgroundPosition: '50% 30%',
          filter: 'blur(0px)',
          duration: 2,
          ease: 'expo.out',
        },
        '+=0.2',
      )

      // Медіа
      intro.from(
        mediaRef.current,
        {
          opacity: 0,
          x: 40,

          scale: 0.95,
          duration: 1.5,
          delay: 0.5,
          ease: 'expo.out',
        },
        '+=0.2',
      )
      intro.from(titleRef.current, {
        opacity: 0,
        x: -40,

        scale: 0.95,
        duration: 1.5,
        delay: 0.5,
        ease: 'expo.out',
      }, '<')

      // Заповнення тексту
      const fills = gsap.utils.toArray(`.${styles.fill}`)
      intro.fromTo(fills, {
        opacity: 0,
        clipPath: 'inset(100% 0 0 0)',
      }, {
        opacity: 1,
        clipPath: 'inset(0% 0 0 0)',
        duration: 1.8,
        ease: 'power4.out',
      }, '+=0.2')

      // Кнопки
      intro.from(
        buttonsRef.current,
        {
          opacity: 0,
          y: -60,
          duration: 0.8,
          ease: 'power4.out',
          stagger: 0.25,
        },
        '>0.5',
      )

      // Фон
      intro.fromTo(
        bgRef.current,
        {
          opacity: 0,
          y: -60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power4.out',
        },
        '>-1.0',
      )

      // Кути
      intro.from(cornersRef.current.children, {
        scale: 0.4,
        yPercent: -20,
        opacity: 0,
        stagger: 0.25,
        duration: 1.5,
        ease: 'expo.out',
      })


      intro.from(horizontal, {
        scaleX: 0,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'expo.out',
      })

      intro.from(
        vertical,
        {
          scaleY: 0,
          opacity: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: 'expo.out',
        },
        '-=0.8',
      )

      // ── ScrollTrigger ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,

        },
      })

      tl.to(sectionRef.current, {
        y: -10,
        borderRadius: 20,
        scale: 0.9,
        ease: 'none',
      }, 0)

      tl.to(horizontal, {
        scaleY: 1.15,
        opacity: 0.72,
        ease: 'none',
      }, 0)


      tl.to(cornersRef.current.children, {
        scale: 1.15,
        opacity: 0.72,
        stagger: 0.05,
        ease: 'none',
      }, 0)

      tl.to(bgRef.current, {
        opacity: 0.5,
        scaleX: 0.8,
        ease: 'none',
      }, 0)
      tl.to(bgImageRef.current, {
        scaleY: 1.15,

        yPercent: 15,
        ease: 'expo.out',
      })

      tl.to(titleRef.current, {
        xPercent: -15,

        scale: 0.98,
        ease: 'none',
      }, 0)
        .to(mediaRef.current, {
          xPercent: 15,
          scale: 0.92,
          ease: 'none',
        }, '<')
        .to(buttonsRef.current, {
          yPercent: 10,
          scale: 0.9,
          ease: 'none',
        }, 0)
        .to(gridBlur3Ref.current, {
          scale: 2,
          opacity: 1,
          ease: 'none',
        }, 0)
        .to(scrollIndicatorRef.current, {
          yPercent: 100,
          ease: 'none',
        }, 0)
    }, sectionRef)

    return () => ctx.revert()
  }, [animationsReady])

  const handleGitHubClick = useCallback(() => {
    window.open('https://github.com/volodimirfushtei', '_blank', 'noopener,noreferrer')
  }, [])

  const horizontalDividers = [
    { position: 'top', offset: '10%', width: '90%' },
    { position: 'bottom', offset: '10%', width: '90%' },
  ]


  // Плейсхолдер поки не готово
  if (loading || !animationsReady) {
    return <div className={styles.heroPlaceholder} />
  }

  return (
    <section ref={sectionRef} className={styles.heroContainer}>
      {/* ── Background Layers ── */}
      <div ref={bgRef} className={styles.gradientBackground} aria-hidden="true" />
      <div ref={bgImageRef} className={styles.bgImage} aria-hidden="true" />

      {/* ── Grid Blurs ── */}
      <div className={styles.gridBlur1} aria-hidden="true" ref={gridBlur1Ref} />
      <div className={styles.gridBlur2} aria-hidden="true" ref={gridBlur2Ref} />
      <div className={styles.gridBlur3} aria-hidden="true" ref={gridBlur3Ref} />

      {/* ── Cursor Light ── */}
      <div ref={light} className={styles.cursorLight} />

      {/* ── Eyebrow ── */}
      <div ref={eyebrowRef} className={styles.eyebrow}>
        <span className={styles.eyebrowLine} />
        <span className={styles.eyebrowText}>Fullstack Developer · 2026</span>
        <span className={styles.eyebrowDot} />
      </div>

      {/* ── Corners ── */}
      <div className={styles.cornerSecWrapper} ref={cornersRef}>
        <div ref={topLeftRef} className={`${styles.cornerSec} ${styles.topLeft}`} />
        <div ref={topRightRef} className={`${styles.cornerSec} ${styles.topRight}`} />
        <div ref={bottomLeftRef} className={`${styles.cornerSec} ${styles.bottomLeft}`} />
        <div ref={bottomRightRef} className={`${styles.cornerSec} ${styles.bottomRight}`} />
      </div>

      {/* ── Dividers ── */}
      <div className={styles.dividers} ref={dividersRef} aria-hidden="true">
        {horizontalDividers.map((divider, index) => (
          <Divider
            key={`horizontal-${index}`}
            {...divider}
            type="horizontal"

          />
        ))}

      </div>

      {/* ── Corner Badge ── */}
      <div ref={cornerRef} className={styles.cornerBadge} aria-hidden="true">
        <span className={styles.cornerBadgeNum}>01</span>
        <span className={styles.cornerBadgeLabel}>Hero</span>
      </div>

      {/* ── Scroll Indicator ── */}
      <div ref={scrollIndicatorRef} className={styles.scrollIndicator} aria-hidden="true">
        <span className={styles.scrollText}>Scroll</span>
        <div className={styles.scrollLineContainer}>
          <div ref={scrollLineRef} className={styles.scrollLine} />
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M2 12L12 2M12 2H4M12 2V10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div ref={contentRef} className={styles.heroGrid}>
        {/* Crosshair */}
        <div className={styles.crosshair}>
          <div className={styles.crosshairDot} />
        </div>

        {/* Title */}
        <div ref={textRef} className={styles.textContent}>
          <h1 ref={titleRef} className={styles.title}>
            <span className={styles.word}>
              <span className={styles.stroke}>BUILDING</span>
              <span className={styles.fill}>BUILDING</span>
            </span>
            <span className={styles.separator}>&</span>
            <span className={styles.word}>
              <span className={styles.stroke}>DIGITAL</span>
              <span className={styles.fill}>DIGITAL</span>
            </span>
            <span className={styles.separator}>&</span>
            <span className={styles.word}>
              <span className={styles.stroke}>PRODUCTS</span>
              <span className={styles.fill}>PRODUCTS</span>
            </span>
          </h1>
        </div>

        {/* Media */}
        <Suspense fallback={<div className={styles.mediaPlaceholder} />}>
          <div
            data-cursor="hover"
            data-cursor-text="Interactive media"
            data-cursor-type="media"
            ref={mediaRef}
            className={styles.mediaContainer}
          >
            <HeroMedia />
          </div>
        </Suspense>

        {/* Buttons */}
        <div ref={buttonsRef} className={styles.buttons}>
          <div className={styles.buttonCircleHeader}>
            <span className={styles.buttonCircle}>
              <span className={styles.buttonCircleInner} />
              <span className={styles.buttonCircleInner} />
              <span className={styles.buttonCircleInner} />
            </span>
            <Button
              data-cursor="hover"
              size="sm"
              data-cursor-type="link"
              data-cursor-text="Published"
              className={`${styles.buttonCircleLabel} ${styles.button}`}
            >
              Publish
            </Button>
          </div>

          <span className={`${styles.corner} ${styles.tl}`} />
          <span className={`${styles.corner} ${styles.tr}`} />
          <span className={`${styles.corner} ${styles.bl}`} />
          <span className={`${styles.corner} ${styles.br}`} />

          <Button
            data-cursor="hover"
            data-cursor-type="link"
            data-cursor-text="Let's work together"
            variant="primary"
            size="xl"
            aria-label="Start a project"
            className={`${styles.button} ${styles.buttonPrimary}`}
          >
            <span className={styles.primaryButtonText}>Start a project</span>
            <svg className={styles.btnArrowIcon} width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 12L12 2M12 2H4M12 2V10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>

          <Button
            variant="secondary"
            data-cursor="hover"
            size="xl"
            data-cursor-type="link"
            data-cursor-text="GitHub"
            aria-label="View my work on GitHub"
            className={`${styles.button} ${styles.buttonSecondary}`}
            onClick={handleGitHubClick}
          >
            <span>View my work</span>
            <svg className={styles.btnArrowIcon} width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 12L12 2M12 2H4M12 2V10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </div>
      </div>

      <div className={styles.heroDivider}>
        <DotBand />
      </div>
    </section>
  )
}

export default HeroSection
