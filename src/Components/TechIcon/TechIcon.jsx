// components/TechIcon.jsx
import React, { useEffect, useRef, useState } from "react";
import s from "./TechIcon.module.css";

const TechIcon = ({ src, alt }) => {
  const iconName = src.replace(/\.svg$/, "").replace("/icons/", "");
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Lazy show при скролі
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={s.container}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <svg
        ref={ref}
        alt={alt}
        width="32"
        height="32"
        viewBox="0 0 24 24"
        className={`${s.techIcon} ${visible ? s.visible : ""}`}
      >
        <use href={`#icon-${iconName}`} />
      </svg>

      {/* Tooltip */}
      {hovered && <span className={s.tooltip}>{alt}</span>}
    </div>
  );
};

export default TechIcon;
