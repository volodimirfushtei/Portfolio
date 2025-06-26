import React from "react";
import s from "./Loader.module.css";
const Loader = () => {
  return (
    <div className={s.loader_wrapper}>
      <div className={s.loader} />
      <p className={s.loader_text}>Loading...</p>
    </div>
  );
};

export default Loader;
