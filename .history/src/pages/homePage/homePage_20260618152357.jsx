import React, { useState, useEffect, useRef, Suspense, lazy, useMemo, useCallback } from 'react';
import styles from './homePage.module.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';

// Components
import ControllerSkills from '../../Components/ControllerSkills/ControllerSkills.jsx';
import Footer from '../../Components/Footer/Footer.jsx';
import Expertise from '../../Components/Expertise/Expertise';
import Carusel from '../../Components/Carusel/Carusel.jsx';
import HeroSection from '../../Components/HeroSection/HeroSection.jsx';
import Sertificate from '../../Components/Sertificate/Sertificate.jsx';
import CtaSection from '../../Components/CtaSection/CtaSection.jsx';
import StickyZoomSection from '../../Components/StickyZoomSection/StickyZoomSection.jsx';
import NoiseOverlay from '../../Components/NoiseOverlay/NoiseOverlay.jsx';

// Lazy load 3D Model
const Model = lazy(() => import('../../Components/Model/Model.jsx'));

gsap.registerPlugin(ScrollTrigger);

// Constants
const SKILLS_DATA = [
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
];

// Loading Fallback Component
const LoadingFallback = () => (
  <div className={styles.canvasFallback} role="status" aria-label="Loading 3D scene">
    <div className={styles.loadingSpinner} />
    <span>Loading 3D experience...</span>
  </div>
);

// Error Fallback Component
const ErrorFallback = ({ onRetry }) => (
  <div className={styles.canvasErrorContainer}>
    <div className={styles.canvasError}>
      <p className={styles.canvasErrorText}>⚠️ 3D experience unavailable</p>
      <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
        Your device may not support WebGL or the scene is too complex.
      </p>
      <button 
        onClick={onRetry} 
        className={styles.canvasErrorBtn}
        aria-label="Retry loading 3D scene"
      >
        Try Again
      </button>
    </div>
  </div>
);

const HomePage = () => {
  // State
  const [progress, setProgress] = useState(0);
  const [canvasKey, setCanvasKey] = useState(0);
  const [contextLost, setContextLost] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isCanvasSupported, setIsCanvasSupported] = useState(true);
  const [errorCount, setErrorCount] = useState(0);

  // Refs
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const scrollRAF = useRef(null);

  // Memoized values
  const canvasProps = useMemo(() => ({
    camera: { fov: 45, near: 0.1, far: 2000, position: [0, 0, 100] },
    dpr: isMobile ? [1, 1.5] : [1, 2],
    style: { pointerEvents: 'none' }
  }), [isMobile]);

  // Device detection with debounce
  useEffect(() => {
    let timeoutId;
    const checkMobile = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const mobile = window.innerWidth <= 768;
        setIsMobile(mobile);
      }, 250);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timeoutId);
    };
  }, []);

  // Optimized scroll progress with requestAnimationFrame
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRAF.current) {
        cancelAnimationFrame(scrollRAF.current);
      }

      scrollRAF.current = requestAnimationFrame(() => {
        if (!sectionRef.current) return;
        
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollProgress = Math.min(
          1,
          Math.max(0, -rect.top / (rect.height - window.innerHeight))
        );
        
        setProgress(scrollProgress);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollRAF.current) {
        cancelAnimationFrame(scrollRAF.current);
      }
    };
  }, []);

  // WebGL context handling with retry logic
  useEffect(() => {
    const canvas = canvasRef.current?.querySelector('canvas');
    if (!canvas) return;

    const handleContextLost = (e) => {
      e.preventDefault();
      console.warn('WebGL context lost');
      setContextLost(true);
      setErrorCount(prev => prev + 1);
    };

    const handleContextRestored = () => {
      console.log('WebGL context restored');
      setContextLost(false);
      setCanvasKey(prev => prev + 1);
    };

    canvas.addEventListener('webglcontextlost', handleContextLost);
    canvas.addEventListener('webglcontextrestored', handleContextRestored);

    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, []);

  // Handle retry
  const handleRetry = useCallback(() => {
    setErrorCount(0);
    setContextLost(false);
    setCanvasKey(prev => prev + 1);
    setIsCanvasSupported(true);
  }, []);

  // Show error if too many failures
  if (errorCount >= 3) {
    return <ErrorFallback onRetry={handleRetry} />;
  }

  // Mobile fallback
  if (isMobile) {
    return (
      <div className={styles.container}>
        <section className={styles.heroSectionWrapper}>
          <HeroSection />
        </section>
        <main className={styles.main}>
          <section id="expertise" className={styles.section}>
            <Expertise />
          </section>
          <section id="skills" className={styles.section}>
            <ControllerSkills items={SKILLS_DATA} />
          </section>
          <section id="projects" className={styles.section}>
            <Carusel />
            <CtaSection />
            <Sertificate />
            <StickyZoomSection />
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div id="scroll-container" className={styles.gridBg}>
      <div className={styles.container} ref={sectionRef}>
        {/* 3D Canvas - Desktop Only */}
        <div className={styles.canvasWrapper} ref={canvasRef}>
          {contextLost ? (
            <div className={styles.canvasFallback}>
              <span>🎨 Recovering 3D scene...</span>
            </div>
          ) : (
            <Canvas key={canvasKey} {...canvasProps}>
              <color attach="background" args={["#0d0d0d"]} />
              <fog attach="fog" args={["#0d0d0d", 0, 100]} />
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              
              <Suspense fallback={<LoadingFallback />}>
                <Model progress={progress} />
              </Suspense>
              
              <Preload all />
            </Canvas>
          )}
        </div>

        {/* Content Sections */}
        <section className={styles.heroSectionWrapper} id="hero">
          <HeroSection />
        </section>

        <main className={styles.main}>
          <section id="expertise" className={styles.section}>
            <Expertise />
          </section>
          
          <section id="skills" className={styles.section}>
            <ControllerSkills items={SKILLS_DATA} />
          </section>
          
          <section id="projects" className={styles.section}>
            <Carusel />
            <CtaSection />
            <Sertificate />
            <StickyZoomSection />
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
