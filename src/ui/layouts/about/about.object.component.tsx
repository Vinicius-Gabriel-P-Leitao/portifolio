import { Float, Sphere } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type * as THREE from 'three'

export const AboutObject = () => {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    const timer = clock.getElapsedTime()
    const scale = 0.8 + Math.sin(timer * 2) * 0.15

    ref.current.scale.setScalar(scale)
  })

  return (
    <group position={[-20, 9, 0]} rotation={[0, Math.PI / 2, 0]}>
      <Float speed={4} rotationIntensity={1} floatIntensity={0.5}>
        <Sphere args={[1.2, 32, 32]}>
          <meshStandardMaterial color='#f59e0b' wireframe />
        </Sphere>

        <Sphere ref={ref} args={[0.8, 32, 32]}>
          <meshStandardMaterial color='#f59e0b' emissive='#f59e0b' emissiveIntensity={2} />
        </Sphere>
      </Float>
    </group>
  )
}
