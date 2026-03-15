import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Typewriter } from "react-simple-typewriter";
import styles from "./HeroSection.module.css";
import HeroMedia from "../HeroMedia/HeroMedia";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const mediaRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ✅ INTRO ANIMATION */
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.from(eyebrowRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
      })
        .from(
          titleRef.current.children,
          {
            opacity: 0,
            y: 40,
            duration: 0.8,
            stagger: 0.08,
          },
          "-=0.3",
        )
        .from(
          subtitleRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
          },
          "-=0.4",
        )
        .from(
          buttonsRef.current.children,
          {
            opacity: 0,
            y: 12,
            duration: 0.5,
            stagger: 0.08,
          },
          "-=0.3",
        )
        .from(
          mediaRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
          },
          "-=0.6",
        )
        .from(
          scrollIndicatorRef.current,
          {
            opacity: 0,
            duration: 0.4,
          },
          "-=0.3",
        );

      /* ✅ SCROLL PARALLAX */
      gsap.to(contentRef.current, {
        y: -80,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "center top",
          scrub: 1,
          once: false,
        },
      });

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.hero}>
      {/* ═══════════════════════════════════════════════════════ */}
      {/* CONTENT */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div ref={contentRef} className={styles.content}>
        {/* TEXT SECTION */}
        <div className={styles.textSection}>
          {/* Eyebrow */}
          <div ref={eyebrowRef} className={styles.eyebrow}>
            <span className={styles.eyebrowText}>Fullstack Developer</span>
          </div>

          {/* Title */}
          <h1 ref={titleRef} className={styles.title}>
            <span className={styles.titleLine}>Digital</span>
            <span className={styles.titleLine}>Solutions</span>
            <span className={styles.titleLine}>
              <span className={styles.titleAccent}>Crafted</span> Perfectly
            </span>
          </h1>

          {/* Subtitle */}
          <p ref={subtitleRef} className={styles.subtitle}>
            <Typewriter
              words={[
                "Transforming ideas into exceptional web experiences",
                "UI / UX Design & Development",
                "Motion & Interactive Animations",
                "React & Modern Web Stack",
              ]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={60}
              deleteSpeed={35}
              delaySpeed={2000}
            />
          </p>

          {/* Buttons */}
          <div ref={buttonsRef} className={styles.buttons}>
            <button className={styles.buttonPrimary}>
              Start a project
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 10H16M16 10L11 5M16 10L11 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              className={styles.buttonSecondary}
              onClick={() =>
                window.open(
                  "https://github.com/volodimirfushtei",
                  "_blank",
                  "noopener",
                )
              }
              aria-label="View my work on GitHub"
            >
              View my work
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 10H16M16 10L11 5M16 10L11 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* MEDIA SECTION */}
        <div ref={mediaRef} className={styles.mediaSection}>
          <HeroMedia />
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* SCROLL INDICATOR */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div
        ref={scrollIndicatorRef}
        className={styles.scrollIndicator}
        aria-hidden="true"
      >
        <span>Scroll to explore</span>
        <div className={styles.scrollArrow}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 2V12M8 12L3 7M8 12L13 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
