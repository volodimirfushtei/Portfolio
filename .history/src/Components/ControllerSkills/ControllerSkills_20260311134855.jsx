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
import { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import styles from "./ControllerSkills.module.css";

// Масив технологій
const techItems = [
  // ... той самий масив
];

const TechCard = ({ tech, index, isInView }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.5,
        delay: index * 0.03,
        ease: [0.76, 0, 0.24, 1],
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.08, zIndex: 10 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className={styles.cardInner}
        animate={{ rotateY: isHovered ? 180 : 0 }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className={styles.front}>
          <i className={tech.icon} style={{ color: tech.color }} />
          <span className={styles.name}>{tech.name}</span>
        </div>
        <div className={styles.back}>
          <p style={{ color: tech.color }}>{tech.description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ControllerSkills = () => {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      {/* Заголовок з анімацією */}
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.span
          className={styles.eyebrowLine}
          initial={{ width: 0 }}
          animate={isInView ? { width: 32 } : { width: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
        <h3 className={styles.heading}>Coding process and tools</h3>
      </motion.div>

      {/* Трек з картками */}
      <div className={styles.track}>
        <motion.div
          className={styles.inner}
          animate={{
            x: isInView && !isPaused ? [0, -2000] : 0,
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
          onHoverStart={() => setIsPaused(true)}
          onHoverEnd={() => setIsPaused(false)}
        >
          {/* 3 повтори для більшої кількості карток */}
          {[...techItems, ...techItems, ...techItems].map((tech, index) => (
            <TechCard
              key={`${tech.name}-${index}`}
              tech={tech}
              index={index % techItems.length}
              isInView={isInView}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ControllerSkills;