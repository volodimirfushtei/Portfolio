import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './StickyZoomSection.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function StickyZoomSection() {
  const sectionRef = useRef(null)
  const zoomRef = useRef(null)
  const textBgRef = useRef(null)
  const textFgRef = useRef(null)
  const ctaRef = useRef(null)
  const imageRef = useRef(null)

  useLayoutEffect(() => {
    if (!sectionRef.current || !zoomRef.current || !ctaRef.current || !imageRef.current) return

    const ctx = gsap.context(() => {
      // Початкові значення
      gsap.set(zoomRef.current, { scale: 1, rotateY: 12 })
      gsap.set(imageRef.current, { scale: 1.15 })
      gsap.set(textBgRef.current, { opacity: 0, scale: 0.8 })
      gsap.set(textFgRef.current, { opacity: 0, scale: 0.6, y: 40, autoAlpha: 0 })
      gsap.set(ctaRef.current, { opacity: 0, y: 24, autoAlpha: 0 })

      // ScrollTrigger timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=300%',
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // Анімація тексту фону
      tl.to(textBgRef.current, {
        opacity: 0.65,
        scale: 1,
        duration: 1,
        ease: 'power2.out',
      }, 0)

        // Анімація zoom контейнера
        .to(zoomRef.current, {
          scale: 1,
          rotateY: 0,
          duration: 1.5,
          ease: 'power2.inOut',
        }, 0)

        // Анімація тексту переднього плану
        .to(textFgRef.current, {
          opacity: 1,
          scale: 1,
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: 'power3.out',
        })

        // Зникнення тексту фону
        .to(textBgRef.current, { opacity: 0, duration: 0.5 }, '<')

        // Зникнення тексту переднього плану
        .to(textFgRef.current, { opacity: 0, y: -50, duration: 0.5 }, '<')

        // Поява CTA
        .to(ctaRef.current, {
          opacity: 1,
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: 'back.out(1.4)',
        }, '-=0.5')

        // Збільшення зображення
        .to(imageRef.current, {
          scale: 1,
          duration: 1,
          ease: 'power2.in',
        }, '+=0.5')

        // Зникнення тексту переднього плану
        .to(textFgRef.current, {
          y: 200,
          opacity: 0,
          duration: 2.5,
          ease: 'power2.in',
        }, '+=0.5')

        // Зникнення zoom контейнера
        .to(zoomRef.current, {
          scale: 0.8,
          rotateY: -100,
          opacity: 0,
          duration: 1,
          ease: 'power2.in',
        }, '+=0.5')

    }, sectionRef)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} className={styles.section}>
      {/* Хаотичні dividers */}
      <div className={styles.divider} style={{ top: '10%', left: '5%', transform: 'rotate(-15deg)' }} />
      <div className={styles.divider} style={{ top: '60%', right: '10%', transform: 'rotate(20deg)' }} />
      <div className={styles.divider} style={{ bottom: '20%', left: '15%', transform: 'rotate(5deg)' }} />

      <div className={styles.stage}>
        {/* Background Text */}
        <div ref={textBgRef} className={styles.textBg}>
          <span>CREATIVE</span>
        </div>

        <div ref={zoomRef} className={styles.zoom}>
          <div className={styles.imageWrap}>
            <img src="/images/Camper.jpg" alt="github" ref={imageRef} />
          </div>
        </div>

        {/* Foreground Text */}
        <div ref={textFgRef} className={styles.textFg}>
          <span>DEVELOPER</span>
        </div>

        <a
          ref={ctaRef}
          href="https://github.com/volodimirfushtei"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cta}
        >
          <span className={styles.ctaText}>View GitHub →</span>
        </a>
      </div>
    </section>
  )
}
