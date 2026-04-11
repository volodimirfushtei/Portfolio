import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import styles from "./Expertise.module.css";

import CardTech from "../CardTech/CardTech";
import ExperienceTable from "../ExperienceTable/ExperienceTable";
import LocationBadge from "../Location/Location";

const Expertise = () => {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* ── Parallax values (зменшуємо на мобільних) ── */
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "5%" : "10%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, isMobile ? 1.05 : 1.1]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "2%" : "5%"]);

  /* ── Stagger variants ── */
  const titleContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const titleLine = {
    hidden: { y: "110%" },
    visible: {
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const columnsVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.4 }
    }
  };

  return (
    <section ref={sectionRef} id="expertise" className={styles.expertise}>
      {/* ── Background elements ── */}
      <div className={styles.noise} aria-hidden="true" />

      <motion.div
        className={styles.background}
        style={{ y: bgY, scale: bgScale }}
        aria-hidden="true"
      />
      <div className={styles.overlay} aria-hidden="true" />

      {/* ── Corner section index ── */}
      <div className={styles.cornerBadge} aria-hidden="true">
        <span className={styles.cornerBadgeNum}>02</span>
        <span className={styles.cornerBadgeLabel}>Expertise</span>
      </div>

      {/* ── Main content ── */}
      <motion.div className={styles.inner} style={{ y: contentY }}>

        {/* Section header */}
        <header className={styles.header}>
          <motion.div
            className={styles.eyebrow}
            initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
            whileInView={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className={styles.eyebrowLine} />
            <span className={styles.eyebrowText}>Skills & Technologies · 2025</span>
            <span className={styles.eyebrowDot} />
          </motion.div>

          <motion.h2
            className={styles.title}
            variants={titleContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className={styles.titleLine}>
              <motion.span variants={titleLine} className={styles.titleAccent}>My</motion.span>
            </span>
            <span className={styles.titleLine}>
              <motion.span variants={titleLine} className={styles.titlePlain}>Expertise</motion.span>
            </span>
          </motion.h2>

          <motion.div
            className={styles.divider}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />

          <motion.div
            className={styles.locationWrap}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <LocationBadge location="Located in Ivano-Frankivsk" />
          </motion.div>
        </header>

        {/* Content columns */}
        <motion.div
          className={styles.columns}
          variants={columnsVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className={styles.cardCol}>
            <CardTech />
          </div>

          <div className={styles.tableCol}>
            <ExperienceTable />
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default Expertise;
