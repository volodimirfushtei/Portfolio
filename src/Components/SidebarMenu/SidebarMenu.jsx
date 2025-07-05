import React from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  sidebarClasses,
  menuClasses,
} from "react-pro-sidebar";
import { Link } from "react-router-dom";
const SidebarMenu = () => {
  return (
    <div>
      <Sidebar
        width="120px"
        border="none"
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: "var(--color-background)",
            color: "white",
            height: "100vh",
            border: "none",
          },
        }}
      >
        <img
          src="/images/logo_b.png"
          alt="logo"
          style={{
            width: "120px",
            height: "120px",
            marginBottom: "40px",
          }}
        />
        <Menu
          menuStyles={{
            [`.${menuClasses.container}`]: {
              backgroundColor: "var(--color-background)",

              color: "gray",
            },
          }}
        >
          <SubMenu label="Menu">
            <MenuItem
              component={<Link to="/" />}
              style={{
                fontWeight: "bold",
                fontSize: "1.4rem",
                color: "var(--color-text)",
              }}
            >
              <i className="ri-home-line"></i>
            </MenuItem>
            <MenuItem
              component={<Link to="/projects" />}
              style={{
                fontWeight: "bold",
                fontSize: "1.4rem",
                color: "var(--color-text)",
              }}
            >
              <i className="ri-code-s-slash-line"></i>
            </MenuItem>
            <MenuItem
              component={<Link to="/tech" />}
              style={{
                fontWeight: "bold",
                fontSize: "1.4rem",
                color: "var(--color-text)",
              }}
            >
              <i className="ri-stack-line"></i>
            </MenuItem>
            <MenuItem
              component={<Link to="/contacts" />}
              style={{
                fontWeight: "bold",
                fontSize: "1.4rem",
                color: "var(--color-text)",
              }}
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
              fontSize: "1rem",
              color: "var(--color-text)",
            }}
          >
            GOIT
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SidebarMenu;
