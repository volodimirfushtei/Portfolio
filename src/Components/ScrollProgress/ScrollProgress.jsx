import React from "react";
import { motion, useScroll } from "framer-motion";
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <motion.div
        id="scroll-indicator "
        style={{
          scaleX: scrollYProgress,
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
          originX: 0,
          backgroundColor: "var(--color-info)",
        }}
      ></motion.div>
    </>
  );
};

export default ScrollProgress;
