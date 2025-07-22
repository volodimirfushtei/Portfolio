// components/AnimatedPage/AnimatedPage.jsx
import { motion } from "framer-motion";

const animation = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50 },
  transition: { duration: 0.5, ease: "easeOut" },
};

const AnimatedPage = ({ children }) => {
  return (
    <motion.div
      initial={animation.initial}
      animate={animation.animate}
      exit={animation.exit}
      transition={animation.transition}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
