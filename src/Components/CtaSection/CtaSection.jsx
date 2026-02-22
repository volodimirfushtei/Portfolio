import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./CtaSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const listItems = [
  "Responsive Design",
  "No additional fees",
  "Easy customization",
  "24/7 Support",
];

const images = [
  "images/njeromin1.jpg",
  "images/njeromin2.jpg",
  "images/njeromin3.jpg",
  "images/sity.jpg",
  "images/scott_webb.jpg",
  "images/ryan_wilson_map.jpg",
  "images/pexels_steve.jpg",
  "images/yves.jpg",
  "images/my_photo.jpg",
];

/* Дублюємо зображення для безкінечного marquee */
const marqueeImages = [...images, ...images];

const CtaSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const btnRef = useRef(null);
  const listRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Content reveal ── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.from(headingRef.current.children, {
        opacity: 0,
        y: 50,
        duration: 0.9,
        stagger: 0.08,
      })
        .from(subRef.current, { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
        .from(btnRef.current, { opacity: 0, y: 16, duration: 0.5 }, "-=0.3")
        .from(
          listRef.current.children,
          {
            opacity: 0,
            y: 12,
            duration: 0.45,
            stagger: 0.08,
          },
          "-=0.2",
        );

      /* ── Marquee row 1 — left → ── */
      gsap.to(row1Ref.current, {
        x: "-50%",
        duration: 28,
        ease: "none",
        repeat: -1,
      });

      /* ── Marquee row 2 — ← right (reverse) ── */
      gsap.fromTo(
        row2Ref.current,
        { x: "-50%" },
        { x: "0%", duration: 32, ease: "none", repeat: -1 },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      {/* Marquee background */}
      <div className={styles.marqueeWrap} aria-hidden="true">
        <div ref={row1Ref} className={styles.row}>
          {marqueeImages.map((src, i) => (
            <img
              key={`r1-${i}`}
              src={src}
              alt=""
              loading="lazy"
              className={styles.image}
            />
          ))}
        </div>
        <div ref={row2Ref} className={styles.row}>
          {marqueeImages.map((src, i) => (
            <img
              key={`r2-${i}`}
              src={src}
              alt=""
              loading="lazy"
              className={styles.image}
            />
          ))}
        </div>
        <div className={styles.marqueeOverlay} />
      </div>

      {/* Content */}
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Eyebrow */}
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            <span className={styles.eyebrowText}>Ready to start?</span>
          </div>

          {/* Heading — кожне слово окремий span для stagger */}
          <h2 ref={headingRef} className={styles.heading}>
            <span>Take Your Website</span>
            <span className={styles.headingAccent}> to the Next Level</span>
          </h2>

          <p ref={subRef} className={styles.subheading}>
            Premium templates designed for{" "}
            <span className={styles.highlight}>modern businesses</span>
          </p>

          <a
            ref={btnRef}
            href="https://webflow.com/templates/designers/brandbes"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.button}
          >
            <span>Purchase on Webflow</span>
            <span className={styles.buttonArrow}>→</span>
          </a>

          <ul ref={listRef} className={styles.list}>
            {listItems.map((text) => (
              <li key={text} className={styles.listItem}>
                <i className="ri-checkbox-circle-line" aria-hidden="true" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
