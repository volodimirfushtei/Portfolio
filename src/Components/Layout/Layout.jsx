import React, { useLayoutEffect, useRef, useState } from 'react'
import s from './Layout.module.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { AnimatePresence } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import Header from '../Header/Header'
import ScrollToTopBtn from '../ScrollToTopBtn/ScrollTotopBtn.jsx'
import Loader from '../Loader/Loader'
import SiteGrid from '../SiteGrid/SiteGrid.jsx'

gsap.registerPlugin(ScrollSmoother, ScrollTrigger)


const Layout = () => {
  const wrapperRef = useRef(null)
  const contentRef = useRef(null)
  const smootherRef = useRef(null)

  const [loading, setLoading] = useState(true)

  const location = useLocation()

  // ScrollSmoother
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

  // Refresh
  useLayoutEffect(() => {
    if (loading) return

    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        smootherRef.current?.refresh()
        ScrollTrigger.refresh()
      })
    })

    return () => cancelAnimationFrame(id)
  }, [location.pathname, loading])

  return (
    <div className={s.layoutContainer}>

      <Header />

      <ScrollToTopBtn />

      {loading && (
        <div className={s.loaderWrapper}>
          <Loader onComplete={() => setLoading(false)} />
        </div>
      )}

      <main className={s.mainContent}>
        <SiteGrid loading={loading} />
        <div
          id="smooth-wrapper"
          ref={wrapperRef}
          className={s.wrapper}
        >
          <div
            style={{
              opacity: loading ? 0 : 1,
              transition: 'opacity 0.6s ease',
              minHeight: '100vh',
              background: '#0a0a0f',
            }}
            id="smooth-content"
            ref={contentRef}
            className={s.content}
          >
            <AnimatePresence mode="wait">
              {!loading && (
                <div key={location.pathname}>
                  <Outlet context={{ loading }} />
                </div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </main>

    </div>
  )
}
export default Layout

