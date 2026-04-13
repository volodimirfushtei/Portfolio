import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";
import styles from "./ControllerSkills.module.css";
import { Sparkles } from "../Sparkles/Sparkles.jsx";
// Масив технологій
const techItems = [
  {
    name: "React",
    icon: "ri-reactjs-line",
    color: "#61dafb",
    description: "Library",
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
    description: "Language",
  },
  {
    name: "TypeScript",
    icon: "ri-typescript-line",
    color: "#3178c6",
    description: "Language",
  },
  {
    name: "Node.js",
    icon: "ri-nodejs-line",
    color: "#68a063",
    description: "Runtime",
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
    description: "Styling",
  },
  {
    name: "Git",
    icon: "ri-git-branch-line",
    color: "#f1502f",
    description: "VCS",
  },
  {
    name: "Docker",
    icon: "ri-docker-line",
    color: "#2496ed",
    description: "Container",
  },
  {
    name: "Figma",
    icon: "ri-pencil-ruler-line",
    color: "#a259ff",
    description: "Design",
  },
  {
    name: "VS Code",
    icon: "ri-code-line",
    color: "#007acc",
    description: "Editor",
  },
  {
    name: "Postman",
    icon: "ri-flask-line",
    color: "#ff6c37",
    description: "Testing",
  },
  {
    name: "AWS",
    icon: "ri-cloud-line",
    color: "#ff9900",
    description: "Cloud",
  },
  {
    name: "GraphQL",
    icon: "ri-graphql-line",
    color: "#e10098",
    description: "API",
  },
  {
    name: "Python",
    icon: "ri-python-line",
    color: "#3776ab",
    description: "Language",
  },
  {
    name: "Sass",
    icon: "ri-sass-line",
    color: "#cc6699",
    description: "Styling",
  },
];

// Компонент картки технології
const TechCard = ({ tech, index }) => {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 30, rotateX: 30 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.8,
        delay: (index % techItems.length) * 0.03,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{
        y: -8,
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
    >
      <div className={styles.glare} />
      <div className={styles.cardContent}>
        <i className={`${tech.icon} ${styles.icon}`} style={{ color: tech.color }} />
        <div className={styles.info}>
          <span className={styles.name}>{tech.name}</span>
          <span className={styles.desc}>{tech.description}</span>
        </div>
      </div>
    </motion.div>
  );
};

const ControllerSkills = ({ items }) => {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Перевірка на мобільний пристрій
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Використовуємо передані items або за замовчуванням techItems
  const skillsToUse = items && items.length > 0 ? items : techItems;

  // Створюємо масив для безкінечного скролу
  const marqueeItems = useMemo(() => {
    // На мобільних менше копій для кращої продуктивності
    const copies = isMobile ? 2 : 3;
    return [...Array(copies)].flatMap(() => [...skillsToUse]);
  }, [skillsToUse, isMobile]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      observer.disconnect();
    };
  }, []);

  const headerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  // Анімація для треку
  const trackAnimation = {
    animate: isInView && !isPaused ? {
      x: ["0%", isMobile ? "-50%" : "-33.333%"]
    } : {}
  };

  return (
    <section ref={sectionRef} className={styles.section}>
      <motion.div
        className={styles.header}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={headerVariants}
      >
        <span className={styles.eyebrowLine} />
        <h3 className={styles.heading}>Coding process and tools</h3>
      </motion.div>

      <div className={styles.track}>
        <motion.div
          className={styles.inner}
          {...trackAnimation}
          transition={{
            duration: isMobile ? 30 : 40,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear"
          }}
          onHoverStart={() => setIsPaused(true)}
          onHoverEnd={() => setIsPaused(false)}
        >
          {marqueeItems.map((tech, index) => (
            <TechCard
              key={`${tech.name}-${index}`}
              tech={tech}
              index={index}
            />
          ))}
        </motion.div>

      </div>
      <div className='absolute bottom-0 z-2 h-[400px] w-screen overflow-hidden mask-[radial-gradient(100%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#3273ff,transparent_90%)] before:opacity-40 after:absolute'>
        <Sparkles
          density={1800}
          speed={1.2}
          color='#48b6ff'
          direction='top'
          className='absolute inset-x-0 bottom-0 h-full w-full '
        />
      </div>
    </section>
  );
};

export default ControllerSkills;
