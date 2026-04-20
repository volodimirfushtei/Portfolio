import { useRef, lazy } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Typewriter } from "react-simple-typewriter";
import styles from "./HeroSection.module.css";

const HeroMedia = lazy(() => import("../HeroMedia/HeroMedia.jsx"));
gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);

  const gridRefs = useRef([]);
  const textRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const mediaRef = useRef(null);
  const cornerRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const scrollLineRef = useRef(null);
  const taglineRef = useRef(null);



  // Функція для додавання grid refs
  const addToGridRefs = (el) => {
    if (el && !gridRefs.current.includes(el)) {
      gridRefs.current.push(el);
    }
  };

  return (
    <section ref={sectionRef} className={styles.hero} >
      {/* ── Background ── */}
      <div ref={bgRef} className={styles.gradientBackground} aria-hidden="true" data-scroll data-speed="0.2" data-lag="0.2" />
      {/* ── Grid елементи ── */}
      <div
        ref={addToGridRefs}
        className={styles.gridBlur1}
        aria-hidden="true"
        data-scroll
        data-speed="0.2"
        data-lag="0.2"
      />
      <div
        ref={addToGridRefs}
        className={styles.gridBlur2}
        aria-hidden="true"
        data-scroll
        data-speed="0.2"
        data-lag="0.2"
      />
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
      <div className={styles.heroInner}>
        <div className={styles.content}>
          {/* LEFT — Text column */}
          <div ref={textRef} className={styles.textContent} data-scroll data-speed="0.4" data-lag="0.2">
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
                <span className={styles.titleAccent}>The best</span>
              </span>
              <span className={styles.titleLine}>
                <span className={styles.titlePlain}>Digital</span>
              </span>
              <span className={styles.titleLine}>
                <span className={styles.titlePlain}>Solutions</span>
              </span>
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
                data-cursor-type="link"
                data-cursor-text="Let's work together"
                className={styles.primaryButton}
                aria-label="Start a project"
              >
                <span>Start a project</span>
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
                    "https://github.com/volodimirfushtei",
                    "_blank",
                    "noopener",
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
            data-scroll
            data-speed="0.5"
            data-lag="0.2"
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
  );
};

export default HeroSection;
