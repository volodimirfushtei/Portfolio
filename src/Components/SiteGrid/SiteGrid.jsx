import React, { useLayoutEffect, useRef } from 'react'
import styles from './SiteGrid.module.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
const verticalLines = [
  { left: '4%' },
  { left: '2%' },
  { left: '50%' },
  { right: '4%' },
  { right: '2%' },
]
const arrowsDown = [{ icon: 'icon-chevron-down' }, { icon: 'icon-chevron-down' }, { icon: 'icon-chevron-down' }, { icon: 'icon-chevron-down' }, { icon: 'icon-chevron-down' }]
const arrowsUp = [{ icon: 'icon-chevron-up' }, { icon: 'icon-chevron-up' }, { icon: 'icon-chevron-up' }, { icon: 'icon-chevron-up' }, { icon: 'icon-chevron-up' }]
const SiteGrid = ({ loading }) => {

  const gridRef = useRef(null)
  const arrowsRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  useLayoutEffect(() => {
    if (!gridRef.current || loading) return

    const ctx = gsap.context(() => {
      const leftArrows = leftRef.current.querySelectorAll(`.${styles.arrowItemLeft}`)
      const rightArrows = rightRef.current.querySelectorAll(`.${styles.arrowItemRight}`)

      gsap.from([leftArrows, rightArrows], {
        y: -100,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: arrowsRef.current,
          start: 'top 80%',
          end: 'top 20%',

          toggleActions: 'play none none reverse',
          repeat: -1,


        },
      })

      const timeline = gsap.timeline({
        defaults: {
          ease: 'power4.out',
        },
      })

      const lines = gridRef.current.querySelectorAll(
        `.${styles.vertical}`,
      )

      timeline.fromTo(
        lines,
        {
          scaleY: 0,
          opacity: 0,
        },
        {
          scaleY: 1,
          opacity: 0.25,
          duration: 1.2,
          stagger: 0.15,
        },
      )
    }, gridRef)

    return () => ctx.revert()
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
      <div className={styles.sideArrows} ref={arrowsRef}>
        <div className={styles.leftArrows} ref={leftRef}>
          {arrowsDown.map((arrow, index) => (
            <div className={styles.arrowItemLeft} key={index}>
      <span className={styles.arrowNumber}>
        {String(index + 1).padStart(2, '0')}
      </span>
              <svg className={styles.icon} width="14" height="14">
                <use href={`/sprite.svg#${arrow.icon}`} />
              </svg>
            </div>
          ))}
        </div>

        <div className={styles.rightArrows} ref={rightRef}>
          {arrowsUp.map((arrow, index) => (
            <div className={styles.arrowItemRight} key={index}>
            <span className={styles.arrowNumber}>
              {String(index + 1).padStart(2, '0')}
            </span>
              <svg
                key={index}
                className={styles.icon}
                width="14"
                height="14"
                aria-hidden="true"
              >
                <use href={`/sprite.svg#${arrow.icon}`} />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SiteGrid
