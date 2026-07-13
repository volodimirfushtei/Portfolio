import { useRef, lazy, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import styles from './HeroSection.module.css'


const HeroMedia = lazy(() => import('../HeroMedia/HeroMedia.jsx'))
gsap.registerPlugin(ScrollTrigger, SplitText)

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
  const gridBlur3Ref = useRef(null)
  
  useEffect(() => {
    let split
    const ctx = gsap.context(() => {
  
      // Floating blur circles
      gsap.utils
        .toArray(`.${styles.gridBlur1}, .${styles.gridBlur2}`)
        .forEach((el, i) => {
          gsap.to(el, {
            x: i % 2 ? -80 : 80,
            y: i % 2 ? -80 : 80,
            opacity: i % 2 ? 0.6 : 0.2,
            duration: 8,
            yoyo: true,
            repeat: 1,
            ease: "none"
            
          })
        })
      split = SplitText.create(titleRef.current, {
        type: 'words',
      })

     gsap.from(split.words,{
    y:80,
    opacity:0,
    stagger:.08,
    duration:1,
    ease: "none",
    scrollTrigger:{
        trigger:titleRef.current,
        start:"top 85%",
        once:true
    }
})
     const tl = gsap.timeline({
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "top top",
    end: "bottom top",
    scrub: true,

  },
});

tl
  .to(gridBlur3Ref.current, {
    scale: 1.5,
    opacity: 1,
    filter: "blur(120px) brightness(300%)",
    ease: "none",
  }, 0)

  .to(sectionRef.current, { 
    scale: 0.92,
    // clipPath: "inset(24px round 40px)",
    borderRadius:'40px',
    border:'1px solid var(--color-border)',
    boxShadow:'0 0 200px var(--color-border)',
    opacity: 0.92,
    ease: "none",
  }, 0)

  .to(bgTextRef.current, {
    opacity: 0,
    y: -120,
    rotateX: -10,
    scale: 0.5,
    ease: "none",
  }, 0)

  .to(bgRef.current, {
    scale: 1.7,
    filter: "blur(160px)",
    ease: "none",
  }, 0)

  .to(contentRef.current, {
    y: -80,
    opacity: 0.85,

    ease: "none",
  }, 0);

  
    }, sectionRef)

    return () => {
      split?.revert()
      ctx.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} className={styles.hero}>
      {/* ── Background ── */}
      <div
        ref={bgRef}
        className={styles.gradientBackground}
        aria-hidden="true"
        data-scroll
        data-lag="0.2"
      />
      <div ref={bgTextRef} className={styles.bgText}>
        FRONTEND
      </div>
      {/* ── Grid елементи ── */}
      <div className={styles.gridBlur1} aria-hidden="true" />
      <div className={styles.gridBlur2} aria-hidden="true" />
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
            <h1 ref={titleRef} className={styles.title}>
              <span className={styles.titleLine}>
                <span className={styles.titleAccent}>Building</span>
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
                onClick={() =>
                  window.open(
                    'https://github.com/volodimirfushtei',
                    '_blank',
                    'noopener',
                  )
                }
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
          <div
            data-cursor="hover"
            data-cursor-text="Interactive media"
            data-cursor-type="media"
            ref={mediaRef}
            className={styles.mediaContainer}
          >
            <HeroMedia />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
