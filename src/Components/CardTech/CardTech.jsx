import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FadeInAnimate from "../FadeInAnimate/FadeInAnimate";

const CardTechAutoFlip = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [manualFlip, setManualFlip] = useState(false);

  // Flip every 5s unless user has clicked manually
  useEffect(() => {
    if (manualFlip) return;
    const interval = setInterval(() => {
      setIsFlipped((prev) => !prev);
    }, 5000);
    return () => clearInterval(interval);
  }, [manualFlip]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setManualFlip(true); // Stop auto-flip after manual click
  };

  return (
    <FadeInAnimate direction="bottom" duration={1.2} distance={100}>
      <div className="flex w-full justify-center items-center min-h-screen">
        <div
          className="relative w-screen max-w-4xl h-[800px] cursor-pointer"
          style={{ perspective: 1000 }}
          onClick={handleFlip}
          role="button"
          aria-label="Flip technology card"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleFlip();
          }}
        >
          <div
            className="relative w-full h-full transition-transform duration-700"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateY(${isFlipped ? 180 : 0}deg)`,
            }}
          >
            {/* Front Side */}
            <div
              className="absolute inset-0 backface-hidden bg-cover bg-center rounded-2xl overflow-hidden"
              style={{
                backgroundImage: "url('/images/ueruko.jpg')",
                zIndex: isFlipped ? 1 : 2,
              }}
            >
              <div className="absolute inset-0 bg-black/40  p-10 flex flex-col">
                <FadeInAnimate direction="left" delay={0.2}>
                  <span className="badge badge-primary text-white w-fit">
                    Featured
                  </span>
                </FadeInAnimate>

                <ul className="mt-6 space-y-3 flex-1 overflow-y-auto scrollbar-hidden">
                  {[
                    "React",
                    "Node.js",
                    "TypeScript",
                    "UI/UX",
                    "MongoDB",
                    "Express",
                    "Figma",
                  ].map((skill, i) => (
                    <FadeInAnimate
                      key={i}
                      direction="right"
                      delay={0.3 + i * 0.1}
                    >
                      <li className="flex items-center text-white">
                        <svg
                          className="w-5 h-5 mr-2 text-primary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {skill}
                      </li>
                    </FadeInAnimate>
                  ))}
                </ul>

                <FadeInAnimate direction="up" delay={0.8}>
                  <div className="text-center text-white/60 text-sm mt-auto">
                    Auto-flips every 5s. Click to pause & flip.
                  </div>
                </FadeInAnimate>
              </div>
            </div>

            {/* Back Side */}
            <div
              className="absolute inset-0 backface-hidden bg-cover bg-center rounded-2xl overflow-hidden"
              style={{
                backgroundImage: "url('/images/My_photo.png')",
                transform: "rotateY(180deg)",
                zIndex: isFlipped ? 2 : 1,
              }}
            >
              <div className="absolute inset-0 bg-black/50  p-10 flex flex-col">
                <FadeInAnimate direction="right" delay={0.2}>
                  <h3 className="text-2xl font-bold text-white mb-6">
                    Technical Stack
                  </h3>
                </FadeInAnimate>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-8 flex-1 overflow-y-auto scrollbar-hidden">
                  {[
                    "React",
                    "Node",
                    "TS",
                    "MongoDB",
                    "Express",
                    "Figma",
                    "Tailwind",
                    "Prisma",
                    "Next",
                    "Grid",
                    "Framer",
                    "SASS",
                    "GraphQL",
                  ].map((tech, i) => (
                    <FadeInAnimate
                      key={i}
                      direction="bottom"
                      delay={0.3 + i * 0.05}
                    >
                      <div className="badge badge-outline text-white hover:badge-primary transition-colors">
                        {tech}
                      </div>
                    </FadeInAnimate>
                  ))}
                </div>

                <FadeInAnimate direction="up" delay={0.6}>
                  <button className="btn btn-primary w-40 mx-auto mt-auto">
                    View Full Stack
                    <i className="ri-arrow-right-line ml-1" />
                  </button>
                </FadeInAnimate>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FadeInAnimate>
  );
};

export default CardTechAutoFlip;
