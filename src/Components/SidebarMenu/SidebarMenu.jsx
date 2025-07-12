import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  sidebarClasses,
} from "react-pro-sidebar";
import { Link } from "react-router-dom";
import ToggleTheme from "../ToggleTheme/ToggleTheme";
import FullscreenButton from "../FullScreenButton/FullScreenButton";
import styles from "./SidebarMenu.module.css";

const SidebarMenu = ({ onClose, isMobile }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getSidebarStyle = () => {
    if (isMobile)
      return {
        width: "100%",
        logoSize: { width: "100px", height: "100px" },
        iconSize: "1.2rem",
        fontSize: "0.9rem",
        padding: "1rem",
      };
    if (windowWidth <= 768)
      return {
        width: "180px",
        logoSize: { width: "120px", height: "120px" },
        iconSize: "1.4rem",
        fontSize: "0.9rem",
        padding: "1rem",
      };
    return {
      width: "240px",
      logoSize: { width: "240px", height: "123px" },
      iconSize: "1.6rem",
      fontSize: "1rem",
      padding: "1.5rem",
    };
  };

  const currentStyle = getSidebarStyle();

  const sidebarVariants = {
    hidden: { opacity: 0, x: isMobile ? "-100%" : 0 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        when: "beforeChildren",
      },
    },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
      },
    }),
  };

  const menuItems = [
    { path: "/", icon: "ri-home-line", label: "Home" },
    { path: "/projects", icon: "ri-code-s-slash-line", label: "Projects" },
    { path: "/tech", icon: "ri-stack-line", label: "Tech Stack" },
    { path: "/contacts", icon: "ri-mail-line", label: "Contacts" },
    {
      path: "https://github.com/volodimirfushtei",
      icon: "ri-github-line",
      label: "GitHub",
      external: true,
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
      className={styles.sidebarWrapper}
    >
      <Sidebar
        width={currentStyle.width}
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: "var(--color-surface)",
            color: "var(--color-text)",
            height: "88vh",
            display: "flex",
            flexDirection: "column",
            borderRight: "1px solid var(--color-border)",
            position: "relative",
            "& .ps-menu-button": {
              color: "var(--color-text)",
              cursor: "pointer",
              fontSize: currentStyle.fontSize,
              padding: "0.75rem 1rem",
              margin: "0.25rem 0",
              borderRadius: "8px",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "var(--color-surface-hover)",
                color: "var(--color-accent)",
                transform: "translateX(4px)",
              },
              "&.ps-active": {
                backgroundColor: "var(--color-accent)",
                color: "var(--color-button-text)",
              },
              "& i": {
                fontSize: currentStyle.iconSize,
                marginRight: "0.75rem",
                transition: "color 0.2s ease",
              },
            },
            "& .ps-submenu-content": {
              backgroundColor: "var(--color-surface-2)",
            },
          },
        }}
      >
        <div className={styles.logoContainer}>
          <motion.img
            src="/images/Fush-Photoroom.png"
            alt="logo"
            className={styles.logo}
            style={currentStyle.logoSize}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          />
        </div>

        <Menu className={styles.menuContainer}>
          {!isMobile && (
            <SubMenu
              label="Menu"
              className={styles.subMenu}
              prefix={<i className="ri-menu-line"></i>}
            >
              {menuItems.map((item, i) => (
                <MenuItem
                  key={item.path}
                  component={item.external ? null : <Link to={item.path} />}
                  onClick={
                    item.external
                      ? () => window.open(item.path, "_blank")
                      : null
                  }
                  custom={i}
                  variants={menuItemVariants}
                >
                  <i className={item.icon}></i>
                  <span>{item.label}</span>
                </MenuItem>
              ))}
            </SubMenu>
          )}

          {isMobile &&
            menuItems.map((item, i) => (
              <MenuItem
                key={item.path}
                component={item.external ? null : <Link to={item.path} />}
                onClick={
                  item.external ? () => window.open(item.path, "_blank") : null
                }
                custom={i}
                variants={menuItemVariants}
              >
                <i className={item.icon}></i>
                <span>{item.label}</span>
              </MenuItem>
            ))}

          {!isMobile && (
            <MenuItem
              onClick={() =>
                window.open("/images/FUSHTEI_VOLODYMYR.pdf", "_blank")
              }
              className={styles.certificateItem}
            >
              <i className="ri-certificate-line"></i>
              <span>GOIT Certificate</span>
            </MenuItem>
          )}
        </Menu>

        <div className={styles.controlsContainer}>
          <motion.div
            className={styles.controlItem}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ToggleTheme />
          </motion.div>
          <motion.div
            className={styles.controlItem}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FullscreenButton />
          </motion.div>
        </div>

        <motion.div
          className={styles.footer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          &copy; {new Date().getFullYear()} Volodimir Fushtei
        </motion.div>

        {isMobile && (
          <motion.button
            onClick={onClose}
            className={styles.closeButton}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <i className="ri-close-line"></i>
          </motion.button>
        )}
      </Sidebar>
    </motion.div>
  );
};

export default SidebarMenu;
