import { Box, Float } from '@react-three/drei'
import { motion } from 'framer-motion'
import { animateVariants } from '../../layouts/overlay/overlay.object.variants'
import { Card } from '@ui/components/card/card.component'

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

const ProjectsComponent = () => {
  return (
    <motion.div
      key='projects'
      variants={animateVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      className='grid grid-cols-1 md:grid-cols-3 gap-6'
    >
      {/* TODO: Trocar isso por um valor mais fácil de mudar */}
      {[
        {
          title: 'Acerola',
          desc: 'App android feito com intuito de ler mangás/quadrinhos no formato cbz e cbr.',
          tech: 'Kotlin, Jetpack compose, Hilt'
        },
        { title: 'Arch sticker', desc: 'App android feito com intuito de aprender stacks antigas do android.', tech: 'Java, Xml, C++' },
        { title: 'Python rsa', desc: 'Projeto com intuito de aprender criptografia assimétrica.', tech: 'Python' }
      ].map((project, _) => (
        <Card.Root key={project.title} width='sm' height='lg' onClick={() => console.log('clicou')}>
          <Card.Header>
            <Card.Image src='/assets/gargantua.png' />
            <Card.Title>{project.title}</Card.Title>
          </Card.Header>

          <Card.Content className='flex flex-col'>
            <span>{project.desc}</span>

            <div className='inline-block px-2 py-1 bg-white/10 rounded text-xs text-white mt-2'>{project.tech}</div>
          </Card.Content>
        </Card.Root>
      ))}
    </motion.div>
  )
}

export default ProjectsComponent
