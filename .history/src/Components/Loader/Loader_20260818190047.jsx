import { useEffect, useRef, useState } from 'react'
import styles from './Loader.module.css'
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
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const dividerRef = useRef(null)

  



  useEffect(() => {
    const ctx = gsap.context(() => {
      const logo = svgLogoRef.current
    


      if (!logo) return


      

      gsap.set(logo, {
        autoAlpha: 1,
        opacity: 1,

        scale: 1,
        svgRef: svgLogoRef,

        clearProps: 'filter',

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
       


        // Невелика пауза
        .to({}, {
          duration: 0.6,
        })
      tl.to(
        topBarRef.current  ,
        {
          opacity: 0,
          scale: 0.86,
          filter: 'blur(8px)',
          duration: 0.8,
          ease: 'expo.out',
        },
        '-=0.2',
      )
      tl.to(
        bottomBarRef.current,
        {
          opacity: 0,
          scale: 0.86,
          filter: 'blur(8px)',
          duration: 0.8,
          ease: 'expo.out',
        },
        '-=0.2',
      )
tl.to(
  logo,
  {
    opacity: 0,
    scale: 0.86,
    filter: 'blur(8px)',
    duration: 0.8,
    ease: 'expo.out',
  },
  '-=0.2',
)
 
      // -------------------------
      // Exit
      // -------------------------
      tl.fromTo(dividerRef.current,
        {
          height: 0,
          opacity: 0,
          y: 100,
        },
        {
          height: '100%',
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power4.out',
          delay: 0.5,
        },'-=0.3'
      )
   tl.to(
  [leftRef.current, rightRef.current],
  {
    xPercent: (index) => index === 0 ? -100 : 100,
    duration: 1.2,
    filter: 'blur(16px)',
    ease: 'expo.inOut',
  },
)

.call(() => {
  setIsLoading(false)
  onComplete?.()
})
    }, overlayRef)

    return () => ctx.revert()
  }, [onComplete])


  return (
    <div className={styles.overlay} ref={overlayRef}>
      
      
          <div className={styles.divider} ref={dividerRef} />
          <div ref={noiseRef}>
            <div
              ref={leftRef}
              className={`${styles.panel} ${styles.panelLeft}`}
            />
    
            <div
              ref={rightRef}
              className={`${styles.panel} ${styles.panelRight}`}
            />
    
    
          </div>
        
     


      <div className={styles.topBar} ref={topBarRef}>
        <span className={styles.brandName}>VF / PORTFOLIO</span>
        <span className={styles.year}>2026</span>
      </div>

      <div className={styles.logoWrap}>

        <Logo svgRef={svgLogoRef} className={styles.logoSvg} variant="large" />


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
