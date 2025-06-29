import { Outlet } from "react-router-dom";

import ControllerMenu from "../ControllerMenu/ControllerMenu";
import Logo from "../Logo/Logo";

const Layout = () => {
  const items = [
    { src: "/icons/home.svg", alt: "Home", href: "/" },
    { src: "/icons/tech.svg", alt: "Tech", href: "/tech" },
    { src: "/icons/projects.svg", alt: "Projects", href: "/projects" },
    { src: "/icons/contacts.svg", alt: "Contacts", href: "/contacts" },
  ];
  return (
    <div className="flex flex-row mt-4 ">
      <div className="flex flex-col w-1/10 gap-53 items-center mt-2 ">
        <ControllerMenu items={items} key={items.alt} />
        <Logo />
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
