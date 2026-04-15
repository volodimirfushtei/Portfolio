import React, { useRef, useEffect, forwardRef, useState, useCallback, useMemo, Suspense } from 'react'
import { PerspectiveCamera } from '@react-three/drei/core/PerspectiveCamera'
import { useFrame, useThree } from '@react-three/fiber'
import { Iphone } from '../Iphone/Iphone'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Ліниве завантаження важких компонентів
const Environment = React.lazy(() => import('@react-three/drei').then(m => ({ default: m.Environment })))

gsap.registerPlugin(ScrollTrigger)

// Простий fallback для Environment
const EnvironmentFallback = () => null

// Оптимізований компонент освітлення
const Lighting = React.memo(() => {
  const lightsRef = useRef()
  
  useFrame((state) => {
    if (lightsRef.current) {
      // Динамічне освітлення для більшого ефекту
      const time = state.clock.getElapsedTime()
      lightsRef.current.children[1]?.position.set(
        Math.sin(time * 0.5) * 2,
        3 + Math.sin(time * 0.7) * 1,
        4 + Math.cos(time * 0.3) * 1
      )
    }
  })
  
  return (
    <group ref={lightsRef}>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-3, 2, 4]} intensity={0.4} color="#ed0c4c" />
      <pointLight position={[0, 3, -2]} intensity={0.2} />
      <directionalLight position={[2, 5, 3]} intensity={0.5} />
    </group>
  )
})

Lighting.displayName = 'Lighting'

const Model = forwardRef(({ progress, enableScrollAnimation = true }, ref) => {
  const cameraRef = useRef()
  const groupRef = useRef()
  const { gl, camera, viewport } = useThree()
  const [contextLost, setContextLost] = useState(false)
  const isLostRef = useRef(false)
  const lastProgressRef = useRef(0)
  const scrollTriggerRef = useRef(null)
  
  // Мемоізація позиції камери
  const cameraPosition = useMemo(() => [2, 0, 5], [])
  
  // Оптимізований useFrame з throttling
  useFrame((state, delta) => {
    if (!cameraRef.current || contextLost || !groupRef.current) return
    
    // Обмежуємо частоту оновлення для продуктивності
    if (delta > 0.033) return // ~30fps max для lookAt
    
    // Плавне слідкування камери за моделлю з інтерполяцією
    const targetPosition = groupRef.current.position
    cameraRef.current.position.lerp(targetPosition, 0.05)
    cameraRef.current.lookAt(targetPosition)
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
      
      // Зупиняємо всі анімації
      if (groupRef.current) {
        gsap.killTweensOf(groupRef.current.position)
        gsap.killTweensOf(groupRef.current.rotation)
      }
      
      // Спроба відновити контекст
      recoveryTimeout = setTimeout(() => {
        if (isLostRef.current) {
          console.log('Attempting to recover WebGL context...')
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
  
  // Анімація з GSAP та ScrollTrigger (оптимізована)
  useEffect(() => {
    if (!groupRef.current || !enableScrollAnimation) return
    
    let ctx
    
    // Невелика затримка для ініціалізації
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        // Зупиняємо попередні анімації
        gsap.killTweensOf(groupRef.current.position)
        gsap.killTweensOf(groupRef.current.rotation)
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5, // Зменшуємо для кращої продуктивності
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              // Опціонально: передаємо прогрес назовні
              if (typeof progress === 'function') {
                progress(self.progress)
              }
            }
          }
        })
        
        // Оптимізовані анімації
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
        
        // Додаткова анімація scale для ефекту
        tl.to(groupRef.current.scale, {
          x: 1.1,
          y: 1.1,
          z: 1.1,
          duration: 0.5,
          ease: "power2.out",
          yoyo: true,
          repeat: 1
        }, 0.5)
      })
    }, 100)
    
    return () => {
      clearTimeout(timer)
      if (ctx) ctx.revert()
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill()
      }
    }
  }, [enableScrollAnimation, progress])
  
  // Обробка зміни progress зовнішнього скролу
  useEffect(() => {
    if (!groupRef.current || progress === undefined || !enableScrollAnimation) return
    
    // Throttle оновлення
    if (Math.abs(progress - lastProgressRef.current) < 0.01) return
    
    lastProgressRef.current = progress
    
    // Додаткові ефекти на основі progress
    const scale = 1 + progress * 0.2
    const opacity = 1 - progress * 0.3
    
    gsap.to(groupRef.current.scale, {
      x: scale,
      y: scale,
      z: scale,
      duration: 0.1,
      ease: "none",
      overwrite: true
    })
    
    // Опціонально: зміна кольору підсвітки
    if (groupRef.current.parent?.children) {
      const pointLight = groupRef.current.parent.children.find(
        child => child.type === 'PointLight' && child.color?.getHex() === '#ed0c4c'
      )
      if (pointLight) {
        pointLight.intensity = 0.4 + progress * 0.6
      }
    }
  }, [progress, enableScrollAnimation])
  
  // Очищення анімацій при розмонтуванні
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
  
  // Якщо контекст втрачено, показуємо простий fallback
  if (contextLost) {
    return (
      <group position={[0, 0, 0]}>
        <mesh>
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
        position={cameraPosition}
        ref={cameraRef}
      />
      
      <Suspense fallback={<EnvironmentFallback />}>
        <Environment
          preset="city"
          background={false}
        />
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