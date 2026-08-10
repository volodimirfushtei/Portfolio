import { useEffect, useRef, useState } from 'react'
import styles from './Loader.module.css'
import NoiseOverlay from '../NoiseOverlay/NoiseOverlay'
import Logo from '../Logo/Logo'
import gsap from 'gsap'


const ENTRANCE_FROM = {
  opacity: 0,
  x: -50,
  scale: 0.5,
  filter: 'blur(4px)',

}

const ENTRANCE_TO = {
  opacity: 1,

  scale: 1,
  x: 0,
  filter: 'blur(0px)',
  duration: 0.8,
  ease: 'expo.out',
}

const Loader = ({ onComplete }) => {
  const [isLoading, setIsLoading] = useState(true)
  const svgLogoRef = useRef(null)
  const overlayRef = useRef(null)
  const topBarRef = useRef(null)
  const bottomBarRef = useRef(null)
  const noiseRef = useRef(null)
  const nameRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const logo = svgLogoRef.current
      gsap.from(overlayRef.current, {
          opacity: 0.5,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'expo.out',
          repeat: -1,
          yoyo: true,
        },
      )

      if (!logo) return

      const circles = logo.querySelectorAll('circle')
      const paths = logo.querySelectorAll('path')

      // -------------------------
      // Prepare SVG
      // -------------------------

      gsap.set(logo, {
        autoAlpha: 1,
        scale: 1,
        svgRef: svgLogoRef,

        clearProps: 'filter',
      })

      // Підготовка stroke для кіл
      circles.forEach((circle) => {
        const length = circle.getTotalLength?.()

        if (length) {
          gsap.set(circle, {
            strokeDasharray: length,
            strokeDashoffset: length,
          })
        }
      })

      // Підготовка V/F
      paths.forEach((path) => {
        const length = path.getTotalLength()

        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        })
      })

      // -------------------------
      // Timeline
      // -------------------------

      const tl = gsap.timeline({
        defaults: {
          overwrite: 'auto',
        },
      })

      tl.fromTo(
        overlayRef.current,
        {
          autoAlpha: 0,
          scale: 1.06,
          filter: 'blur(12px)',
        },
        {
          autoAlpha: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.7,
          ease: 'expo.out',
        },
      )

        // Header
        .fromTo(
          topBarRef.current,
          ENTRANCE_FROM,
          ENTRANCE_TO,
        )

        // Footer одночасно з header
        .fromTo(
          bottomBarRef.current,
          ENTRANCE_FROM,
          ENTRANCE_TO,
        )
        .fromTo(nameRef.current, ENTRANCE_FROM, ENTRANCE_TO)
        // -------------------------
        // SVG
        // -------------------------

        // Спочатку малюємо зовнішнє коло
        .to(circles[0], {
          strokeDashoffset: 0,
          duration: 1,
          ease: 'power2.inOut',
        })

        // Потім друге коло
        .to(circles[1], {
          strokeDashoffset: 0,
          duration: 0.8,
          ease: 'power2.out',
        })

        // Потім V
        .to(paths[0], {
          strokeDashoffset: 0,
          duration: 0.7,
          ease: 'power2.out',
        })

        // Потім F
        .to(paths[1], {
          strokeDashoffset: 0,
          duration: 0.7,
          ease: 'power2.out',
        })

        // Невелика пауза
        .to({}, {
          duration: 0.6,
        })

        // -------------------------
        // Exit
        // -------------------------

        .to(overlayRef.current, {
          clipPath: 'inset(0 0 0 100%)',
          scale: 1.03,
          duration: 1.2,
          ease: 'power4.inOut',

          onComplete: () => {
            setIsLoading(false)
            onComplete?.()
          },
        })

      return () => {
        tl.kill()
      }
    }, svgLogoRef)

    return () => ctx.revert()
  }, [onComplete])
  if (!isLoading) return null

  return (
    <div className={styles.overlay} ref={overlayRef}>


      <div ref={noiseRef}>
        <NoiseOverlay />
      </div>

      <div className={styles.topBar} ref={topBarRef}>
        <span className={styles.brandName}>VF / PORTFOLIO</span>
        <span className={styles.year}>2026</span>
      </div>
      <div className={styles.logoWrap}>
        <div>
          <Logo svgRef={svgLogoRef} />
        </div>
        <div className={styles.name} ref={nameRef}>
          <svg className={styles.svg}>
            <use href="/sprite.svg#trademark-registered" />

          </svg>
          Fush
        </div>
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
