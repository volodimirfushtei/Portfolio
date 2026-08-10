import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import styles from './ExperienceTable.module.css'
import Counter from '../Counter/Counter'
import gsap from 'gsap'
import SplitText from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, SplitText)

const STATS = [
  {
    value: 3,
    suffix: '+',
    title: 'Years',
    subtitle: 'Experience',
    image: '/images/Workspace.webp',
  },
  {
    value: 15,
    suffix: '+',
    title: 'Projects',
    subtitle: 'Completed',
    image: '/images/Discussion.webp',
  },
  {
    value: 12,
    suffix: '+',
    title: 'Happy',
    subtitle: 'Clients',
    image: '/images/Coworking.webp',
  },
  {
    value: 20,
    suffix: '+',
    title: 'Modern',
    subtitle: 'Technologies',
    image: '/images/darkroom.webp',
  },
  {
    value: 3,
    suffix: '+',
    title: 'Languages',
    subtitle: 'Spoken',
    image: '/images/grungedark.webp',
  },
  {
    value: 4,
    suffix: '+',
    title: 'Professional',
    subtitle: 'Certificates',
    image: '/images/surrealis.webp',
  },
]

export default function ExperienceTable() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const gridRef = useRef(null)
  const imageRef = useRef(null)
  const [start, setStart] = useState(false)

  // Observer для секції
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Анімація заголовка
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

  // SplitText анімація
  useLayoutEffect(() => {
    document.fonts.ready.then(() => {
      let split = SplitText.create(titleRef.current, { type: 'words' })


      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
          delay: 1,
        },
      })
      tl.from(split.words, {
        opacity: 0,
        y: 20,
        duration: 1.5,
        ease: 'sine.out',
        stagger: 0.1,
      })

    })
  }, [])

  // Анімація карток при скролі

  const cards = gsap.utils.toArray(`.${styles.card}`)

  const handleMove = (e) => {
    gsap.to(cards, {
      flexGrow: 1,
      duration: 0.45,
      ease: 'power3.out',
    })

    gsap.to(e.currentTarget, {
      flexGrow: 2.2,
      duration: 0.45,
      ease: 'power3.out',

    })
  }

  const handleLeave = () => {
    gsap.to(cards, {
      flexGrow: 1,
      duration: 0.45,
      ease: 'power3.out',
    })
  }

  return (
    <section ref={sectionRef} className={styles.section}>
      {/* Хаотичні dividers */}
      <div
        className={styles.divider}
        style={{ top: '15%', left: '0%', transform: 'rotate(-10deg)' }}
      />
      <div
        className={styles.divider}
        style={{ top: '60%', right: '0%', transform: 'rotate(15deg)' }}
      />
      <div
        className={styles.divider}
        style={{ bottom: '10%', left: '20%', transform: 'rotate(5deg)' }}
      />

      <div className={styles.header}>
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowLine} />
          <span className={styles.eyebrowText}>My experience</span>
        </div>
        <h3 className={styles.title} ref={titleRef}>
          Building products
          <br />
          with modern technologies .
        </h3>
      </div>

      <div ref={gridRef} className={styles.grid}>
        {STATS.map((item, index) => (
          <article
            className={styles.card}
            key={item.title}
            onMouseEnter={handleMove}
            onMouseLeave={handleLeave}
          >
            {/* Номер картки */}
            <span className={styles.index}>
              {(index + 1).toString().padStart(2, '0')}
            </span>
            <svg className={styles.icon} width={28} height={28}>
              <use href="/sprite.svg#icon-target" />
            </svg>
            <img
              src={item.image}
              className={styles.image}
              alt={item.title}
              ref={imageRef}
            />
            {/* Лічильник */}
            <div className={styles.number}>
              <Counter value={item.value} suffix={item.suffix} start={start} />
            </div>

            {/* Текст */}
            <div className={styles.text}>
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
            </div>

            {/* Додатковий divider всередині картки */}
            <div className={styles.cardDivider} />
          </article>
        ))}
      </div>
    </section>
  )
}
