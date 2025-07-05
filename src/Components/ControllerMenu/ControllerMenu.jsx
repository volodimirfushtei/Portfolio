import React from "react";
import s from "./ControllerMenu.module.css";
import MenuIcon from "../TechIcon/TechIcon";
import { useEffect, useRef } from "react";

import gsap from "gsap";
import { useNavigate } from "react-router-dom";

const ControllerMenu = ({ items }) => {
  const navigate = useNavigate();
  const trackRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const animation = gsap.context(() => {
      animRef.current = gsap.to(trackRef.current, {
        y: "-50%", // рух на половину ширини
        ease: "none",
        repeat: -1, // нескінченно
        duration: 40, // чим більше — тим повільніше
      });
    });

    return () => animation.revert();
  }, [items]);

  const handleMouseEnter = () => {
    if (animRef.current) {
      animRef.current.pause();
    }
  };

  const handleMouseLeave = () => {
    if (animRef.current) {
      animRef.current.resume();
    }
  };

  const handleClick = (href) => {
    navigate(href);
  };

  return (
    <div
      className={s.menu_scroller}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={s.menu} ref={trackRef}>
        {items.map((item) => (
          <div
            key={item.alt}
            className={s.menu_item}
            onClick={() => handleClick(item.href)}
          >
            <MenuIcon src={item.src} alt={item.alt} />
          </div>
        ))}
        {items.map((item) => (
          <div
            key={`dup-${item.alt}`}
            className={s.menu_item}
            onClick={() => handleClick(item.href)}
          >
            <MenuIcon src={item.src} alt={item.alt} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ControllerMenu;
