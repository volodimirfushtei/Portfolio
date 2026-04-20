import React, { useState, useEffect, useRef, Suspense, lazy } from 'react'
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

import NoiseOverlay from '../../Components/NoiseOverlay/NoiseOverlay.jsx'
import { Preload } from '@react-three/drei'
const Model = lazy(() => import('../../Components/Model/Model.jsx'))

gsap.registerPlugin(ScrollTrigger)

const HomePage = () => {
  const [progress, setProgress] = useState(0)
  const canvasRef = useRef(null);
  const [canvasKey, setCanvasKey] = useState(0); // Ключ для перезагрузки Canvas
  const [contextLost, setContextLost] = useState(false);
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



  //  Обробка WebGL Context Lost
  useEffect(() => {
    const canvas = canvasRef.current?.querySelector('canvas');
    if (!canvas) return;

    let lostContextCount = 0;

    const handleContextLost = (e) => {
      console.warn(' Canvas WebGL context lost');
      e.preventDefault();

      setContextLost(true);
      lostContextCount++;

      // Якщо контекст втрачено 3+ разів - показуємо fallback
      if (lostContextCount >= 3) {
        console.error('Canvas context lost too many times, showing fallback');
        return;
      }
    };

    const handleContextRestored = () => {
      console.log('✅ Canvas WebGL context restored');
      setContextLost(false);

      // Перезавантажуємо Canvas компонент
      setCanvasKey(prev => prev + 1);
    };

    //  Реєструємо обробники
    canvas.addEventListener('webglcontextlost', handleContextLost);
    canvas.addEventListener('webglcontextrestored', handleContextRestored);

    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, []);

  //  Fallback для мобільних або при помилці
  if (contextLost) {
    return (
      <section className={styles.section}>
        <div style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0d0d0d, #1a1a1a)',
          color: '#f5f5f0',
          fontSize: '18px',
          textAlign: 'center',
          padding: '20px'
        }}>
          <div>
            <p>Canvas відновлюється...</p>
            <p style={{ fontSize: '12px', marginTop: '10px', opacity: 0.7 }}>
              Якщо це займає довго, перезагрузите сторінку
            </p>
          </div>
        </div>
      </section>
    );
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
      <div id="scroll-container" className={styles.gridBg}>
        <div className={styles.container} ref={sectionRef}>


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
                  key={canvasKey}
                  dpr={[1, 1.5]} // ← Максимум 1.5, не більше
                  performance={{ min: 0.5, max: 1 }} // ← Адаптивна якість
                  gl={{
                    antialias: true,
                    powerPreference: 'high-performance',
                    failIfMajorPerformanceCaveat: false,
                    alpha: true,
                    // ✅ ФІКС 4: Дозволи браузеру відновлювати контекст
                    preserveDrawingBuffer: false,
                    // ✅ ФІКС 5: Оптимізація для старих пристроїв
                    precision: 'mediump',
                    // ✅ ФІКС 6: Локальна очистка
                    logarithmicDepthBuffer: false,
                  }}
                  camera={{ position: [0, 0, 5] }}
                  onCreated={(state) => {
                    console.log('✅ Canvas created');

                    // ✅ ФІКС 7: Налаштування для стабільності
                    state.gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
                    state.gl.outputColorSpace = 'srgb';
                  }}
                >
                  {/* ✅ ФІКС 8: Додай Preload для оптимізації */}
                  <Preload all />
                  <Model progress={progress} />
                </Canvas>
              </Suspense>
            </div>
          )}
          <main className={styles.main}>
            {/* Expertise Section */}
            <section id="expertise" className={styles.section}>

              <Expertise />

            </section>

            {/* Skills Section */}
            <section id="skills" className={styles.section}>
              <ControllerSkills items={skills} />
            </section>

            {/* Projects Section */}
            <section id="projects" className={styles.section}>
              <div className={styles.carusel}>
                <Carusel />
              </div>
              <section id="cta" className={styles.ctaSection}>
                <CtaSection />
              </section>

              {/* Certificate Section */}
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
    </>
  )
}

export default HomePage
