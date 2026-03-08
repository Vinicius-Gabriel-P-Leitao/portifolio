import { Float, Icosahedron, MeshTransmissionMaterial } from '@react-three/drei'
import { Button } from '@ui/components/button/button.component'
import { OverlayProps } from '@ui/layouts/overlay/domain/overlay.object.type'
import { animateVariants } from '@ui/layouts/overlay/overlay.object.variants'
import { Section } from '@ui/types'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { FC } from 'react'
import { Trans } from 'react-i18next'

export const HomeObject = () => (
  <group position={[0, 0, 30]}>
    <Float speed={2} rotationIntensity={5} floatIntensity={0.5}>
      {/* NOTE: Núcleo */}
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

    {/* NOTE: Anel */}
    <Float speed={5} rotationIntensity={1.5} floatIntensity={0.2}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.02, 12, 100]} />
        <meshBasicMaterial color='#ffffff' transparent opacity={0.3} />
      </mesh>
    </Float>
  </group>
)

const HomeComponent: FC<OverlayProps> = ({ onNavigate }) => {
  return (
    <motion.div
      key='home'
      variants={animateVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={{ duration: 0.5 }}
      className='text-center'
    >
      <h1 className='text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-linear-to-r from-indigo-300 via-white to-purple-300 mb-6 drop-shadow-2xl'>
        <Trans i18nKey='home.creative_developer' />
      </h1>

      <p className='text-slate-400 text-lg md:text-xl max-w-xl mx-auto mb-8'>
        <Trans i18nKey='home.creating_immersive' />
      </p>

      <div className='flex justify-center'>
        <Button
          type='button'
          variant='primary'
          onClick={() => onNavigate('projects')}
          icon={<ChevronRight className='h-4 w-4' />}
          className='px-8 py-3 bg-indigo-50 text-black rounded-full font-bold hover:bg-indigo-200 transition-colors'
        >
          <Trans i18nKey='home.view_projects' />
        </Button>
      </div>
    </motion.div>
  )
}

export default HomeComponent
