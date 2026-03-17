import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Typewriter } from "react-simple-typewriter";
import styles from "./HeroSection.module.css";
import HeroMedia from "../HeroMedia/HeroMedia";
import DotGrid from "../DotGrid/DotGrid";


gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef         = useRef(null);
  const bgRef              = useRef(null);
  const noiseRef           = useRef(null);
  const gridRef            = useRef(null);
  const textRef            = useRef(null);
  const eyebrowRef         = useRef(null);
  const titleRef           = useRef(null);
  const subtitleRef        = useRef(null);
  const buttonsRef         = useRef(null);
  const mediaRef           = useRef(null);
  const cornerRef          = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const scrollLineRef      = useRef(null);

  const taglineRef         = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── 1. Scanline loop on the noise layer ── */
      gsap.to(noiseRef.current, {
        backgroundPositionY: "100%",
        duration: 18,
        ease: "none",
        repeat: -1,
      });

      /* ── 2. Master entry timeline ── */
      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        delay: 0.1,
      });

      // Background pan up
      tl.fromTo(
        bgRef.current,
        { yPercent: 8, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.6 }
      )
        // Grid fade
        .fromTo(gridRef.current, { opacity: 0 }, { opacity: 1, duration: 1 }, "-=1.2")

        // Eyebrow clip reveal
        .fromTo(
          eyebrowRef.current,
          { clipPath: "inset(0 100% 0 0)", opacity: 0 },
          { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 0.9, ease: "power3.out" },
          "-=0.8"
        )

        // Title lines stagger up
        .fromTo(
          titleRef.current.querySelectorAll(`.${styles.titleLine} > span`),
          { y: "110%", opacity: 0 },
          { y: "0%", opacity: 1, stagger: 0.08, duration: 1.0, ease: "expo.out" },
          "-=0.5"
        )

        // Tagline shimmer in
        .fromTo(
          taglineRef.current,
          { opacity: 0, letterSpacing: "0.5em" },
          { opacity: 1, letterSpacing: "0.02em", duration: 0.9, ease: "power2.out" },
          "-=0.6"
        )

        // Subtitle
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        )

        // Buttons
        .fromTo(
          buttonsRef.current.children,
          { opacity: 0, y: 20, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.55 },
          "-=0.4"
        )


        // Media panel slide in
        .fromTo(
          mediaRef.current,
          { opacity: 0, x: 60, clipPath: "inset(0 0 0 30%)" },
          { opacity: 1, x: 0, clipPath: "inset(0 0 0 0%)", duration: 1.2, ease: "expo.out" },
          "-=1.0"
        )

        // Corner badge
        .fromTo(cornerRef.current, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.6")

        // Scroll indicator draw
        .fromTo(
          scrollLineRef.current,
          { scaleY: 0 },
          { scaleY: 1, transformOrigin: "top", duration: 0.8 }
        );

      /* ── 3. Scroll parallax ── */
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top+=50 top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      scrollTl
        .to(bgRef.current,   { yPercent: 25, opacity: 0.3, ease: "none" }, 0)
        .to(textRef.current, { yPercent: 35, opacity: 0.3, ease: "none" }, 0)
        .to(mediaRef.current, { yPercent: 14, scale: 1.04, opacity: 0.3, ease: "none" }, 0);

      /* ── 4. Scroll indicator fade ── */
      gsap.to(scrollIndicatorRef.current, {
        opacity: 0,
        pointerEvents: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top+=80 top",
          end:   "top+=280 top",
          scrub: 0.6,
        },
      });

      /* ── 5. Scroll line pulse loop ── */
      gsap.to(scrollLineRef.current, {
     

        opacity: 0,
        y: 20,
        duration: 2,
        repeat: -1,
        ease: "power2.inOut",
        delay: 1.5 // Wait for entry to finish
      
        
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.hero}>
{/* DotGrid background */}
      <div className={styles.dotGridWrap} aria-hidden="true">
        <DotGrid
          dotSize={2}
          gap={10}
          baseColor="#575757ff"
          activeColor="#e8f53c"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>
     

      {/* ── Background ── */}
      <div ref={bgRef} className={styles.gradientBackground} aria-hidden="true" />

      {/* ── Grid ── */}
      <div ref={gridRef} className={styles.gridOverlay} aria-hidden="true" />

      {/* ── Corner index badge ── */}
      <div ref={cornerRef} className={styles.cornerBadge} aria-hidden="true">
        <span className={styles.cornerBadgeNum}>01</span>
        <span className={styles.cornerBadgeLabel}>Hero</span>
      </div>

      {/* ── Vertical scroll indicator ── */}
      <div ref={scrollIndicatorRef} className={styles.scrollIndicator} aria-hidden="true">
        <span className={styles.scrollText}>Scroll</span>
        <div className={styles.scrollLineContainer}>
          <div ref={scrollLineRef} className={styles.scrollLine} />
          
    
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

      </div>

      {/* ── Main content ── */}
      <div className={styles.heroInner}>
        <div className={styles.content}>

          {/* LEFT — Text column */}
          <div ref={textRef} className={styles.textContent}>

            {/* Eyebrow */}
            <div ref={eyebrowRef} className={styles.eyebrow}>
              <span className={styles.eyebrowLine} />
              <span className={styles.eyebrowText}>Fullstack Developer · 2025</span>
              <span className={styles.eyebrowDot} />
            </div>

            {/* Giant title — each line in its own clip container */}
            <h1 ref={titleRef} className={styles.title}>
              <span className={styles.titleLine}><span className={styles.titleAccent}>The best</span></span>
              <span className={styles.titleLine}><span className={styles.titlePlain}>Digital</span></span>
              <span className={styles.titleLine}><span className={styles.titlePlain}>Solutions</span></span>
            </h1>

            {/* Tagline */}
            <p ref={taglineRef} className={styles.tagline}>
              Design · Code · Motion
            </p>

            {/* Divider */}
            <div className={styles.divider} />

            {/* Typewriter subtitle */}
            <p ref={subtitleRef} className={styles.subtitle}>
              <Typewriter
                words={[
                  "Transforming ideas into exceptional web experiences",
                  "UI / UX Design & Prototyping",
                  "Motion & GSAP Animations",
                  "React & Next.js Applications",
                ]}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={60}
                deleteSpeed={35}
                delaySpeed={2400}
              />
            </p>

            {/* CTA buttons */}
            <div ref={buttonsRef} className={styles.buttons}>
              <button
                data-cursor="hover"
                className={styles.primaryButton}
                aria-label="Start a project"
              >
                <span>Start a project</span>
                <svg className={styles.btnArrowIcon} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <button
                data-cursor="hover"
                className={styles.secondaryButton}
                onClick={() => window.open("https://github.com/volodimirfushtei", "_blank", "noopener")}
                aria-label="View my work on GitHub"
              >
                <span>View my work</span>
                <svg className={styles.btnArrowIcon} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            
          </div>

          {/* RIGHT — Media column */}
          <div data-cursor='hover' ref={mediaRef} className={styles.mediaContainer}>
            <HeroMedia />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
