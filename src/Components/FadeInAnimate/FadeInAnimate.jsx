import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const FadeInAnimate = ({
  children,
  direction = "left", // left, right, top, bottom
  delay = 0.4,
  duration = 1.6,
  triggerOnce = false,
  threshold = 0.2,
  distance = 200,
}) => {
  const { ref, inView } = useInView({
    triggerOnce,
    threshold,
  });

  const variants = {
    hidden: {
      opacity: 0,
      x:
        direction === "left" ? -distance : direction === "right" ? distance : 0,
      y:
        direction === "top" ? -distance : direction === "bottom" ? distance : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94], // smooth cubic-bezier
      }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInAnimate;
