import { Float, Sphere } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { motion } from 'framer-motion'
import { Code2, Cpu, Database } from 'lucide-react'
import { useRef } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import type * as THREE from 'three'
import { animateVariants } from '../../layouts/overlay/overlay.object.variants'

export const AboutObject = () => {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    const timer = clock.getElapsedTime()
    const scale = 0.8 + Math.sin(timer * 2) * 0.15

    ref.current.scale.setScalar(scale)
  })

  return (
    <group position={[-20, 9, 0]} rotation={[0, Math.PI / 2, 0]}>
      <Float speed={4} rotationIntensity={1} floatIntensity={0.5}>
        <Sphere args={[1.2, 32, 32]}>
          <meshStandardMaterial color='#f59e0b' wireframe />
        </Sphere>

        <Sphere ref={ref} args={[0.8, 32, 32]}>
          <meshStandardMaterial color='#f59e0b' emissive='#f59e0b' emissiveIntensity={2} />
        </Sphere>
      </Float>
    </group>
  )
}

const AboutComponent = () => {
  const { t } = useTranslation()

  return (
    <motion.div
      key='about'
      variants={animateVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      className='bg-black/40 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl text-white'
    >
      <div className='grid md:grid-cols-2 gap-10 items-center'>
        <div>
          <h2 className='text-4xl font-bold mb-6'>
            <Trans i18nKey='about.title' />
          </h2>

          <p className='text-slate-300 leading-relaxed mb-6'>
            <Trans i18nKey='about.description1' />
          </p>

          <p className='text-slate-300 leading-relaxed'>
            <Trans i18nKey='about.description2' />
          </p>
        </div>

        <div className='grid gap-4'>
          <div className='bg-white/5 p-4 rounded-xl flex items-center gap-4'>
            <Code2 className='text-indigo-400' />

            <div>
              <h3 className='font-bold'>
                <Trans i18nKey='about.frontend_title' />
              </h3>

              <p className='text-xs text-slate-400'>{(t('about.frontend_list', { returnObjects: true }) as string[]).join(', ')}</p>
            </div>
          </div>

          <div className='bg-white/5 p-4 rounded-xl flex items-center gap-4'>
            <Cpu className='text-purple-400' />

            <div>
              <h3 className='font-bold'>
                <Trans i18nKey='about.backend_title' />
              </h3>

              <p className='text-xs text-slate-400'>{(t('about.backend_list', { returnObjects: true }) as string[]).join(', ')}</p>
            </div>
          </div>

          <div className='bg-white/5 p-4 rounded-xl flex items-center gap-4'>
            <Database className='text-red-400' />

            <div>
              <h3 className='font-bold'>
                <Trans i18nKey='about.db_title' />
              </h3>

              <p className='text-xs text-slate-400'>{(t('about.db_list', { returnObjects: true }) as string[]).join(', ')}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default AboutComponent
