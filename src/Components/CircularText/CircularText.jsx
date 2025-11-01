"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const CircularText = () => {
  const circleRef = useRef(null);

  useEffect(() => {
    // Безкінечне плавне обертання тексту по колу
    const rotation = gsap.to(circleRef.current, {
      rotate: 360,
      duration: 12,
      repeat: -1,
      ease: "linear",
      transformOrigin: "50% 50%",
    });

    return () => {
      rotation.kill(); // очищення при розмонтуванні
    };
  }, []);

  return (
    <div className="relative  sm:w-40 sm:h-40 xl:w-50 xl:h-50 flex items-center justify-center">
      {/* SVG-текст по колу */}
      <svg
        ref={circleRef}
        viewBox="0 0 200 200"
        className="absolute inset-0 w-full h-full"
      >
        <path
          id="circlePath"
          d="M 100, 100
             m -75, 0
             a 75,75 0 1,1 150,0
             a 75,75 0 1,1 -150,0"
          fill="none"
        />
        <text
          fill="currentColor"
          className="text-sm font-medium tracking-[3px] text-foreground"
        >
          <textPath
            href="#circlePath"
            startOffset="0%"
            textLength="470"
            className="uppercase"
          >
            • Creative Developer • Designer • Engineer •
          </textPath>
        </text>
      </svg>

      {/* Центральне коло */}
      <div className="absolute w-16 h-16 bg-gradient-to-r from-secondary to-accent rounded-full shadow-lg" />
    </div>
  );
};

export default CircularText;
