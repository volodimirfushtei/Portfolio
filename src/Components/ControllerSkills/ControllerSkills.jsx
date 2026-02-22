import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./ControllerSkills.module.css";

const techItems = [
  {
    name: "React",
    icon: "ri-reactjs-line",
    color: "#61dafb",
    description: "UI library",
  },
  {
    name: "TypeScript",
    icon: "ri-typescript-line",
    color: "#3178c6",
    description: "Typed JS",
  },
  {
    name: "Node.js",
    icon: "ri-nodejs-line",
    color: "#68a063",
    description: "Server runtime",
  },
  {
    name: "Figma",
    icon: "ri-pencil-ruler-line",
    color: "#a259ff",
    description: "Design tool",
  },
  {
    name: "MongoDB",
    icon: "ri-database-2-line",
    color: "#47a248",
    description: "NoSQL DB",
  },
  {
    name: "Tailwind",
    icon: "ri-css3-line",
    color: "#38bdf8",
    description: "Utility CSS",
  },
  {
    name: "Git",
    icon: "ri-git-branch-line",
    color: "#f1502f",
    description: "Version control",
  },
];

/* Дублюємо для безкінечного loop */
const items = [...techItems, ...techItems];

export default function ControllerSkills() {
  const trackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        x: "-50%",
        duration: 22,
        ease: "none",
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} aria-label="Technologies I use">
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.eyebrowLine} aria-hidden="true" />
        <h3 className={styles.heading}>Coding process and tools</h3>
      </div>

      {/* Marquee */}
      <div className={styles.track} aria-hidden="true">
        <div ref={trackRef} className={styles.inner}>
          {items.map((tech, i) => (
            <div key={`${tech.name}-${i}`} className={styles.card}>
              <div className={styles.cardInner}>
                {/* Front */}
                <div className={styles.front}>
                  <i
                    className={tech.icon}
                    style={{ color: tech.color }}
                    aria-hidden="true"
                  />
                  <span className={styles.name}>{tech.name}</span>
                </div>

                {/* Back */}
                <div className={styles.back}>
                  <p style={{ color: tech.color }}>{tech.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
