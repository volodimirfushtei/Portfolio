import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./StickyZoomSection.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function StickyZoomSection() {
  const sectionRef = useRef(null);
  const zoomRef = useRef(null);
  const textBgRef = useRef(null);
  const textFgRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current || !zoomRef.current || !ctaRef.current) return;

    const ctx = gsap.context(() => {
      // Встановлюємо початкові значення
      gsap.set(zoomRef.current, { scale: 0.15 });
      gsap.set(textBgRef.current, { opacity: 0, scale: 0.8 });
      gsap.set(textFgRef.current, { opacity: 0, scale: 1.2, y: 50 });
      gsap.set(ctaRef.current, { opacity: 0, y: 24 });

      // Створюємо ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%", // Longer distance for dramatic effect
          scrub: 1.5,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Додаємо анімації
      tl.to(
        textBgRef.current,
        {
          opacity: 0.2, // Subtle background text
          scale: 1,
          duration: 1,
          ease: "power2.out",
        },
        0
      )
        .to(
          zoomRef.current,
          {
            scale: 1,
            duration: 1.5,
            ease: "power2.inOut",
          },
          0
        )
        .to(
          textFgRef.current,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          1
        )
        .to(
          zoomRef.current,
          {
            scale: 5.2, // Massive scale to envelope the screen
            duration: 1.5,
            ease: "power2.in",
          },
          "+=0.5"
        )
        .to(
          textBgRef.current,
          { opacity: 0, duration: 0.5 },
          "<"
        )
        .to(
          textFgRef.current,
          { opacity: 0, y: -50, duration: 0.5 },
          "<"
        )
        .to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.5"
        );
    }, sectionRef);

    return () => {
      // Правильне очищення
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars && trigger.vars.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.stage}>
        {/* Background Text */}
        <div ref={textBgRef} className={styles.textBg}>
          <span>CREATIVE</span>
        </div>

        <div ref={zoomRef} className={styles.zoom}>
          <div className={styles.imageWrap}>
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
              alt="Code"
              loading="lazy"
            />
          </div>
        </div>

        {/* Foreground Text */}
        <div ref={textFgRef} className={styles.textFg}>
          <span>DEVELOPER</span>
        </div>

        <a
          ref={ctaRef}
          href="https://github.com/volodimirfushtei"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cta}
        >
          <span className={styles.ctaText}>View GitHub →</span>
        </a>
      </div>
    </section>
  );
}
