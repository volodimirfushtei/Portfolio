import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import styles from "./Carusel.module.css";
export default function Carousel() {
  const containerRef = useRef(null);

  // Дані для каруселі
  const slides = [
    {
      id: 1,
      image: "/images/njeromin1.jpg",
      title: "Міський краєвид",
      subtitle: "Архітектурна перспектива",
      color: "from-blue-500/30 to-blue-700/30",
    },
    {
      id: 2,
      image: "/images/njeromin2.jpg",
      title: "Урбаністичний пейзаж",
      subtitle: "Сучасна міська структура",
      color: "from-purple-500/30 to-purple-700/30",
    },
    {
      id: 3,
      image: "/images/njeromin3.jpg",
      title: "Метрополіс",
      subtitle: "Динаміка великого міста",
      color: "from-amber-500/30 to-amber-700/30",
    },
    {
      id: 4,
      image: "/images/sity.jpg",
      title: "Центр міста",
      subtitle: "Серце урбаністичного простору",
      color: "from-emerald-500/30 to-emerald-700/30",
    },
  ];

  // Анімаційні ефекти
  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 30,
    restDelta: 0.001,
  });

  // Компонент слайду
  const Slide = ({ image, title, subtitle, color }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end start"],
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1, 0.7]);
    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const x = useTransform(scrollYProgress, [0, 1], [100, -100]);
    return (
      <section
        ref={ref}
        className={` ${styles.slide} relative h-[700px] w-full snap-start overflow-hidden `}
      >
        {/* Фонове зображення */}
        <motion.div className="absolute inset-0 " style={{ scale }}>
          <motion.img
            src={image}
            alt={title}
            className="h-full w-full object-cover"
            style={{ opacity }}
            loading="lazy"
          />
        </motion.div>

        {/* Градієнтний оверлей */}
        <div
          className={`absolute inset-0 bg-gradient-to-b ${color} mix-blend-multiply`}
        />

        {/* Контент слайду */}
        <div className="container relative h-full flex items-center">
          <motion.div className="max-w-2xl text-white" style={{ y }}>
            <motion.div
              className="text-5xl md:text-7xl font-bold mb-4 leading-tight"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex items-center ">
                <img
                  src="/images/my_photo.jpg"
                  alt="logo"
                  className="logo rounded-2 "
                  width={180}
                  height={180}
                  loading="lazy"
                />
              </div>
            </motion.div>
            <motion.p
              className="text-xl md:text-2xl font-light opacity-90"
              initial={{
                opacity: 0,
                x: 50,
              }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {subtitle}
            </motion.p>
          </motion.div>
        </div>

        {/* Індикатор прокрутки */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-sm">
          <span className="animate-pulse" whileInView={{ y: [0, 20, 0] }}>
            ↓ Scroll Down ↓
          </span>
        </div>
      </section>
    );
  };

  return (
    <div
      ref={containerRef}
      className="relative h-[700px] w-1/2 overflow-y-auto snap-y snap-mandatory scroll-smooth scrollbar-hidden "
    >
      {/* Прогресбар у стилі Webflow */}
      <motion.div
        className="sticky top-10 left-0 h-1.5 w-full origin-center -rotate-90 -translate-x-1/2 bg-white/30 z-50 backdrop-blur-sm"
        style={{ scaleX }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400"
          style={{ scaleX }}
        />
      </motion.div>

      {/* Слайди */}
      {slides.map((slide) => (
        <Slide key={slide.id} {...slide} />
      ))}
    </div>
  );
}
