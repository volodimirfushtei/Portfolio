import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Model from '../Model/Model.jsx'
import styles from './IphoneScene.module.css'

const IphoneScene = () => {
  return (
    <div className={styles.scene}>
      <Canvas
        camera={{
          position: [3, 0, 5],
          fov: 45,
          near: 0.1,
          far: 1000,
        }}
        dpr={[1, 1.5]}
        gl={{

          antialias: true,
          powerPreference: 'high-performance',
          depth: true,
        }}
      >
        <Suspense fallback={null}>
          <Model />
        </Suspense>
      </Canvas>
    </div>
  )
}


export default IphoneScene