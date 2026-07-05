import { useEffect, useState, useRef } from 'react'
import { AnimatePresence, color, motion } from 'framer-motion'
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
    const tl = gsap.timeline({
      defaults: { ease: 'power4.out' },
    })

    // Logo reveal
    tl.fromTo(
      `.${styles.logoWrap}`,
      { x: 80, opacity: 0, scale: 0.9 },
      { x: 0, opacity: 1, scale: 1, duration: 0.8 },
      2.5,
    )

    // Fade out overlay
    tl.to(
      `.${styles.overlay}`,
      {
        opacity: 0,
        duration: 1,
        onComplete: () => {
          setIsLoading(false)
          onComplete?.()
        },
      },
      4.2,
    )

    return () => tl.kill()
  }, [])

  return (
    <div>
      {isLoading && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
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
        </motion.div>
      )}
    </div>
  )
}

export default Loader
