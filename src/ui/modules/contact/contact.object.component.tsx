import Github from '@assets/github.svg?react'
import { Float, Sphere, TorusKnot } from '@react-three/drei'
import { animateVariants } from '@ui/layouts/overlay/overlay.object.variants'
import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'

export const ContactObject = () => (
  <group position={[20, 10, 0]} rotation={[0, -Math.PI / 2, 0]}>
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

const ContactComponent = () => {
  return (
    <motion.div key='contact' variants={animateVariants} initial='initial' animate='animate' exit='exit' className='text-center'>
      <h2 className='text-5xl font-bold text-white mb-8'>Let's Create Together</h2>
      <div className='flex justify-center gap-6'>
        <a href='./' className='p-4 bg-white/15 hover:bg-white/10 rounded-full text-white transition-colors border border-white/10'>
          <Mail size={24} />
        </a>

        <a href='./' className='p-4 bg-white/50 hover:bg-white/60 rounded-full text-white transition-colors border border-white/10'>
          <Github className='w-6 h-6 text-white' />
        </a>
      </div>

      <p className='mt-8 text-slate-500 text-sm'>vinicius.gabriel.p.leitao@gmail.com</p>
    </motion.div>
  )
}

export default ContactComponent
