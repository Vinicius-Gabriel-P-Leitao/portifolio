import Github from '@assets/github.svg?react'
import { Select } from '@ui/components/select/select.component'
import { AnimatePresence, motion } from 'framer-motion'
import { Code2, Cpu, Mail, Palette } from 'lucide-react'
import { useEffect, useMemo, useState, type FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import type { Section } from '../../types'
import type { SelectValue } from '@ui/components/select/select.type'
import { animateVariants } from './overlay.object.variants'
import type { OverlayProps } from './domain/overlay.object.type'

export const Overlay: FC<OverlayProps> = ({ section, onNavigate }) => {
  const { i18n } = useTranslation()
  const [value, setValue] = useState<string>(i18n.language)

  const translationOptions = useMemo<SelectValue[]>(() => {
    return Object.keys(i18n.store.data).map((it) => ({
      label: it.toUpperCase(),
      value: it
    }))
  }, [i18n.store.data])

  useEffect(() => {
    if (value) {
      i18n.changeLanguage(value)
    }
  }, [value, i18n])

  return (
    <div className='absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center p-4 md:p-10'>
      {/* Navigation */}
      <nav className='absolute top-0 left-0 right-0 p-6 flex justify-between items-center pointer-events-auto'>
        <button type='button' className='text-white font-bold text-xl tracking-tighter' onClick={() => onNavigate('home')}>
          VINICIUSGPL.DEV
        </button>

        <div className='flex gap-6 text-sm text-slate-400 font-medium'>
          {['home', 'sobre', 'projetos', 'contato'].map((tab) => (
            <button
              key={tab}
              type='button'
              onClick={() => onNavigate(tab as Section)}
              className={`hover:text-white transition-colors cursor-pointer uppercase tracking-widest ${tab ? 'text-white border-b border-white' : ''}`}
            >
              {tab}
            </button>
          ))}

          <Select values={translationOptions} value={value} onChange={setValue} />
        </div>
      </nav>

      {/* Main Content Area */}
      <div className='w-full max-w-4xl pointer-events-auto'>
        <AnimatePresence mode='wait'>
          {section === 'home' && (
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
                <Trans i18nKey='CREATIVE DEVELOPER' />
              </h1>

              <p className='text-slate-400 text-lg md:text-xl max-w-xl mx-auto mb-8'>
                <Trans i18nKey='CREATE IMMERSIVE' />
              </p>

              <button
                type='button'
                onClick={() => onNavigate('projetos')}
                className='px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-indigo-50 transition-colors'
              >
                <Trans i18nKey='VIEW PROJECT' />
              </button>
            </motion.div>
          )}

          {/* TODO: Componentizar os div de itens e traduzir  */}
          {section === 'sobre' && (
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
                  <h2 className='text-4xl font-bold mb-6'>About Me</h2>

                  <p className='text-slate-300 leading-relaxed mb-6'>
                    I'm Alex, a multidisciplinary developer based in Brazil. I bridge the gap between design and engineering, creating applications
                    that are not just functional but also visually stunning.
                  </p>

                  <p className='text-slate-300 leading-relaxed'>
                    With 5 years of experience in Full Stack development, I've recently focused on WebGL and AI agents to push the boundaries of
                    what's possible in the browser.
                  </p>
                </div>

                <div className='grid gap-4'>
                  <div className='bg-white/5 p-4 rounded-xl flex items-center gap-4'>
                    <Code2 className='text-indigo-400' />

                    <div>
                      <h3 className='font-bold'>Frontend Mastery</h3>
                      <p className='text-xs text-slate-400'>React, TypeScript, Tailwind, Next.js</p>
                    </div>
                  </div>

                  <div className='bg-white/5 p-4 rounded-xl flex items-center gap-4'>
                    <Cpu className='text-purple-400' />
                    <div>
                      <h3 className='font-bold'>Creative Coding</h3>
                      <p className='text-xs text-slate-400'>Three.js, R3F, GLSL Shaders</p>
                    </div>
                  </div>

                  <div className='bg-white/5 p-4 rounded-xl flex items-center gap-4'>
                    <Palette className='text-pink-400' />

                    <div>
                      <h3 className='font-bold'>AI Integration</h3>
                      <p className='text-xs text-slate-400'>Gemini API, OpenAI, LangChain</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TODO: Componentizar os itens de itens e traduzir, adicionar links reais para os projetos reais do github, talvez até um frame */}
          {section === 'projetos' && (
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
                { title: 'Neon City', desc: 'A procedural cyberpunk city generator.', tech: 'Three.js' },
                { title: 'AI Sculptor', desc: 'Generative 3D modeling assistant.', tech: 'Gemini API' },
                { title: 'E-Commerce 3D', desc: 'Interactive product configurator.', tech: 'R3F' }
              ].map((project, _) => (
                <div
                  key={project.title}
                  className='bg-black/60 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:border-indigo-500/50 transition-colors group cursor-pointer'
                >
                  <div className='h-40 bg-indigo-900/20 rounded-xl mb-4 flex items-center justify-center overflow-hidden'>
                    {/* NOTE: Placeholder visual */}
                    <div className='w-16 h-16 bg-linear-to-tr from-indigo-500 to-purple-600 rounded-full blur-xl opacity-50 group-hover:scale-150 transition-transform duration-500' />
                  </div>
                  <h3 className='text-xl font-bold text-white mb-2'>{project.title}</h3>\{' '}
                  <p className='text-slate-400 text-sm mb-4'>{project.desc}</p>
                  <div className='inline-block px-2 py-1 bg-white/10 rounded text-xs text-white'>{project.tech}</div>
                </div>
              ))}
            </motion.div>
          )}

          {/* TODO: Componentizar os itens e traduzir, também ciar integração com API de e-mail */}
          {section === 'contato' && (
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
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
