import React from "react";
import { motion as Motion } from "framer-motion";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  sidebarClasses,
} from "react-pro-sidebar";
import { Link } from "react-router-dom";
import styles from "./SidebarMenu.module.css";
const SidebarMenu = ({ onClose, isMobile }) => {
  // Стилі для різних розмірів екрану
  const sidebarStyles = {
    desktop: {
      width: "150px",
      logoSize: { width: "150px", height: "130px" },
      iconSize: "1.8rem",
      fontSize: "1rem",
      padding: "0px",
    },
    tablet: {
      width: "100px",
      logoSize: { width: "100px", height: "100px" },
      iconSize: "1.6rem",
      fontSize: "0.9rem",
      padding: "15px",
    },
    mobile: {
      width: "100%",
      logoSize: { width: "100px", height: "100px" },
      iconSize: "1.4rem",
      fontSize: "0.8rem",
      padding: "10px",
    },
  };

  // Визначаємо поточний стиль на основі ширини екрану
  const getCurrentStyle = () => {
    if (isMobile) return sidebarStyles.mobile;
    if (window.innerWidth <= 768) return sidebarStyles.tablet;
    return sidebarStyles.desktop;
  };

  const currentStyle = getCurrentStyle();

  const buttonStyles = {
    color: "var(--color-text)",
    background: "transparent",
    border: "2px solid var(--color-border)",
    borderRadius: "4px",
    padding: "4px 8px",
    marginTop: "20px",
    cursor: "pointer",
  };

  const menuStyles = {
    backgroundColor: "var(--color-background)",
    color: "var(--color-text)",
    fontSize: currentStyle.fontSize,
    fontWeight: "bold",
    borderRight: "none",
    boxShadow: "none",
    border: "none",
  };

  return (
    <Motion.div
      initial={{ opacity: 0, x: isMobile ? "-100%" : 0 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      <Sidebar
        width={currentStyle.width}
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: "var(--color-background)",
            color: "var(--color-text)",
            height: "100vh",
            fontSize: currentStyle.fontSize,
            fontWeight: "bold",
            borderRight: "none",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.4)",
            border: "transparent",
            "& .ps-menu-button": {
              color: "var(--color-text)",
              cursor: "pointer",
              fontSize: currentStyle.fontSize,
              padding: isMobile ? "12px 8px" : "16px 12px",
            },
            "& .ps-menu-button:hover": {
              backgroundColor: "var(--color-surface-hover)",
            },
            "& .ps-menu-button i": {
              fontSize: currentStyle.iconSize,
              color: "var(--color-text)",
            },
            "& .ps-menu-button:hover i": {
              color: "var(--color-accent)",
            },
          },
        }}
      >
        <div style={{ paddingTop: currentStyle.padding }}>
          <img
            src="/images/Fush-Photoroom.png"
            alt="logo"
            style={{
              width: currentStyle.logoSize.width,
              height: currentStyle.logoSize.height,
              marginBottom: isMobile ? "20px" : "40px",
              backgroundColor: "var(--color-surface)",

              cursor: "pointer",
            }}
          />
        </div>

        <Menu style={menuStyles}>
          {!isMobile && (
            <SubMenu label="Menu" style={{ fontSize: currentStyle.fontSize }}>
              <MenuItem component={<Link to="/" />}>
                <i className="ri-home-line"></i> {!isMobile && "Home"}
              </MenuItem>
              <MenuItem component={<Link to="/projects" />}>
                <i className="ri-code-s-slash-line"></i>{" "}
                {!isMobile && "Projects"}
              </MenuItem>
              <MenuItem component={<Link to="/tech" />}>
                <i className="ri-stack-line"></i> {!isMobile && "Tech"}
              </MenuItem>
              <MenuItem component={<Link to="/contacts" />}>
                <i className="ri-mail-line"></i> {!isMobile && "Contacts"}
              </MenuItem>
            </SubMenu>
          )}

          {isMobile && (
            <>
              <MenuItem component={<Link to="/" />}>
                <i className="ri-home-line"></i> Home
              </MenuItem>
              <MenuItem component={<Link to="/projects" />}>
                <i className="ri-code-s-slash-line"></i> Projects
              </MenuItem>
              <MenuItem component={<Link to="/tech" />}>
                <i className="ri-stack-line"></i> Tech
              </MenuItem>
              <MenuItem component={<Link to="/contacts" />}>
                <i className="ri-mail-line"></i> Contacts
              </MenuItem>
            </>
          )}

          <MenuItem
            component={<Link to="https://github.com/volodimirfushtei" />}
          >
            <i className="ri-github-line"></i> {!isMobile && "GitHub"}
          </MenuItem>

          {!isMobile && (
            <MenuItem
              onClick={() =>
                window.open("/images/FUSHTEI_VOLODYMYR.pdf", "_blank")
              }
            >
              GOIT Certificate
            </MenuItem>
          )}
        </Menu>

        <div style={{ padding: currentStyle.padding }}>
          <button
            style={buttonStyles}
            onClick={() => {
              document.body.classList.toggle("light-theme");
            }}
          >
            Toggle Theme
          </button>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: currentStyle.padding,
            right: currentStyle.padding,
            fontSize: "0.8rem",
            color: "var(--color-text)",
            textAlign: "center",
          }}
        >
          &copy; {new Date().getFullYear()} Volodimir Fushtei
        </div>

        {isMobile && (
          <button onClick={onClose} className={styles.close_button}>
            <i className="ri-close-line"></i>
          </button>
        )}
      </Sidebar>
    </Motion.div>
  );
};

export default SidebarMenu;
