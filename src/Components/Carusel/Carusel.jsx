import React from "react";
import { motion } from "framer-motion";
import Carousel from "react-material-ui-carousel";
import styles from "./Carusel.module.css";

const items = [
  {
    name: "React.js",
    description: "Building interactive UIs with modern React ecosystem",
    image:
      "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    color: "rgba(97, 218, 251, 0.15)",
  },
  {
    name: "Open Source",
    description: "Contributing to community-driven development",
    image:
      "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    color: "rgba(3, 169, 244, 0.15)",
  },
  {
    name: "Frontend Development",
    description: "Creating beautiful, responsive user experiences",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    color: "rgba(255, 152, 0, 0.15)",
  },
  {
    name: "Problem Solving",
    description: "Transforming complex ideas into elegant solutions",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    color: "rgba(156, 39, 176, 0.15)",
  },
  {
    name: "Fullstack Architecture",
    description: "Designing scalable application infrastructures",
    image: "https://cdn-icons-png.flaticon.com/512/1031/1031945.png",
    color: "rgba(76, 175, 80, 0.15)",
  },
];

const SlideItem = ({ item }) => {
  return (
    <motion.div
      className={styles.slide}
      style={{
        backgroundImage: `url(${item.image})`,
        backgroundColor: item.color,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
    >
      <div className={styles.slideContent}>
        <motion.h2
          className={styles.slideTitle}
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {item.name}
        </motion.h2>
        <motion.p
          className={styles.slideDescription}
          initial={{ y: 30 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {item.description}
        </motion.p>
      </div>
      <div className={styles.slideOverlay} />
    </motion.div>
  );
};

const MyCarousel = () => {
  return (
    <div className={styles.carouselContainer}>
      <Carousel
        autoPlay={true}
        interval={4000}
        animation="fade"
        animationDuration={800}
        indicators={true}
        navButtonsAlwaysVisible={true}
        fullHeightHover={false}
        NavButton={({ onClick, next }) => (
          <button
            onClick={onClick}
            className={`${styles.navButton} ${
              next ? styles.nextButton : styles.prevButton
            }`}
            aria-label={next ? "Next slide" : "Previous slide"}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d={next ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
        IndicatorIcon={<span className={styles.indicatorDot} />}
        activeIndicatorIconButtonProps={{
          className: styles.activeIndicator,
        }}
      >
        {items.map((item, index) => (
          <SlideItem key={index} item={item} />
        ))}
      </Carousel>
    </div>
  );
};

export default MyCarousel;
