import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import styles from "./CircularText.module.css";

const CircularText = () => {
  const circleRef = useRef(null);

  useEffect(() => {
    const rotation = gsap.to(circleRef.current, {
      rotate: 360,
      duration: 12,
      repeat: -1,
      ease: "linear",
      transformOrigin: "50% 50%",
    });
    return () => rotation.kill();
  }, []);

  return (
    <div className={styles.wrap}>
      <svg
        ref={circleRef}
        viewBox="0 0 200 200"
        className={styles.svg}
        aria-hidden="true"
      >
        <path
          id="circlePath"
          d="M 100,100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
          fill="none"
        />
        <text fill="currentColor" className={styles.text}>
          <textPath href="#circlePath" startOffset="0%" textLength="470">
            • Creative Developer • Designer • Engineer •
          </textPath>
        </text>
      </svg>

      {/* Center dot */}
      <div className={styles.centerDot} aria-hidden="true" />
    </div>
  );
};

export default CircularText;
