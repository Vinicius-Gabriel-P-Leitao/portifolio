import { Float, Icosahedron, MeshTransmissionMaterial } from '@react-three/drei'

export const HomeObject = () => (
  <group position={[0, 0, 0]}>
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Icosahedron args={[1.5, 0]}>
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={2}
          chromaticAberration={0.5}
          anisotropy={0.3}
          distortion={0.5}
          distortionScale={0.5}
          temporalDistortion={0.2}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
          color='#4f46e5'
        />
      </Icosahedron>
    </Float>

    <Float speed={1.5} rotationIntensity={1.5} floatIntensity={0.2}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.02, 16, 100]} />
        <meshBasicMaterial color='#ffffff' transparent opacity={0.3} />
      </mesh>
    </Float>
  </group>
)
