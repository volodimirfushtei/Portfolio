import React from "react";
import { motion } from "framer-motion";
import styles from "./Carusel.module.css";

const slides = [
  {
    title: "UI/UX Design",
    description: "Creating intuitive and beautiful user interfaces",
    bgColor: "rgba(138, 99, 255, 0.1)",
    imageUrl: "/images/yves.jpg",
  },
  {
    title: "Frontend Development",
    description: "Building responsive web applications",
    bgColor: "rgba(99, 179, 255, 0.1)",
    imageUrl:
      "https://img.freepik.com/premium-vector/programmer-working-with-laptop-computer_23-2147865009.jpg?w=2000",
  },
  {
    title: "Backend Solutions",
    description: "Developing robust server architectures",
    bgColor: "rgba(255, 152, 0, 0.1)",
    imageUrl: "/images/Camper.png",
  },
];

const MyCarousel = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  return (
    <div className={styles.carousel}>
      <div className={styles.slideContainer}>
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            className={styles.slide}
            initial={{ x: `${(index - currentIndex) * 100}%` }}
            exit={{ x: `${(index - currentIndex) * 100}%` }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: slide.bgColor,
              backgroundImage: `url(${slide.imageUrl})`,
              opacity: currentIndex === index ? 1 : 0,
              zIndex: currentIndex === index ? 1 : 0,
            }}
            animate={{
              x: `${(index - currentIndex) * 100}%`,
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3>{slide.title}</h3>
            <p>{slide.description}</p>
          </motion.div>
        ))}
      </div>

      <div className={styles.controls}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${
              currentIndex === index ? styles.active : ""
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MyCarousel;
