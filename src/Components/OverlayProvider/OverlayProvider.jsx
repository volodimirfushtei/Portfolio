import React, { createContext, useContext, useState } from "react";
import Overlay from "../Overlay/Overlay.jsx";

const OverlayContext = createContext();

export const useOverlay = () => useContext(OverlayContext);

export const OverlayProvider = ({ children }) => {
  const [visible, setVisible] = useState(true); // або false — залежно від логіки

  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  return (
    <OverlayContext.Provider value={{ show, hide, visible }}>
      {visible && <Overlay />}
      {children}
    </OverlayContext.Provider>
  );
};
