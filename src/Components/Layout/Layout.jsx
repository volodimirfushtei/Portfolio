import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import ScrollToTopBtn from '../ScrollToTopBtn/ScrollTotopBtn'
import Header from '../Header/Header'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import s from './Layout.module.css'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

const Layout = () => {
  const wrapperRef = useRef(null)
  const contentRef = useRef(null)
  const smootherRef = useRef(null)

  const location = useLocation()

  // Створюємо ScrollSmoother лише один раз
  useLayoutEffect(() => {
    if (!wrapperRef.current || !contentRef.current) return

    const ctx = gsap.context(() => {
      smootherRef.current = ScrollSmoother.create({
        wrapper: wrapperRef.current,
        content: contentRef.current,
        smooth: 1.2,
        effects: true,
        normalizeScroll: false,
        ignoreMobileResize: true,
        smoothTouch: 0,
      })
    })

    return () => {
      ctx.revert()

      smootherRef.current?.kill()
      smootherRef.current = null
    }
  }, [])

  // Після переходу просто оновлюємо
  useLayoutEffect(() => {
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        smootherRef.current?.refresh()
        ScrollTrigger.refresh()
      })
    })

    return () => cancelAnimationFrame(id)
  }, [location.pathname])

  return (
    <div className={s.layoutContainer}>
      <Header />
      <ScrollToTopBtn />

      <main className={s.mainContent}>
        <div
          id="smooth-wrapper"
          ref={wrapperRef}
          className={s.wrapper}
        >
          <div
            id="smooth-content"
            ref={contentRef}
            className={s.content}
          >
            <AnimatePresence mode="wait">
              <Outlet />
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Layout
