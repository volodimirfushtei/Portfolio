import React, { useEffect, useRef, useState } from "react";
import s from "./MenuIcon.module.css";
const MenuIcon = ({ src, alt }) => {
  const iconName = src.replace(/\.svg$/, "").replace("/icons/", "");
  const ref = useRef();
  const [visible, setVisible] = useState(false);

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
  }, []);
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      ref={ref}
      className={`${s.menuIcon} ${visible ? s.visible : ""}`}
      role="img"
      aria-label={alt}
    >
      <title>{alt}</title>
      <use href={`#icon-${iconName}`} />
    </svg>
  );
};

export default MenuIcon;
