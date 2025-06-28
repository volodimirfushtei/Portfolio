import React, { useRef } from "react";
import s from "./MenuIcon.module.css";
const MenuIcon = ({ src, alt }) => {
  const iconName = src.replace(/\.svg$/, "").replace("/icons/", "");
  const ref = useRef();

  return (
    <div className={s.container}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        ref={ref}
        className={s.menuIcon}
        role="img"
        aria-label={alt}
      >
        <title>{alt}</title>
        <use href={`#icon-${iconName}`} />
      </svg>
    </div>
  );
};

export default MenuIcon;
