import React, { useId, useLayoutEffect, useState } from 'react'
import s from './Logo.module.css'
import { gsap } from 'gsap'

import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
const Logo = ({ svgRef, className, variant = 'default' }) => {


  const uid = useId().replace(/:/g, '')

  const mainGradId = `mainGrad-${uid}`
  const accentGradId = `accentGrad-${uid}`
  const shadowId = `textShadow-${uid}`
  const logoRef = React.useRef(null)
  const bgRef = React.useRef(null)
  const [isLoading, setIsLoading] = useState(false)
  useLayoutEffect(() => {
    if (!bgRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bgRef.current,
        {
          clipPath: 'inset(100% 0% 0% 0%)',
          opacity: 0,

        },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 0.15,
          duration: 1.2,
          delay: 0.2,
          ease: 'expo.out',

          onStart: () => {
            setIsLoading(true)
          },
          onComplete: () => {
            setIsLoading(false)
          },
        },
      )
    }, logoRef)

    return () => ctx.revert()
  }, [])


  return (
    <div ref={logoRef} className={`${s.logoContainer} ${s[variant] || ''} ${className || ''}`}>
      <svg
        ref={svgRef}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className={s.logoSvg}
      >
        <defs>
          {/* Градієнти для кращої видимості */}
          <linearGradient id={mainGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
          </linearGradient>

          <linearGradient id={accentGradId} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.6" />
            <stop offset="50%" stopColor="var(--color-accent)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.4" />
          </linearGradient>

          {/* Тінь для кращої читабельності */}
          <filter id={shadowId}>
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* ── Background Glow ── */}

        <rect ref={bgRef}
              x="10"
              y="10"
              width="80"
              height="80"
              fill="none"
              stroke="rgba(255,255,255,0.55)"
              strokeWidth="1"
              className={s.bgGlow}
        />


        {/* ── Outer Ring - видиме кільце ── */}

        <rect
          x="10"
          y="10"
          width="80"
          height="80"
          rx="2"
          fill="none"
          stroke={`url(#${accentGradId})`}
          strokeWidth="1"
          strokeDasharray="45 275"
          strokeDashoffset="0"
          className={s.animatedRing}
        />
        {/* ── V Shape - завжди видимий ── */}
        <path
          d="M 32 38 L 50 62 L 68 38"
          fill="none"
          stroke={`url(#${accentGradId})`}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={s.vShape}
          filter={`url(#${shadowId})`}
        />

        {/* ── F Shape - завжди видимий ── */}
        <path
          d="M 41 38 L 41 62 M 41 38 L 55 38 M 41 50 L 52 50"
          fill="none"
          stroke={`url(#${mainGradId})`}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={s.fShape}
          filter={`url(#${shadowId})`}
        />

        {/* ── Акцентна підсвітка V (при ховері) ── */}
        <path
          d="M 32 38 L 50 62 L 68 38"
          fill="none"
          stroke={`url(#${accentGradId})`}
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={s.vGlow}
          opacity="0"
        />

        {/* ── Акцентна підсвітка F (при ховері) ── */}
        <path
          d="M 41 38 L 41 62 M 41 38 L 55 38 M 41 50 L 52 50"
          fill="none"
          stroke={`url(#${accentGradId})`}
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={s.fGlow}
          opacity="0"
        />


      </svg>
    </div>
  )
}

export default Logo
