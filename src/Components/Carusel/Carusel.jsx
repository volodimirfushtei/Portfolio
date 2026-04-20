import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import SoftSkills from "../SoftSkills/SoftSkills";
import styles from "./Carusel.module.css";

const ACCORDION = [
  {
    title: "Frontend Architecture",
    content:
      "Building scalable apps using React, Zustand, and modular structure. Clean, maintainable and production-ready code.",
  },
  {
    title: "Animations & UX",
    content:
      "Advanced animations with GSAP & Framer Motion. Smooth scrolling, parallax, and micro-interactions.",
  },
  {
    title: "Performance",
    content:
      "Optimized rendering, lazy loading, code splitting and smooth 60fps interactions.",
  },
  {
    title: "3D & WebGL",
    content:
      "Interactive 3D experiences using Three.js and React Three Fiber.",
  },
];

export default function Carousel() {
  const [active, setActive] = useState(null);
  const contentRefs = useRef([]);

  useEffect(() => {
    contentRefs.current.forEach((el, i) => {
      if (!el) return;

      if (active === i) {
        gsap.to(el, {
          height: el.scrollHeight,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
        });
      } else {
        gsap.to(el, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
        });
      }
    });
  }, [active]);

  return (
    <div className={styles.carousel}>
      {/* LEFT */}
      <div className={styles.panel}>
        <SoftSkills />
      </div>

      {/* RIGHT */}
      <div className={styles.panel}>
        <h2 className={styles.title}>What I Do</h2>
        <p className={styles.subtitle}>
          Focused on modern UI, performance and interactive experiences.
        </p>

        {/* 🔥 Accordion */}
        <div className={styles.accordion}>
          {ACCORDION.map((item, i) => (
            <div
              key={i}
              className={`${styles.item} ${active === i ? styles.active : ""
                }`}
              onClick={() => setActive(active === i ? null : i)}
            >
              <div className={styles.header}>
                <span>{item.title}</span>
                <span className={styles.plus}>
                  {active === i ? "−" : "+"}
                </span>
              </div>

              <div
                ref={(el) => (contentRefs.current[i] = el)}
                className={styles.content}
              >
                <p>{item.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 🔥 extra glow block */}
        <div className={styles.glowBox}>
          <p>
            Crafting immersive interfaces with attention to motion, detail and
            performance.
          </p>
        </div>
      </div>
    </div>
  );
}

