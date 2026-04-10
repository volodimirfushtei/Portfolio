import React, { useRef, useEffect, forwardRef, useState, useLayoutEffect } from 'react'
import { Environment, PerspectiveCamera } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { Iphone } from '../Iphone/Iphone'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Model = forwardRef(({ progress }, ref) => {
  const cameraRef = useRef()
  const groupRef = useRef()
  const { gl } = useThree()
  const [contextLost, setContextLost] = useState(false)
  const isLostRef = useRef(false)

  useFrame(() => {
    if (cameraRef.current && !contextLost && groupRef.current) {
      cameraRef.current.lookAt(groupRef.current.position)
    }
  })

  useEffect(() => {
    const canvas = gl.domElement

    const handleContextLost = (e) => {
      e.preventDefault()

      if (isLostRef.current) return

      isLostRef.current = true
      setContextLost(true)
    }

    const handleContextRestored = () => {
      isLostRef.current = false
      setContextLost(false)
    }

    canvas.addEventListener('webglcontextlost', handleContextLost)
    canvas.addEventListener('webglcontextrestored', handleContextRestored)

    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost)
      canvas.removeEventListener('webglcontextrestored', handleContextRestored)
    }
  }, [gl])

  useLayoutEffect(() => {
    if (!groupRef.current) return

    let ctx = gsap.context(() => {
      // Використовуємо timeline для синхронізації анімацій
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 2, // Більш плавний скраб
          invalidateOnRefresh: true
        }
      })

      // Додаємо анімації в timeline
      tl.to(groupRef.current.rotation, {
        y: Math.PI * 4,    // 360 градусів
        x: Math.PI * 0.1,  // легкий нахил
        duration: 1,
        ease: "none"
      }, 0)

      tl.to(groupRef.current.position, {
        x: 0.8,   // кінцева позиція X
        y: -2,    // кінцева позиція Y
        z: -3.3,  // кінцева позиція Z
        duration: 1,
        ease: "none"
      }, 0)
    })

    return () => ctx.revert()
  }, [])

  if (contextLost) return null

  return (
    <>
      <PerspectiveCamera
        fov={50}
        near={0.1}
        far={1000}
        makeDefault
        position={[-1, 0, 4]}
        ref={cameraRef}
      />
      <Environment preset="city" />

      <group ref={groupRef} position={[2.4, -1.2, -2.8]}>
        <Iphone />
      </group>
    </>
  )
})

export default Model