import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar, Menu, MenuItem, sidebarClasses } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import ToggleTheme from "../ToggleTheme/ToggleTheme";
import FullscreenButton from "../FullScreenButton/FullScreenButton";
import styles from "./SidebarMenu.module.css";

const SidebarMenu = ({ isOpen, onClose, isMobile }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { path: "/", icon: "ri-home-5-line", label: "Home" },
    { path: "/projects", icon: "ri-code-box-line", label: "Projects" },
    { path: "/tech", icon: "ri-cpu-line", label: "Tech Stack" },
    { path: "/contacts", icon: "ri-chat-1-line", label: "Contacts" },
    {
      path: "https://github.com/volodimirfushtei",
      icon: "ri-github-fill",
      label: "GitHub",
      external: true,
    },
  ];

  const handleItemClick = (path) => {
    setActiveItem(path);
    if (isMobile) onClose();
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(isOpen || !isMobile) && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25 }}
            className={`${styles.sidebarContainer} ${
              isMobile ? styles.mobile : ""
            }`}
          >
            <Sidebar
              width={isMobile ? "80px" : "200px"}
              rootStyles={{
                [`.${sidebarClasses.container}`]: {
                  background: "var(--color-sidebar)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",

                  boxShadow: "var(--color-shadow)",
                  height: "100vh",

                  display: "flex",
                  flexDirection: "column",
                  paddingTop: isMobile ? "0.5rem" : "5rem",
                  paddingLeft: isMobile ? "0.5rem" : "1rem",
                  paddingRight: isMobile ? "0.5rem" : "1rem",

                  overflowX: "hidden",
                  overflowY: "auto",
                },
                [`.${sidebarClasses.menuButton}`]: {
                  padding: isMobile ? "0.75rem 0" : "0.75rem 1rem",
                  margin: "0.25rem 0",
                  borderRadius: isMobile ? "12px" : "8px",
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
                    fontSize: isMobile ? "1.4rem" : "1.2rem",
                    marginRight: isMobile ? "0" : "0.75rem",
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
                    active={activeItem === item.path}
                    className={styles.menuItem}
                  >
                    <i className={item.icon}></i>
                    {!isMobile && <span>{item.label}</span>}
                  </MenuItem>
                ))}
              </Menu>

              <div className={styles.footer}>
                <div className={styles.controls}>
                  <ToggleTheme compact={isMobile} />
                  <FullscreenButton compact={isMobile} />
                </div>
                {!isMobile && (
                  <div className={styles.copyright}>
                    &copy; {new Date().getFullYear()} Volodimir Fushtei
                  </div>
                )}
              </div>
            </Sidebar>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SidebarMenu;
