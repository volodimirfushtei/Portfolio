import React, { useEffect } from "react";
import {
  motion as Motion,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { Card, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./ExperienceTable.module.css";
const Counter = ({ from = 0, to, duration = 2 }) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.floor(latest));

  useEffect(() => {
    const controls = animate(count, to, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => (count.current = latest),
      onComplete: () => (count.current = to),
      delay: 0.5,
    });
    return controls.stop;
  }, [count, to, duration]);

  return (
    <Motion.span
      className="d-block fs-2 fw-bold lh-1"
      style={{
        background:
          "linear-gradient(135deg, var(--bs-primary), var(--bs-info))",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        lineHeight: 1.2,
      }}
    >
      {rounded}
    </Motion.span>
  );
};

const ExperienceItem = ({
  label,
  value,
  duration,
  labelClassName = "",
  valueClassName = "",
}) => (
  <Col className="text-center">
    <div className={`mb-2 mb-md-0 ${valueClassName}`}>
      <Counter to={value} duration={duration} />
    </div>
    <div className={`small ${labelClassName}`}>{label}</div>
  </Col>
);

const ExperienceTable = () => {
  return (
    <Container className="my-2">
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="shadow-lg border-0 bg-transparent">
          <Card.Body className="p-2">
            <Card.Title className="text-center mb-2">
              <h3 className={`${styles.cardTitle} mb-0 font-medium`}>
                Professional Experience
              </h3>
            </Card.Title>

            <Row className="g-4 justify-content-center">
              <ExperienceItem
                label="Years"
                value={1}
                duration={1.5}
                labelClassName={styles.experienceLabel}
                valueClassName={styles.experienceValue}
              />
              <div className="vr d-none d-md-flex  " />
              <ExperienceItem
                label="Clients"
                value={3}
                duration={1.5}
                labelClassName={styles.experienceLabel}
                valueClassName={styles.experienceValue}
              />
              <div className="vr d-none d-md-flex" />
              <ExperienceItem
                label="Team Projects"
                value={3}
                duration={2}
                labelClassName={styles.experienceLabel}
                valueClassName={styles.experienceValue}
              />
              <div className="vr d-none d-md-flex" />
              <ExperienceItem
                label="Total Projects"
                value={5}
                duration={2.5}
                labelClassName={styles.experienceLabel}
                valueClassName={styles.experienceValue}
              />
            </Row>
          </Card.Body>
        </Card>
      </Motion.div>
    </Container>
  );
};

export default ExperienceTable;
