import React, { lazy, useEffect, useMemo, useRef, useState } from 'react'
import styles from './homePage.module.css'
import ControllerSkills from '../../Components/ControllerSkills/ControllerSkills.jsx'
import Footer from '../../Components/Footer/Footer.jsx'
import Expertise from '../../Components/Expertise/Expertise'
import Carusel from '../../Components/Carusel/Carusel.jsx'
import HeroSection from '../../Components/HeroSection/HeroSection.jsx'
import Sertificate from '../../Components/Sertificate/Sertificate.jsx'
import CtaSection from '../../Components/CtaSection/CtaSection.jsx'
import StickyZoomSection from '../../Components/StickyZoomSection/StickyZoomSection.jsx'
import ExperienceTable from '../../Components/ExperienceTable/ExperienceTable.jsx'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useOverlay } from '../../Components/OverlayProvider/OverlayProvider.jsx'
import SoftSkills from '../../Components/SoftSkills/SoftSkills.jsx'

const Model = lazy(() => import('../../Components/Model/Model.jsx'))

gsap.registerPlugin(ScrollTrigger)

const HomePage = () => {
  const { visible } = useOverlay()
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const sectionRef = useRef(null)

  // Перевірка на мобільний пристрій
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Розрахунок прогресу скролу з throttling

  useEffect(() => {
    const handleScroll = () => {
      // Загальний прогрес скролу
      const scrollY = window.scrollY
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(1, Math.max(0, scrollY / maxScroll))
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  useEffect(() => {
    if (visible) return

    const sections = gsap.utils.toArray(`.${styles.fadeSection}`)

    sections.forEach((section) => {
      gsap.to(section, {
        '--fade': '15%',
        ease: 'power2.out',

        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'top center',
          scrub: true,
        },
      })
    })

    ScrollTrigger.refresh()
  }, [visible])
  // Мемоізація skills
  const skills = useMemo(
    () => [
      {
        src: '/icons/react.svg',
        alt: 'React',
        name: 'React',
        description: 'Library',
        color: '#61dafb',
        icon: 'ri-reactjs-line',
      },
      {
        src: '/icons/javascript.svg',
        alt: 'JavaScript',
        name: 'JavaScript',
        description: 'Language',
        color: '#f7df1e',
        icon: 'ri-javascript-line',
      },
      {
        src: '/icons/nextjs.svg',
        alt: 'Next.js',
        name: 'Next.js',
        description: 'Framework',
        color: '#ffffff',
        icon: 'ri-nextjs-fill',
      },
      {
        src: '/icons/sass.svg',
        alt: 'Sass',
        name: 'Sass',
        description: 'Styling',
        color: '#cc6699',
        icon: 'ri-sass-line',
      },
      {
        src: '/icons/git.svg',
        alt: 'Git',
        name: 'Git',
        description: 'VCS',
        color: '#f1502f',
        icon: 'ri-git-branch-line',
      },
      {
        src: '/icons/github.svg',
        alt: 'GitHub',
        name: 'GitHub',
        description: 'Platform',
        color: '#ffffff',
        icon: 'ri-github-fill',
      },
      {
        src: '/icons/figma.svg',
        alt: 'Figma',
        name: 'Figma',
        description: 'Design',
        color: '#a259ff',
        icon: 'ri-figma-line',
      },
      {
        src: '/icons/vercel.svg',
        alt: 'Vercel',
        name: 'Vercel',
        description: 'Deployment',
        color: '#ffffff',
        icon: 'ri-vercel-line',
      },
      {
        src: '/icons/render.svg',
        alt: 'Render',
        name: 'Render',
        description: 'Hosting',
        color: '#46e3b7',
        icon: 'ri-cloud-line',
      },
      {
        src: '/icons/nodejs.svg',
        alt: 'Node.js',
        name: 'Node.js',
        description: 'Runtime',
        color: '#68a063',
        icon: 'ri-nodejs-line',
      },
      {
        src: '/icons/expressjs.svg',
        alt: 'Express.js',
        name: 'Express.js',
        description: 'Framework',
        color: '#ffffff',
        icon: 'ri-expressjs-line',
      },
      {
        src: '/icons/mongodb.svg',
        alt: 'MongoDB',
        name: 'MongoDB',
        description: 'Database',
        color: '#47a248',
        icon: 'ri-database-2-line',
      },
    ],
    [],
  )

  return (
    <div className={styles.container} ref={sectionRef}>
      <section className={styles.heroSectionWrapper} id="hero">
        <HeroSection />
      </section>
      <section
        id="expertise"
        className={`${styles.section} ${styles.fadeSection}`}
      >
        <Expertise />
      </section>
      <div className={`${styles.section} ${styles.fadeSection}`}>
        <ExperienceTable />
      </div>
      <section
        id="skills"
        className={`${styles.section} ${styles.fadeSection}`}
      >
        <ControllerSkills items={skills} />
      </section>

      <div className={`${styles.section} ${styles.fadeSection}`}>
        <SoftSkills />
      </div>
      <div className={`${styles.section} ${styles.fadeSection}`}>
        <Carusel />
      </div>

      <section id="cta" className={`${styles.section} ${styles.fadeSection}`}>
        <CtaSection />
      </section>

      <section
        id="certificate"
        className={`${styles.section} ${styles.fadeSection}`}
      >
        <Sertificate />
      </section>

      <section className={`${styles.stickySection} ${styles.fadeSection}`}>
        <StickyZoomSection />

      </section>

      <Footer />
    </div>
  )
}

export default HomePage
