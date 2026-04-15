import React, { useRef, useEffect, forwardRef, useState, useLayoutEffect, lazy } from 'react'

import { PerspectiveCamera } from '@react-three/drei/core/PerspectiveCamera'
import { useFrame, useThree } from '@react-three/fiber'
import { Iphone } from '../Iphone/Iphone'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
const Environment = lazy(() => import('@react-three/drei').then(m => ({ default: m.Environment })))
gsap.registerPlugin(ScrollTrigger)

const Model = forwardRef(({ progress }, ref) => {
  const cameraRef = useRef()
  const groupRef = useRef()
  const { gl, camera } = useThree()
  const [contextLost, setContextLost] = useState(false)
  const isLostRef = useRef(false)
  const animationFrameRef = useRef(null)

  // Оптимізований useFrame з перевіркою
  useFrame(() => {
    if (!cameraRef.current || contextLost || !groupRef.current) return

    // Плавне слідкування камери за моделлю
    cameraRef.current.lookAt(groupRef.current.position)
  })

  // Обробка втрати контексту WebGL
  useEffect(() => {
    const canvas = gl.domElement
    if (!canvas) return

    const handleContextLost = (event) => {
      event.preventDefault()

      if (isLostRef.current) return

      console.warn('WebGL context lost')
      isLostRef.current = true
      setContextLost(true)

      // Спроба відновити контекст
      setTimeout(() => {
        if (isLostRef.current) {
          window.location.reload()
        }
      }, 2000)
    }

    const handleContextRestored = () => {
      console.log('WebGL context restored')
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

  // Анімація з GSAP та ScrollTrigger
  useLayoutEffect(() => {
    if (!groupRef.current) return

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
          invalidateOnRefresh: true
        }
      })

      tl.to(groupRef.current.rotation, {
        y: Math.PI * 4,
        x: Math.PI * 0.1,
        duration: 1,
        ease: "none"
      }, 0)

      // Змінюємо кінцеву позицію
      tl.to(groupRef.current.position, {
        x: -1.5,   // Було 0.8, змінюємо на від'ємне значення
        y: -2,
        z: -3.3,
        duration: 1,
        ease: "none"
      }, 0)
    })

    return () => ctx.revert()
  }, [])

  // Обробка зміни progress (якщо використовується зовнішній скрол)
  useEffect(() => {
    if (groupRef.current && progress !== undefined) {
      // Додаткова анімація на основі progress
      // Наприклад, зміна кольору або додаткові ефекти
    }
  }, [progress])

  // Очищення анімацій при розмонтуванні
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      // Зупиняємо всі анімації GSAP
      if (groupRef.current) {
        gsap.killTweensOf(groupRef.current.position)
        gsap.killTweensOf(groupRef.current.rotation)
        gsap.killTweensOf(groupRef.current.scale)
      }
    }
  }, [])

  // Якщо контекст втрачено, показуємо fallback
  if (contextLost) {
    return (
      <group>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#ed0c4c" />
        </mesh>
      </group>
    )
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

      <Environment
        preset="city"
        background={false} // Важливо для прозорості фону
      />

      {/* Додаткове освітлення для кращого вигляду */}
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-3, 2, 4]} intensity={0.5} color="#ed0c4c" />
      <pointLight position={[0, 3, -2]} intensity={0.3} />

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

export default Model