import Github from '@assets/github.svg?react'
import { useSendEmail } from '@composable/e-mail.hook'
import { Float, Sphere, TorusKnot } from '@react-three/drei'
import { animateVariants } from '@ui/layouts/overlay/overlay.object.variants'
import { bus } from '@utils/event-bus.util'
import { motion } from 'framer-motion'
import { Mail, Send } from 'lucide-react'
import { type SyntheticEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../../components/button/button.component'
import { Modal } from '../../components/modal/modal.component'

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
  const { t } = useTranslation()
  const { sendEmail } = useSendEmail()

  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = async (event?: SyntheticEvent) => {
    event?.preventDefault()
    setLoading(true)

    const formData = {
      name: form.name,
      email: form.email,
      time: new Date().toLocaleString(),
      message: form.message
    }

    const result = await sendEmail(formData)
    setLoading(false)

    if (!result.ok && result.error) {
      const { message, severity, icon: Icon } = result.error

      bus.emit('show-toast', {
        title: t('contact.toast.errorTitle'),
        message: message,
        variant: severity,
        icon: <Icon className='w-4 h-4' />
      })
      return
    }

    setIsModalOpen(false)
    setForm({ name: '', email: '', message: '' })

    bus.emit('show-toast', {
      title: t('contact.toast.successTitle'),
      message: t('contact.toast.successMessage'),
      variant: 'success'
    })
  }

  return (
    <motion.div key='contact' variants={animateVariants} initial='initial' animate='animate' exit='exit' className='text-center'>
      <h2 className='text-5xl font-bold text-white mb-8'>{t('contact.title')}</h2>
      <div className='flex justify-center gap-6'>
        <button
          type='button'
          className='p-4 bg-white/15 hover:bg-white/10 rounded-full text-white transition-colors border border-white/10 cursor-pointer'
          onClick={() => setIsModalOpen(true)}
        >
          <Mail size={24} />
        </button>

        <a
          rel='noopener'
          target='_blank'
          href='https://github.com/Vinicius-Gabriel-P-Leitao'
          className='p-4 bg-white/50 hover:bg-white/60 rounded-full text-white transition-colors border border-white/10'
        >
          <Github className='w-6 h-6 text-white' />
        </a>
      </div>

      <p className='mt-8 text-slate-500 text-sm'>vinicius.gabriel.p.leitao@gmail.com</p>

      <Modal.Root isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size='md' position='center'>
        <Modal.Header onClose={() => setIsModalOpen(false)}>{t('contact.modalTitle')}</Modal.Header>

        <Modal.Content className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <label htmlFor='name' className='text-sm font-medium text-slate-300'>
              {t('contact.form.name')}
            </label>

            <input
              id='name'
              type='text'
              value={form.name}
              placeholder={t('contact.form.namePlaceholder')}
              className='bg-white/5 border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-indigo-500 transition-colors'
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor='email' className='text-sm font-medium text-slate-300'>
              {t('contact.form.email')}
            </label>

            <input
              id='email'
              type='email'
              value={form.email}
              placeholder={t('contact.form.emailPlaceholder')}
              className='bg-white/5 border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-indigo-500 transition-colors'
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor='message' className='text-sm font-medium text-slate-300'>
              {t('contact.form.message')}
            </label>

            <textarea
              id='message'
              value={form.message}
              placeholder={t('contact.form.messagePlaceholder')}
              className='bg-white/5 border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none h-32'
              onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
            />
          </div>
        </Modal.Content>

        <Modal.Footer className='flex justify-end'>
          <Button variant='secondary' onClick={handleSubmit} disabled={loading} icon={loading ? undefined : <Send className='w-4 h-4' />}>
            {loading ? t('contact.form.sending') : t('contact.form.send')}
          </Button>
        </Modal.Footer>
      </Modal.Root>
    </motion.div>
  )
}

export default ContactComponent
