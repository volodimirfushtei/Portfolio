import React, { useState, useEffect, useRef, Suspense, lazy, useCallback, useMemo } from 'react'
import styles from './homePage.module.css'
import ControllerSkills from '../../Components/ControllerSkills/ControllerSkills.jsx'
import Footer from '../../Components/Footer/Footer.jsx'
import Expertise from '../../Components/Expertise/Expertise'
import Carusel from '../../Components/Carusel/Carusel.jsx'
import HeroSection from '../../Components/HeroSection/HeroSection.jsx'
import Sertificate from '../../Components/Sertificate/Sertificate.jsx'
import CtaSection from '../../Components/CtaSection/CtaSection.jsx'
import StickyZoomSection from '../../Components/StickyZoomSection/StickyZoomSection.jsx'
import { Canvas } from '@react-three/fiber'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Model = lazy(() => import('../../Components/Model/Model.jsx'))

gsap.registerPlugin(ScrollTrigger)

// Компонент fallback для Canvas
const CanvasFallback = () => (
  <div className={styles.canvasFallback}>
    <div className={styles.canvasLoader}>
      <span>Loading 3D Scene...</span>
      <div className={styles.loaderDot} />
    </div>
  </div>
)

// Компонент помилки Canvas
const CanvasError = ({ onRetry }) => (
  <div className={styles.canvasError}>
    <p>3D scene is unavailable</p>
    <button onClick={onRetry} className={styles.retryBtn}>
      Retry
    </button>
  </div>
)

const HomePage = () => {
   const [scrollProgress, setScrollProgress] = useState(0)
  const canvasRef = useRef(null)
  const [canvasKey, setCanvasKey] = useState(0)
  const [contextLost, setContextLost] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [canvasError, setCanvasError] = useState(false)
  const sectionRef = useRef(null)
  const retryCountRef = useRef(0)

  // Перевірка на мобільний пристрій
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Розрахунок прогресу скролу з throttling
 
  const containerRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      // Загальний прогрес скролу
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(1, Math.max(0, scrollY / maxScroll))
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Обробка WebGL Context Lost
  useEffect(() => {
    const canvas = canvasRef.current?.querySelector('canvas')
    if (!canvas) return

    let lostContextCount = 0

    const handleContextLost = (e) => {
      e.preventDefault()
      console.warn('Canvas WebGL context lost')
      setContextLost(true)
      lostContextCount++

      if (lostContextCount >= 3) {
        console.error('Canvas context lost too many times, showing fallback')
        setCanvasError(true)
      }
    }

    const handleContextRestored = () => {
      console.log('Canvas WebGL context restored')
      setContextLost(false)
      setCanvasError(false)
      setCanvasKey(prev => prev + 1)
      lostContextCount = 0
    }

    canvas.addEventListener('webglcontextlost', handleContextLost)
    canvas.addEventListener('webglcontextrestored', handleContextRestored)

    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost)
      canvas.removeEventListener('webglcontextrestored', handleContextRestored)
    }
  }, [])

  // Обробка помилки Canvas
  const handleCanvasError = useCallback(() => {
    setCanvasError(true)
  }, [])

  // Повторна спроба
  const handleRetry = useCallback(() => {
    retryCountRef.current++
    setCanvasError(false)
    setContextLost(false)
    setCanvasKey(prev => prev + 1)
  }, [])

  // Мемоізація skills
  const skills = useMemo(() => [
    { src: '/icons/react.svg', alt: 'React', name: 'React', description: 'Library', color: '#61dafb', icon: 'ri-reactjs-line' },
    { src: '/icons/javascript.svg', alt: 'JavaScript', name: 'JavaScript', description: 'Language', color: '#f7df1e', icon: 'ri-javascript-line' },
    { src: '/icons/nextjs.svg', alt: 'Next.js', name: 'Next.js', description: 'Framework', color: '#ffffff', icon: 'ri-nextjs-fill' },
    { src: '/icons/sass.svg', alt: 'Sass', name: 'Sass', description: 'Styling', color: '#cc6699', icon: 'ri-sass-line' },
    { src: '/icons/git.svg', alt: 'Git', name: 'Git', description: 'VCS', color: '#f1502f', icon: 'ri-git-branch-line' },
    { src: '/icons/github.svg', alt: 'GitHub', name: 'GitHub', description: 'Platform', color: '#ffffff', icon: 'ri-github-fill' },
    { src: '/icons/figma.svg', alt: 'Figma', name: 'Figma', description: 'Design', color: '#a259ff', icon: 'ri-figma-line' },
    { src: '/icons/vercel.svg', alt: 'Vercel', name: 'Vercel', description: 'Deployment', color: '#ffffff', icon: 'ri-vercel-line' },
    { src: '/icons/render.svg', alt: 'Render', name: 'Render', description: 'Hosting', color: '#46e3b7', icon: 'ri-cloud-line' },
    { src: '/icons/nodejs.svg', alt: 'Node.js', name: 'Node.js', description: 'Runtime', color: '#68a063', icon: 'ri-nodejs-line' },
    { src: '/icons/expressjs.svg', alt: 'Express.js', name: 'Express.js', description: 'Framework', color: '#ffffff', icon: 'ri-expressjs-line' },
    { src: '/icons/mongodb.svg', alt: 'MongoDB', name: 'MongoDB', description: 'Database', color: '#47a248', icon: 'ri-database-2-line' },
  ], [])

  // Рендер Canvas з перевіркою
  const renderCanvas = () => {
    if (canvasError) {
      return <CanvasError onRetry={handleRetry} />
    }

    if (isMobile) {
      // На мобільних показуємо статичне зображення або нічого
      return null
    }

    return (
      <Suspense fallback={<CanvasFallback />}>
        <Canvas
          key={canvasKey}
          gl={{
            powerPreference: "high-performance",
            alpha: true,
            stencil: false,
            depth: true,
            antialias: true
          }}          
          dpr={[1, 1.5]}
          onError={handleCanvasError}
        >
          <Model progress={scrollProgress} />
        </Canvas>
      </Suspense>
    )
  }

  return (
    <div id="scroll-container" className={styles.gridBg}>
      <div className={styles.container} ref={sectionRef}>
        {/* 3D Canvas */}
        <div className={styles.canvasWrapper} ref={canvasRef}>
          {renderCanvas()}
        </div>

        <section className={styles.heroSectionWrapper} id="hero">
          <HeroSection />
        </section>

        <main className={styles.main}>
          <section id="expertise" className={styles.section}>
            <Expertise />
          </section>

          <section id="skills" className={styles.section}>
            <ControllerSkills items={skills} />
          </section>

          <section id="projects" className={styles.section}>
            <div className={styles.carusel}>
              <Carusel />
            </div>

            <section id="cta" className={styles.ctaSection}>
              <CtaSection />
            </section>

            <section id="certificate" className={styles.sertificate}>
              <Sertificate />
            </section>

            <section className={styles.stickySection}>
              <StickyZoomSection />
            </section>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default HomePage
