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
  const topBarRef = useRef(null)
  const bottomBarRef = useRef(null)
  const noiseRef = useRef(null)
  useEffect(() => {
 const tl = gsap.timeline();
gsap.to(noiseRef.current,{

opacity:.25,

duration:2,

repeat:-1,

yoyo:true

});
tl.fromTo(
  overlayRef.current,
  {
    autoAlpha: 0,
    scale: 1.03,
    filter: "blur(20px)",
  },
  {
    autoAlpha: 1,
    scale: 1,
    filter: "blur(0px)",
    duration: 1.2,
    ease: "expo.out",
  }
    );
    tl.fromTo(
      topBarRef.current,
      {
        opacity: 0,
       scale: 0.5,
        filter: "blur(20px)",
      },
      {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "expo.out",
      }
    )
    tl.fromTo(
  bottomBarRef.current,
  {
    opacity: 0,
    scale: 0.5,
    filter: "blur(20px)",
  },
  {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    duration: 1.2,
    ease: "expo.out",
  }
    );
  tl.fromTo(
    logoRef.current,
{
    autoAlpha:0,
    scale:.5,
    y:60,
    filter:"blur(30px)"
},
{
    autoAlpha:1,
    scale:1,
    y:0,
    filter:"blur(0px)",
    duration:1,
    ease:"expo.out"
},"-=0.3");
    tl.to({}, { duration: 1.2 });
    
    tl.to(overlayRef.current, {
  autoAlpha: 0,
  scale: 0.98,
  filter: "blur(12px)",
  duration: 1,
  ease: "power4.inOut",
  onComplete: () => {
    setIsLoading(false);
    onComplete?.();
  }
    });
    tl.to(overlayRef.current,{
    scale:1.02,
    duration:.4
})

.to(overlayRef.current,{
    autoAlpha:0,
    scale:1.08,
    filter:"blur(20px)",
    duration:.8,
    ease:"power4.inOut",
    onComplete(){
        setIsLoading(false);
        onComplete?.();
    }
});
  }, [])
  return (
    <div>
      {isLoading && (
        <div
          className={styles.overlay}
          ref={overlayRef}
        ><div className={styles.noise} ref={noiseRef} ><NoiseOverlay /></div>  
          
          <div className={styles.logoWrap} ref={logoRef}>
            <Logo  />
          </div>

          {/* Top bar */}
          <div className={styles.topBar} ref={topBarRef}>
            <span className={styles.brandName}>VF / PORTFOLIO</span>
            <span className={styles.year}>2026</span>
          </div>

          {/* Bottom bar */}
          <div className={styles.bottomBar} ref={bottomBarRef}>
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
