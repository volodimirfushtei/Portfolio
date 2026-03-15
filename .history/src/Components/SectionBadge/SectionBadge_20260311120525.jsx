import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./SectionBadge.module.css";

gsap.registerPlugin(ScrollTrigger);

const SectionBadge = ({ sectionSelector, number, label }) => {
  const badgeRef = useRef(null);
  const numberRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ✅ Intro animation */
      const tl = gsap.timeline();

      tl.from(numberRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
      }).from(
        labelRef.current,
        {
          opacity: 0,
          y: 10,
          duration: 0.4,
        },
        "-=0.3",
      );

      /* ✅ Scroll animation - fade in на появу секції */
      gsap.fromTo(
        badgeRef.current,
        {
          opacity: 0,
          scale: 0.9,
        },
        {
          opacity: 1,
          scale: 1,
          scrollTrigger: {
            trigger: sectionSelector,
            start: "top center",
            end: "top 30%",
            scrub: 0.5,
            once: false,
          },
        },
      );

      /* ✅ Fade out при вході наступної секції */
      gsap.to(badgeRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: sectionSelector,
          start: "bottom 20%",
          end: "bottom 10%",
          scrub: 0.5,
          once: false,
        },
      });
    }, badgeRef);

    return () => ctx.revert();
  }, [sectionSelector]);

  return (
    <div ref={badgeRef} className={styles.badge} aria-hidden="true">
      <span ref={numberRef} className={styles.number}>
        {number}
      </span>
      <span ref={labelRef} className={styles.label}>
        {label}
      </span>
    </div>
  );
};

export default SectionBadge;
