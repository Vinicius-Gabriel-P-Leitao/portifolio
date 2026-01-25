import { Float, Sphere } from '@react-three/drei'

export const ContactObject = () => (
  <group position={[-10, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
    <Float speed={4} rotationIntensity={1} floatIntensity={0.5}>
      <Sphere args={[1.2, 32, 32]}>
        <meshStandardMaterial color='#f59e0b' wireframe />
      </Sphere>

      <Sphere args={[0.8, 32, 32]}>
        <meshStandardMaterial color='#f59e0b' emissive='#f59e0b' emissiveIntensity={2} />
      </Sphere>
    </Float>
  </group>
)
