import React from "react";

import { useEffect } from "react";
import s from "./ExperienceTable.module.css";

import {
  motion as Motion,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";

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

  return <Motion.span>{rounded}</Motion.span>;
};

const ExperienceTable = () => {
  return (
    <div className={s.experience_container}>
      <table className={s.experience_table}>
        <tbody>
          <tr>
            <td>Experiense (years)</td>
            <td>
              <Counter to={1} />
            </td>
          </tr>
          <tr>
            <td>Command projects</td>
            <td>
              <Counter to={2} />
            </td>
          </tr>
          <tr>
            <td>Total projects</td>
            <td>
              <Counter to={5} className={s.counter} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ExperienceTable;
