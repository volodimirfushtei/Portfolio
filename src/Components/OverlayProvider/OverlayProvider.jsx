import React, { createContext, useContext, useState } from 'react'
import Overlay from '../Overlay/Overlay.jsx'

const OverlayContext = createContext()

export const useOverlay = () => useContext(OverlayContext)

export const OverlayProvider = ({ children }) => {
  const [visible, setVisible] = useState(true)
  const [finished, setFinished] = useState(false)
  const [heroFinished, setHeroFinished] = useState(false)
  const show = () => {
    setFinished(false)
    setVisible(true)
    setHeroFinished(true)
  }

  const hide = () => {
    setVisible(false)
    setFinished(true)
  }

  return (
    <OverlayContext.Provider
      value={{
        show,
        hide,
        visible,
        finished,
      }}
    >
      {visible && <Overlay />}
      {children}
    </OverlayContext.Provider>
  )
}
