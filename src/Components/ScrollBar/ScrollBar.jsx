import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import style from "./ScrollBar.module.css";

const ScrollBar = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  const scrollProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const pages = [
    { id: 1, bgColor: "bg-blue-100", title: "Welcome" },
    { id: 2, bgColor: "bg-green-100", title: "Services" },
    { id: 3, bgColor: "bg-yellow-100", title: "Portfolio" },
    { id: 4, bgColor: "bg-red-100", title: "Contact" },
  ];

  const scrollToSection = (index) => {
    const sectionHeight = window.innerHeight;
    containerRef.current.scrollTo({
      top: sectionHeight * index,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative h-screen w-full overflow-hidden flex">
      {/* Основний контент */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto snap-y snap-mandatory h-full no-scrollbar"
      >
        {pages.map((page) => (
          <section
            key={page.id}
            id={`section-${page.id}`}
            className={`h-screen w-full flex items-center justify-center snap-start ${page.bgColor}`}
          >
            <motion.h2
              className="text-5xl font-bold"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {page.title}
            </motion.h2>
          </section>
        ))}
      </div>

      {/* Кастомний скроллбар */}
      <div className="fixed right-0 top-0 h-full w-6 flex justify-center py-8">
        <div className="h-full w-1 bg-gray-200 rounded-full relative">
          {/* Індикатор прогресу */}
          <motion.div
            className="absolute top-0 left-0 w-full bg-blue-500 rounded-full"
            style={{
              scaleY: scrollProgress,
              transformOrigin: "top",
            }}
          />

          {/* Навігаційні точки */}
          <div className="absolute inset-0 flex flex-col justify-between items-center">
            {pages.map((_, index) => (
              <button
                key={index}
                className="w-3 h-3 rounded-full bg-white border-2 border-blue-500 focus:outline-none hover:scale-125 hover:bg-blue-500 transition-all"
                onClick={() => scrollToSection(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollBar;
