import {
  createContext,
  useContext,
  useLayoutEffect,
  useRef,
} from "react";
import gsap from "gsap";

import Overlay from "../Overlay/Overlay";

const OverlayContext = createContext(null);

export const useOverlay = () => useContext(OverlayContext);

export const OverlayProvider = ({ children }) => {
  const overlayRef = useRef(null);

  useLayoutEffect(() => {
    gsap.set(overlayRef.current, {
      yPercent: 100,
    });
  }, []);

  const enter = () => {
    return gsap.to(overlayRef.current, {
      yPercent: 0,
      duration: 0.8,
      ease: "expo.inOut",
    });
  };

  const leave = () => {
    return gsap.to(overlayRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: "expo.inOut",
    });
  };

  const transition = () => {
    return gsap.timeline()
      .to(overlayRef.current, {
        yPercent: 0,
        duration: 0.8,
        ease: "expo.inOut",
      })
      .to(overlayRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "expo.inOut",
      });
  };

  return (
    <OverlayContext.Provider
      value={{
        enter,
        leave,
        transition,
      }}
    >
      {children}

      <Overlay ref={overlayRef} />
    </OverlayContext.Provider>
  );
};
