import { Outlet } from "react-router-dom";
import SidebarMenu from "../SidebarMenu/SidebarMenu.jsx";

import Overlay from "../Overlay/Overlay.jsx";
import React from "react";

const items = [
  {
    src: "/icons/home.svg",
    alt: "Home",
    href: "/",
  },
  {
    src: "/icons/contacts.svg",
    alt: "Contacts",
    href: "/contacts",
  },
  {
    src: "/icons/projects.svg",
    alt: "Projects",
    href: "/projects",
  },
  {
    src: "/icons/tech.svg",
    alt: "Tech Stack",
    href: "/tech",
  },
];
const Layout = () => {
  return (
    <div className="flex flex-row h-screen">
      <SidebarMenu items={items} />
      <Overlay />
      <Outlet />
    </div>
  );
};

export default Layout;
