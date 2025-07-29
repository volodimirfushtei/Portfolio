// src/Components/VantaBg/VantaBg.jsx
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const VantaBg = () => {
  const vantaRef = useRef(null);

  useEffect(() => {
    let vantaEffect;

    const loadVanta = async () => {
      const VANTA = await import("vanta/dist/vanta.clouds.min.js");
      vantaEffect = VANTA.default({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
      });
    };

    loadVanta();

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    />
  );
};

export default VantaBg;
