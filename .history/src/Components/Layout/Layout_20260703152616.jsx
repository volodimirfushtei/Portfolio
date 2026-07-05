import { Outlet } from "react-router-dom";

import { AnimatePresence } from "framer-motion";
import ScrollToTopBtn from "../ScrollToTopBtn/ScrollTotopBtn";
import Header from "../Header/Header";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";
import { useRef } from "react";
import gsap from "gsap";
import s from "./Layout.module.css";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);




const Layout = () => {

  const wrapperRef = useRef();
  const contentRef = useRef();

  const isTouch = matchMedia("(hover: none)").matches;

  if (isTouch) return;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const smoother = ScrollSmoother.create({
        wrapper: " #smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.2,
        effects: true,
      });
      return () => ctx.revert();
    });
  }, []);




  return (
    <div className={s.layoutContainer}>
      <Header />
      <ScrollToTopBtn />
      <main
        className={`${s.mainContent} `}

      >
        <div ref={wrapperRef} id="smooth-wrapper" className="wrapper overflow-hidden">
          <div ref={contentRef} id="smooth-content" className="content will-change-transform">
            <AnimatePresence mode="wait">

              <Outlet key={location.pathname} />
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
