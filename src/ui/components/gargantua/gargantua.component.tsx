import { Float } from '@react-three/drei'
import { useFrame, type ThreeElements } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import fragment from './shaders/gargantua.geom.glsl?raw'
import vertex from './shaders/vertex.vert.glsl?raw'

function GargantuaRing() {
  const materialRef = useRef<THREE.ShaderMaterial>(null!)
  const meshRef = useRef<THREE.Mesh>(null!)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uCameraPosition: { value: new THREE.Vector3() }
    }),
    []
  )

  useFrame(({ clock, camera }) => {
    if (!meshRef.current || !materialRef.current) return

    materialRef.current.uniforms.uTime.value = clock.elapsedTime * 0.5
    materialRef.current.uniforms.uCameraPosition.value.copy(camera.position)
  })

 return (
  <mesh ref={meshRef} position={[0, 0, 0]} renderOrder={999}>
    <boxGeometry args={[20, 20, 20]} />
    <shaderMaterial
      ref={materialRef}
      vertexShader={vertex}
      fragmentShader={fragment}
      uniforms={uniforms}
      transparent={true}
      depthWrite={false}
      depthTest={false} // ADICIONE ESTA LINHA
      side={THREE.DoubleSide} // MUDE PARA DoubleSide
      toneMapped={false}
    />
  </mesh>
)
}

export const Gargantua = (props: ThreeElements['group']) => (
  <group {...props}>
    <Float speed={1} rotationIntensity={0} floatIntensity={0.2}>
      <GargantuaRing />
    </Float>
  </group>
)
