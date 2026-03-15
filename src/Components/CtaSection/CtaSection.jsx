import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import styles from "./CtaSection.module.css";

const listItems = [
  "Bespoke Development",
  "High Performance",
  "Editorial Interface",
  "Scalable Architecture",
];

const images = [
  "images/njeromin1.jpg",
  "images/njeromin2.jpg",
  "images/njeromin3.jpg",
  "images/sity.jpg",
  "images/scott_webb.jpg",
  "images/ryan_wilson_map.jpg",
  "images/pexels_steve.jpg",
  "images/yves.jpg",
  "images/my_photo.jpg",
];

// 4x for a dense, seamless marquee
const marqueeImages = [...images, ...images, ...images, ...images];

const CtaSection = () => {
  const sectionRef = useRef(null);
  const buttonRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  const isInView = useInView(sectionRef, {
    once: false,
    margin: "-100px",
  });

  // Responsive Check
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // GSAP Magnetic Effect
  const handleMouseMove = useCallback((e) => {
    if (isMobile || !buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    
    gsap.to(buttonRef.current, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.4,
      ease: "power2.out",
    });
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    if (isMobile || !buttonRef.current) return;
    
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
    });
  }, [isMobile]);

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section ref={sectionRef} className={styles.section}>
      {/* ── Visual Overlays ── */}
      <div className={styles.noise} aria-hidden="true" />
      <div className={styles.scanlines} aria-hidden="true" />
      
      {/* ── Marquee (Subtle Background) ── */}
      <div className={styles.marqueeWrap} aria-hidden="true">
        <motion.div
          className={styles.row}
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          {marqueeImages.map((src, i) => (
            <img key={`m1-${i}`} src={src} alt="" className={styles.image} loading="lazy" />
          ))}
        </motion.div>
        <motion.div
          className={styles.row}
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
        >
          {marqueeImages.map((src, i) => (
            <img key={`m2-${i}`} src={src} alt="" className={styles.image} loading="lazy" />
          ))}
        </motion.div>
        <div className={styles.marqueeOverlay} />
      </div>

      <div className={styles.container}>
        <motion.div
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Eyebrow */}
          <motion.div className={styles.eyebrow} variants={itemVariants}>
            <span className={styles.eyebrowLine} />
            <span className={styles.eyebrowText}>Ready to launch?</span>
          </motion.div>

          {/* Heading */}
          <motion.h2 className={styles.heading} variants={itemVariants}>
            Elevate your <span className={styles.headingAccent}>digital vision</span>
          </motion.h2>

          {/* Subheading */}
          <motion.p className={styles.subheading} variants={itemVariants}>
            Blending premium aesthetics with <span className={styles.highlight}>cutting-edge performance</span> for the modern web.
          </motion.p>

          {/* Magnetic Button */}
          <motion.div 
            className={styles.buttonWrapper} 
            variants={itemVariants}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <a
              href="https://webflow.com/templates/designers/brandbes"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.button}
              ref={buttonRef}
            >
              <span className={styles.buttonText}>Experience Excellence</span>
              <span className={styles.buttonArrow}>→</span>
            </a>
          </motion.div>

          {/* Quality Tags */}
          <motion.ul className={styles.list} variants={containerVariants}>
            {listItems.map((text) => (
              <motion.li key={text} className={styles.listItem} variants={itemVariants}>
                <i className="ri-checkbox-circle-line" />
                <span>{text}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
