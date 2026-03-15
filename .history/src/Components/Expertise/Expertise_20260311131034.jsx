import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import styles from "./Expertise.module.css";

import CardTech from "../CardTech/CardTech";
import ExperienceTable from "../ExperienceTable/ExperienceTable";
import LocationBadge from "../Location/Location";
import Expertise from "./../../../.history/src/Components/Expertise/Expertise_20260311023825";

const Expertise = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  /* ── Scroll motion ── */
  const bgY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "18%"]), {
    stiffness: 80,
    damping: 30,
  });

  const contentY = useSpring(
    useTransform(scrollYProgress, [0, 1], ["0%", "10%"]),
    { stiffness: 120, damping: 26 },
  );

  const opacity = useTransform(scrollYProgress, [0.7, 1], [1, 0.85]);

  return (
    <section ref={sectionRef} id="expertise" className={styles.expertise}>
      {/* Corner badge (z-index: 100) */}
      <div className={styles.cornerBadge} aria-hidden="true">
        <span className={styles.cornerBadgeNum}>02</span>
        <span className={styles.cornerBadgeLabel}>Expertise</span>
      </div>

      {/* Background */}
      <motion.div className={styles.background} style={{ y: bgY, opacity }} />

      <motion.div
        className={styles.container}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-120px" }}
      >
        {/* Location */}
        <motion.div
          className={styles.locationBadge}
          style={{ y: contentY }}
          whileHover={{ scale: 1.04 }}
        >
          <LocationBadge location="Located in Ivano-Frankivsk" />
        </motion.div>

        {/* Tech card */}
        <motion.div
          className={styles.section}
          style={{ y: contentY }}
          whileHover={{ scale: 1.03 }}
        >
          <CardTech />
        </motion.div>

        {/* Experience */}
        <motion.div style={{ y: contentY }} whileHover={{ scale: 1.03 }}>
          <ExperienceTable />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Expertise;
