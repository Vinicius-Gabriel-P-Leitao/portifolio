import { Float, Box } from '@react-three/drei'

export const ProjectsObject = () => (
  <group position={[0, 0, -20]} rotation={[0, Math.PI, 0]}>
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group>
        <Box args={[1.5, 2, 0.2]} position={[-2, 0, 0]}>
          <meshStandardMaterial color='#10b981' roughness={0.1} metalness={0.5} />
        </Box>

        <Box args={[1.5, 2, 0.2]} position={[0, 0, 0.5]}>
          <meshStandardMaterial color='#3b82f6' roughness={0.1} metalness={0.5} />
        </Box>

        <Box args={[1.5, 2, 0.2]} position={[2, 0, 0]}>
          <meshStandardMaterial color='#8b5cf6' roughness={0.1} metalness={0.5} />
        </Box>
      </group>
    </Float>
  </group>
)
