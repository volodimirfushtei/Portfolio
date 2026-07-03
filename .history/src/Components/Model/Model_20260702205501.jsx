import React, { useRef, useEffect, forwardRef, useState, lazy, Suspense, useMemo, useCallback } from 'react'
import { PerspectiveCamera } from '@react-three/drei/core/PerspectiveCamera'
import { useFrame, useThree } from '@react-three/fiber'
import { Iphone } from '../Iphone/Iphone'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Environment = lazy(() => import('@react-three/drei').then(m => ({ default: m.Environment })))
gsap.registerPlugin(ScrollTrigger)

// Компонент освітлення (винесено для оптимізації)
const Lighting = React.memo(() => {
  return (
    <group>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-3, 2, 4]} intensity={0.5} color="#ed0c4c" />
      <pointLight position={[0, 3, -2]} intensity={0.3} />
      <directionalLight position={[2, 5, 3]} intensity={0.3} />
    </group>
  )
})
Lighting.displayName = 'Lighting'

// Fallback компонент при втраті контексту
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
  const scrollTriggerRef = useRef(null)
  const lastProgressRef = useRef(0)

  // Оптимізований useFrame
  useFrame((state, delta) => {
    if (!cameraRef.current || contextLost || !groupRef.current) return
    
    // Обмеження частоти оновлень для продуктивності
    if (delta > 0.033) return // ~30fps
    
    // Плавне слідкування камери
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

      // Зупиняємо анімації
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

  // Анімація GSAP з ScrollTrigger
  useEffect(() => {
    if (!groupRef.current) return

    let ctx = gsap.context(() => {
      // Зупиняємо попередні анімації
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

      // Додаткова анімація scale
      tl.to(groupRef.current.scale, {
        x: 1.05,
        y: 1.05,
        z: 1.05,
        duration: 0.5,
        ease: "power2.out",
        yoyo: true,
        repeat: 1
      }, 0.5)
    })

    return () => {
      if (ctx) ctx.revert()
    }
  }, [])

  // Обробка зовнішнього progress
  useEffect(() => {
    if (!groupRef.current || progress === undefined) return
    
    // Throttle оновлення
    if (Math.abs(progress - lastProgressRef.current) < 0.01) return
    lastProgressRef.current = progress

    // Додаткові ефекти на основі progress
    const scale = 1 + progress * 0.1
    const opacity = 1 - progress * 0.2

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
      if (groupRef.current) {
        gsap.killTweensOf(groupRef.current.position)
        gsap.killTweensOf(groupRef.current.rotation)
        gsap.killTweensOf(groupRef.current.scale)
      }
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill()
      }
    }
  }, [])

  // Якщо контекст втрачено
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

      <Suspense fallback={null}>
        <Environment preset="city" background={false} />
      </Suspense>

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