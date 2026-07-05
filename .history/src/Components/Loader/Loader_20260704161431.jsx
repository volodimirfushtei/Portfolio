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
  const [showSlides, setShowSlides] = useState(false)
  const [showName, setShowName] = useState(false)

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power4.out' },
    })

    // Progress counter
    let obj = { value: 0 }

    tl.to(
      obj,
      {
        value: 100,
        duration: 4,
        ease: 'power2.out',
        onUpdate: () => {
          setProgress(Math.floor(obj.value))
        },
      },
      0,
    )

    // Name reveal
    tl.to(
      `.${styles.nameSpan}`,
      {
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 1.2,
      },
      0.6,
    )

    // Slides reveal
    tl.fromTo(
      `.${styles.previewSlide}`,
      { x: 80, opacity: 0, scale: 0.9 },
      { x: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.8 },
      2,
    )

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

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        setIsLoading(false)
        if (onComplete) onComplete()
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [progress, onComplete])

  const digits = String(Math.min(progress, 100)).padStart(3, '0').split('')

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
          <div className={styles.logoWrap}>
            <Logo />
          </div>

          {/* Curtain panels - залишаємо без змін */}

          <motion.div
            className={styles.slidesWrapper}
            initial={{ opacity: 0, x: 100 }}
            animate={showSlides ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className={styles.slidesHint}>Loading portfolio projects...</p>
          </motion.div>

          {/* Top bar */}
          <div className={styles.topBar}>
            <span className={styles.brandName}>VF / PORTFOLIO</span>
            <span className={styles.year}>2026</span>
          </div>

         

          {/* Progress track */}
          <div className={styles.trackWrap}>
            <div className={styles.track}>
              <motion.div
                className={styles.fill}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className={styles.trackLabels}>
              <span className={styles.trackLabel}>System.load</span>
              <span className={styles.trackLabel}>Verified</span>
            </div>
          </div>

          {/* Bottom bar */}
          <div className={styles.bottomBar}>
            <span className={styles.statusText}>
              Frontend Engineer / Crafting Digital Excellence
            </span>
            <motion.span
              className={styles.statusDot}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: 'easeInOut',
              }}
            />
          </div>

          {/* Fade out overlay */}
          {progress >= 100 && (
            <motion.div
              className={styles.fadeOut}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            />
          )}
        </motion.div>
      )}
    </div>
  )
}

export default Loader
