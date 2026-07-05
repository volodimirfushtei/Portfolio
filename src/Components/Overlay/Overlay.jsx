import { useEffect, useRef } from 'react'
import s from './Overlay.module.css'
import { gsap } from 'gsap'

const Overlay = () => {
  const blindsRef = useRef(null)

  useEffect(() => {
    const lines = blindsRef.current.querySelectorAll(`.${s.line}`)

    const tl = gsap.timeline()

    // Phase 1: Strips sweep in from bottom (cover the page)
    tl.fromTo(
      lines,
      { scaleY: 0, transformOrigin: 'bottom' },
      {
        scaleY: 1,
        duration: 0.35,
        stagger: { each: 0.04, from: 'start' },
        ease: 'power3.inOut',
      }
    )

    // Phase 2: Strips retract upward (reveal the new page)
    tl.to(lines, {
      scaleY: 0,
      transformOrigin: 'top',
      duration: 0.35,
      stagger: { each: 0.04, from: 'end' },
      ease: 'power3.inOut',
    }, '+=0.03')

    return () => tl.kill()
  }, [])

  return (
    <div ref={blindsRef} className={s.blinds}>
      {[...Array(16)].map((_, i) => (
        <div key={i} className={s.line} />
      ))}
    </div>
  )
}

export default Overlay
