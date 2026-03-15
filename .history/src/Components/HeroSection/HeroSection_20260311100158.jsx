import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Typewriter } from "react-simple-typewriter";
import styles from "./HeroSection.module.css";
import HeroMedia from "../HeroMedia/HeroMedia";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const gridRef = useRef(null);
  const textRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const mediaRef = useRef(null);
  const indicatorRef = useRef(null);
  const cornerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Intro animation */
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(eyebrowRef.current, { opacity: 0, x: -20, duration: 0.6 })
        .from(
          titleRef.current.children,
          {
            opacity: 0,
            y: 60,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.3",
        )
        .from(
          subtitleRef.current,
          { opacity: 0, y: 20, duration: 0.6 },
          "-=0.4",
        )
        .from(
          buttonsRef.current.children,
          {
            opacity: 0,
            y: 15,
            duration: 0.45,
            stagger: 0.1,
          },
          "-=0.3",
        )
        .from(mediaRef.current, { opacity: 0, x: 40, duration: 0.9 }, "-=0.7")
        .from(cornerRef.current, { opacity: 0, duration: 0.5 }, "-=0.5")
        .from(indicatorRef.current, { opacity: 0, duration: 0.4 }, "-=0.3");

      /* Scroll parallax */
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        })
        .to(bgRef.current, { yPercent: 20, opacity: 0, ease: "none" })
        .to(textRef.current, { yPercent: 30, opacity: 0, ease: "none" }, 0)
        .to(
          mediaRef.current,
          { yPercent: 10, scale: 1.05, opacity: 0, ease: "none" },
          0,
        );

      /* Scroll indicator fade */
      gsap.to(indicatorRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top+=100 top",
          end: "top+=300 top",
          scrub: true,
        },
      });
    }, sectionRef);
    /* ✅ SCROLL INDICATOR FADE */
    gsap.to(scrollIndicatorRef.current, {
      opacity: 0,
      pointerEvents: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top+=100 top",
        end: "top+=300 top",
        scrub: 0.5,
      },
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.hero}>
      {/* Background layer (z-index: 1) */}
      <div
        ref={bgRef}
        className={styles.gradientBackground}
        aria-hidden="true"
      />

      {/* Grid overlay (z-index: 2) */}
      <div ref={gridRef} className={styles.gridOverlay} aria-hidden="true" />
      {/* ═══════════════════════════════════════════════════════ */}
      {/* SCROLL INDICATOR (LEFT SIDE) */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div ref={scrollIndicatorRef} className={styles.scrollIndicator}>
        <span className={styles.scrollText}>Scroll</span>
        <div className={styles.scrollLineContainer}>
          <div ref={scrollLineRef} className={styles.scrollLine} />
        </div>
      </div>
      {/* Corner badge (z-index: 100) */}
      <div ref={cornerRef} className={styles.cornerBadge} aria-hidden="true">
        <span className={styles.cornerBadgeNum}>01</span>
        <span className={styles.cornerBadgeLabel}>Hero</span>
      </div>

      {/* Hero inner wrapper (z-index: 10) */}
      <div className={styles.heroInner}>
        {/* Main content container (z-index: 10) */}
        <div className={styles.content}>
          {/* Text content (z-index: 10) */}
          <div ref={textRef} className={styles.textContent}>
            <div ref={eyebrowRef} className={styles.eyebrow}>
              <span className={styles.eyebrowLine} />
              <span className={styles.eyebrowText}>
                Fullstack Developer · 2025
              </span>
            </div>

            <h1 ref={titleRef} className={styles.title}>
              <span className={styles.titleGradient}>The best</span>
              <span className={styles.titleSecond}>Digital</span>
              <span className={styles.titleSecond}>Solutions</span>
            </h1>

            <div className={styles.divider} />

            <p ref={subtitleRef} className={styles.subtitle}>
              <Typewriter
                words={[
                  "Transforming ideas into exceptional web experiences",
                  "UI / UX Design",
                  "Motion & Animations",
                  "React Applications",
                ]}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={65}
                deleteSpeed={40}
                delaySpeed={2200}
              />
            </p>

            <div ref={buttonsRef} className={styles.buttons}>
              <button
                data-cursor="hover"
                className={styles.primaryButton}
                aria-label="Start a project"
              >
                <span>Start a project</span>
                <span className={styles.buttonArrow}>→</span>
              </button>

              <button
                data-cursor="hover"
                className={styles.secondaryButton}
                onClick={() =>
                  window.open(
                    "https://github.com/volodimirfushtei",
                    "_blank",
                    "noopener",
                  )
                }
                aria-label="View my work on GitHub"
              >
                <span>View my work</span>
                <span className={styles.buttonArrow}>→</span>
              </button>
            </div>
          </div>

          {/* Media container (z-index: 8) */}
          <div ref={mediaRef} className={styles.mediaContainer}>
            <HeroMedia />
          </div>
        </div>
      </div>

      {/* Scroll indicator (z-index: 50) */}
      <div
        ref={indicatorRef}
        className={styles.scrollIndicator}
        aria-hidden="true"
      >
        <span className={styles.scrollIndicatorText}>Scroll to explore</span>
        <div className={styles.scrollIndicatorArrow}>
          <i className="fa-solid fa-arrow-down"></i>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
