import { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import styles from "./ControllerSkills.module.css";

// Масив технологій
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
    name: "TypeScript",
    icon: "ri-typescript-line",
    color: "#3178c6",
    description: "Typed JavaScript",
  },
  {
    name: "Node.js",
    icon: "ri-nodejs-line",
    color: "#68a063",
    description: "Server runtime",
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
    name: "Figma",
    icon: "ri-pencil-ruler-line",
    color: "#a259ff",
    description: "Design tool",
  },
  {
    name: "VS Code",
    icon: "ri-code-line",
    color: "#007acc",
    description: "Code editor",
  },
  {
    name: "Postman",
    icon: "ri-flask-line",
    color: "#ff6c37",
    description: "API testing",
  },
];

// Компонент окремої картки
const TechCard = ({ tech, index, isInView }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 50, rotateY: -30 }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              rotateY: 0,
              transition: {
                duration: 0.6,
                delay: index * 0.05,
                ease: [0.76, 0, 0.24, 1],
              },
            }
          : { opacity: 0, y: 50, rotateY: -30 }
      }
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className={styles.cardInner}
        animate={{ rotateY: isHovered ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
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
  const trackRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const controls = useAnimation();

  // Відстеження видимості секції
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          controls.start("visible");
        }
      },
      { threshold: 0.2, rootMargin: "0px" },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [controls]);

  // Варіанти анімації для заголовка
  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  // Варіанти анімації для треку
  const trackVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <section ref={sectionRef} className={styles.section}>
      {/* Заголовок */}
      <motion.div
        className={styles.header}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={headerVariants}
      >
        <motion.span
          className={styles.eyebrowLine}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
        />
        <motion.h3 className={styles.heading} variants={headerVariants}>
          Coding process and tools
        </motion.h3>
      </motion.div>

      {/* Трек з картками */}
      <motion.div
        ref={trackRef}
        className={styles.track}
        variants={trackVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div
          className={styles.inner}
          animate={{
            x: isInView ? [0, -50, -100, -150, -200] : 0,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
        >
          {/* Дублюємо масив для нескінченної каруселі */}
          {[...techItems, ...techItems].map((tech, index) => (
            <TechCard
              key={`${tech.name}-${index}`}
              tech={tech}
              index={index}
              isInView={isInView}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ControllerSkills;
