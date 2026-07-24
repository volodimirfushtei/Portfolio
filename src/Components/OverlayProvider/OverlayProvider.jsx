import { createContext, useContext, useRef, useState } from 'react'
import Overlay from '../Overlay/Overlay'

const OverlayContext = createContext(null)

export const useOverlay = () => {
  const context = useContext(OverlayContext)

  if (!context) {
    throw new Error('useOverlay must be used inside OverlayProvider')
  }

  return context
}

export const OverlayProvider = ({ children }) => {
  const [visible, setVisible] = useState(false)
  const resolverRef = useRef(null)
  let resolver = null

  const show = () => {
    setVisible(true)

    return new Promise((resolve) => {
      resolverRef.current = resolve
    })
  }

  const hide = () => {
    setVisible(false)
  }

  const animationFinished = () => {
    resolverRef.current?.()
    resolverRef.current = null
  }

  return (
    <OverlayContext.Provider
      value={{
        show,
        hide,
        visible,
        animationFinished,
      }}
    >
      {visible && <Overlay />}
      {children}
    </OverlayContext.Provider>
  )
}
