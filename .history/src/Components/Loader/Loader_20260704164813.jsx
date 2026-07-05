import { useEffect, useState, useRef } from 'react'

import styles from './Loader.module.css'
import NoiseOverlay from '../NoiseOverlay/NoiseOverlay'
import Logo from '../Logo/Logo'
import gsap from 'gsap'

const Loader = ({ onComplete }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [showLogo, setShowLogo] = useState(false)
const logoRef = useRef(null)
  const overlayRef = useRef(null)

  useEffect(() => {
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: 'power4.out',
      onComplete: () => {
        setIsLoading(false)
        setShowLogo(true)
      },
    })
  }, [])
  return (
    <div>
      {isLoading && (
        <div
          className={styles.overlay}
          ref={overlayRef}
        >
          <NoiseOverlay />
          <div className={styles.logoWrap} ref={logoRef}>
            <Logo />
          </div>

          {/* Top bar */}
          <div className={styles.topBar}>
            <span className={styles.brandName}>VF / PORTFOLIO</span>
            <span className={styles.year}>2026</span>
          </div>

          {/* Bottom bar */}
          <div className={styles.bottomBar}>
            <span className={styles.statusText}>
              Frontend Engineer / Crafting Digital Excellence
            </span>
            <span className={styles.statusDot} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Loader
