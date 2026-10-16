import React, { useState, useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Loader from '../Loader/Loader'
import styles from './Layout.module.css'

const Layout = () => {
  const [loading, setLoading] = useState(true)
  const [contentReady, setContentReady] = useState(false)
  const location = useLocation()
  const isFirstMount = useRef(true)

  // При першому завантаженні
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false
      // Loader сам викличе onComplete
    }
  }, [])

  const handleLoaderComplete = () => {
    setLoading(false)
    // Даємо час на плавний перехід
    setTimeout(() => {
      setContentReady(true)
    }, 400)
  }

  return (
    <div className={styles.layout}>
      {/* Loader */}
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={styles.loaderWrapper}
        >
          <Loader onComplete={handleLoaderComplete} />
        </motion.div>
      )}

      {/* Контент */}
      <AnimatePresence mode="wait">
        {contentReady && (
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={styles.content}
          >
            <Outlet context={{ loading: false }} />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Layout

