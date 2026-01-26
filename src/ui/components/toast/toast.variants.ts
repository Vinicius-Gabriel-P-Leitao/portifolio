import { cva } from 'class-variance-authority'

export const toastVariants = cva(
  'fixed bottom-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg backdrop-blur-md border transition-all duration-300 transform translate-y-0 opacity-100',
  {
    variants: {
      variant: {
        success: 'bg-green-500/10 border-green-500/20 text-green-200',
        error: 'bg-red-500/10 border-red-500/20 text-red-200',
        info: 'bg-blue-500/10 border-blue-500/20 text-blue-200',
        warning: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-200'
      }
    },
    defaultVariants: {
      variant: 'info'
    }
  }
)
