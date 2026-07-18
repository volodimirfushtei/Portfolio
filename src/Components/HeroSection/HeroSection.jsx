import { lazy, Suspense, useCallback, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import styles from './HeroSection.module.css'


const HeroMedia = lazy(() => import('../HeroMedia/HeroMedia.jsx'))


const HeroSection = () => {
  const sectionRef = useRef(null)
  const bgRef = useRef(null)
  const bgTextRef = useRef(null)
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

  useLayoutEffect(() => {


    gsap.registerPlugin(ScrollTrigger, SplitText)

    let split
    let floatingAnimations = []

    const ctx = gsap.context(() => {

      gsap.set([sectionRef.current, contentRef.current, bgRef.current, bgTextRef.current], {
        willChange: 'transform, filter, opacity', // ✅ GPU acceleration
      })


      gsap.utils.toArray([gridBlur1Ref.current, gridBlur2Ref.current]).forEach((el, i) => {
        const anim = gsap.to(el, {
          x: i % 2 ? -80 : 80,
          y: i % 2 ? -80 : 80,
          opacity: i % 2 ? 0.6 : 0.2,
          duration: 8,
          yoyo: true,
          repeat: -1,
          ease: 'none',
          paused: false, //
        })
        floatingAnimations.push(anim)
      })


      split = SplitText.create(titleRef.current, { type: 'words' })
      gsap.set(split.words, { opacity: 0 })


      // Intro animation
      const intro = gsap.timeline()
      intro.from(split.words, {
        opacity: 0,
        y: 20,
        stagger: 0.12,
        duration: 1,
        ease: 'power4.out',
      })

      intro.addLabel('hero')


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
          filter: 'drop-shadow(0 20px 80px rgba(0,0,0,.35))',
          ease: 'none',
        }, 'hero')
        .to(contentRef.current, {
          scale: 0.70,
          y: 80,
          opacity: 0.6,
          ease: 'none',
        }, 'hero')
        .to(bgRef.current, {
          scale: 1.08,
          yPercent: 10,
          ease: 'none',
        }, 'hero')
        .to(bgTextRef.current, {
          yPercent: -22,
          scale: 0.75,
          opacity: 0,
          ease: 'none',
        }, 'hero')
        .to(gridBlur3Ref.current, {
          scale: 2,
          filter: 'blur(180px)',
          opacity: 1,
          ease: 'none',
        }, 'hero')


    }, sectionRef)


    return () => {

      ctx.revert()
      floatingAnimations.forEach(anim => anim.kill())
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])


  const handleGitHubClick = useCallback(() => {
    window.open('https://github.com/volodimirfushtei', '_blank', 'noopener,noreferrer')
  }, [])

  return (
    <section ref={sectionRef} className={styles.hero}>
      {/* ── Background ── */}
      <div
        ref={bgRef}
        className={styles.gradientBackground}
        aria-hidden="true"
        data-lag="0.2"
      />
      <div ref={bgTextRef} className={styles.bgText} aria-hidden="true">
        FRONTEND
      </div>
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
      <div ref={contentRef} className={styles.heroInner}>
        <div className={styles.content}>
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
                <span ref={titleRef} className={styles.titleAccent}>Building</span>
              </span>
              <span className={styles.titleLine}>
                <span className={styles.titlePlain}>Digital</span>
              </span>
              <span className={styles.titleLine}>
                <span className={styles.titlePlain}>Products</span>
              </span>
            </h1>

            {/* Divider */}
            <div className={styles.divider} />

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
        </div>
      </div>
    </section>
  )
}

export default HeroSection
