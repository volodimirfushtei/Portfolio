import React, { useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Sertificate.module.css'

gsap.registerPlugin(ScrollTrigger)

const Certificate = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isMobile, setIsMobile] = useState(false)
  const cardRef = useRef(null)
  const shineRef = useRef(null)
  const bgRef = useRef(null)
  const bg2Ref = useRef(null)
  const bg3Ref = useRef(null)
  const sectionRef = useRef(null)
  const timeRef = useRef(null)

  // ── Responsive Check ──
  useEffect(() => {
    const check = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // ── Time update ──
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formattedTime = currentTime.toLocaleTimeString('uk-UA', {
    hour: '2-digit',
    minute: '2-digit',
  })

  // ── GSAP Magnetic Tilt ──
  const handleMouseMove = useCallback((e) => {
    if (isMobile || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    gsap.to(cardRef.current, {
      rotateX: (y - centerY) / 20,
      rotateY: (centerX - x) / 20,
      duration: 0.5,
      ease: 'power2.out',
    })
  }, [isMobile])

  const handleMouseLeave = useCallback(() => {
    if (isMobile || !cardRef.current) return
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: 'power2.out',
    })
  }, [isMobile])

  // ── Shine Animation ──
  useEffect(() => {
    if (!shineRef.current) return
    gsap.set(shineRef.current, { xPercent: -180 })
    gsap.to(shineRef.current, {
      xPercent: 560,
      duration: 1.8,
      ease: 'power2.inOut',
      repeat: -1,
      repeatDelay: 2.5,
    })
  }, [])

  // ── Background Animations ──
  useEffect(() => {
    // Анімація фону
    gsap.to(bgRef.current, {
      scale: 1.1,
      duration: 16,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    // Паралакс для фонових елементів
    gsap.to(bgRef.current, {
      yPercent: -18,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    gsap.to(bg2Ref.current, {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })


    // Анімація часу
    gsap.from(timeRef.current, {
      opacity: 0,
      y: -20,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
    })
  }, [])

  return (
    <section className={styles.section} ref={sectionRef}>
      {/* Хаотичні dividers */}
      <div className={styles.divider} style={{ top: '10%', left: '5%', transform: 'rotate(-15deg)' }} />
      <div className={styles.divider} style={{ top: '30%', right: '10%', transform: 'rotate(20deg)' }} />
      <div className={styles.divider} style={{ bottom: '20%', left: '15%', transform: 'rotate(5deg)' }} />
      <div className={styles.divider} style={{ top: '60%', right: '20%', transform: 'rotate(-25deg)' }} />

      {/* Фонові елементи */}
      <div className={styles.noise} aria-hidden="true" />
      <div ref={bgRef} className={styles.bgWord}>CERTIFIED</div>
      <div ref={bg2Ref} className={styles.bgWord2}>
        <div className={styles.bgWordInner}>GOIT / FULLSTACK / 2025</div>
      </div>
      <div ref={bg3Ref} className={styles.bgWord3}>
        FRONTEND • REACT • NEXT • GSAP • TYPESCRIPT • Framer
      </div>

      <div className={styles.wrapper}>
        {/* Інформаційна частина (хаотично розташована) */}
        <div className={styles.infoContainer}>
          <div className={styles.infoSubtitle}>
            <span className={styles.eyebrowLine} />
            <span className={styles.infoSubtitleText}>Ivano-Frankivsk, Ukraine</span>
          </div>

          <h2 className={styles.infoTitle}>
            Local time
            <span ref={timeRef} className={`${styles.time} ${styles.timeShimmer}`}>
              {formattedTime}
            </span>
          </h2>

          <div className={styles.infoTextContainer}>
            <p className={styles.infoText}>
              Collaborating across borders.
            </p>
            <a href="mailto:fuschteyy@gmail.com" className={styles.emailLink}>
              fuschteyy@gmail.com
            </a>
          </div>
        </div>
        

        {/* Картка сертифіката */}
        <div
          className={styles.cardContainer}
          data-cursor="hover"
          data-cursor-type="link"
          data-cursor-text="GOIT Certificate"
        >
          <div
            className={styles.card}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            ref={cardRef}
          >
            <div className={styles.overlayHalf} aria-hidden="true" />
            <div className={styles.shine}>
              <div ref={shineRef} className={styles.shineInner} />
            </div>

            <div className={styles.certificate}>
              <div className={styles.certificateHeader}>
                <div className={styles.certLabel}>
                  <span className={styles.certLabelText}>CERTIFICATE</span>
                  <span className={styles.goitBadge}>GOIT</span>
                </div>
                <h3 className={styles.userName}>FUSHTEI VOLODYMYR</h3>
              </div>

              <div className={styles.body}>
                <p className={styles.achievement}>
                  Has successfully completed
                  <span className={styles.courseName}> FULLSTACK DEVELOPER</span>
                </p>

                <div className={styles.details}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Date</span>
                    <span className={styles.detailValue}>21/01/2025</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>ID</span>
                    <span className={styles.detailValue}>35048</span>
                  </div>
                </div>
              </div>

              <div className={styles.watermark}>GOIT</div>
            </div>

            <a
              href="/certificates/FUSHTEI_VOLODYMYR.pdf"
              download
              className={styles.downloadButton}
              data-cursor="hover"
              data-cursor-type="link"
              data-cursor-text="Download Certificate"
            >
              <span className={styles.downloadText}>View Certificate</span>
              <span className={styles.downloadIcon}>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Certificate
