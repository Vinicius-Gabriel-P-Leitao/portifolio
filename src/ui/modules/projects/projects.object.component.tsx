import { Octahedron, MeshDistortMaterial, Float } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { Card } from '@ui/components/card/card.component'
import type { Project } from './projects.type'

export const ProjectsObject = () => (
  <group position={[0, 5, -10]} rotation={[0, Math.PI, 0]}>
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <group>
        <Octahedron args={[0.9, 0]} position={[-9, 2, -2]}>
          <MeshDistortMaterial color='#f59e0b' speed={2} distort={0.4} roughness={0} metalness={1} />
        </Octahedron>

        <Octahedron args={[1.2, 0]} position={[0, 4, 3]}>
          <MeshDistortMaterial color='#fbbf24' speed={3} distort={0.5} roughness={0} metalness={1} />
        </Octahedron>

        <Octahedron args={[1.0, 0]} position={[9, 1, -3]}>
          <MeshDistortMaterial color='#fcd34d' speed={2.5} distort={0.3} roughness={0} metalness={1} />
        </Octahedron>
      </group>
    </Float>
  </group>
)

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
}

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } }
}

const ProjectsComponent = () => {
  const projects = useMemo<Project[]>(
    () => [
      {
        title: 'Acerola',
        preview: '/assets/gargantua.png',
        desc: 'App android feito com intuito de ler mangás/quadrinhos no formato cbz e cbr.',
        tech: ['Kotlin', 'Jetpack compose', 'Hilt']
      },
      {
        title: 'Arch sticker',
        preview: '/assets/gargantua.png',
        desc: 'App android feito com intuito de aprender stacks antigas do android.',
        tech: ['Java', 'Xml', 'C++']
      },
      {
        title: 'Auth server',
        preview: '/assets/gargantua.png',
        desc: 'Projeto de servidor de autenticação em java com spring security',
        tech: ['Java', 'Spring', 'React', 'Jwt']
      }
    ],
    []
  )

  return (
    <motion.div
      exit='exit'
      key='projects'
      initial='initial'
      animate='animate'
      variants={containerVariants}
      className='grid grid-cols-1 md:grid-cols-3 gap-8 p-4'
    >
      {projects.map((project) => (
        <motion.div key={project.title} variants={itemVariants}>
          <Card.Root size='md' width='full' height='lg' onClick={() => console.log('clicou')}>
            <Card.Header>
              <Card.Image src={project.preview} />
              <Card.Title className='font-display text-purple-glow text-nebula-purple'>{project.title}</Card.Title>
            </Card.Header>

            <Card.Content className='flex flex-col gap-4'>
              <span className='text-slate-300 leading-relaxed font-sans'>{project.desc}</span>

              <div className='flex flex-wrap gap-2 mt-auto'>
                {project.tech.map((tech) => (
                  <div
                    key={tech}
                    className='inline-block px-3 py-1 bg-nebula-purple/10 border border-nebula-purple/20 rounded-full text-[10px] uppercase tracking-tighter text-white font-medium'
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </Card.Content>
          </Card.Root>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default ProjectsComponent
