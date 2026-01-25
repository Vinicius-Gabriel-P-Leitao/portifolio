import { useFrame } from '@react-three/fiber'
import type { FC } from 'react'
import * as THREE from 'three'
import type { Section } from '../../types'

export const CameraController: FC<{ section: Section }> = ({ section }) => {
  useFrame((state) => {
    let targetAngle = 0
    switch (section) {
      case 'home':
        targetAngle = 0
        break
      case 'sobre':
        targetAngle = Math.PI / 2
        break
      case 'projetos':
        targetAngle = Math.PI
        break
      case 'contato':
        targetAngle = Math.PI * 1.5
        break
    }

    const radius = 10
    const targetX = Math.sin(targetAngle) * radius
    const targetZ = Math.cos(targetAngle) * radius

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.05)
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05)
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 0, 0.05)

    state.camera.lookAt(0, 0, 0)
  })
  return null
}
