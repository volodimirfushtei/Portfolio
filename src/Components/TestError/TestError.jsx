import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

import DotGrid from "./../DotGrid/DotGrid";
const errorColors = {
  nullReference: "bg-red-500",
  undefinedFunction: "bg-orange-500",
  runtimeError: "bg-purple-500",
  range: "bg-green-500",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, staggerChildren: 0.2 },
  },
};

const childVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8 } },
};

const TestError = () => {
  const bgRef = useRef(null);
  const containerRef = useRef(null);
  const [errorType, setErrorType] = useState(null);

  const triggerError = (type) => setErrorType(type);
  const reset = () => setErrorType(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        y: -50,
        duration: 5,
        ease: "sine.inOut",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // --- Симуляція помилок ---
  if (errorType) {
    switch (errorType) {
      case "nullReference":
        return <div>{null.someProperty}</div>;
      case "undefinedFunction":
        return <div>{{}.nonExistentFunction()}</div>;
      case "runtimeError":
        throw new Error("Simulated runtime error");
      case "range":
        return <div>{[1, 2, 3][10].toString()}</div>;
      default:
        return null;
    }
  }

  return (
    <motion.section
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative flex items-center justify-center min-h-screen bg-[var(--color-beckground)]"
    >
      <div style={{ width: "100%", height: "100%", position: "fixed" }}>
        <DotGrid
          dotSize={2}
          gap={10}
          baseColor="#5227FF"
          activeColor="#5227FF"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>
      <motion.div
        ref={bgRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center p-8 w-full max-w-3xl max-h-2xl rounded-lg border border-white/20 bg-blue-0/80 backdrop-blur-md shadow-lg"
      >
        <motion.h2
          variants={childVariants}
          className="mb-6 text-[clamp(24px,3vw,32px)] font-semibold text-secondary text-center drop-shadow-md"
          whileHover={{ scale: 1.05 }}
        >
          Error Boundary Testing Interface
        </motion.h2>

        <motion.p
          variants={childVariants}
          className="text-secondary text-base mb-6 leading-relaxed text-center"
        >
          Click any button to trigger a specific error scenario.
        </motion.p>

        <motion.div
          variants={childVariants}
          className="grid grid-cols-2 sm:grid-cols-4 gap-8 rounded-lg p-4 w-full h-full"
        >
          {Object.keys(errorColors).map((type) => (
            <motion.button
              key={type}
              onClick={() => triggerError(type)}
              className={`px-4 py-2 rounded-lg text-red-700   font-medium text-sm shadow-xl transition-transform ${errorColors[type]} hover:scale-105 active:scale-95`}
              aria-label={`Trigger ${type} error`}
              title={`Trigger ${type} error`}
              type="button"
            >
              {type
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (s) => s.toUpperCase())}
            </motion.button>
          ))}
        </motion.div>

        <motion.button
          onClick={reset}
          className="mt-10 px-4 py-6 rounded-lg bg-blue-400 text-secondary font-medium text-sm shadow-xl hover:scale-105 active:scale-95 transition-transform"
        >
          Reset
        </motion.button>

        <motion.div
          className="mt-8 text-red-600 text-sm"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          ⚠ Warning: Clicking these buttons will crash the component!
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default TestError;
