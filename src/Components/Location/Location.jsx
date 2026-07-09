import { useState, useEffect } from "react";
import styles from "./Location.module.css";

export default function LocationBadge({
  location = "Ukraine, Ivano-Frankivsk",
  showTooltip = true,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // На мобільних не показуємо тултіп
  const shouldShowTooltip = showTooltip && isHovered && !isMobile;

  return (
    <div className={styles.location}>

    <div className={styles.status}>
        <span className={styles.dot}/>
        <span>Available</span>
    </div>

    <div className={styles.info}>
        <span className={styles.city}>
            Ivano-Frankivsk
        </span>

        <span className={styles.country}>
            Ukraine
        </span>
    </div>

</div>
  );
}