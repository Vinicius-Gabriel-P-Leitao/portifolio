import { Button } from '@ui/components/button/button.component'
import { bus } from '../../../utils/event-bus.util'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, CheckCircle, Info, X, XCircle } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import type { ToastData, ToastProps } from './toast.type'
import { toastVariants } from './toast.variants'

const icons = {
  success: <CheckCircle className='w-5 h-5 text-green-500' />,
  error: <XCircle className='w-5 h-5 text-red-500' />,
  info: <Info className='w-5 h-5 text-blue-500' />,
  warning: <AlertCircle className='w-5 h-5 text-yellow-500' />
}

export const Toast = ({ id, message, variant = 'info', title, onClose }: ToastProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className={toastVariants({ variant })}
    >
      <div className='shrink-0'>{icons[variant || 'info']}</div>

      <div className='flex flex-col flex-1 mr-2'>
        {title && <span className='font-semibold text-sm'>{title}</span>}
        <span className='text-sm opacity-90'>{message}</span>
      </div>

      <Button
        variant='primary'
        onClick={() => onClose(id)}
        className='p-1! hover:bg-white/10 rounded-full min-w-0 h-auto'
        icon={<X className='w-4 h-4 opacity-70' />}
      />
    </motion.div>
  )
}

export const ToastContainer = () => {
  const [toasts, setToasts] = useState<ToastData[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  useEffect(() => {
    const handleToast = (data: Omit<ToastData, 'id'>) => {
      const id = Math.random().toString(36).substring(2, 9)
      const newToast = { ...data, id }

      setToasts((prev) => [...prev, newToast])

      if (data.duration !== 0) {
        setTimeout(() => {
          removeToast(id)
        }, data.duration || 3000)
      }
    }

    bus.on('show-toast', handleToast)
    return () => bus.off('show-toast', handleToast)
  }, [removeToast])

  return (
    <div className='fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none'>
      <AnimatePresence mode='popLayout'>
        {toasts.map((toast) => (
          <div key={toast.id} className='pointer-events-auto'>
            <Toast {...toast} onClose={removeToast} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  )
}
