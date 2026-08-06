import { useEffect, useRef, useState } from 'react'
import styles from './Loader.module.css'
import NoiseOverlay from '../NoiseOverlay/NoiseOverlay'
import Logo from '../Logo/Logo'
import gsap from 'gsap'


const ENTRANCE_FROM = {
  opacity: 0,

  scale: 0.5,
  filter: 'blur(4px)',

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
  const dividerRefs = useRef([])
  const columns = Array.from({ length: 48 })


  useEffect(() => {
    const tl = gsap.timeline()

    const noiseTween = gsap.to(noiseRef.current, {
      opacity: 0,
      duration: 2,
      ease: 'power2.inOut',
      repeat: -1,
      yoyo: true,
    })

    tl.fromTo(
      overlayRef.current,
      { autoAlpha: 0, scale: 1.08, filter: 'blur(20px)' },
      { autoAlpha: 1, scale: 1, filter: 'blur(0px)', duration: 0.8, ease: 'expo.out' },
    )
      .fromTo(topBarRef.current, ENTRANCE_FROM, ENTRANCE_TO)
      .fromTo(bottomBarRef.current, ENTRANCE_FROM, ENTRANCE_TO)


      .fromTo(
        logoRef.current,
        {
          autoAlpha: 0,
          scale: 0.5,
          opacity: 0,
          filter: 'blur(20px)',
          clipPath: 'inset(0 100% 0 0)',
          strokeDashoffset: '2512px',
        },
        {
          autoAlpha: 1,
          scale: 1.5,
          opacity: 1,
          filter: 'blur(0px)', clipPath: 'inset(0 0% 0 0)', strokeDashoffset: '0',
          duration: 1,
          ease: 'expo.out',
        },
        '-=0.3',
      )
      .fromTo(
        dividerRefs.current,
        {
          scaleY: 0,
          opacity: 0,
          y:
            -300,
        },
        {
          scaleY: 1,
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: {
            each: 0.015,
            from: 'center',
          },
          ease: 'expo.out',
        },
      )
      .to(dividerRefs.current, {
        scaleY: 1.2,
        duration: .35,
        stagger: {
          each: .01,
          yoyo: true,
          repeat: 1,
          from: 'edges',
        },
        ease: 'sine.inOut',
      })

      .to(dividerRefs.current, {
        scaleY: 0,
        opacity: 0,
        y: -500,
        duration: .8,
        stagger: {
          each: .008,
          from: 'random',
        },
        ease: 'power4.in',
      })
      .to({}, { duration: 0.8 })

      .to(overlayRef.current, {
        autoAlpha: 0,
        scale: 1.15,

        clipPath: 'inset(0 0% 100% 0)',
        filter: 'blur(12px)',
        duration: 1.2,
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


      <div ref={noiseRef}>
        <NoiseOverlay />
      </div>


      <div className={styles.columns}>
        {columns.map((_, i) => (
          <span
            key={i}
            ref={(el) => (dividerRefs.current[i] = el)}
            className={styles.column}
            style={{
              left: `${(i / 20) * 100}%`,
              height: `${20 + Math.random() * 80}%`,
              opacity: 0.2 + Math.random() * 0.8,

            }}
          />
        ))}
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
