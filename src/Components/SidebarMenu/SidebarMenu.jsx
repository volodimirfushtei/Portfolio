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

const buttonStyles = {
  color: "var(--color-text)",
  background: "transparent",
  border: "1px solid var(--color-border)",
  borderRadius: "4px",
  padding: "4px 8px",
  marginTop: "20px",
  cursor: "pointer",
};

const menuStyles = {
  backgroundColor: "var(--color-background)",
  color: "var(--color-text)",
  fontSize: "1.2rem",
  fontWeight: "bold",
  borderRight: "none", // <-- це
  boxShadow: "none",
  border: "none",
};

const SidebarMenu = ({ onClose }) => {
  return (
    <Motion.div
      initial={{ opacity: 0, x: "-100%" }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 3,
        ease: "easeInOut",
      }}
    >
      <Sidebar
        width="120px"
        border="none"
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: "var(--color-background)",
            color: "var(--color-text)",
            height: "100vh",
            fontWeight: "bold",
            borderRight: "none",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.4)",

            border: "transparent",
            "& .ps-menu-button": {
              color: "var(--color-text)",
              cursor: "pointer",
            },
            "& .ps-menu-button:hover": {
              backgroundColor: "var(--color-surface-hover)",
            },
            "& .ps-menu-button i": {
              fontSize: "1.6rem",
              color: "var(--color-text)",
            },
            "& .ps-menu-button:hover i": {
              color: "var(--color-accent)",
            },
          },
        }}
      >
        <div style={{ paddingTop: "5px" }}>
          <img
            src="/images/Fush-Photoroom.png"
            alt="logo"
            style={{
              width: "120px",
              height: "120px",
              marginBottom: "40px",
              backgroundColor: "var(--color-surface)",
            }}
          />
        </div>
        <Menu style={menuStyles}>
          <SubMenu label="Menu">
            <MenuItem
              component={<Link to="/" />}
              className="font-bold text-[1.4rem] text-[var(--color-text)] bg-[var(--color-surface)]  transition-colors duration-300"
            >
              <i className="ri-home-line"></i>
            </MenuItem>
            <MenuItem
              component={<Link to="/projects" />}
              className="font-bold text-[1.4rem] text-[var(--color-text)] bg-[var(--color-surface)]  transition-colors duration-300"
            >
              <i className="ri-code-s-slash-line"></i>
            </MenuItem>
            <MenuItem
              component={<Link to="/tech" />}
              className="font-bold text-[1.4rem] text-[var(--color-text)] bg-[var(--color-surface)]  transition-colors duration-300"
            >
              <i className="ri-stack-line"></i>
            </MenuItem>
            <MenuItem
              component={<Link to="/contacts" />}
              className="font-bold text-[1.4rem] text-[var(--color-text)] bg-[var(--color-surface)] transition-colors duration-300"
            >
              <i className="ri-mail-line"></i>
            </MenuItem>
          </SubMenu>
          <MenuItem
            component={<Link to="https://github.com/volodimirfushtei" />}
            style={{
              fontWeight: "bold",
              fontSize: "1.6rem",
              color: "var(--color-text)",
            }}
          >
            <i className="ri-github-line p-0"></i>
          </MenuItem>
          <MenuItem
            style={{
              fontWeight: "bold",
              fontSize: "1.2rem",
              color: "var(--color-text)",
            }}
          >
            GOIT
          </MenuItem>
        </Menu>

        <button
          style={buttonStyles}
          onClick={() => {
            document.body.classList.toggle("light-theme");
          }}
        >
          Tog Theme
        </button>
        <div
          style={{
            position: "absolute",
            bottom: "20px",

            fontSize: "0.8rem",
            color: "var(--color-text)",
          }}
        >
          &copy; 2025 Volodimir Fushtei
        </div>
        {onClose && (
          <button onClick={onClose} className="md:hidden">
            {/* Close icon */}
          </button>
        )}
      </Sidebar>
    </Motion.div>
  );
};

export default SidebarMenu;
