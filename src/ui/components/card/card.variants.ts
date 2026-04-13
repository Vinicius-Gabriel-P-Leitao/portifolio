import { cva } from 'class-variance-authority'

export const rootVariants = cva(
  'glass-morphism rounded-2xl hover:border-nebula-purple/50 transition-all duration-500 group cursor-pointer overflow-hidden hover:translate-y--2 hover:shadow-[0_20px_40px_-15px_rgba(168,85,247,0.2)]',
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
        lg: 'w-96',
        full: 'w-full'
      },
      height: {
        sm: 'h-56',
        md: 'h-64',
        lg: 'h-96',
        full: 'h-full'
      }
    },
    defaultVariants: {
      size: 'md',
      width: 'md',
      height: 'md'
    }
  }
)
