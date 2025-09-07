// components/LocationBadge.tsx

"use client";

import React, { useEffect, useRef, useState } from "react";
import lottie from "lottie-web";
import styles from "./Location.module.css";

export default function LocationBadge({ location }) {
  const animationRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!animationRef.current) return;

    const anim = lottie.loadAnimation({
      container: animationRef.current,
      renderer: "svg",
      loop: true,
      autoplay: false,
      path: "/animations/earth.json",
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          anim.play();
        } else {
          anim.pause();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(animationRef.current);

    return () => {
      observer.disconnect();
      anim.destroy();
    };
  }, []);

  return (
    <div className={styles.badge}>
      <div className={styles.icon} ref={animationRef} />
      <div className={styles.text}>{location}</div>
    </div>
  );
}
