import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ControllerSkills.module.css";

gsap.registerPlugin(ScrollTrigger);

const techItems = [
  {
    name: "React",
    icon: "ri-reactjs-line",
    color: "#61dafb",
    description: "UI library",
  },
  {
    name: "Next.js",
    icon: "ri-nextjs-fill",
    color: "#f5f5f0",
    description: "Framework",
  },
  {
    name: "JavaScript",
    icon: "ri-javascript-line",
    color: "#f7df1e",
    description: "Programming language",
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
  {
    name: "Docker",
    icon: "ri-docker-line",
    color: "#2496ed",
    description: "Containerization",
  },
  {
    name: "AWS",
    icon: "ri-aws-line",
    color: "#ff9900",
    description: "Cloud services",
  },
  {
    name: "Linux",
    icon: "ri-linux-line",
    color: "#fbc02d",
    description: "Operating system",
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
  {
    name: "Docker",
    icon: "ri-docker-line",
    color: "#2496ed",
    description: "Containerization",
  },
  {
    name: "AWS",
    icon: "ri-aws-line",
    color: "#ff9900",
    description: "Cloud services",
  },
  {
    name: "Linux",
    icon: "ri-linux-line",
    color: "#fbc02d",
    description: "Operating system",
  },
];

export default function ControllerSkills() {
  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
            once: true,
          },
          delay: i * 0.1, // stagger
        },
      );
    });
  }, []);

  return (
    <section className={styles.section} aria-label="Technologies I use">
      <div className={styles.header}>
        <span className={styles.eyebrowLine} aria-hidden="true" />
        <h3 className={styles.heading}>Coding process and tools</h3>
      </div>

      <div className={styles.track} aria-hidden="true">
        <div className={styles.inner}>
          {techItems.map((tech, i) => (
            <div
              key={tech.name}
              className={styles.card}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
            >
              <div className={styles.cardInner}>
                <div className={styles.front}>
                  <i
                    className={tech.icon}
                    style={{ color: tech.color }}
                    aria-hidden="true"
                  />
                  <span className={styles.name}>{tech.name}</span>
                </div>
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
