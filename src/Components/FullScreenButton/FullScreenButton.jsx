import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const FullscreenButton = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Check fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "msfullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenEnabled) {
      console.warn("Fullscreen not supported or allowed");
      return;
    }

    if (isFullscreen) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen(); // Safari
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen(); // IE11
      }
    } else {
      const el = document.documentElement;
      if (el.requestFullscreen) {
        el.requestFullscreen();
      } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen(); // Safari
      } else if (el.msRequestFullscreen) {
        el.msRequestFullscreen(); // IE11
      }
    }
  };

  // Button animations
  const buttonVariants = {
    hover: { scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.1)" },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      style={{ display: "inline-block" }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.button
        onClick={toggleFullscreen}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        style={{
          padding: "0.5rem 1rem",
          fontSize: "1.25rem",
          cursor: "pointer",
          color: "var(--color-text)",
          background: "transparent",
          border: "none",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        title={isFullscreen ? "Exit fullscreen (Esc)" : "Enter fullscreen"}
      >
        <i
          className={
            isFullscreen ? "ri-fullscreen-exit-line" : "ri-fullscreen-line"
          }
        ></i>
      </motion.button>
    </motion.div>
  );
};

export default FullscreenButton;
