import { Environment, Stars } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Gargantua } from '@ui/components/gargantua/gargantua.component'
import type { FC } from 'react'
import { ContactObject } from '../../modules/contact/contact.object.component'
import { AboutObject } from '../../modules/about/about.object.component'
import { ProjectsObject } from '../../modules/projects/projects.object.component'
import { CameraController } from './domain/scene.hook'
import type { SceneProps } from './domain/scene.type'

export const Scene: FC<SceneProps> = ({ sceneState }) => {
  return (
    <div className='absolute inset-0 z-0 bg-black'>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 5, 30], fov: 60 }}>
        <CameraController section={sceneState.section} />

        <ambientLight intensity={0.2} />
        <pointLight position={[0, 10, 0]} intensity={1} color='white' />
        <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={2} castShadow />

        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
        <Environment preset='city' />

        {/* <HomeObject /> */}
        <Gargantua position={[0, 0, 0]} scale={5} />
        <ContactObject />
        <ProjectsObject />
        <AboutObject />

        <pointLight position={[10, 0, 0]} intensity={0.5} color='#ec4899' />
        <pointLight position={[-10, 0, 0]} intensity={0.5} color='#f59e0b' />
        <pointLight position={[0, 0, -10]} intensity={0.5} color='#3b82f6' />
      </Canvas>
    </div>
  )
}
