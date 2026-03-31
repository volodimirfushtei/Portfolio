import React from "react";
import s from "./Logo.module.css";

const Logo = () => {
  return (
    <div className={s.logoContainer}>
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className={s.logoSvg}
      >
        <defs>
          <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "var(--color-primary)" }} />
            <stop offset="100%" style={{ stopColor: "var(--color-accent)" }} />
          </linearGradient>
        </defs>

        {/* Inner track circle */}
        <circle
          cx="50"
          cy="50"
          r="44"
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="2"
        />
        
        {/* Animated hover circle */}
        <circle
          cx="50"
          cy="50"
          r="44"
          fill="none"
          stroke="url(#primaryGradient)"
          strokeWidth="3"
          className={s.pulseCircle}
        />

        {/* The 'V' */}
        <path
          d="M 32 36 L 50 64 L 68 36"
          fill="none"
          stroke="var(--color-title)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={s.pathV}
        />

        {/* The 'F' */}
        <path
          d="M 41 36 L 41 64 M 41 36 L 56 36 M 41 50 L 53 50"
          fill="none"
          stroke="url(#primaryGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={s.pathF}
        />
      </svg>
    </div>
  );
};

export default Logo;
