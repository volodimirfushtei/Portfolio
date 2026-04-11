import React, { useState, useEffect, useRef, Suspense } from 'react'
import styles from './homePage.module.css'

import ControllerSkills from '../../Components/ControllerSkills/ControllerSkills.jsx'
import Footer from '../../Components/Footer/Footer.jsx'
import Expertise from '../../Components/Expertise/Expertise'
import Carusel from '../../Components/Carusel/Carusel.jsx'
import HeroSection from '../../Components/HeroSection/HeroSection.jsx'
import FadeInAnimate from '../../Components/FadeInAnimate/FadeInAnimate.jsx'
import Sertificate from '../../Components/Sertificate/Sertificate.jsx'
import CtaSection from '../../Components/CtaSection/CtaSection.jsx'
import ScrollToTopBtn from '../../Components/ScrollToTopBtn/ScrollTotopBtn.jsx'
import StickyZoomSection from '../../Components/StickyZoomSection/StickyZoomSection.jsx'
import { Canvas } from '@react-three/fiber'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Model from '../../Components/Model/Model.jsx'
import NoiseOverlay from '../../Components/NoiseOverlay/NoiseOverlay.jsx'

gsap.registerPlugin(ScrollTrigger)

const HomePage = () => {
  const [progress, setProgress] = useState(0)
  const [canvasError, setCanvasError] = useState(false)
  const [retryKey, setRetryKey] = useState(0)
  const sectionRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  // Перевірка на мобільний пристрій
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Розрахунок прогресу скролу
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const scrollProgress = Math.min(
        1,
        Math.max(0, -rect.top / (rect.height - window.innerHeight))
      )
      setProgress(scrollProgress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Обробка помилок Canvas
  const handleContextLost = () => {
    console.warn('Canvas context lost')
    setCanvasError(true)

    setTimeout(() => {
      setCanvasError(false)
    }, 100)
  }

  if (canvasError) {
    return (
      <div className={styles.canvasErrorContainer}>
        <div className={styles.canvasError}>
          <p className={styles.canvasErrorText}>3D scene is loading...</p>
          <button
            className={styles.canvasErrorBtn}
            onClick={() => setRetryKey(prev => prev + 1)}
          >
            Reload page
          </button>
        </div>
      </div>
    )
  }

  const skills = [
    { src: '/icons/react.svg', alt: 'React', name: 'React', description: 'Library', color: '#61dafb', icon: 'ri-reactjs-line' },
    { src: '/icons/javascript.svg', alt: 'JavaScript', name: 'JavaScript', description: 'Language', color: '#f7df1e', icon: 'ri-javascript-line' },
    { src: '/icons/nextjs.svg', alt: 'Next.js', name: 'Next.js', description: 'Framework', color: '#ffffff', icon: 'ri-nextjs-fill' },
    { src: '/icons/html.svg', alt: 'HTML', name: 'HTML5', description: 'Markup', color: '#e34f26', icon: 'ri-html5-line' },
    { src: '/icons/css.svg', alt: 'CSS', name: 'CSS3', description: 'Styling', color: '#1572b6', icon: 'ri-css3-line' },
    { src: '/icons/sass.svg', alt: 'Sass', name: 'Sass', description: 'Styling', color: '#cc6699', icon: 'ri-sass-line' },
    { src: '/icons/git.svg', alt: 'Git', name: 'Git', description: 'VCS', color: '#f1502f', icon: 'ri-git-branch-line' },
    { src: '/icons/github.svg', alt: 'GitHub', name: 'GitHub', description: 'Platform', color: '#ffffff', icon: 'ri-github-fill' },
    { src: '/icons/figma.svg', alt: 'Figma', name: 'Figma', description: 'Design', color: '#a259ff', icon: 'ri-figma-line' },
    { src: '/icons/vercel.svg', alt: 'Vercel', name: 'Vercel', description: 'Deployment', color: '#ffffff', icon: 'ri-vercel-line' },
    { src: '/icons/render.svg', alt: 'Render', name: 'Render', description: 'Hosting', color: '#46e3b7', icon: 'ri-cloud-line' },
    { src: '/icons/nodejs.svg', alt: 'Node.js', name: 'Node.js', description: 'Runtime', color: '#68a063', icon: 'ri-nodejs-line' },
    { src: '/icons/expressjs.svg', alt: 'Express.js', name: 'Express.js', description: 'Framework', color: '#ffffff', icon: 'ri-expressjs-line' },
    { src: '/icons/mongodb.svg', alt: 'MongoDB', name: 'MongoDB', description: 'Database', color: '#47a248', icon: 'ri-database-2-line' },
  ]

  return (
    <>
      <div id="scroll-container" className={styles.scrollContainer}>
        <NoiseOverlay />

        <div className={styles.container} ref={sectionRef}>
          <ScrollToTopBtn />

          <section className={styles.heroSectionWrapper}>
            <HeroSection />
          </section>

          {/* 3D Canvas - тільки на десктопі */}
          {!isMobile && (
            <div className={styles.canvasContainer}>
              <Suspense
                fallback={
                  <div className={styles.canvasFallback}>
                    <div className={styles.loadingSpinner} />
                    <p>Loading 3D Model...</p>
                  </div>
                }
              >
                <Canvas
                  key={retryKey}
                  onCreated={handleContextLost}
                  style={{ background: 'transparent' }}
                  shadows
                  gl={{
                    powerPreference: 'high-performance',
                    antialias: true,
                    alpha: true,
                    depth: true,
                    stencil: false,
                    preserveDrawingBuffer: false,
                  }}
                  dpr={[1, 2]}
                >
                  <ambientLight intensity={0.3} />
                  <pointLight position={[5, 5, 5]} intensity={1} />
                  <pointLight position={[-5, 2, 3]} intensity={0.5} />
                  <pointLight position={[10, 10, 10]} intensity={0.5} />
                  <Model progress={progress} />
                </Canvas>
              </Suspense>
            </div>
          )}

          <main className={styles.main}>
            {/* Expertise Section */}
            <section id="expertise" className={styles.section}>
              <FadeInAnimate direction="top" delay={0.2} duration={1}>
                <Expertise />
              </FadeInAnimate>
            </section>

            {/* Skills Section */}
            <section id="skills" className={styles.section}>
              <ControllerSkills items={skills} />
            </section>

            {/* Projects Section */}
            <section id="projects" className={styles.section}>
              <div className={styles.carusel}>
                <FadeInAnimate direction="top" delay={0.6} duration={1}>
                  <Carusel />
                </FadeInAnimate>
              </div>

              <section id="cta" className={styles.ctaSection}>
                <CtaSection />
              </section>

              {/* Certificate Section */}
              <section id="certificate" className={styles.sertificate}>
                <FadeInAnimate direction="left" delay={0.8} duration={1}>
                  <Sertificate />
                </FadeInAnimate>
              </section>

              <section className={styles.stickySection}>
                <StickyZoomSection />
              </section>
            </section>
          </main>

          <Footer />
        </div>
      </div>
    </>
  )
}

export default HomePage
