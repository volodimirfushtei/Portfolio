import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import styles from './ExperienceTable.module.css'
import Counter from '../Counter/Counter'
import gsap from 'gsap'
import SplitText from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(SplitText)
const STATS = [
  { value: 3, suffix: '+', title: 'Years', subtitle: 'Experience' },
  { value: 15, suffix: '+', title: 'Projects', subtitle: 'Completed' },
  { value: 12, suffix: '+', title: 'Happy', subtitle: 'Clients' },
  { value: 20, suffix: '+', title: 'Modern', subtitle: 'Technologies' },
  { value: 3, suffix: '+', title: 'Languages', subtitle: 'Spoken' },
  { value: 4, suffix: '+', title: 'Professional', subtitle: 'Certificates' },
]

export default function ExperienceTable() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const [start, setStart] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStart(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )

    observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useLayoutEffect(() => {

    document.fonts.ready.then(() => {
      gsap.set('.title', { opacity: 1 })
      let split = SplitText.create(titleRef.current, { type: 'words', aria: 'hidden' })

      gsap.from(split.words, {
        opacity: 0,
        duration: 2,
        ease: 'sine.out',
        stagger: 0.1,
      })
    })

  }, [])

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.header}>
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowLine} />
          <span className={styles.eyebrowText}>My experience</span>
        </div>

        <h2 className={styles.title} ref={titleRef}>
          Building products
          <br />
          with modern technologies.
        </h2>
      </div>

      <div className={styles.grid}>
        {STATS.map((item, index) => (
          <article className={styles.card} key={item.title}>
            <span className={styles.index}>
              {(index + 1).toString().padStart(2, '0')}
            </span>

            <div className={styles.number}>
              <Counter
                value={item.value}
                suffix={item.suffix}
                start={start}
              />
            </div>

            <div className={styles.text}>
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
