import { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
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

// duplicated for seamless marquee
const marqueeImages = [...images, ...images, ...images];

const CtaSection = () => {
  const sectionRef = useRef(null);
  const [isHovered, setIsHovered] = useState({});
  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-100px",
    amount: 0.3,
  });

  // Варіанти анімації для заголовка
  const headingVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const headingWordVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  // Варіанти для підзаголовка
  const subVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.4,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  // Варіанти для кнопки
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.5,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    hover: {
      scale: 1.05,
      y: -2,
      transition: {
        duration: 0.3,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    tap: { scale: 0.98 },
  };

  // Варіанти для елементів списку
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  // Варіанти для маркі
  const marqueeVariants = {
    animate: (custom) => ({
      x: custom === 1 ? ["0%", "-50%"] : ["-50%", "0%"],
      transition: {
        x: {
          duration: custom === 1 ? 28 : 32,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
        },
      },
    }),
  };

  return (
    <section ref={sectionRef} className={styles.section}>
      {/* ───────── Marquee background ───────── */}
      <div className={styles.marqueeWrap} aria-hidden="true">
        <motion.div
          className={styles.row}
          variants={marqueeVariants}
          animate={isInView ? "animate" : ""}
          custom={1}
        >
          {marqueeImages.map((src, i) => (
            <img
              key={`row1-${i}`}
              src={src}
              alt=""
              loading="lazy"
              className={styles.image}
            />
          ))}
        </motion.div>

        <motion.div
          className={styles.row}
          variants={marqueeVariants}
          animate={isInView ? "animate" : ""}
          custom={2}
        >
          {marqueeImages.map((src, i) => (
            <img
              key={`row2-${i}`}
              src={src}
              alt=""
              loading="lazy"
              className={styles.image}
            />
          ))}
        </motion.div>

        <div className={styles.marqueeOverlay} />
      </div>

      {/* ───────── Content ───────── */}
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Eyebrow */}
          <motion.div
            className={styles.eyebrow}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <motion.span
              className={styles.eyebrowLine}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            />
            <span className={styles.eyebrowText}>Ready to start?</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            className={styles.heading}
            variants={headingVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.span variants={headingWordVariants}>
              Take Your Website
            </motion.span>
            <motion.span
              className={styles.headingAccent}
              variants={headingWordVariants}
            >
              {" "}
              to the Next Level
            </motion.span>
          </motion.h2>

          {/* Subheading */}
          <motion.p
            className={styles.subheading}
            variants={subVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            Premium templates designed for{" "}
            <span className={styles.highlight}>modern businesses</span>
          </motion.p>

          {/* CTA Button */}
          <motion.a
            href="https://webflow.com/templates/designers/brandbes"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.button}
            variants={buttonVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover="hover"
            whileTap="tap"
            onHoverStart={() => setIsHovered({ ...isHovered, button: true })}
            onHoverEnd={() => setIsHovered({ ...isHovered, button: false })}
          >
            <motion.span
              animate={{ x: isHovered.button ? 5 : 0 }}
              transition={{ duration: 0.2 }}
            >
              Purchase on Webflow
            </motion.span>
            <motion.span
              className={styles.buttonArrow}
              animate={{ x: isHovered.button ? 5 : 0 }}
              transition={{ duration: 0.2 }}
            >
              →
            </motion.span>
          </motion.a>

          {/* List */}
          <motion.ul
            className={styles.list}
            variants={listVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {listItems.map((text, i) => (
              <motion.li
                key={text}
                className={styles.listItem}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  x: 5,
                  transition: { duration: 0.2 },
                }}
                onHoverStart={() =>
                  setIsHovered({ ...isHovered, [`item-${i}`]: true })
                }
                onHoverEnd={() =>
                  setIsHovered({ ...isHovered, [`item-${i}`]: false })
                }
              >
                <motion.i
                  className="ri-checkbox-circle-line"
                  aria-hidden="true"
                  animate={{
                    rotate: isHovered[`item-${i}`] ? [0, -10, 10, 0] : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
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
