import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import styles from "./Expertise.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CardTech from "../CardTech/CardTech";
import ExperienceTable from "../ExperienceTable/ExperienceTable";
import LocationBadge from "../Location/Location";

gsap.registerPlugin(ScrollTrigger);

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

  useEffect(() => {
    const ctx = gsap.context(() => {

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        }
      });

      // BACKGROUND subtle reveal
      tl.fromTo(
        `.${styles.background}`,
        { opacity: 0, scale: 1.05 },
        { opacity: 0.5, scale: 1, duration: 1.2, ease: "power3.out" },
        0
      );

      // HEADER (Apple keynote feel)
      tl.fromTo(
        `.${styles.eyebrow}`,
        { opacity: 0, y: 20, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 },
        0.1
      );

      tl.fromTo(
        `.${styles.titleLine}`,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.08,
          ease: "power4.out",
        },
        0.2
      );

      tl.fromTo(
        `.${styles.divider}`,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.8, ease: "power3.out" },
        0.4
      );

      tl.fromTo(
        `.${styles.locationWrap}`,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.8 },
        0.5
      );

      // LEFT + RIGHT COLUMN SPLIT REVEAL
      tl.fromTo(
        `.${styles.cardCol}`,
        { opacity: 0, x: -40, scale: 0.98 },
        { opacity: 1, x: 0, scale: 1, duration: 1, ease: "power3.out" },
        0.6
      );

      tl.fromTo(
        `.${styles.tableCol}`,
        { opacity: 0, x: 40, scale: 0.98 },
        { opacity: 1, x: 0, scale: 1, duration: 1, ease: "power3.out" },
        0.6
      );

      // CORNER BADGE (subtle float-in)
      tl.fromTo(
        `.${styles.cornerBadge}`,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1 },
        0.3
      );

      // PARALLAX SCROLL FEEL (Apple-like depth)
      gsap.to(sectionRef.current, {
        backgroundPosition: "50% 20%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);


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
        aria-hidden="true"
      />

      {/* ── Corner section index ── */}
      <div className={styles.cornerBadge} aria-hidden="true">
        <span className={styles.cornerBadgeNum}>02</span>
        <span className={styles.cornerBadgeLabel}>Expertise</span>
      </div>

      {/* ── Main content ── */}
      <motion.div className={styles.inner} >

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
