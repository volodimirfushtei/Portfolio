import React from "react";
import { motion } from "framer-motion";
import styles from "./CtaSection.module.css";

const listItems = [
  "Responsive Design",
  "No additional fees",
  "Easy customization",
  "24/7 Support",
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

// Add decorative shapes
const Shapes = () => (
  <>
    <motion.div
      className={styles.shapeCircle}
      animate={{
        y: [0, 15, 0],
        opacity: [0.8, 1, 0.8],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    <motion.div
      className={styles.shapeTriangle}
      animate={{
        rotate: [0, 360],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  </>
);

const CtaSection = () => {
  return (
    <section className={styles.section}>
      {/* Decorative background gradient */}
      <div className={styles.backgroundGradient}></div>

      <div className={styles.container}>
        <motion.div
          className={styles.wrapper}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.content}>
            <motion.h2 className={styles.heading} whileHover={{ scale: 1.01 }}>
              Take Your Website to the Next Level!
            </motion.h2>

            <motion.p className={styles.subheading}>
              Premium templates designed for{" "}
              <motion.span
                className={styles.highlightText}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                }}
              >
                modern businesses
              </motion.span>
            </motion.p>

            <motion.a
              href="https://webflow.com/templates/designers/brandbes"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.button}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 4px 12px rgba(58, 134, 255, 0.32)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              Purchase on Webflow
              <span className={styles.buttonArrow}>→</span>
            </motion.a>

            <ul className={styles.list}>
              {listItems.map((text, index) => (
                <motion.li
                  key={index}
                  className={styles.listItem}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  whileHover={{
                    scale: 1.05,
                  }}
                >
                  <div className={styles.iconWrapper}>
                    <i className={`ri-checkbox-circle-line ${styles.icon}`}></i>
                  </div>
                  <span>{text}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Marquee section with enhanced effects */}
          <div className={styles.marqueeWrapper}>
            <div className={styles.marquee}>
              <div className={styles.imageRowLeft}>
                {images.map((src, idx) => (
                  <motion.img
                    key={`left-${idx}`}
                    src={src}
                    alt=""
                    loading="lazy"
                    className={styles.image}
                    whileHover={{ scale: 1.03 }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                  />
                ))}
              </div>
              <div className={styles.imageRowRight}>
                {images.map((src, idx) => (
                  <motion.img
                    key={`right-${idx}`}
                    src={src}
                    alt=""
                    loading="lazy"
                    className={styles.image}
                    whileHover={{ scale: 1.03 }}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative floating shapes */}
      <Shapes />

      {/* Floating particles */}
      <div className={styles.particles}>
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={styles.particle}
            initial={{
              opacity: 0,
              y: Math.random() * 100,
              x: Math.random() * 100,
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              y: [0, Math.random() * 50 - 25],
              x: [0, Math.random() * 50 - 25],
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default CtaSection;
