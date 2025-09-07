import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollProgress from "./../ScrollProgress/ScrollProgress";

const buttonStyle = {
  padding: "12px 20px",
  background: "#ff4444",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "500",
  transition: "all 0.3s ease",
};

const getButtonColor = (type) => {
  const colors = {
    nullReference: "#ff4444",
    undefinedFunction: "#ff9933",
    syntax: "#9933ff",
    range: "#33cc33",
  };
  return colors[type];
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const childVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 0.77, 0.47, 0.97],
    },
  },
};

const TestError = () => {
  const bgRef = useRef(null);
  const containerRef = useRef(null);
  const [errorType, setErrorType] = useState(null);
  const [showSafeContent, setShowSafeContent] = useState(true);

  const triggerError = (type) => {
    setShowSafeContent(false);
    setErrorType(type);
  };

  const reset = () => {
    setShowSafeContent(true);
    setErrorType(null);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        y: -50,
        repeat: 0,
        yoyo: true,
        duration: 5,
        ease: "sine.inOut",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  if (errorType === "nullReference") {
    const obj = null;
    return <div>{obj.someProperty}</div>;
  }
  if (errorType === "undefinedFunction") {
    const obj = {};
    return <div>{obj.nonExistentFunction()}</div>;
  }
  if (errorType === "syntax") {
    throw new Error("Simulated syntax error (runtime)");
  }
  if (errorType === "range") {
    const arr = [1, 2, 3];
    return <div>{arr[10].toString()}</div>;
  }
  if (!showSafeContent) {
    return null;
  }

  return (
    <motion.section
      ref={containerRef}
      className="relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="absolute top-0 inset-0 test-error"
        ref={bgRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          padding: "40px",
          textAlign: "center",
          minHeight: "100vh",
          background: "var(--color-background)",
          backgroundRepeat: "no-repeat",

          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <motion.div
          className="container"
          variants={childVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            style={{
              marginBottom: "30px",
              color: "var(--color-text)",
              fontSize: "clamp(24px, 3vw, 36px)",
              fontWeight: "600",
              textShadow: "0 2px 4px rgba(0,0,0,0.5)",
            }}
            whileHover={{ scale: 1.05 }}
          >
            Error Boundary Testing Interface
          </motion.h2>
          <motion.div
            style={{
              position: "relative",
              top: "0%",
              left: "25%",
              background: "transparent",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(4px)",
              padding: "20px",
              maxWidth: "600px",
              width: "100%",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "8px",
            }}
            variants={childVariants}
            initial="hidden"
            animate="visible"
          >
            <p
              style={{ color: "#ddd", marginBottom: "30px", lineHeight: "1.6" }}
            >
              Click any button to trigger a specific error scenario.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: "15px",
              }}
            >
              {["nullReference", "undefinedFunction", "syntax", "range"].map(
                (type) => (
                  <motion.button
                    key={type}
                    onClick={() => triggerError(type)}
                    style={{ ...buttonStyle, background: getButtonColor(type) }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`Trigger ${type} error`}
                    title={`Trigger ${type} error`}
                    type="button"
                  >
                    {type
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </motion.button>
                )
              )}
            </div>
            <motion.button
              onClick={reset}
              style={{
                ...buttonStyle,
                background: "#3399ff",
                marginTop: "20px",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Reset
            </motion.button>
            <motion.div
              style={{ marginTop: "30px", color: "#ff9999", fontSize: "14px" }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              Warning: Clicking these buttons will crash the component!
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default TestError;
