import React, { useLayoutEffect, useRef } from 'react'
import styles from './SiteGrid.module.css'
import gsap from 'gsap'

const verticalLines = [
  { left: '5%' },
  { left: '50%' },
  { right: '5%' },
]

const SiteGrid = ({ loading }) => {

  const gridRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: 'power4.out' },

      })
      if (!loading) return
      const lines = gridRef.current.querySelectorAll(`.${styles.vertical}`)

      timeline.to(
        lines,

        {
          scaleY: 1,
          opacity: 0.85,
          duration: 1.2,
          stagger: 0.15,

        },
      )
    })
    ctx.revert()
  }, [loading])


  return (
    <div className={styles.siteGrid} aria-hidden="true" ref={gridRef}>
      {verticalLines.map((line, index) => (
        <span
          key={index}
          className={styles.vertical}
          style={line}
        />
      ))}
    </div>
  )
}

export default SiteGrid
