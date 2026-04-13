import { Float } from "@react-three/drei";
import { useFrame, type ThreeElements } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import fragment from "./shaders/gargantua.geom.glsl?raw";
import vertex from "./shaders/vertex.vert.glsl?raw";

function GargantuaRing() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uCameraPosition: { value: new THREE.Vector3() },
    }),
    [],
  );

  useFrame(({ camera }) => {
    const realTime = performance.now() / 1000;
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = realTime * 0.5;
      materialRef.current.uniforms.uCameraPosition.value.copy(camera.position);
    }
  });

  // NO SEU ARQUIVO: gargantua.component.tsx

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[12, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent={false}
        depthWrite={false}
        depthTest={true}
        side={THREE.BackSide}
        toneMapped={false}
      />
    </mesh>
  );
}

export const Gargantua = (props: ThreeElements["group"]) => (
  <group {...props}>
    <Float speed={1} rotationIntensity={0} floatIntensity={0.2}>
      <GargantuaRing />
    </Float>
  </group>
);
