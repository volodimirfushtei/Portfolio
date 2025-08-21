import React from "react";
import s from "./Logo.module.css";
const Logo = () => {
  return (
    <div className="relative w-[50px] h-[50px] rounded-full border-4 border-[#ffb74d]">
      <svg
        width="50"
        height="50"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
        xmlSpace="preserve"
        className="absolute top-1 left-0 w-full h-full"
      >
        <defs>
          <linearGradient id="gradF" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffb74d" />
            <stop offset="100%" stopColor="#f57c00" />
          </linearGradient>
          <linearGradient id="gradV" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffe082" />
            <stop offset="100%" stopColor="#ff9800" />
          </linearGradient>
          <filterstopColor
            id="shadow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feOffset result="offOut" in="SourceAlpha" dx="4" dy="4" />
            <feGaussianBlur result="blurOut" in="offOut" stdDeviation="4" />
            <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
          </filterstopColor>
        </defs>

        <g filter="url(#shadow)">
          <text
            x="30"
            y="120"
            fontFamily="Arial Black, sans-serif"
            fontSize="100"
            fill="url(#gradF)"
          >
            F
          </text>
          <text
            x="90"
            y="120"
            fontFamily="Arial Black, sans-serif"
            fontSize="100"
            fill="url(#gradV)"
          >
            V
          </text>
        </g>
      </svg>
    </div>
  );
};

export default Logo;
