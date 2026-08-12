import React, { lazy, Suspense, useCallback, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import styles from './HeroSection.module.css'
import Button from '../Button/Button.jsx'
import DotBand from '../DotBand/DotBand.jsx'
import { useOutletContext } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger, SplitText)
const HeroMedia = lazy(() => import('../HeroMedia/HeroMedia.jsx'))


const Divider = React.memo(
  ({ top, left, right, bottom, width, height, rotate, index }) => (
    <div
      className={styles.divider}
      style={{
        top,
        left,
        right,
        bottom,
        width,
        height,
        rotate,
        transformOrigin: 'left center',
      }}

      aria-hidden="true"
    />
  ),
)

Divider.displayName = 'Divider'


const HeroSection = () => {
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
  const { loading } = useOutletContext()
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

  useLayoutEffect(() => {
    if (!sectionRef.current || loading) {
      return
    }
    const ctx = gsap.context(() => {


      const intro = gsap.timeline({
        defaults: {
          ease: 'power4.out',
          duration: 0.5,
        },
      })
      intro.from(sectionRef.current, {
        opacity: 0,
        scale: 0.5,
        duration: 1.5,
        ease: 'bounce.out',
        delay: 0.5,
        filter: 'blur(12px)',
      })
      intro.from(
        mediaRef.current,
        {
          opacity: 0,
          x: 100,
          rotation: -15,
          scale: 0.95,
          duration: 1.5,
          delay: 0.5,
          ease: 'expo.out',
        }
        , '+=0.2',
      )

      const fills = gsap.utils.toArray(`.${styles.fill}`)

      intro.fromTo(fills, {

          opacity: 0.5,

          duration: 1.8,

          ease: 'power4.out',
          fontSize: '10rem',
        },
        {
          opacity: 1,
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.8,

          ease: 'power4.out',
          fontSize: '12rem',
        },
      )


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

      intro.fromTo(
        bgRef.current,

        {
          opacity: 0,
          y: -60,

          duration: 0.8,
          ease: 'power4.out',
          stagger: 0.25,
        },
        {
          opacity: 1,
          y: 0,

          duration: 0.8,
          ease: 'power4.out',
          stagger: 0.25,
        },

        '>-1.0',
      )

      intro.fromTo(
        bgImageRef.current,
        {
          opacity: 0,
          backgroundPosition: '50% 0%',
          filter: 'blur(16px)',
        },
        {
          opacity: 0.95,
          backgroundPosition: '50% 30%',
          filter: 'blur(0px)',
          duration: 2,
          ease: 'expo.out',
        },
        '+=0.2',
      )
      intro.from(cornersRef.current.children, {

        scale: 0.4,
        yPercent: -20,

        opacity: 0,
        stagger: 0.25,
        duration: 1.5,
        ease: 'expo.out',
      })

      intro.from(dividersRef.current.children, {

        scale: 0.4,
        opacity: 0,
        stagger: 0.25,
        duration: 1.5,
        ease: 'expo.out',
      })

      // ScrollTrigger animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,


        },
      })

      tl.to(
        sectionRef.current,
        {
          y: 100,
          borderRadius: 40,
          scale: 0.9,
          ease: 'none',
        },
        0,
      )
      tl.to(dividersRef.current.children, {
        scaleX: 1.15,
        opacity: 0.72,
        backgroundColor: 'transparent',
        yPercent: -15,
        stagger: 0.05,
        ease: 'none',
      }, 0)
      tl.to(cornersRef.current.children, {
        scale: 1.15,
        opacity: 0.72,

        stagger: 0.05,
        ease: 'none',
      })
      tl.to(
        bgRef.current,
        {
          opacity: 0.5,

          borderRadius: 0,
          ease: 'none',
        },
        0,
      )
      tl.to(
        titleRef.current,
        {
          yPercent: -15,
          scale: 0.98,
          ease: 'none',
        },
        0,
      )
        .to(
          mediaRef.current,
          {
            yPercent: -15,
            scale: 0.92,
            ease: 'none',
          },
          '<',
        )
        .to(
          buttonsRef.current,
          {
            yPercent: 10,
            scale: 0.9,

            ease: 'none',
          },
          0,
        )


        .to(
          gridBlur3Ref.current,
          {
            scale: 2,
            opacity: 1,
            ease: 'none',
          },
          0,
        )
        .to(
          scrollIndicatorRef.current,
          {
            opacity: 1,
            ease: 'none',
          },
          0,
        )

    }, sectionRef)

    return () => {
      ctx.revert()
    }
  }, [loading])

  const handleGitHubClick = useCallback(() => {
    window.open(
      'https://github.com/volodimirfushtei',
      '_blank',
      'noopener,noreferrer',
    )
  }, [])


  const dividers = [
    { top: '13%', left: '15%', width: '80%', rotate: '0deg', index: 0 },
    { top: '10%', left: '90%', width: '80%', rotate: '90deg', index: 1 },
    { top: '-20%', left: '50%', width: '60%', rotate: '90deg', index: 2 },


    { bottom: '18%', left: '15%', width: '80%', rotate: '0deg', index: 4 },
    { bottom: '18%', left: '5%', width: '80%', rotate: '0deg', index: 5 },
    { bottom: '10%', left: '10%', width: '80%', rotate: '270deg', index: 6 },


  ]

  return (
    <section ref={sectionRef} className={styles.heroContainer}>


      {/* ── Corners ── */}
      <div className={styles.cornerSecWrapper} ref={cornersRef}>
        <div ref={topLeftRef} className={`${styles.cornerSec} ${styles.topLeft}`} />
        <div ref={topRightRef} className={`${styles.cornerSec} ${styles.topRight}`} />
        <div ref={bottomLeftRef} className={`${styles.cornerSec} ${styles.bottomLeft}`} />
        <div ref={bottomRightRef} className={`${styles.cornerSec} ${styles.bottomRight}`} />
      </div>


      {/* ── Dividers ── */}
      <div className={styles.dividers} aria-hidden="true" ref={dividersRef}>

        {dividers.map((divider) => (
          <Divider
            key={divider.index}
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
      </div>

      <div ref={light} className={styles.cursorLight} />
      {/* ── Background ── */}
      <div
        ref={bgRef}
        className={styles.gradientBackground}
        aria-hidden="true"
        data-lag="0.2"
      />
      <div ref={bgImageRef} className={styles.bgImage} aria-hidden="true" />

      {/* ── Grid елементи ── */}
      <div className={styles.gridBlur1} aria-hidden="true" ref={gridBlur1Ref} />
      <div className={styles.gridBlur2} aria-hidden="true" ref={gridBlur2Ref} />
      <div className={styles.gridBlur3} aria-hidden="true" ref={gridBlur3Ref} />
      {/* ── Corner index badge ── */}
      <div ref={cornerRef} className={styles.cornerBadge} aria-hidden="true">
        <span className={styles.cornerBadgeNum}>01</span>
        <span className={styles.cornerBadgeLabel}>Hero</span>
      </div>
      {/* ── Vertical scroll indicator ── */}
      <div
        ref={scrollIndicatorRef}
        className={styles.scrollIndicator}
        aria-hidden="true"
      >
        <span className={styles.scrollText}>Scroll</span>
        <div className={styles.scrollLineContainer}>
          <span className={styles.scrollText}>Scroll</span>
          <div ref={scrollLineRef} className={styles.scrollLine} />
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
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
      {/* ── Main content ── */}
      <div ref={contentRef} className={styles.heroGrid}>
        {/* LEFT — Text column */}
        <div ref={textRef} className={styles.textContent}>
          {/* Eyebrow */}
          <div ref={eyebrowRef} className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            <span className={styles.eyebrowText}>
              Fullstack Developer · 2026
            </span>
            <span className={styles.eyebrowDot} />
          </div>
          <div className={styles.crosshair}>
            <div className={styles.crosshairDot} />
          </div>
          {/* Giant title */}
          <h1
            ref={titleRef}
            className={styles.title}
            aria-label="Building Digital Products"
          >
            <span className={styles.titleLine}>
              <span className={styles.word}>
                <span className={styles.stroke}>BUILDING</span>
                <span className={styles.fill}>BUILDING</span>
              </span>
            </span>
            <span className={styles.titleLine}>
              <span className={styles.word}>
                <span className={styles.stroke}>Digital</span>
                <span className={styles.fill}>Digital</span>
              </span>
            </span>
            <span className={styles.titleLine}>
              <span className={styles.word}>
                <span className={styles.stroke}>Products</span>
                <span className={styles.fill}>Products</span>
              </span>
            </span>
          </h1>
        </div>

        {/* RIGHT — Media column */}
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

        {/* CTA buttons */}
        <div ref={buttonsRef} className={styles.buttons}>
          <div className={styles.buttonCircleHeader}>
            <span className={styles.buttonCircle}>
              <span className={styles.buttonCircleInner} />
              <span className={styles.buttonCircleInner} />
              <span className={styles.buttonCircleInner} />
            </span>
            <button className={styles.buttonCircleLabel}>Publish</button>
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
            <svg
              className={styles.btnArrowIcon}
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
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

            <svg
              className={styles.btnArrowIcon}
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
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
