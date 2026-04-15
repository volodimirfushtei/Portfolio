import { useEffect, useRef } from "react"
import s from "./Overlay.module.css"
import { gsap } from "gsap"

const Overlay = () => {
  const blindsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = blindsRef.current.querySelectorAll(`.${s.line}`)
      gsap.fromTo(
        lines,
        {
          scaleY: 1,
        },
        {
          scaleY: 0,
          stagger: 0.08,
          ease: "power4.inOut",
          duration: 1.2,
        }
      )
    }, blindsRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={blindsRef} className={s.blinds}>
      {[...Array(12)].map((_, i) => (
        <div key={i} className={s.line} />
      ))}
    </div>
  )
}

export default Overlay
