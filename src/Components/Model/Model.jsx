import React, { useRef, useLayoutEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { Environment, PerspectiveCamera, Float } from '@react-three/drei'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { OrbitControls } from '@react-three/drei'
import { Iphone } from '../Iphone/Iphone'
import { useFrame } from '@react-three/fiber'
gsap.registerPlugin(ScrollTrigger)

export default function Model(modelRef) {
  const groupRef = useRef();
  const cameraRef = useRef();
 useFrame(() => {
   cameraRef.current.lookAt(2.8, 0, 0);
  
 }) 
  
  useLayoutEffect(() => {
    // We create a GSAP context to ensure proper garbage collection inside React
    let ctx = gsap.context(() => {
      // Create a timeline hooked to the main document scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: modelRef.current,      // triggers off the entire height of the page
          start: "top top",
          end: "bottom bottom",
          markers: true,
          scrub: 1,            // Smooth scrubbing
        }
      });

      // Animate the rotation and position of the 3D Phone
      tl.to(groupRef.current.rotation, {
        y: Math.PI * 6, // Spin a full 360 degrees
        x: Math.PI * 0.25,
        // Slight tilt backwards
        ease: "none"
        
      }, 0);
      
      tl.to(groupRef.current.position, {
        y: -1, // Slowly drift down
        x: 0,  // Drift right
        ease: "power2.out"
      }, 0);
    });

    return () => ctx.revert();
  }, [modelRef]);

  return (
    <>
      <PerspectiveCamera fov={50} near={0.1} far={1000} makeDefault position={[3, 0, 4]} ref={cameraRef} />
      <Environment preset="city" />
      
      {/* Group holding the iPhone, targeted by GSAP */}
      <group ref={groupRef} position={[2.5, .2, -1.5]}>
        
          <Iphone />
        
      </group>
    </>
  )
}