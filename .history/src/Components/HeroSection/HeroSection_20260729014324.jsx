import { lazy, Suspense, useCallback, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import styles from './HeroSection.module.css'

const HeroMedia = lazy(() => import('../HeroMedia/HeroMedia.jsx'))

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

  gsap.registerPlugin(ScrollTrigger, SplitText)

  useLayoutEffect(() => {

    if (!sectionRef.current) {
      return
    }
    const ctx = gsap.context(() => {


      gsap.to(bgImageRef.current, {
        backgroundPosition: '50% 80%',
        scale: 1.4,
        rotateZ: 10,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: bgImageRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })


      const intro = gsap.timeline({

        defaults: {
          ease: 'power4.out',
        },
      })


      const fills = gsap.utils.toArray(`.${styles.fill}`)

      intro.to(fills, {
        clipPath: 'inset(0% 0 0 0)',
        duration: 1.8,
        stagger: 0.25,
        ease: 'power4.out',
      })

      intro.from(buttonsRef.current, {
        opacity: 0,
        y: 80,
        rotationX: -25,
        duration: 0.8,
        ease: 'power4.out',
        stagger: 0.25,
      }, '>-1.0')
      intro.fromTo(bgImageRef.current,
        {
          opacity: 0,
          scale: 1.15,
          backgroundPosition: '50% 0%',
          filter: 'blur(10px)',
        },
        {
          opacity: 0.9,
          scale: 1.05,
          y: 20,
          backgroundPosition: '50% 30%',
          filter: 'blur(1px)',
          duration: 2,
          ease: 'expo.out',
        }, '+=0.2')

      // ScrollTrigger animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,


        },
      })

      tl.addLabel('hero')
        .to(sectionRef.current, {
          borderRadius: 40,
          scale: 0.8,


          ease: 'none',
        }, 'hero')

        .to(bgRef.current, {
          scale: 1.08,
          yPercent: 10,
          ease: 'none',
        }, 'hero+=0.2')

        .to(gridBlur3Ref.current, {
          scale: 2,
          opacity: 1,
          ease: 'none',
        }, 'hero+=0,1')
        .to(scrollIndicatorRef.current, {
          opacity: 1,
          ease: 'none',
        }, 'hero+=0.2')


    }, sectionRef)

    return () => {

      ctx.revert()


    }
  }, [])


  const handleGitHubClick = useCallback(() => {
    window.open('https://github.com/volodimirfushtei', '_blank', 'noopener,noreferrer')
  }, [])

  return (
    <section ref={sectionRef} className={styles.heroContainer}>
      <video autoPlay loop muted>
        <source src="url(https://backgrounds.supply/gradient-lab#s=eyJtIjoiaGFsZnRvbmUiLCJjIjpbIiMwZDI0NDciLCIjMWQ0ZjdhIiwiIzNhYTliNiIsIiM3YmQ5YjgiLCIjYzZmNGNmIiwiIzAwMDAwMCIsIiMwMDAwMDAiLCIjMDAwMDAwIl0sIm8iOltbMC4zMiwwXSxbMC4wOTg4ODU0MzgxOTk5ODMxOSwwLjMwNDMzODA4NTIxNDQ0OTE2XSxbLTAuMjU4ODg1NDM4MTk5OTgzMTYsMC4xODgwOTEyODA3MzM1OTE0NF0sWy0wLjI1ODg4NTQzODE5OTk4MzIsLTAuMTg4MDkxMjgwNzMzNTkxMzhdLFswLjA5ODg4NTQzODE5OTk4MzEyLC0wLjMwNDMzODA4NTIxNDQ0OTE2XSxbMCwwXSxbMCwwXSxbMCwwXV0sIm4iOjMsImIiOjEsImsiOjEuMDUsInMiOjEuMSwiZyI6MC4wMiwicCI6eyJ1X2RvdERlbnNpdHkiOjMyLCJ1X2RvdFNjYWxlIjowLjk1LCJ1X3pvb20iOjEuNCwidV9zcGVlZCI6MC4xOCwidV93YXJwIjowLjE1LCJ1X2ludmVydCI6MH19)" type="video/mp4" />
      </video>
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
                Fullstack Developer · 2025
              </span>
            <span className={styles.eyebrowDot} />
          </div>

          {/* Giant title */}
          <h1 ref={titleRef} className={styles.title} aria-label="Building Digital Products">
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
          <button
            data-cursor="hover"
            data-cursor-type="link"
            data-cursor-text="Let's work together"
            className={styles.primaryButton}
            aria-label="Start a project"
          >
                <span className={styles.primaryButtonText}>
                  Start a project
                </span>
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
          </button>

          <button
            data-cursor="hover"
            data-cursor-type="link"
            data-cursor-text="GitHub"
            className={styles.secondaryButton}
            onClick={handleGitHubClick}


            aria-label="View my work on GitHub"
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
          </button>
        </div>
      </div>

    </section>
  )
}

export default HeroSection
