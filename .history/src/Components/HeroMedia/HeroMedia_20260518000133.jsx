import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./HeroMedia.module.css";

gsap.registerPlugin(ScrollTrigger);

const HeroMedia = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const lineRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Entry timeline ── */
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Frame clip-path reveal
      tl.fromTo(
        containerRef.current,
        { clipPath: "inset(12% 12% 12% 12% round 24px)", opacity: 0 },
        { clipPath: "inset(0% 0% 0% 0% round 24px)", opacity: 1, duration: 1.4 }
      )
        // Image parallax reveal
        tl.fromTo(
  imageRef.current,
  {
    clipPath: "inset(100% 0% 0% 0%)",
    scale: 1.2
  },
  {
    clipPath: "inset(0% 0% 0% 0%)",
    scale: 1,
    duration: 1.8,
    ease: "expo.inOut"
  }
)
        // Overlay fade
        .fromTo(
          overlayRef.current,
          { opacity: 0,
    filter: "blur(20px)" },
          { opacity: 1,
    filter: "blur(0px)",
    duration: 1.5},

          "-=1.4"
        )
        // Accent frame
        .fromTo(
          frameRef.current,
          { scaleX: 0, scaleY: 0, opacity: 0 },
          { scaleX: 1, scaleY: 1, opacity: 1, duration: 1, ease: "power3.out" },
          "-=1.2"
        )
       
        // Divider line
        .fromTo(
          lineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.6, ease: "power2.out" },
          "-=0.5"
        )
      // Content stagger
     gsap.fromTo(
  contentRef.current.querySelectorAll("[data-reveal]"),
  {
    opacity: 0,
  y: 80,
  rotateX: 12,
  transformOrigin: "top center",
  filter: "blur(12px)"
  },
  {
    opacity: 1,
    yPercent: 0,
    stagger: 0.12,
    duration: 1.4,
    ease: "expo.out"
  }
);

    

      // Scroll-driven parallax on image
   /* ─────────────────────────────
         FLOATING PARALLAX
      ───────────────────────────── */


      gsap.to(imageRef.current, {
        y: -18,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".stripTrack", {
        xPercent: -25,
        repeat: -1,
        duration: 16,
        ease: "none",
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
        src="/images/preview.webp"
        alt="Creative Process"
        className={styles.image}
        fetchpriority="high"
        decoding="async"
        loading="eager"
        data-scroll
        data-lag="0.1"
      />

      {/* ── Cinematic gradient overlay ── */}
      <div ref={overlayRef} className={styles.overlay} aria-hidden="true" />

      {/* ── Accent frame (decorative border) ── */}
      <div ref={frameRef} className={styles.accentFrame} aria-hidden="true" />

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
                <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroMedia;
