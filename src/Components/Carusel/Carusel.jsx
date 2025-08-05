import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./Carusel.module.css";

const ModernCarousel = () => {
  const carouselRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: carouselRef,
    offset: ["start start", "end end"],
  });

  // Загальні анімації
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.03]);
  const xText = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 5]);

  const slides = [
    {
      title: "UI/UX Design",
      descriptions: [
        "User research & wireframing",
        "Interactive prototypes",
        "Usability testing",
        "Design systems",
      ],
      bgColor: "linear-gradient(135deg, #8a63ff 0%, #6a3dff 100%)",
      image: "/images/design.jpg",
    },
    {
      title: "Web Development",
      descriptions: [
        "Front-end development",
        "Back-end development",
        "Mobile app development",
        "E-commerce platforms",
      ],
      bgColor: "linear-gradient(135deg, #ff8a63 0%, #ff6a3d 100%)",
      image: "/images/development.jpg",
    },
    {
      title: "Digital Marketing",
      descriptions: [
        "Social media marketing",
        "Search engine optimization",
        "Pay-per-click advertising",
        "Email marketing",
      ],
      bgColor: "linear-gradient(135deg, #63ff8a 0%, #3dff6a 100%)",
      image: "/images/marketing.jpg",
    },
    // ... інші слайди
  ];

  return (
    <section
      ref={carouselRef}
      className={styles.carouselContainer}
      style={{ opacity }}
    >
      <div className={styles.stickyContainer}>
        {slides.map((slide, index) => {
          // Розраховуємо прогресс для кожного слайда
          const start = index / slides.length;
          const end = (index + 1) / slides.length;

          const slideOpacity = useTransform(
            scrollYProgress,
            [start, start + 0.1, end - 0.1, end],
            [0, 1, 1, 0]
          );

          return (
            <motion.div
              key={index}
              className={styles.slide}
              style={{
                background: slide.bgColor,
                scale,
                backgroundImage: `url(${slide.image})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundBlendMode: "overlay",
                y: yBg,
                opacity: slideOpacity,
              }}
            >
              <div className={styles.contentWrapper}>
                <motion.h3
                  className={styles.title}
                  style={{
                    x: xText,
                    rotateX,
                    textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                  }}
                >
                  {slide.title}
                </motion.h3>

                <motion.div className={styles.descriptionsContainer}>
                  {slide.descriptions.map((desc, i) => (
                    <motion.div
                      key={i}
                      className={styles.descriptionCard}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-20% 0px" }}
                      transition={{
                        delay: i * 0.15,
                        duration: 0.6,
                        type: "spring",
                        damping: 10,
                      }}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                      }}
                    >
                      <span>{desc}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default ModernCarousel;
