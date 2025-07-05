import React, { useEffect } from "react";
import {
  motion as Motion,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import s from "./ExperienceTable.module.css";

const Counter = ({ from = 0, to, duration = 2 }) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.floor(latest));

  useEffect(() => {
    const controls = animate(count, to, {
      duration,
      ease: "easeOut",
    });
    return controls.stop;
  }, [count, to, duration]);

  return <Motion.span className={s.counter}>{rounded}</Motion.span>;
};

const ExperienceTable = () => {
  return (
    <div className={s.experience_container}>
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0, y: 20 }}
        className={s.card}
      >
        <h3 className={s.card_title}>Experience</h3>
        <div className={s.table_container}>
          <table className={s.experience_table}>
            <tbody>
              <tr className={s.table_row}>
                <td className={s.label}>Years of Experience</td>
                <td className={s.value}>
                  <Counter to={1} duration={1.5} />
                </td>
              </tr>
              <tr className={s.table_row}>
                <td className={s.label}>Team Projects</td>
                <td className={s.value}>
                  <Counter to={2} duration={2} />
                </td>
              </tr>
              <tr className={s.table_row}>
                <td className={s.label}>Total Projects</td>
                <td className={s.value}>
                  <Counter to={5} duration={2.5} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Motion.div>
    </div>
  );
};

export default ExperienceTable;
