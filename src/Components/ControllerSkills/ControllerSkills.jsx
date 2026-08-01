import { useLayoutEffect, useRef } from 'react'
import styles from './ControllerSkills.module.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const techItems = [
  { name: 'React', icon: 'icon-react', description: 'Library' },
  { name: 'Next.js', icon: 'icon-nextjs', description: 'Framework' },
  { name: 'JavaScript', icon: 'icon-javascript', description: 'Language' },
  { name: 'Node.js', icon: 'icon-nodejs', description: 'Runtime' },
  { name: 'MongoDB', icon: 'icon-mongodb', description: 'Database' },
  { name: 'GSAP', icon: 'icon-gsap', description: 'Animations' },
  { name: 'Figma', icon: 'icon-figma', description: 'Design' },
  { name: 'Angular', icon: 'icon-angular', description: 'Framework' },
]

export default function ControllerSkills() {
  const sectionRef = useRef(null)
  const innerRef = useRef(null)
  const innerRef2 = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Анімація входу для карток
      const cards = gsap.utils.toArray(`.${styles.card}`)
      gsap.from(cards, {
        y: 60,
        autoAlpha: 0,
        scale: 0.96,
        duration: 1,
        stagger: 0.08,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      })

      // Перший трек рухається вліво
      gsap.to(innerRef.current, {
        xPercent: -30,
        ease: 'none',
        duration: 60,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })

      // Другий трек рухається вправо
      gsap.to(innerRef2.current, {
        xPercent: 30,
        ease: 'none',
        duration: 80,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className={styles.section}>
      {/* Хаотичні dividers */}
      <div className={styles.divider} style={{ top: '0%', left: '0%', width: '100%', transform: 'rotate(-2deg)' }} />
      <div className={styles.divider} style={{ top: '10%', right: '0%', height: '80%', transform: 'rotate(90deg)' }} />
      <div className={styles.divider} style={{ bottom: '0%', left: '0%', width: '100%', transform: 'rotate(3deg)' }} />
      <div className={styles.divider} style={{ top: '20%', left: '10%', height: '60%', transform: 'rotate(-85deg)' }} />

      <div className={styles.eyebrow}>
        <span className={styles.eyebrowLine} />
        <h3 className={styles.eyebrowText}>Coding process and tools</h3>
      </div>

      <div className={styles.track}>
        {/* Перший трек */}
        <div className={styles.inner} ref={innerRef}>
          <div className={styles.devider} />
          {[...techItems, ...techItems].map((tech, i) => (
            <div
              key={`track1-${i}`}
              className={styles.card}
              style={{ transform: `rotate(${i % 2 === 0 ? '2deg' : '-2deg'})` }}
            >
              <div className={styles.cardContent}>
                <svg className={styles.icon} aria-hidden="true" focusable="false">
                  <use href={`/sprite.svg#${tech.icon}`} />
                </svg>
                <div>
                  <div className={styles.name}>{tech.name}</div>
                  <div className={styles.desc}>{tech.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Другий трек */}
        <div className={styles.inner} ref={innerRef2}>
          <div className={styles.devider} />
          {[...techItems, ...techItems].map((tech, i) => (
            <div
              key={`track2-${i}`}
              className={styles.card}
              style={{ transform: `rotate(${i % 2 === 0 ? '-2deg' : '2deg'})` }}
            >
              <div className={styles.cardContent}>
                <svg className={styles.icon} aria-hidden="true" focusable="false">
                  <use href={`/sprite.svg#${tech.icon}`} />
                </svg>
                <div>
                  <div className={styles.name}>{tech.name}</div>
                  <div className={styles.desc}>{tech.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
