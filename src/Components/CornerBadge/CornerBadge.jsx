import { motion } from "framer-motion";
import styles from "./CornerBadge.module.css";

const CornerBadge = ({ number, label, delay = 0 }) => {
  return (
    <motion.div
      className={styles.cornerBadge}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      aria-hidden="true"
    >
      <span className={styles.cornerBadgeNum}>
        {String(number).padStart(2, "0")}
      </span>
      <span className={styles.cornerBadgeLabel}>{label}</span>
    </motion.div>
  );
};

export default CornerBadge;
