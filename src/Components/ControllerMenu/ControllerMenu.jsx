import React from "react";
import s from "./ControllerMenu.module.css";
import MenuIcon from "../TechIcon/TechIcon";

import { useNavigate } from "react-router-dom";
const ControllerMenu = ({ items }) => {
  // краще вказати ref замість класу
  const navigate = useNavigate();

  const handleClick = (href) => {
    navigate(href);
  };
  return (
    <div className={s.menu_scroller}>
      <div className={s.menu}>
        {items.map((item) => (
          <div
            key={item.alt}
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
