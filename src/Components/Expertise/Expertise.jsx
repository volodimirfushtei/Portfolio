import { motion, transform, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import styles from "./Expertise.module.css";
import CardTech from "../CardTech/CardTech";
import ExperienceTable from "../ExperienceTable/ExperienceTable";
import LocationBadge from "../Location/Location";
import { useSpring } from "framer-motion";
const Expertise = () => {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.3,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 0.77, 0.47, 0.97],
      },
    },
  };

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Enhanced scroll-based animations
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const rawScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const scale = useSpring(rawScale, { stiffness: 100, damping: 30, mass: 0.5 });

  const scrollY = useSpring(
    useTransform(scrollYProgress, [0, 1], ["0%", "15%"]),
    { stiffness: 100, damping: 30 }
  );

  const scaleBox = useSpring(useTransform(scrollYProgress, [0, 1], [1, 1.05]), {
    stiffness: 150,
    damping: 20,
  });

  const rotateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 3]), {
    stiffness: 100,
    damping: 20,
  });

  const rotateY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 2]), {
    stiffness: 100,
    damping: 20,
  });

  const opacity = useTransform(scrollYProgress, [0.6, 0.9], [1, 0.7]);
  const blur = useTransform(scrollYProgress, [0.7, 1], ["0px", "2px"]);
  const hueRotate = useTransform(scrollYProgress, [0, 1], ["0deg", "5deg"]);

  // Glow effect for cards
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 0.1]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section id="expertise" className={`${styles.expertise} `} ref={ref}>
      {/* Background with enhanced effects */}
      <motion.div
        className={`${styles.background} `}
        style={{
          scale,
          y: yBg,
          opacity,
          filter: blur,
          rotate: hueRotate,
        }}
      />
      {/* Glow effect */}
      <motion.div
        className={styles.glow}
        style={{
          opacity: glowOpacity,
          scale: glowScale,
        }}
      />
      <motion.div
        className={`${styles.container} `}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <motion.div variants={itemVariants} className="absolute top-2 left-2">
          <LocationBadge location="Located in Ivano-Frankivsk" />
        </motion.div>
        {/* Tech Card with enhanced effects */}
        <motion.div
          className={styles.section}
          variants={itemVariants}
          style={{
            y: scrollY,
            opacity,
            scale: scaleBox,
            rotateX,
            rotateY,
          }}
          whileHover={{
            y: -10,
            transition: { duration: 0.3, ease: "easeOut" },
          }}
        >
          <CardTech />
        </motion.div>

        {/* Experience Table with enhanced effects */}
        <motion.div
          className={styles.section}
          variants={itemVariants}
          style={{
            y: scrollY,
            opacity,
            scale: scaleBox,
            rotateX,
          }}
          whileHover={{
            y: -10,
            transition: { duration: 0.3, ease: "easeOut" },
          }}
        >
          <ExperienceTable />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Expertise;
