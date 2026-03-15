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
  {
    name: "AWS",
    icon: "ri-cloud-line",
    color: "#ff9900",
    description: "Cloud services",
  },
  {
    name: "GraphQL",
    icon: "ri-graphql-line",
    color: "#e10098",
    description: "API query language",
  },
  {
    name: "Python",
    icon: "ri-python-line",
    color: "#3776ab",
    description: "Programming language",
  },
  {
    name: "Sass",
    icon: "ri-sass-line",
    color: "#cc6699",
    description: "CSS preprocessor",
  },
];

// Компонент окремої картки
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

  // Створюємо подвійний масив для нескінченної каруселі
  const duplicatedItems = [
    ...techItems,
    ...techItems,
    ...techItems,
    ...techItems,
  ];

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
          {duplicatedItems.map((tech, index) => (
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
