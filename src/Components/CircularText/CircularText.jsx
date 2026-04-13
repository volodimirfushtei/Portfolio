import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import styles from "./CircularText.module.css";

const CircularText = ({ speed = 12, paused = false, reverse = false }) => {
  const circleRef = useRef(null);
  const animationRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Перевірка на мобільний пристрій
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Перевірка на prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Intersection Observer для відкладеної анімації
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (circleRef.current) {
      observer.observe(circleRef.current.parentElement);
    }

    return () => observer.disconnect();
  }, []);

  // Анімація обертання
  useEffect(() => {
    if (!isVisible || !circleRef.current) return;
    if (prefersReducedMotion) return;

    // Зменшуємо швидкість на мобільних
    const rotationSpeed = isMobile ? speed * 1.5 : speed;
    const direction = reverse ? -360 : 360;

    animationRef.current = gsap.to(circleRef.current, {
      rotate: direction,
      duration: rotationSpeed,
      repeat: -1,
      ease: "none",
      transformOrigin: "50% 50%",
      paused: paused,
    });

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [isVisible, speed, paused, reverse, isMobile, prefersReducedMotion]);

  // Пауза анімації при втраті видимості (опціонально)
  useEffect(() => {
    if (!animationRef.current) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        animationRef.current.pause();
      } else {
        animationRef.current.resume();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return (
    <div className={styles.wrap}>
      <svg
        ref={circleRef}
        viewBox="0 0 200 200"
        className={styles.svg}
        aria-hidden="true"
        style={{ willChange: 'transform' }}
      >
        <path
          id="circlePath"
          d="M 100,100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
          fill="none"
        />
        <text fill="currentColor" className={styles.text}>
          <textPath href="#circlePath" startOffset="0%" textLength="470">
            • Creative Developer • Designer • Engineer •
          </textPath>
        </text>
      </svg>

      {/* Center dot */}
      <div className={styles.centerDot} aria-hidden="true" />
    </div>
  );
};

export default CircularText;
