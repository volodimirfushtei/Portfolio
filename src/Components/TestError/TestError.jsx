import React, { useState } from "react";
import { motion } from "framer-motion";

const TestError = () => {
  const [errorType, setErrorType] = useState(null);
  const [showSafeContent, setShowSafeContent] = useState(true);

  const triggerError = (type) => {
    setShowSafeContent(false);
    setErrorType(type);
  };

  // Error simulations
  if (errorType === "nullReference") {
    const obj = null;
    return <div>{obj.someProperty}</div>; // Null reference error
  }

  if (errorType === "undefinedFunction") {
    const obj = {};
    return <div>{obj.nonExistentFunction()}</div>; // Undefined function error
  }

  if (errorType === "syntax") {
    // This will cause a syntax error when evaluated
    const badSyntax = "This will cause a syntax error: ";
    return <div>{badSyntax}</div>; // Intentional syntax error
  }

  if (errorType === "range") {
    const arr = [1, 2, 3];
    return <div>{arr[10].toString()}</div>; // Range error
  }

  if (!showSafeContent) {
    return null; // Clear the content before showing error
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        padding: "40px",
        textAlign: "center",
        minHeight: "100vh",
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
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
          background: "transparent",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",

          backdropFilter: "blur(2px)",

          padding: "30px",
          maxWidth: "600px",
          width: "100%",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <p style={{ color: "#ddd", marginBottom: "30px", lineHeight: "1.6" }}>
          This component tests the ErrorBoundary by simulating different types
          of JavaScript errors. Click any button below to trigger a specific
          error scenario.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "15px",
          }}
        >
          <motion.button
            onClick={() => triggerError("nullReference")}
            style={buttonStyle}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 4px 12px rgba(255, 68, 68, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Null Reference
          </motion.button>

          <motion.button
            onClick={() => triggerError("undefinedFunction")}
            style={{ ...buttonStyle, background: "#ff9933" }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 4px 12px rgba(255, 153, 51, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Undefined Function
          </motion.button>

          <motion.button
            onClick={() => triggerError("syntax")}
            style={{ ...buttonStyle, background: "#9933ff" }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 4px 12px rgba(153, 51, 255, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Syntax Error
          </motion.button>

          <motion.button
            onClick={() => triggerError("range")}
            style={{ ...buttonStyle, background: "#33cc33" }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 4px 12px rgba(51, 204, 51, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Range Error
          </motion.button>
        </div>

        <motion.div
          style={{ marginTop: "30px", color: "#ff9999", fontSize: "14px" }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          Warning: Clicking these buttons will crash the component!
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

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

export default TestError;
