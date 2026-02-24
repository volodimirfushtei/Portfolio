import { useEffect, useRef } from "react";
import gsap from "gsap";
import CircularText from "../CircularText/CircularText";
import styles from "./HeroMedia.module.css";

const HeroMedia = () => {
  const containerRef = useRef(null);
  const imageRef =
    useRef(null); /* виправлено: був призначений двічі — на div і img */
  const badgeRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.8 },
      });

      tl.from(containerRef.current, { opacity: 0, y: 40 })
        .from(
          imageRef.current,
          { opacity: 0, scale: 1.08, duration: 1 },
          "-=0.4",
        )
        .from(
          badgeRef.current,
          {
            opacity: 0,
            y: 16,
            scale: 0.92,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          "-=0.3",
        )
        .from(
          textRef.current.children,
          { opacity: 0, y: 24, stagger: 0.15, duration: 0.6 },
          "-=0.2",
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={styles.card}>
      <div className={styles.imageWrap}>
        {/* Image */}
        <img
          ref={imageRef}
          src="/images/preview.png"
          alt="Profile photo"
          className={styles.image}
          fetchpriority="high" // ← LCP fix
          decoding="async"
          width={300}
          height={400}
        />

        {/* Circular text */}
        <div className={styles.circleWrap} aria-hidden="true">
          <CircularText />
        </div>

        {/* Gradient overlay on hover */}
        <div className={styles.overlay} aria-hidden="true" />

        {/* Available badge */}
        <div ref={badgeRef} className={styles.badge}>
          <span className={styles.pingWrap} aria-hidden="true">
            <span className={styles.ping} />
            <span className={styles.pingDot} />
          </span>
          <span className={styles.badgeText}>Available for work</span>
          <a
            href="https://djinni.co/my/profile/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.badgeLink}
          >
            Hire me →
          </a>
        </div>
      </div>

      {/* Text section */}
      <div ref={textRef} className={styles.textSection}>
        <h3 className={styles.heading}>My Creative Process</h3>
        <p className={styles.description}>
          Combining technical expertise with design thinking to build
          exceptional digital experiences
        </p>
      </div>
    </div>
  );
};

export default HeroMedia;
