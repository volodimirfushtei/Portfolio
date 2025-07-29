import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Carusel.module.css";

const slides = [
  {
    title: "UI/UX Design",
    description: "Creating intuitive and beautiful user interfaces",
    bgColor: "rgba(138, 99, 255, 0.1)",
    imageUrl: "/images/yves.jpg",
  },
  {
    title: "Phonebook",
    description: "Building responsive web applications",
    bgColor: "rgba(99, 179, 255, 0.1)",
    imageUrl: "/images/Phonebook.png",
  },
  {
    title: "Camper Travel",
    description: "Creating responsive web applications",
    bgColor: "rgba(255, 152, 0, 0.1)",
    imageUrl: "/images/Camper.png",
  },
];

const MyCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <div className={styles.carousel}>
      <div className={styles.slideContainer}>
        <AnimatePresence custom={direction} initial={false}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className={styles.slide}
            style={{
              backgroundColor: slides[currentIndex].bgColor,
              backgroundImage: `url(${slides[currentIndex].imageUrl})`,
            }}
          >
            <div className={styles.slideContent}>
              <h3>{slides[currentIndex].title}</h3>
              <p>{slides[currentIndex].description}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className={styles.arrows}>
        <button
          onClick={() => goToSlide(currentIndex - 1)}
          disabled={currentIndex === 0}
          aria-label="Previous slide"
          className={styles.button}
        >
          &lt;
        </button>
        <button
          onClick={() => goToSlide(currentIndex + 1)}
          disabled={currentIndex === slides.length - 1}
          aria-label="Next slide"
          className={styles.button}
        >
          &gt;
        </button>
      </div>

      <div className={styles.controls}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${
              currentIndex === index ? styles.active : ""
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MyCarousel;
