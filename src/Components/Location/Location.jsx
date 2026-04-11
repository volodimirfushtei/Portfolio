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
    <div
      className={styles.badge}
      aria-label={`Location: ${location}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="status"
    >
      {/* Pin */}
      <div className={styles.pinWrap} aria-hidden="true">
        <div className={styles.pin}>
          <div className={styles.pinInner} />
        </div>
        <div className={styles.ripple} />
        <div className={styles.ripple2} />
      </div>

      {/* Text */}
      <span className={styles.text}>{location}</span>

      {/* Tooltip */}
      {shouldShowTooltip && (
        <div className={styles.tooltip} role="tooltip">
          <span className={styles.tooltipDot} />
          <span>Current location</span>
        </div>
      )}
    </div>
  );
}