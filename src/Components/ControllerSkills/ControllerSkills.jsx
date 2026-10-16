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
  const wrapperRef = useRef(null)

  const items = [...techItems, ...techItems, ...techItems]
  useLayoutEffect(() => {
    const section = sectionRef.current
    const inner = innerRef.current
    const wrapper = wrapperRef.current.children

    if (!section || !inner || !wrapper) return

    const ctx = gsap.context(() => {
      const distance = inner.scrollWidth / 3

      gsap.to(wrapper, {
        xPercent: 20,
        width: '40%',
        height: '100%',
        duration: 1,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })

      const marquee = gsap.fromTo(
        inner,
        { x: 0 },
        {
          x: -distance,
          duration: 18,
          ease: 'none',
          repeat: -1,
        },
      )

      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate(self) {
          marquee.timeScale(
            gsap.utils.clamp(
              0.5,
              4,
              1 + Math.abs(self.getVelocity()) / 3000,
            ),
          )
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className={styles.section}>
      {/* Хаотичні dividers */}
      <div className={styles.wrapper} ref={wrapperRef}>
        <div className={styles.divider} style={{ top: '0%', left: '0%', width: '40%', transform: 'rotate(-2deg)' }} />
        <div className={styles.divider}
             style={{ top: '10%', right: '0%', height: '1px', transform: 'rotate(70deg)' }} />
        <div className={styles.divider}
             style={{ bottom: '0%', left: '20%', width: '70%', transform: 'rotate(30deg)' }} />
        <div className={styles.divider}
             style={{ top: '90%', left: '0%', height: '1px', transform: 'rotate(-85deg)' }} />
      </div>
      <div className={styles.eyebrow}>
        <span className={styles.eyebrowLine} />
        <h3 className={styles.eyebrowText}>Coding process and tools</h3>
      </div>

      <div className={styles.track}>
        {/* Перший трек */}
        <div className={styles.inner} ref={innerRef}>
          <div className={styles.devider} />
          {items.map((tech, i) => (
            <div
              key={`track1-${i}`}
              className={styles.card}

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
