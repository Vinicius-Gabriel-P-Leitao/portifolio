import { cva } from 'class-variance-authority'

export const rootVariants = cva(
  'fixed z-50 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300',
  {
    variants: {
      size: {
        sm: 'w-80 h-96',
        md: 'w-96 h-[32rem]',
        lg: 'w-[32rem] h-[40rem]',
        full: 'w-full h-full rounded-none'
      },
      position: {
        center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
        bottomRight: 'bottom-4 right-4',
        bottomLeft: 'bottom-4 left-4'
      }
    },
    defaultVariants: {
      size: 'md',
      position: 'center'
    }
  }
)

export const overlayVariants = cva(
  'fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300'
)
