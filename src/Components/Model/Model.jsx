import React, { useRef, useLayoutEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { Environment, PerspectiveCamera, Float } from '@react-three/drei'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { OrbitControls } from '@react-three/drei'
import { Iphone } from '../Iphone/Iphone'

gsap.registerPlugin(ScrollTrigger)

export default function Model() {
  const groupRef = useRef();

  useLayoutEffect(() => {
    // We create a GSAP context to ensure proper garbage collection inside React
    let ctx = gsap.context(() => {
      // Create a timeline hooked to the main document scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "body",      // triggers off the entire height of the page
          start: "top top",
          end: "bottom bottom",
          markers: true,
          scrub: 1,            // Smooth scrubbing
        }
      });

      // Animate the rotation and position of the 3D Phone
      tl.to(groupRef.current.rotation, {
        y: Math.PI * 4, // Spin a full 360 degrees
        x: Math.PI * 0.25,
        // Slight tilt backwards
        ease: "none"
        
      }, 0);
      
      tl.to(groupRef.current.position, {
        y: -1, // Slowly drift down
        x: 6,  // Drift right
        ease: "none"
      }, 0);
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <PerspectiveCamera fov={50} near={0.1} far={1000} makeDefault position={[0, 0, 8]} />
      <Environment preset="city" />
      
      {/* Group holding the iPhone, targeted by GSAP */}
      <group ref={groupRef} position={[0, 0, 0]}>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
          <Iphone />
        </Float>
      </group>
    </>
  )
}