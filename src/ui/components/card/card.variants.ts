import { cva } from 'class-variance-authority'

export const rootVariants = cva(
  'bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl hover:border-indigo-500/50 transition-colors group cursor-pointer overflow-hidden',
  {
    variants: {
      size: {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8'
      },
      width: {
        sm: 'w-64',
        md: 'w-80',
        lg: 'w-96'
      },
      height: {
        sm: 'h-56',
        md: 'h-64',
        lg: 'h-96'
      }
    },
    defaultVariants: {
      size: 'md',
      width: 'md',
      height: 'md'
    }
  }
)
