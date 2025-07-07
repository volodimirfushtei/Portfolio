import React, { useEffect, useRef } from "react";
import { Card, Row, Col } from "react-bootstrap";
import TechIcon from "../TechIcon/TechIcon";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import s from "./ControllerSkills.module.css";

gsap.registerPlugin(ScrollTrigger);

const ControllerSkills = ({ items }) => {
  const trackRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const animation = gsap.context(() => {
      animRef.current = gsap.to(trackRef.current, {
        x: "-50%",
        ease: "none",
        repeat: -1,
        duration: 30,
      });
    });

    return () => animation.revert();
  }, [items]);

  const handleMouseEnter = () => {
    if (animRef.current) animRef.current.pause();
  };

  const handleMouseLeave = () => {
    if (animRef.current) animRef.current.resume();
  };

  return (
    <Card
      className={s.skills_card}
      style={{
        background: "var(--color-background)",

        backdropFilter: "blur(10px)",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <Row gutter={[16, 16]} justify="center" align="middle">
        <Col span={24}>
          <h3 className={s.section_title}>Tech Stack</h3>
        </Col>

        <Col span={24}>
          <div
            className={s.tech_scroller}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className={s.tech_track} ref={trackRef}>
              {[...items, ...items].map((item, index) => (
                <div key={`${item.alt}-${index}`} className={s.tech_item}>
                  <TechIcon src={item.src} alt={item.alt} />
                </div>
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default ControllerSkills;
