import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CircularText from "../CircularText/CircularText";
import styles from "./HeroMedia.module.css";

gsap.registerPlugin(ScrollTrigger);

const HeroMedia = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);
  const circleRef = useRef(null);
  const contentRef = useRef(null);
  const lineRef = useRef(null);
  const counterRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Entry timeline ── */
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Frame clip-path reveal
      tl.fromTo(
        containerRef.current,
        { clipPath: "inset(10% 10% 10% 10% round 20px)", opacity: 0 },
        { clipPath: "inset(0% 0% 0% 0% round 10px)", opacity: 1, duration: 1.4 }
      )
        // Image parallax reveal
        .fromTo(
          imageRef.current,
          { scale: 1.18, y: 30 },
          { scale: 1, y: 0, duration: 1.8, ease: "expo.out" },
          "-=1.0"
        )
        // Overlay fade
        .fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1 },
          "-=1.4"
        )
        // Accent frame
        .fromTo(
          frameRef.current,
          { scaleX: 0, scaleY: 0, opacity: 0 },
          { scaleX: 1, scaleY: 1, opacity: 1, duration: 1, ease: "power3.out" },
          "-=1.2"
        )
        // Circular text
        .fromTo(
          circleRef.current,
          { scale: 0, rotate: -90, opacity: 0 },
          { scale: 1, rotate: 0, opacity: 1, duration: 1, ease: "back.out(1.5)" },
          "-=0.8"
        )
        // Divider line
        .fromTo(
          lineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.6, ease: "power2.out" },
          "-=0.5"
        )
        // Content stagger
        .fromTo(
          contentRef.current.querySelectorAll("[data-reveal]"),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.12, duration: 0.8 },
          "-=0.4"
        );

      // Counter animation
      if (counterRef.current) {
        const startVal = { val: 0 };
        gsap.to(startVal, {
          val: 97,
          duration: 2.5,
          delay: 1,
          ease: "power2.out",
          onUpdate() {
            if (counterRef.current) {
              counterRef.current.textContent = Math.round(startVal.val);
            }
          },
        });
      }

      // Scroll-driven parallax on image
      gsap.to(imageRef.current, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Continuous slow CircularText rotation
      gsap.to(circleRef.current, {
        rotate: "+=360",
        duration: 30,
        ease: "none",
        repeat: -1,
      });
    }, containerRef);

    /* ── Magnetic hover ── */
    const el = containerRef.current;
    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      gsap.to(imageRef.current, {
        x: x * 14,
        y: y * 10,
        duration: 0.8,
        ease: "power3.out",
        overwrite: "auto",
      });
    };
    const handleLeave = () => {
      gsap.to(imageRef.current, { x: 0, y: 0, duration: 1, ease: "elastic.out(1,0.4)" });
    };
    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      ctx.revert();
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.mediaContainer}>

      {/* ── BG image ── */}
      <img
        ref={imageRef}
        src="/images/preview.png"
        alt="Creative Process"
        className={styles.image}
        fetchPriority="high"
        decoding="async"
      />

      {/* ── Cinematic gradient overlay ── */}
      <div ref={overlayRef} className={styles.overlay} aria-hidden="true" />

      {/* ── Film grain ── */}
      <div className={styles.grain} aria-hidden="true" />

      {/* ── Accent frame (decorative border) ── */}
      <div ref={frameRef} className={styles.accentFrame} aria-hidden="true" />

      {/* ── Circular text badge ── */}
      <div ref={circleRef} className={styles.circleWrap} aria-hidden="true">
        <CircularText />
      </div>

      {/* ── Corner stat ── */}
      <div className={styles.stat} aria-label="97 percent client satisfaction">
        <span ref={counterRef} className={styles.statNum}>0</span>
        <span className={styles.statSuffix}>%</span>
        <span className={styles.statLabel}>Satisfaction</span>
      </div>

      {/* ── Bottom content bar ── */}
      <div ref={contentRef} className={styles.content}>

        {/* Divider */}
        <div ref={lineRef} className={styles.divider} />

        <div className={styles.contentInner}>
          {/* Left: label */}
          <div className={styles.textBlock}>
            <span data-reveal className={styles.eyebrow}>Process / 2025</span>
            <h3 data-reveal className={styles.heading}>Creative<br />Engineering</h3>
          </div>

          {/* Right: badge + actions */}
          <div className={styles.actions}>
            <span data-reveal className={styles.badge}>
              <span className={styles.badgeDot} />
              Available for work
            </span>
            <a
              data-reveal
              href="https://djinni.co/my/profile/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.hireBtn}
              aria-label="Hire me"
            >
              <span className={styles.hireBtnText}>Hire me</span>
              <svg className={styles.hireBtnIcon} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroMedia;
