import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TechIcon from "../TechIcon/TechIcon";
import s from "./ControllerSkills.module.css";

gsap.registerPlugin(ScrollTrigger);

const ControllerSkills = ({ items }) => {
  const trackRef = useRef(null);
  const animRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const animation = gsap.context(() => {
      // Infinite horizontal scroll animation
      animRef.current = gsap.to(trackRef.current, {
        x: "-50%",
        ease: "none",
        repeat: -1,
        duration: 30,
      });

      // Scroll-triggered animations
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 50,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => animation.revert();
  }, [items]);

  const handleMouseEnter = () => {
    if (animRef.current) animRef.current.pause();
    gsap.to(trackRef.current, { scale: 0.98, duration: 0.3 });
  };

  const handleMouseLeave = () => {
    if (animRef.current) animRef.current.resume();
    gsap.to(trackRef.current, { scale: 1, duration: 0.3 });
  };

  return (
    <motion.div
      ref={sectionRef}
      className={s.skills_container}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, margin: "0px 0px -100px 0px" }}
      transition={{ duration: 0.6 }}
    >
      <div className={s.skills_card}>
        <div className={s.section_header}>
          <h3 className={s.section_title}>
            <span className={s.title_highlight}>Tech</span> Stack
          </h3>
          <div className={s.section_subtitle}>
            Technologies I work with daily
          </div>
        </div>

        <div
          className={s.tech_scroller}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className={s.scroll_gradient_left} />
          <div className={s.scroll_gradient_right} />

          <div className={s.tech_track} ref={trackRef}>
            {[...items, ...items].map((item, index) => (
              <motion.div
                key={`${item.alt}-${index}`}
                className={s.tech_item}
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <TechIcon src={item.src} alt={item.alt} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ControllerSkills;
