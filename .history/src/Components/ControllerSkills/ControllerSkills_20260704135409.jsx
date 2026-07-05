import { useRef, useLayoutEffect } from "react";
import styles from "./ControllerSkills.module.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const techItems = [
  {
    name: "React",
    icon: "icon-react",
    description: "Library",
  },
  {
    name: "Next.js",
    icon: "icon-nextjs",
    description: "Framework",
  },
  {
    name: "JavaScript",
    icon: "icon-javascript",
    description: "Language",
  },
  {
    name: "Node.js",
    icon: "icon-nodejs",
    description: "Runtime",
  },
  {
    name: "MongoDB",
    icon: "icon-mongodb",
    description: "Database",
  },
 
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
    <div key={i}  
  className={styles.card}
  onMouseEnter={(e) => {
    gsap.to(e.currentTarget, {
      y: -10,
      scale: 1.05,
      duration: 0.35,
      ease: "power3.out",
    });
  }}
  onMouseLeave={(e) => {
    gsap.to(e.currentTarget, {
      y: 0,
      scale: 1,
      duration: 0.35,
      ease: "power3.out",
    });
  }}>
      <div className={styles.cardContent}>
        <svg
          className={styles.icon}
          width={40}
          height={40}
        >
          <use href={`/sprite.svg#${tech.icon}`} />
        </svg>

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
