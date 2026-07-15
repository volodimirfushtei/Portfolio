import { useEffect, useState } from 'react'
import styles from './FullScreenButton.module.css'

const FullscreenButton = () => {
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Check fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    const events = ['fullscreenchange', 'webkitfullscreenchange', 'msfullscreenchange']
    events.forEach(event => document.addEventListener(event, handleFullscreenChange))

    return () => {
      events.forEach(event => document.removeEventListener(event, handleFullscreenChange))
    }
  }, [])

  const toggleFullscreen = () => {
    if (!document.fullscreenEnabled) return

    if (isFullscreen) {
      if (document.exitFullscreen) document.exitFullscreen()
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen()
      else if (document.msExitFullscreen) document.msExitFullscreen()
    } else {
      const el = document.documentElement
      if (el.requestFullscreen) el.requestFullscreen()
      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen()
      else if (el.msRequestFullscreen) el.msRequestFullscreen()
    }
  }

  return (
    <button
      className={styles.toggle}
      onClick={toggleFullscreen}
      aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
      title={isFullscreen ? 'Exit fullscreen (Esc)' : 'Enter fullscreen'}
    >
      <span className={styles.icon}>
        {isFullscreen ? <svg className={styles.icon} width={16} height={16}>
          <use href="/sprite.svg#icon-x" />
        </svg> : <svg className={styles.icon} width={16} height={16}>
          <use href="/sprite.svg#icon-maximize" />
        </svg>}
      </span>


    </button>
  )
}

export default FullscreenButton
