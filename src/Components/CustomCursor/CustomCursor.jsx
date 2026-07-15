import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './CustomCursor.module.css'

const CustomCursor = () => {
  const location = useLocation()
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const smoothX = useSpring(cursorX, { stiffness: 300, damping: 25 })
  const smoothY = useSpring(cursorY, { stiffness: 300, damping: 25 })
  const [ripples, setRipples] = useState([])
  const [hoverText, setHoverText] = useState('')
  const [isHovering, setIsHovering] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const rippleId = useRef(0)
  const isMobile = useRef(false)

  useEffect(() => {
    // Перевірка на мобільний пристрій
    isMobile.current = window.innerWidth < 768
    if (isMobile.current) return

    // Initial position
    cursorX.set(window.innerWidth / 2)
    cursorY.set(window.innerHeight / 2)

    const move = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const enter = () => setIsHidden(false)
    const leave = () => setIsHidden(true)
    const click = (e) => {
      const ripple = {
        id: rippleId.current++,
        x: e.clientX,
        y: e.clientY,
      }

      setRipples(prev => [...prev, ripple])

      setTimeout(() => {
        setRipples(prev =>
          prev.filter(r => r.id !== ripple.id),
        )
      }, 200)
    }


    // Оновлення при ресайзі
    const handleResize = () => {
      isMobile.current = window.innerWidth < 768
      if (isMobile.current) {
        document.body.classList.remove(styles.noCursorBody)
      } else {
        document.body.classList.add(styles.noCursorBody)
      }
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', click)
    window.addEventListener('mouseenter', enter)
    window.addEventListener('mouseleave', leave)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', click)
      window.removeEventListener('mouseenter', enter)
      window.removeEventListener('mouseleave', leave)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const handlePointerMove = (e) => {
      const target = e.target.closest(
        '[data-cursor],button,a,input,textarea,select',
      )

      if (!target) {
        setIsHovering(false)
        setHoverText('')
        return
      }

      setIsHovering(true)
      setHoverText(target.dataset.cursorText || '')
    }

    document.addEventListener('pointermove', handlePointerMove)

    return () => {
      document.removeEventListener('pointermove', handlePointerMove)
    }

  }, [location])


  // Не рендеримо на мобільних
  if (typeof window !== 'undefined' && window.innerWidth < 768) return null

  return (
    <>
      <motion.div
        className={`${styles.cursor} ${isHovering ? styles.hovering : ''} ${isHidden ? styles.hidden : ''}`}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      >
        <div className={styles.cursorTextInner}>
          {hoverText && (
            <span className={styles.cursorText}>
              {hoverText}
            </span>
          )}
        </div>
      </motion.div>
      <AnimatePresence mode="popLayout">
        {ripples.map((r) => (
          <motion.div
            key={r.id}
            className={styles.ripple}
            initial={{
              scale: 0.5,
              opacity: 1,
            }}
            animate={{
              scale: 3.5,
              opacity: 0,
            }}
            exit={{
              scale: 4,
              opacity: 0,
            }}
            transition={{
              duration: 0.8,
              ease: 'easeOut',
            }}
            style={{
              position: 'fixed',
              left: 0,
              top: 0,
              x: r.x,
              y: r.y,
              pointerEvents: 'none',
              zIndex: 9998,
              translateX: '-50%',
              translateY: '-50%',
            }}
          />
        ))}
      </AnimatePresence>
    </>
  )
}

export default CustomCursor
