import { useFrame } from '@react-three/fiber'
import type { FC } from 'react'
import * as THREE from 'three'
import type { Section } from '../../../types'

export const CameraController: FC<{ section: Section }> = ({ section }) => {
  useFrame((state) => {
    let targetAngle = 0

    switch (section) {
      case 'home':
        targetAngle = Math.PI / 4 // NOTE: ângulo que mostra todos os objetos
        break
      case 'about':
        targetAngle = -Math.PI / 2
        break
      case 'projects':
        targetAngle = Math.PI
        break
      case 'contact':
        targetAngle = Math.PI / 2
        break
    }

    const radius = section === 'home' ? 30 : 20
    const targetX = Math.sin(targetAngle) * radius
    const targetZ = Math.cos(targetAngle) * radius
    const targetY = 10

    // NOTE: Suavizar movimento
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.05)
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05)
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05)

    state.camera.lookAt(0, 0, 0) // sempre olhando pro buraco negro
  })

  return null
}
