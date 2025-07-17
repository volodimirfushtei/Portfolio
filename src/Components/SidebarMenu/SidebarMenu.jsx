import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar, Menu, MenuItem, sidebarClasses } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import ToggleTheme from "../ToggleTheme/ToggleTheme";
import FullscreenButton from "../FullScreenButton/FullScreenButton";
import styles from "./SidebarMenu.module.css";

const SidebarMenu = ({ isOpen, onClose }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) onClose(); // Закрити, якщо користувач повернувся до мобільного режиму
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [onClose]);

  // Приховуємо сайдбар повністю, якщо це мобільний пристрій
  if (isMobile) return null;

  const menuItems = [
    { path: "/", icon: "ri-reactjs-line", label: "Home" },
    { path: "/projects", icon: "ri-code-box-line", label: "Projects" },
    { path: "/tech", icon: "ri-cpu-line", label: "Tech Stack" },
    { path: "/contacts", icon: "ri-chat-1-line", label: "Contacts" },
    {
      path: "https://github.com/volodimirfushtei ",
      icon: "ri-github-fill",
      label: "GitHub",
      external: true,
    },
  ];

  const handleItemClick = (path) => {
    if (onClose) onClose();
  };

  return (
    <>
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ type: "spring", damping: 25 }}
        className={styles.sidebarContainer}
      >
        <Sidebar
          width="200px"
          rootStyles={{
            [`.${sidebarClasses.container}`]: {
              background: "var(--color-sidebar)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              boxShadow: "var(--color-shadow)",
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              paddingTop: "5rem",
              paddingLeft: "1rem",
              paddingRight: "1rem",
              overflowX: "hidden",
              overflowY: "auto",
            },
            [`.${sidebarClasses.menuButton}`]: {
              padding: "0.75rem 1rem",
              margin: "0.25rem 0",
              borderRadius: "8px",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              "&:hover": {
                background: "var(--color-surface-hover)",
                transform: "translateX(4px)",
              },
              "&.ps-active": {
                background: "var(--color-accent)",
                color: "var(--color-button-text)",
                boxShadow: "0 4px 12px var(--color-accent)",
              },
              "& i": {
                fontSize: "1.2rem",
                marginRight: "0.75rem",
              },
            },
          }}
        >
          <div className={styles.header}>
            <motion.div
              className={styles.logoContainer}
              whileHover={{ scale: 1.05 }}
            >
              <img
                src="/images/Fush-Photoroom.png"
                alt="logo"
                className={styles.logo}
              />
            </motion.div>
          </div>

          <Menu className={styles.menu}>
            {menuItems.map((item) => (
              <MenuItem
                key={item.path}
                component={item.external ? null : <Link to={item.path} />}
                onClick={() => handleItemClick(item.path)}
                active={isOpen && item.path === window.location.pathname}
                className={styles.menuItem}
              >
                <i className={item.icon}></i>
                <span>{item.label}</span>
              </MenuItem>
            ))}
          </Menu>

          <div className={styles.footer}>
            <div className={styles.controls}>
              <ToggleTheme />
              <FullscreenButton />
            </div>
            <div className={styles.copyright}>
              &copy; {new Date().getFullYear()} Volodimir Fushtei
            </div>
          </div>
        </Sidebar>
      </motion.div>
    </>
  );
};

export default SidebarMenu;
