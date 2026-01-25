import { Environment, Float, Stars } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import type { FC } from 'react'
import { AboutObject } from '../about/about.object.component'
import { ContactObject } from '../contact/contact.object.component'
import { ProjectsObject } from '../projects/projects.object.component'
import { CameraController } from './domain/scene.hook'
import type { SceneProps } from './domain/scene.type'

export const Scene: FC<SceneProps> = ({ sceneState }) => {
  return (
    <div className='absolute inset-0 z-0 bg-black'>
      <Canvas shadows dpr={[1, 2]}>
        <CameraController section={sceneState.section} />

        <ambientLight intensity={0.2} />
        <pointLight position={[0, 10, 0]} intensity={1} color='white' />
        <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={2} castShadow />

        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
        <Environment preset='city' />

        {/* <HomeObject /> */}
        <Gargantua />
        <AboutObject />
        <ProjectsObject />
        <ContactObject />

        <pointLight position={[10, 0, 0]} intensity={0.5} color='#ec4899' />
        <pointLight position={[-10, 0, 0]} intensity={0.5} color='#f59e0b' />
        <pointLight position={[0, 0, -10]} intensity={0.5} color='#3b82f6' />
      </Canvas>
    </div>
  )
}

const Gargantua = () => (
  <group position={[0, 0, 0]}>
    <Float speed={1} rotationIntensity={2} floatIntensity={1}>
      <GargantuaRing />
    </Float>
  </group>
)

import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

function GargantuaRing() {
  const ref = useRef<THREE.Mesh>(null!)
  const { camera } = useThree()

  useFrame(() => {
    ref.current.lookAt(camera.position)
  })

  return (
    <mesh ref={ref}>
      <planeGeometry args={[2.5, 2.5]} />
      <shaderMaterial
        transparent
        depthWrite={false}
        uniforms={{
          radius: { value: 0.35 },
          thickness: { value: 0.01 }
        }}
        vertexShader={`
          varying vec2 vUv;

          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform float radius;
          uniform float thickness;

          void main() {
            vec2 uv = vUv - 0.5;
            float centerDistance = length(uv);

            float inner = step(centerDistance, radius);

            float ring = smoothstep(radius, radius + thickness, centerDistance) - 
                          smoothstep(radius + thickness, radius + thickness * 10.5, centerDistance);

            vec3 color = inner * vec3(0.0) + 
                          ring  * vec3(1.0);
                
            float alpha = inner + ring;
           
            gl_FragColor = vec4(color, alpha);
          }
        `}
      />
    </mesh>
  )
}
