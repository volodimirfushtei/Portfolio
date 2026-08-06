import React, { useEffect, useRef, useState, useLayoutEffect } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import styles from './ScrollBar.module.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const pages = [
  {
    id: 1,
    color: 'var(--color-accent)',
    title: 'Welcome',
    subtitle: 'Frontend Developer & UI Specialist',
    description: 'I create modern, performant web applications with focus on user experience and clean code architecture.',
    features: [
      '5+ years of experience',
      '15+ completed projects',
      'React & Next.js expert',
      'GSAP animations',
    ],
    image: '/images/surreali.webp',
    cta: { text: 'View My Work', url: '#projects' },
  },
  {
    id: 2,
    color: 'var(--color-text)',
    title: 'Services',
    subtitle: 'What I Offer',
    description: 'Full cycle development from concept to deployment with focus on performance and scalability.',
    features: [
      'Custom Web Development',
      'UI/UX Design Implementation',
      'Animation & Interactions',
      'Performance Optimization',
      'Responsive Design',
      'API Integration',
    ],
    image: '/images/surrealis.webp',
    cta: { text: 'Learn More', url: '#services' },
  },
  {
    id: 3,
    color: 'var(--color-secondary)',
    title: 'Portfolio',
    subtitle: 'My Recent Work',
    description: 'Explore my latest projects showcasing modern web technologies and creative solutions.',
    features: [
      'E-commerce platforms',
      'Corporate websites',
      'Web applications',
      'Interactive experiences',
    ],
    image: '/images/marek.webp',
    cta: { text: 'View Projects', url: '#projects' },
  },
  {
    id: 4,
    color: 'var(--color-secondary)',
    title: 'Contact',
    subtitle: 'Get In Touch',
    description: 'Let\'s discuss your project and how I can help bring your ideas to life.',
    features: [
      'Available for freelance',
      'Fast response time',
      'Flexible cooperation',
      'Worldwide clients',
    ],
    image: '/images/3dmodern.webp',
    cta: { text: 'Contact Me', url: '#contacts' },
  },
]

const ScrollBar = () => {
  const containerRef = useRef(null)
  const backgroundRef = useRef(null)
  const { scrollYProgress } = useScroll({
    container: containerRef,
    offset: ['start start', 'end end'],
  })

  const [activeIndex, setActiveIndex] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const newIndex = Math.min(
      pages.length - 1,
      Math.floor(latest * pages.length),
    )
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex)
    }
  })

  const scrollToSection = (index) => {
    if (!containerRef.current) return
    const sectionHeight = containerRef.current.scrollHeight / pages.length
    containerRef.current.scrollTo({
      top: sectionHeight * index,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' && activeIndex < pages.length - 1) {
        scrollToSection(activeIndex + 1)
      } else if (e.key === 'ArrowUp' && activeIndex > 0) {
        scrollToSection(activeIndex - 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex])

  const scrollProgress = useTransform(scrollYProgress, [0, 1], [0, 1])
  useLayoutEffect(() => { 
    if (!backgroundRef.current) {
      return
    }
      
 const images = gsap.utils.toArray(`.${styles.sectionBackground} `)


      images.forEach((images, i) => {
        gsap.fromTo(
          image,
          {
            clipPath: 'inset(100% 0% 0% 0%)',
            scale: 0.5,
            opacity: 0,
          },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: 'none',
           
          },
        )
      })
    
  }, [])
  return (
    <div className={styles.wrapper}>
      {/* Main Content */}
      <div
        ref={containerRef}
        className={`${styles.mainContent} ${styles.container}`}
        style={{ scrollSnapType: 'y mandatory' }}
      >
        {pages.map((page, index) => (
          <section
            key={page.id}
            id={`section-${page.id}`}
            className={styles.section}
            style={{ backgroundColor: page.color }}
          >
            <div
              className={styles.sectionBackground} ref={backgroundRef}
              style={{ backgroundImage: `url(${page.image})`}}
            />
            <div className={styles.sectionOverlay} />

            <motion.div
              className={styles.contentWrapper}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              <motion.h2 className={styles.sectionTitle}>
                {page.title}
              </motion.h2>

              <motion.p className={styles.sectionSubtitle}>
                {page.subtitle}
              </motion.p>

              <motion.p className={styles.sectionDescription}>
                {page.description}
              </motion.p>

              <motion.ul className={styles.featuresList}>
                {page.features.map((feature, i) => (
                  <motion.li
                    key={i}
                    className={styles.featureItem}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <span className={styles.checkIcon}>✓</span>
                    {feature}
                  </motion.li>
                ))}
              </motion.ul>

              {page.cta && (
                <motion.a
                  href={page.cta.url}
                  className={styles.ctaButton}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  {page.cta.text}
                  <span className={styles.arrow}>→</span>
                </motion.a>
              )}
            </motion.div>
          </section>
        ))}
      </div>

      {/* Custom Scrollbar */}
      <div className={styles.scrollbarTrack}>
        <div className={styles.line}>
          <motion.div
            className={styles.progress}
            style={{ scaleY: scrollProgress }}
          />

          <div className={styles.dotContainer}>
            {pages.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${activeIndex === index ? styles.active : ''}`}
                onClick={() => scrollToSection(index)}
                aria-label={`Go to section ${index + 1}`}
              />
            ))}
            <motion.p
              className={styles.titleDot}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {pages[activeIndex].title}
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScrollBar
