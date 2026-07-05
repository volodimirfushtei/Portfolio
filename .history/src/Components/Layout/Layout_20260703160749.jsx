import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ScrollToTopBtn from "../ScrollToTopBtn/ScrollTotopBtn";
import Header from "../Header/Header";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef, useEffect, useState } from "react";
import gsap from "gsap";
import s from "./Layout.module.css";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const Layout = () => {
  const location = useLocation();
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const smootherRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Перевірка на touch пристрій
    const checkTouch = () => {
      setIsTouch(window.matchMedia("(hover: none)").matches);
    };
    
    checkTouch();
    window.addEventListener('resize', checkTouch);
    
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  useLayoutEffect(() => {
    // Якщо touch пристрій - не ініціалізуємо ScrollSmoother
    if (isTouch) return;

    // Переконуємося, що елементи існують
    const wrapper = document.querySelector("#smooth-wrapper");
    const content = document.querySelector("#smooth-content");

    if (!wrapper || !content) {
      console.warn("Smooth wrapper or content not found");
      return;
    }

    // Зупиняємо попередній smoother
    if (smootherRef.current) {
      smootherRef.current.kill();
    }

    const ctx = gsap.context(() => {
      smootherRef.current = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.2,
        effects: true,
        normalizeScroll: true,
        ignoreMobileResize: true,
      });
    }, wrapperRef);

    return () => {
      if (smootherRef.current) {
        smootherRef.current.kill();
        smootherRef.current = null;
      }
      ctx.revert();
    };
  }, [isTouch]);

  // Оновлення ScrollSmoother при зміні роуту
  useEffect(() => {
    if (smootherRef.current && !isTouch) {
      // Невелика затримка для оновлення контенту
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [location.pathname, isTouch]);

  // Якщо touch пристрій - рендеримо без ScrollSmoother
  if (isTouch) {
    return (
      <div className={s.layoutContainer}>
        <Header />
        <ScrollToTopBtn />
        <main className={s.mainContent}>
          <div className={s.touchWrapper}>
            <AnimatePresence mode="wait">
              <Outlet key={location.pathname} />
            </AnimatePresence>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={s.layoutContainer}>
      <Header />
      <ScrollToTopBtn />
      <main className={s.mainContent}>
        <div 
          ref={wrapperRef} 
          id="smooth-wrapper" 
          className={s.wrapper}
        >
          <div 
            ref={contentRef} 
            id="smooth-content" 
            className={s.content}
          >
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
