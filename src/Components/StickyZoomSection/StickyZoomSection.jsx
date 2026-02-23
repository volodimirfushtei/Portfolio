import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./StickyZoomSection.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function StickyZoomSection() {
  const sectionRef = useRef(null);
  const zoomRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=160%",
            scrub: true,
            pin: true,
          },
        })
        .fromTo(zoomRef.current, { scale: 0.25 }, { scale: 1, ease: "none" })
        .to(zoomRef.current, {
          scale: 2.1,
          ease: "none",
        })
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0 },
          0.55,
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.stage}>
        <div ref={zoomRef} className={styles.zoom}>
          <div className={styles.imageWrap}>
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
              alt="Code"
              loading="lazy"
            />
          </div>
        </div>

        <a
          ref={ctaRef}
          href="https://github.com/volodimirfushtei"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cta}
        >
          <span className={styles.ctaText}> View GitHub →</span>
        </a>
      </div>
    </section>
  );
}
