import { useRef, useLayoutEffect } from 'react'
import styles from './ControllerSkills.module.css'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const techItems = [
  {
    name: 'React',
    icon: 'icon-react',
    description: 'Library',
  },
  {
    name: 'Next.js',
    icon: 'icon-nextjs',
    description: 'Framework',
  },
  {
    name: 'JavaScript',
    icon: 'icon-javascript',
    description: 'Language',
  },
  {
    name: 'Node.js',
    icon: 'icon-nodejs',
    description: 'Runtime',
  },
  {
    name: 'MongoDB',
    icon: 'icon-mongodb',
    description: 'Database',
  },
  {
    name: 'GSAP',
    icon: 'icon-mongodb',
    description: 'Database',
  }
  ,{
    name: 'Figma',
    icon: 'icon-figma',
    description: 'Design',
  },
  {
    name: 'Angular',
    icon: 'icon-angular',
    description: 'Framework',
  }
]

export default function ControllerSkills() {
  const sectionRef = useRef(null)
const innerRef = useRef(null)
const innerRef2 = useRef(null)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
    
   const cards = gsap.utils.toArray(innerRef.current,innerRef2.current);
gsap.from(cards, {
  y: 60,
  autoAlpha: 0,
  scale: 0.96,
  duration: 1,
  stagger: 0.08,
  ease: "expo.out",
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "top 75%",
    once: true,
  },
});

gsap.to(innerRef.current, {
  xPercent: -15,
  ease: "none",
 repeat:1,
 duration: 60,
 scrollTrigger: {
    trigger: sectionRef.current,
    start: "top bottom",
    end: "bottom top",
    scrub: 1,
  },
});

gsap.to(innerRef2.current, {
  xPercent: 15,
  ease: "none",
  repeat:1,
 duration: 80,
 scrollTrigger: {
    trigger: sectionRef.current,
    start: "top bottom",
    end: "bottom top",
    scrub: 1,
  },
});


    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.header}>
        <span className={styles.line} />
        <h3 className={styles.heading}>Coding process and tools</h3>
      </div>

      <div className={styles.track}>
        <div className={styles.inner} ref={innerRef}>
          <div className={styles.devider}/>
          {[...techItems, ...techItems].map((tech, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardContent}>
                <svg
                  className={styles.icon}
                  aria-hidden="true"
                  focusable="false"
                >
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

        <div className={styles.inner} ref={innerRef2}>
          <div className={styles.devider}/>
          {[...techItems, ...techItems].map((tech, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardContent}>
                <svg
                  className={styles.icon}
                  aria-hidden="true"
                  focusable="false"
                >
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
