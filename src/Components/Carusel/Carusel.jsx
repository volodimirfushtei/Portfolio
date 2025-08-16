"use client";

import React, { useRef, useMemo } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import SoftSkills from "../SoftSkills/SoftSkills";

export default function Carousel() {
  const containerRef = useRef(null);

  // Дані слайдів
  const slides = useMemo(
    () => [
      {
        id: 1,
        image: "/images/business.jpg",
        title: "Frontend Development",
        subtitle: "Building responsive UIs with React & Next.js",
        color: "from-primary/40 to-secondary/70",
        icon: "💻",
      },
      {
        id: 2,
        image: "/images/happyt.jpg",
        title: "Backend Integration",
        subtitle: "Creating seamless API connections",
        color: "from-secondary/40 to-primary/70",
        icon: "🔌",
      },
      {
        id: 3,
        image: "/images/managmant.jpg",
        title: "Performance Optimization",
        subtitle: "Fast, efficient web applications",
        color: "from-primary/40 via-secondary/60 to-transparent",
        icon: "⚡",
      },
      {
        id: 4,
        image: "/images/business.jpg",
        title: "User Experience",
        subtitle: "Intuitive and accessible interfaces",
        color: "from-secondary/40 to-primary/60",
        icon: "✨",
      },
    ],
    []
  );

  const { scrollYProgress } = useScroll({ container: containerRef });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 30,
    restDelta: 0.001,
  });

  const Slide = React.memo(({ image, title, subtitle, color, icon }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end start"],
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1, 0.7]);
    const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

    return (
      <section
        ref={ref}
        className="relative h-[700px] w-full snap-start overflow-hidden"
      >
        {/* Фонове зображення */}
        <motion.div className="absolute inset-0" style={{ scale }}>
          <motion.img
            src={image}
            alt={title}
            className="h-full w-full object-cover"
            style={{ opacity }}
            loading="lazy"
          />
        </motion.div>

        {/* Градієнтний оверлей у тон бренду */}
        <div
          className={`absolute inset-0 bg-gradient-to-b ${color} mix-blend-multiply`}
        />

        {/* Контент */}
        <div className="container h-full flex items-center justify-center">
          <motion.div
            className="max-w-2xl text-white text-center"
            style={{ y }}
          >
            {/* Іконка */}
            <motion.div
              className="text-4xl mb-8 inline-block"
              initial={{ opacity: 0, y: -50 }}
              animate={{
                rotate: [0, 10, -10, 0],
                y: [0, -8, 0],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              {icon}
            </motion.div>

            {/* Заголовок */}
            <motion.div
              className="text-5xl md:text-6xl font-bold mb-4 leading-tight"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="inline-block bg-blue/10 p-3 rounded-button backdrop-blur-sm">
                {title}
              </div>
            </motion.div>

            {/* Підзаголовок */}
            <motion.p
              className="text-xl md:text-2xl font-light opacity-90 bg-yellow/10 p-3 rounded-button backdrop-blur-sm"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {subtitle}
            </motion.p>
          </motion.div>
        </div>

        {/* Індикатор прокрутки */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-sm">
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ↓ Scroll Down ↓
          </motion.span>
        </div>
      </section>
    );
  });

  return (
    <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center justify-center min-h-screen p-4">
      {/* Карусель */}
      <div
        ref={containerRef}
        className="relative h-[700px] w-full lg:w-1/2 overflow-y-auto snap-y snap-mandatory scroll-smooth rounded-2xl shadow-2xl scrollbar-hidden"
      >
        {/* Прогрес-бар зправа */}
        <motion.div
          className="sticky top-1/2 right-4 w-1 h-24 origin-bottom bg-white/50 backdrop-blur-sm rounded-full z-50"
          style={{ scaleY }}
        >
          <motion.div
            className="h-full bg-gradient-to-t from-info via-secondary to-primary rounded-full"
            style={{ scaleY }}
          />
        </motion.div>

        {/* Слайди */}
        {slides.map((slide) => (
          <Slide key={slide.id} {...slide} />
        ))}
      </div>

      {/* SoftSkills */}
      <div className="w-full lg:w-1/2 max-w-2xl">
        <SoftSkills />
      </div>
    </div>
  );
}
