import { motion } from "framer-motion";
import { useOverlay } from "../OverlayProvider/OverlayProvider";

 const AnimatedPage = ({ children }) => {
  const { visible } = useOverlay();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={
        visible
          ? { opacity: 0, y: 50 }
          : { opacity: 1, y: 0 }
      }
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
};
