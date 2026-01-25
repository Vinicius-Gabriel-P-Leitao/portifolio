import { Float, TorusKnot, Sphere } from '@react-three/drei'

export const AboutObject = () => (
  <group position={[10, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
    <Float speed={1} rotationIntensity={2} floatIntensity={1}>
      <TorusKnot args={[1, 0.3, 100, 16]}>
        <meshStandardMaterial color='#ec4899' roughness={0.2} metalness={0.8} />
      </TorusKnot>
    </Float>

    {/* NOTE: Bolinhas em volta do objeto */}
    {Array.from({ length: 30 }).map((_, index) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: Necessário para usar o index do array como key
      <Float key={index} speed={0.5 + Math.random()} position={[(Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5]}>
        <Sphere args={[0.05, 8, 8]}>
          <meshBasicMaterial color='cyan' />
        </Sphere>
      </Float>
    ))}
  </group>
)
