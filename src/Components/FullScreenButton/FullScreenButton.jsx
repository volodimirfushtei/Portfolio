import { useRef } from "react";

const FullscreenButton = () => {
  const enterFullscreen = () => {
    const el = document.documentElement; // Вся сторінка (<html>)
    if (el.requestFullscreen) {
      el.requestFullscreen();
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen(); // Safari
    } else if (el.msRequestFullscreen) {
      el.msRequestFullscreen(); // IE11
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen(); // Safari
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen(); // IE11
    }
  };

  return (
    <div style={{ display: "inline-block" }}>
      <button
        onClick={enterFullscreen}
        style={{
          padding: "0.5rem 1rem",
          fontSize: "20px",
          cursor: "pointer",
          color: "white",
          margin: "5px",
          background: "transparent",
          border: "none",
        }}
        aria-label="Enter fullscreen"
      >
        <i className="ri-fullscreen-line"></i>
      </button>

      <button
        onClick={exitFullscreen}
        style={{
          padding: "0.5rem 1rem",
          fontSize: "20px",
          cursor: "pointer",
          color: "white",
          margin: "5px",
          background: "transparent",
          border: "none",
        }}
        aria-label="Exit fullscreen"
      >
        <i className="ri-fullscreen-exit-line"></i>
      </button>
    </div>
  );
};

export default FullscreenButton;
