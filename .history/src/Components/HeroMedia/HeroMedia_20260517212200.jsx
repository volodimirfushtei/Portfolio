import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./HeroMedia.module.css";

gsap.registerPlugin(ScrollTrigger);

const images = [
  "/images/preview.webp",
  "/images/preview2.webp",
  "/images/preview3.webp",
  "/images/preview4.webp",
];

const HeroMedia = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const stripRef = useRef(null);
  const loaderRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "expo.out",
        },
      });

      /* ─────────────────────────────
         LOADER INTRO
      ───────────────────────────── */

      tl.fromTo(
        ".stripItem",
        {
          xPercent: 120,
          opacity: 0,
          scale: 0.8,
        },
        {
          xPercent: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.08,
          duration: 1.2,
        }
      );

      tl.fromTo(
        imageRef.current,
        {
          clipPath: "inset(100% 0% 0% 0% round 24px)",
          scale: 1.25,
          opacity: 0,
        },
        {
          clipPath: "inset(0% 0% 0% 0% round 24px)",
          scale: 1,
          opacity: 1,
          duration: 1.8,
        },
        "-=0.8"
      );

      tl.fromTo(
        overlayRef.current,
        {
          opacity: 0,
          backdropFilter: "blur(20px)",
        },
        {
          opacity: 1,
          backdropFilter: "blur(0px)",
          duration: 1.2,
        },
        "-=1.4"
      );

      tl.fromTo(
        frameRef.current,
        {
          scale: 0.9,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
        },
        "-=1.2"
      );

      tl.fromTo(
        contentRef.current.querySelectorAll("[data-reveal]"),
        {
          yPercent: 120,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 1.2,
        },
        "-=1"
      );

      tl.to(
        loaderRef.current,
        {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 1.4,
          ease: "expo.inOut",
          pointerEvents: "none",
        },
        "-=0.5"
      );

      /* ─────────────────────────────
         FLOATING PARALLAX
      ───────────────────────────── */

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

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={styles.mediaContainer}>
      {/* ─────────────────────────────
          LOADER
      ───────────────────────────── */}

      <div ref={loaderRef} className={styles.loader}>
        <div className={styles.strip}>
          <div ref={stripRef} className={`${styles.stripTrack} stripTrack`}>
            {images.map((img, i) => (
              <div key={i} className={`${styles.stripItem} stripItem`}>
                <img src={img} alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─────────────────────────────
          HERO IMAGE
      ───────────────────────────── */}

      <img
        ref={imageRef}
        src="/images/preview.webp"
        alt="Creative Work"
        className={styles.image}
        loading="eager"
        fetchPriority="high"
      />

      {/* OVERLAY */}
      <div
        ref={overlayRef}
        className={styles.overlay}
        aria-hidden="true"
      />

      {/* FRAME */}
      <div
        ref={frameRef}
        className={styles.frame}
        aria-hidden="true"
      />

      {/* CONTENT */}
      <div ref={contentRef} className={styles.content}>
        <span data-reveal className={styles.eyebrow}>
          Creative Direction · 2026
        </span>

        <h2 data-reveal className={styles.title}>
          Building immersive
          <br />
          digital experiences
        </h2>

        <p data-reveal className={styles.description}>
          Modern interfaces crafted with motion,
          performance and cinematic interaction.
        </p>

        <div data-reveal className={styles.actions}>
          <button className={styles.primaryBtn}>
            Start Project
          </button>

          <button className={styles.secondaryBtn}>
            View Work
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroMedia;
