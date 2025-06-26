import React, { useEffect, useRef } from "react";
import s from "./ControllerSkills.module.css";
import TechIcon from "../TechIcon/TechIcon";
import gsap from "gsap";

const ControllerSkills = ({ items }) => {
  const trackRef = useRef(null); // краще вказати ref замість класу

  useEffect(() => {
    const animation = gsap.to(trackRef.current, {
      x: "-60%",
      repeat: -1,
      duration: 20,
      ease: "linear",
    });

    animation.timeScale(1.5); // прискорення

    // Пауза при ховері
    const handleHover = () => {
      animation.pause();
    };

    const handleLeave = () => {
      animation.resume();
    };

    const container = trackRef.current;
    container.addEventListener("mouseenter", handleHover);
    container.addEventListener("mouseleave", handleLeave);

    return () => {
      animation.kill();
      container.removeEventListener("mouseenter", handleHover);
      container.removeEventListener("mouseleave", handleLeave);
    };
  }, [items]);

  return (
    <div className={s.tech_scroller}>
      <div className={s.tech} ref={trackRef}>
        {items.map((item) => (
          <div key={item.alt} className={s.tech_item}>
            <TechIcon src={item.src} alt={item.alt} />
          </div>
        ))}
        {/* Дублюємо для безперервного скролу */}
        {items.map((item) => (
          <div key={`dup-${item.alt}`} className={s.tech_item}>
            <TechIcon src={item.src} alt={item.alt} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ControllerSkills;
