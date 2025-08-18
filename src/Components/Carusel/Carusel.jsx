import React, { useRef, useMemo } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import SoftSkills from "../SoftSkills/SoftSkills";
import styles from "./Carusel.module.css";
import { MonitorSmartphone, Workflow, Clock, Users } from "lucide-react";

export default function Carousel() {
  const containerRef = useRef(null);

  const slides = useMemo(
    () => [
      {
        id: 1,
        image: "/images/business.jpg",
        title: "Frontend Development",
        subtitle: "Building responsive UIs with React & Next.js",
        color: "from-primary/40 to-secondary/30",
        icon: (
          <MonitorSmartphone className="w-20 h-20 text-warning animate-border" />
        ),
      },
      {
        id: 2,
        image: "/images/happyt.jpg",
        title: "Backend Integration",
        subtitle: "Creating seamless API connections",
        color: "from-secondary/60 to-primary/30",
        icon: <Workflow className="w-20 h-20 text-warning animate-border" />,
      },
      {
        id: 3,
        image: "/images/managmant.jpg",
        title: "Performance Optimization",
        subtitle: "Fast, efficient web applications",
        color: "from-primary/60 via-secondary/30 to-transparent",
        icon: <Clock className="w-20 h-20 text-warning animate-border" />,
      },
      {
        id: 4,
        image: "/images/business.jpg",
        title: "User Experience",
        subtitle: "Intuitive and accessible interfaces",
        color: "from-secondary/60 to-primary/30",
        icon: <Users className="w-20 h-20 text-warning animate-border" />,
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
    return (
      <section className="relative h-[700px] w-full snap-start overflow-hidden animate-border">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1, opacity: 0.7 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </motion.div>
        <div
          className={`absolute inset-0 bg-gradient-to-b ${color} mix-blend-multiply`}
        />
        <div className="container h-full flex items-center justify-center">
          <motion.div className="max-w-2xl text-white text-center">
            <motion.div
              className="sticky z-10 mb-10 flex justify-center items-center"
              initial={{ opacity: 0, y: -50 }}
              animate={{
                rotate: [0, 10, -8, 0],
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
            <motion.div
              className={`${styles.title} text-5xl md:text-4xl font-bold leading-tight bg-blue/10 p-3 backdrop-blur-xl border-b-2 border-white/90`}
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {title}
            </motion.div>
            <motion.p
              className={`${styles.subtitle} text-xl md:text-4xl font-light opacity-90 bg-yellow/10 p-3 backdrop-blur-xl`}
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {subtitle}
            </motion.p>
          </motion.div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-black/80 text-sm animate-pulse">
          <motion.span
            initial={{ y: 0 }}
            animate={{ y: [0, 10, 0] }}
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
      <div
        ref={containerRef}
        className="relative h-[700px] w-full lg:w-1/2 overflow-y-auto snap-y snap-mandatory scroll-smooth rounded-2xl shadow-2xl scrollbar-hidden"
      >
        <motion.div
          className="sticky top-1/2 right-4 w-1 h-24 origin-bottom bg-white/50 backdrop-blur-sm rounded-full z-50"
          style={{ scaleY }}
        >
          <motion.div
            className="h-full bg-gradient-to-t from-info via-secondary to-primary rounded-full"
            style={{ scaleY }}
          />
        </motion.div>
        {slides.map((slide) => (
          <Slide key={slide.id} {...slide} />
        ))}
      </div>
      <div className="w-full lg:w-1/2 max-w-2xl">
        <SoftSkills />
      </div>
    </div>
  );
}
