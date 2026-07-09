import { useEffect, useState, useRef } from 'react'
import styles from './Loader.module.css'
import NoiseOverlay from '../NoiseOverlay/NoiseOverlay'
import Logo from '../Logo/Logo'
import gsap from 'gsap'

const ENTRANCE_FROM = {
  opacity: 0,
  scale: 0.5,
  filter: 'blur(20px)',
}

const ENTRANCE_TO = {
  opacity: 1,
  scale: 1,
  filter: 'blur(0px)',
  duration: 0.8,
  ease: 'expo.out',
}

const Loader = ({ onComplete }) => {
  const [isLoading, setIsLoading] = useState(true)
  const logoRef = useRef(null)
  const overlayRef = useRef(null)
  const topBarRef = useRef(null)
  const bottomBarRef = useRef(null)
  const noiseRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()
    const noiseTween = gsap.to(noiseRef.current, {
      opacity: 0.5,
      duration: 2,
      repeat: -1,
      yoyo: true,
    })

    tl.fromTo(
      overlayRef.current,
      { autoAlpha: 0, scale: 1.08, filter: 'blur(20px)' },
      { autoAlpha: 1, scale: 1, filter: 'blur(0px)', duration: 0.8, ease: 'expo.out' }
    )
      .fromTo(topBarRef.current, ENTRANCE_FROM, ENTRANCE_TO, )
      .fromTo(bottomBarRef.current, ENTRANCE_FROM, ENTRANCE_TO, )
      .fromTo(
        logoRef.current,
        { autoAlpha: 0, scale: 0.5, opacity: 0, filter: 'blur(30px)', clipPath: "inset(0 100% 0 0)", strokeDashoffset: '2512px' },
        {
          autoAlpha: 1,
          scale: 1.1,
          opacity: 1,
          filter: 'blur(0px)',clipPath: "inset(0 0% 0 0)",strokeDashoffset:"0",
          duration: 1,
          ease: 'expo.out',
        },
        '-=0.3'
      )
      .to({}, { duration: 0.8 })
      .to(overlayRef.current, {
        autoAlpha: 0,
        scale: 0.98,
        filter: 'blur(12px)',
        duration: 1,
        ease: 'power4.inOut',
        onComplete: () => {
          setIsLoading(false)
          onComplete?.()
        },
      })

    return () => {
      tl.kill()
      noiseTween.kill()
    }
  }, [])

  if (!isLoading) return null

  return (
    <div className={styles.overlay} ref={overlayRef}>
      <div className={styles.noise} ref={noiseRef}>
        <NoiseOverlay />
      </div>

      <div className={styles.logoWrap}>
        <div ref={logoRef}>
          <Logo />
        </div>
      </div>

      <div className={styles.topBar} ref={topBarRef}>
        <span className={styles.brandName}>VF / PORTFOLIO</span>
        <span className={styles.year}>2026</span>
      </div>

      <div className={styles.bottomBar} ref={bottomBarRef}>
        <span className={styles.statusText}>
          Frontend Engineer / Crafting Digital Excellence
        </span>
        <span className={styles.statusDot} />
      </div>
    </div>
  )
}

export default Loader
