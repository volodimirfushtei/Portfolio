import React, { useRef, useEffect, forwardRef, useState, Suspense, useCallback } from 'react'
import { PerspectiveCamera } from '@react-three/drei/core/PerspectiveCamera'
import { useFrame, useThree } from '@react-three/fiber'
import { Iphone } from '../Iphone/Iphone'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Просте освітлення без HDR
const Lighting = React.memo(() => {
  return (
    <group>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} color="#ed0c4c" />
      <pointLight position={[0, 5, 0]} intensity={0.3} />
      <hemisphereLight intensity={0.3} />
    </group>
  )
})
Lighting.displayName = 'Lighting'

const ContextLostFallback = () => (
  <group position={[0, 0, 0]}>
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#ed0c4c" />
    </mesh>
  </group>
)

const Model = forwardRef(({ progress }, ref) => {
  const cameraRef = useRef()
  const groupRef = useRef()
  const { gl } = useThree()
  const [contextLost, setContextLost] = useState(false)
  const isLostRef = useRef(false)
  const lastProgressRef = useRef(0)
  const ctxRef = useRef(null) // Додаємо ref для збереження контексту GSAP

  useFrame((state, delta) => {
    if (!cameraRef.current || contextLost || !groupRef.current) return
    if (delta > 0.033) return
    
    const target = groupRef.current.position
    cameraRef.current.position.lerp(target, 0.05)
    cameraRef.current.lookAt(target)
  })

  // Обробка втрати контексту WebGL
  useEffect(() => {
    const canvas = gl.domElement
    if (!canvas) return

    let recoveryTimeout

    const handleContextLost = (event) => {
      event.preventDefault()
      if (isLostRef.current) return

      console.warn('WebGL context lost')
      isLostRef.current = true
      setContextLost(true)

      if (groupRef.current) {
        gsap.killTweensOf(groupRef.current.position)
        gsap.killTweensOf(groupRef.current.rotation)
        gsap.killTweensOf(groupRef.current.scale)
      }

      recoveryTimeout = setTimeout(() => {
        if (isLostRef.current) {
          window.location.reload()
        }
      }, 3000)
    }

    const handleContextRestored = () => {
      console.log('WebGL context restored')
      isLostRef.current = false
      setContextLost(false)
      clearTimeout(recoveryTimeout)
    }

    canvas.addEventListener('webglcontextlost', handleContextLost)
    canvas.addEventListener('webglcontextrestored', handleContextRestored)

    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost)
      canvas.removeEventListener('webglcontextrestored', handleContextRestored)
      clearTimeout(recoveryTimeout)
    }
  }, [gl])

  // GSAP анімація з правильним збереженням контексту
  useEffect(() => {
    if (!groupRef.current) return

    // Зупиняємо попередній контекст
    if (ctxRef.current) {
      ctxRef.current.revert()
      ctxRef.current = null
    }

    const ctx = gsap.context(() => {
      gsap.killTweensOf(groupRef.current.position)
      gsap.killTweensOf(groupRef.current.rotation)
      gsap.killTweensOf(groupRef.current.scale)

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
          invalidateOnRefresh: true,
        }
      })

      tl.to(groupRef.current.rotation, {
        y: Math.PI * 4,
        x: Math.PI * 0.1,
        duration: 1,
        ease: "none",
        overwrite: true
      }, 0)

      tl.to(groupRef.current.position, {
        x: -1.5,
        y: -2,
        z: -3.3,
        duration: 1,
        ease: "none",
        overwrite: true
      }, 0)
    })

    // Зберігаємо контекст для очищення
    ctxRef.current = ctx

    return () => {
      // Правильне очищення
      if (ctxRef.current) {
        // Зупиняємо всі ScrollTrigger анімації
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.animation) {
            trigger.animation.kill()
          }
          trigger.kill()
        })
        
        ctxRef.current.revert()
        ctxRef.current = null
      }
    }
  }, []) // Пустий масив - тільки один раз

  // Обробка progress
  useEffect(() => {
    if (!groupRef.current || progress === undefined) return
    
    if (Math.abs(progress - lastProgressRef.current) < 0.01) return
    lastProgressRef.current = progress

    const scale = 1 + progress * 0.1
    gsap.to(groupRef.current.scale, {
      x: scale,
      y: scale,
      z: scale,
      duration: 0.1,
      ease: "none",
      overwrite: true
    })
  }, [progress])

  // Очищення при розмонтуванні
  useEffect(() => {
    return () => {
      // Зупиняємо всі анімації GSAP
      if (groupRef.current) {
        gsap.killTweensOf(groupRef.current.position)
        gsap.killTweensOf(groupRef.current.rotation)
        gsap.killTweensOf(groupRef.current.scale)
      }
      
      // Очищаємо ScrollTrigger
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      
      // Очищаємо GSAP контекст
      if (ctxRef.current) {
        ctxRef.current.revert()
        ctxRef.current = null
      }
    }
  }, [])

  if (contextLost) {
    return <ContextLostFallback />
  }

  return (
    <>
      <PerspectiveCamera
        fov={45}
        near={0.1}
        far={1000}
        makeDefault
        position={[2, 0, 5]}
        ref={cameraRef}
      />

      <Lighting />

      <group
        ref={groupRef}
        position={[-1, -2.2, -2.8]}
        rotation={[0, 0, 0]}
        scale={[1, 1, 1]}
      >
        <Iphone />
      </group>
    </>
  )
})

Model.displayName = 'Model'

export default React.memo(Model)