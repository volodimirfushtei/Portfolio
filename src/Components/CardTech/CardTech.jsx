import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FadeInAnimate from "../FadeInAnimate/FadeInAnimate";
import styles from "./CardTech.module.css";
const CardTechAutoFlip = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [manualFlip, setManualFlip] = useState(false);

  // Flip every 5s unless user has clicked manually
  useEffect(() => {
    if (manualFlip) return;
    const interval = setInterval(() => {
      setIsFlipped((prev) => !prev);
    }, 6000);
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
          className="relative w-full max-w-4xl h-[600px] cursor-pointer"
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
            className="relative w-full h-full  transition-transform duration-700"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateY(${isFlipped ? 180 : 0}deg)`,
            }}
          >
            {/* Front Side */}
            <div
              className="absolute rounded-2xl   inset-0 border backface-hidden bg-cover bg-center  overflow-hidden"
              style={{
                zIndex: isFlipped ? 1 : 2,

                borderBottom: "6px solid var(--color-success)",
                backgroundImage: "url('/images/pexels-digi.jpg')",
                boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
              }}
            >
              {" "}
              <video
                autoPlay
                muted
                loop
                playsInline
                className={styles.video}
                poster="/images/pexels-digi.jpg"
              >
                <source src="src/assets/Web_developer.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div
                className="absolute inset-0 glass-effect p-8 flex flex-col"
                style={{ backdropFilter: "blur(0px)" }}
              >
                <span className="badge badge-primary text-info w-fit">
                  Featured
                </span>

                <FadeInAnimate direction="up" delay={0.8}>
                  <div className="text-center text-primary/90 text-sm mt-auto">
                    Auto-flips every 5s. Click to pause & flip.
                  </div>
                </FadeInAnimate>
              </div>
            </div>

            {/* Back Side */}
            <div
              className="absolute inset-0 rounded-2xl backface-hidden overflow-hidden tabIndex={0}"
              style={{
                transform: "rotateY(180deg)",
                zIndex: isFlipped ? 2 : 1,
              }}
            >
              {/* Розділене зображення */}
              <div className="absolute inset-0 flex">
                {/* Ліва частина */}
                <div
                  className="w-1/2 h-full glass-effect overflow-hidden"
                  style={{
                    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.4)",
                    backgroundImage:
                      "linear-gradient(135deg, rgba(138, 138, 231, 0.4) 0%, rgba(54, 51, 62, 0.4) 100%)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",

                    border: "1px solid var(--color-border)",
                  }}
                >
                  <img
                    src="/images/My_photo.png"
                    alt="Left half"
                    className="w-full h-full object-cover "
                  />
                </div>
                <div className="absolute w-50 top-40 left-65 z-10 text-sm font-bold text-white text-left mb-6">
                  <h2>Freelance Web Developer</h2>
                  <h1 className=" text-4xl m-4 font-bold text-uppercase text-white">
                    <span className="text-primary font-bold text-5xl">
                      Volodymyr
                    </span>{" "}
                    Fushtei
                  </h1>
                  <p>
                    Hi there! I'm a junior freelance web developer from Ukraine.
                    I have a strong passion for creating visually stunning and
                    user-friendly websites.
                  </p>
                </div>

                {/* Права частина */}
                <div className="w-1/2 h-full glass-effect relative  overflow-hidden">
                  <img
                    src="/images/pex_code.jpg"
                    alt="Right half"
                    className="w-full h-full object-cover "
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-blue-950 to-black/30"></div>
                </div>
              </div>

              {/* оверлей + контент */}
              <div className="absolute  inset-0   p-4 flex flex-col">
                <button className="btn btn-info bg-transparent border-0 cursor-pointer text-white w-30 mx-auto mt-auto group ">
                  <span className=" group-hover:translate-x-1 transition-transform duration-200 ">
                    View
                  </span>
                  <i className="ri-arrow-right-line  ml-1 group-hover:translate-x-2 transition-transform duration-200" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FadeInAnimate>
  );
};

export default CardTechAutoFlip;
