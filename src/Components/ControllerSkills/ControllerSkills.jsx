import { useRef, useLayoutEffect } from "react";
import styles from "./ControllerSkills.module.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const techItems = [
  { name: "React", icon: "ri-reactjs-line", color: "#61dafb", description: "Library" },
  { name: "Next.js", icon: "ri-nextjs-fill", color: "#fff", description: "Framework" },
  { name: "JavaScript", icon: "ri-javascript-line", color: "#f7df1e", description: "Language" },
  { name: "TypeScript", icon: "ri-typescript-line", color: "#3178c6", description: "Language" },
  { name: "Node.js", icon: "ri-nodejs-line", color: "#68a063", description: "Runtime" },
  { name: "MongoDB", icon: "ri-database-2-line", color: "#47a248", description: "Database" },
  { name: "Docker", icon: "ri-docker-line", color: "#2496ed", description: "Container" },
  { name: "AWS", icon: "ri-cloud-line", color: "#ff9900", description: "Cloud" },
];

export default function ControllerSkills() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(`.${styles.card}`);

      // 🎬 Cards reveal (blur → focus)
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          {
            y: 100,
            opacity: 0,
            scale: 0.9,
            filter: "blur(8px)",
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "top 20%",
              scrub: true,
            },
          }
        );
      });

      // 🎥 Parallax track
      gsap.to(`.${styles.inner}`, {
        xPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.header}>
        <span className={styles.line} />
        <h3 className={styles.heading}>Coding process and tools</h3>
      </div>

      <div className={styles.track}>
        <div className={styles.inner}>
          {[...techItems, ...techItems].map((tech, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardContent}>
                <i
                  className={`${tech.icon} ${styles.icon}`}
                  style={{ color: tech.color }}
                />
                <div>
                  <div className={styles.name}>{tech.name}</div>
                  <div className={styles.desc}>{tech.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
