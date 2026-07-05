// NoiseOverlay.jsx
import React, { useEffect, useState } from 'react';
import styles from './NoiseOverlay.module.css';

const NoiseOverlay = ({ 
  opacity = 0.5, 
  intensity = 1,
  zIndex = 9999,
  animated = true 
}) => {
  const [isDark, setIsDark] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Перевірка теми
    const checkTheme = () => {
      const isDarkMode = document.documentElement.classList.contains('dark-theme');
      setIsDark(isDarkMode);
    };

    // Перевірка reduced motion
    const checkReducedMotion = () => {
      setIsReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    };

    checkTheme();
    checkReducedMotion();

    // Слідкуємо за зміною теми
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Слідкуємо за зміною reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', checkReducedMotion);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener('change', checkReducedMotion);
    };
  }, []);

  const noiseStyle = {
    opacity: isDark ? opacity * 0.6 : opacity * 0.3,
    backgroundImage: `url('/noise${isDark ? '-dark' : ''}.png')`,
    zIndex: zIndex,
    animation: animated && !isReducedMotion ? 'noiseMove 0.5s steps(2) infinite' : 'none',
  };

  return (
    <div 
      className={styles.noise} 
      style={noiseStyle}
      aria-hidden="true"
    />
  );
};

export default NoiseOverlay;
