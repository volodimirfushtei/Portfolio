import React, { useEffect, useRef } from "react";
import s from "./ControllerSkills.module.css";
import TechIcon from "../TechIcon/TechIcon";
import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const ControllerSkills = ({ items }) => {
  const trackRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const animation = gsap.context(() => {
      animRef.current = gsap.to(trackRef.current, {
        x: "-50%",
        ease: "none",
        repeat: -1, // нескінченно
        duration: 30, // швидкість руху
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

  return (
    <div
      className={s.tech_scroller}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={s.tech} ref={trackRef}>
        {items.map((item) => (
          <div key={item.alt} className={s.tech_item}>
            <TechIcon src={item.src} alt={item.alt} />
          </div>
        ))}
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
