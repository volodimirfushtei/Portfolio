import React, { useEffect, useRef } from "react";
import s from "./ControllerSkills.module.css";
import TechIcon from "../TechIcon/TechIcon";
import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const ControllerSkills = ({ items }) => {
  const trackRef = useRef(null);

  useEffect(() => {
    const animation = gsap.to(trackRef.current, {
      x: "-=100%",
      ease: "none",
      scrollTrigger: {
        trigger: trackRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        pin: true,
        markers: true,
      },
      duration: 20,
    });

    return () => animation.kill();
  }, [items]);

  return (
    <div className={s.tech_scroller}>
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
