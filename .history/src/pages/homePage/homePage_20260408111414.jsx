import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import styles from './homePage.module.css'

import ControllerSkills from '../../Components/ControllerSkills/ControllerSkills.jsx'

import Footer from '../../Components/Footer/Footer.jsx'

import Expertise from '../../Components/Expertise/Expertise'
import Carusel from '../../Components/Carusel/Carusel.jsx'

import HeroSection from '../../Components/HeroSection/HeroSection.jsx'
import FadeInAnimate from '../../Components/FadeInAnimate/FadeInAnimate.jsx'

import { Suspense } from 'react'
import Sertificate from '../../Components/Sertificate/Sertificate.jsx'
import CtaSection from '../../Components/CtaSection/CtaSection.jsx'
import ScrollToTopBtn from '../../Components/ScrollToTopBtn/ScrollTotopBtn.jsx'

import StickyZoomSection from '../../Components/StickyZoomSection/StickyZoomSection.jsx'
import DotGrid from '../../Components/DotGrid/DotGrid.jsx'
import { Canvas } from '@react-three/fiber'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Model from '../../Components/Model/Model.jsx'
import NoiseOverlay from '../../Components/NoiseOverlay/NoiseOverlay.jsx'
gsap.registerPlugin(ScrollTrigger)

const HomePage = () => {
  const [progress, setProgress] = useState(0)
  const [canvasError, setCanvasError] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const scrollProgress = Math.min(
        1,
        Math.max(0, -rect.top / (rect.height - window.innerHeight)),
      )
      setProgress(scrollProgress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Обробка помилок Canvas
  const handleContextLost = () => {
    console.warn('Canvas context lost')
    setCanvasError(true)

    // Спроба відновити через перезавантаження
    setTimeout(() => {
      setCanvasError(false)
    }, 100)
  }

  if (canvasError) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          color: '#dad7d7ff',
          background: 'var(--color-page-gradient)',
        }}
      >
        <div className={styles.canvasError}>
          <p className={styles.canvasErrorText}>3D scene is loading...</p>
          <button
            className={styles.canvasErrorBtn}
            onClick={() => window.location.reload()}
          >
            Reload page
          </button>
        </div>
      </div>
    )
  }

  // Skills data
  const skills = [
    { src: '/icons/react.svg', alt: 'React' },
    { src: '/icons/javascript.svg', alt: 'JavaScript' },
    { src: '/icons/nextjs.svg', alt: 'Next.js' },
    { src: '/icons/html.svg', alt: 'HTML' },
    { src: '/icons/css.svg', alt: 'CSS' },
    { src: '/icons/sass.svg', alt: 'Sass' },
    { src: '/icons/git.svg', alt: 'Git' },
    { src: '/icons/github.svg', alt: 'GitHub' },
    { src: '/icons/figma.svg', alt: 'Figma' },
    { src: '/icons/vercel.svg', alt: 'Vercel' },
    { src: '/icons/render.svg', alt: 'Render' },
    { src: '/icons/nodejs.svg', alt: 'Node.js' },
    { src: '/icons/expressjs.svg', alt: 'Express.js' },
    { src: '/icons/mongodb.svg', alt: 'MongoDB' },
  ]

  return (
    <>
      <div id="scroll-container">
        {/* DotGrid background */}

        <NoiseOverlay />
        <div className={styles.container} ref={sectionRef}>
          <ScrollToTopBtn />
          <section className={styles.section}>
            <HeroSection />
          </section>
          <div className={styles.canvasContainer}>
            <Suspense
              className={styles.canvas}
              fallback={
                <div className={styles.canvasError}>Loading 3D Model...</div>
              }
            >
              <Canvas
                onCreated={handleContextLost}
                background={null}
                shadows
                gl={{
                  powerPreference: 'high-performance',
                  antialias: true,
                  alpha: true,
                  depth: true,
                  stencil: false,
                  preserveDrawingBuffer: false,
                }}
                dpr={[1, 2]} // Обмежуємо pixel ratio
              >
                {' '}
                {/* Без pointLight - об'єкт буде плоским і без об'єму */}
                <pointLight position={[5, 5, 5]} intensity={1} />
                {/* Додаткове світло для підсвітки з іншого боку */}
                <pointLight
                  position={[-5, 2, 3]}
                  intensity={0.5}
                  color="blue"
                />
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} />
                <Model progress={progress} />
              </Canvas>
            </Suspense>
          </div>
          <main className={styles.main}>
            {/* Expertise Section */}
            <section
              id="expertise"
              className={`${styles.expertise} ${styles.section}`}
            >
              <FadeInAnimate direction="top" delay={0.2} duration={1}>
                <Expertise />
              </FadeInAnimate>
            </section>

            {/* Skills Section */}
            <section
              id="skills"
              className={styles.section} // Changed from skillsSection to section for uniform padding layout
            >
              <ControllerSkills items={skills} />
            </section>

            {/* Projects Section */}
            <section
              id="projects"
              className={`${styles.projects} ${styles.section}`}
            >
              <div className={`${styles.carusel} ${styles.section} `}>
                <FadeInAnimate direction="top" delay={0.6} duration={1}>
                  <Carusel />
                </FadeInAnimate>
              </div>

              <section id="cta" className={`${styles.cta} ${styles.section} `}>
                <CtaSection />
              </section>

              {/* Certificate Section */}
              <section
                id="serteficate"
                className={`${styles.sertificate} ${styles.section}`}
              >
                <FadeInAnimate direction="top" delay={0.8} duration={1}>
                  <Sertificate />
                </FadeInAnimate>
              </section>

              <section className={`${styles.sticky} ${styles.section}`}>
                <FadeInAnimate direction="top" delay={1} duration={1}>
                  <StickyZoomSection />
                </FadeInAnimate>
              </section>
            </section>
          </main>

          <Footer />
        </div>
      </div>
    </>
  )
}

// Throttle function for scroll events
function throttle(fn, wait) {
  let time = Date.now()
  return function () {
    if (time + wait - Date.now() < 0) {
      fn()
      time = Date.now()
    }
  }
}

export default HomePage
