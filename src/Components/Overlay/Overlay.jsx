import { useEffect, useRef } from 'react'
import s from './Overlay.module.css'
import { gsap } from 'gsap'
import { useOverlay } from '../OverlayProvider/OverlayProvider.jsx'

const Overlay = () => {
  const blindsRef = useRef(null)
  const { animationFinished, hide } = useOverlay()
  useEffect(() => {
    const lines = blindsRef.current.querySelectorAll(`.${s.line}`)

    const tl = gsap.timeline()

    // Закриваємо екран
    tl.to(lines, {
      scaleY: 1,
      duration: 0.8,
      stagger: 0.02,
      ease: 'expo.inOut',
      onComplete: animationFinished, // <-- тут
    }, '-=0.2')

    // Відкриваємо нову сторінку
    tl.to(lines, {
      scaleY: 0,
      transformOrigin: 'top',
      duration: 0.8,
      stagger: {
        each: 0.02,
        from: 'end',
      },
      ease: 'expo.inOut',
      onComplete: hide,
    })
    tl.to(blindsRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: 'expo.inOut',
    })

    return () => tl.kill()
  }, [])

  return (
    <div ref={blindsRef} className={s.blinds}>
      {[...Array(8)].map((_, i) => (
        <div key={i} className={s.line} />
      ))}
    </div>
  )
}

export default Overlay
