import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  'cursor-pointer relative uppercase tracking-[0.2em] font-display font-medium transition-all duration-300 flex items-center justify-center gap-2 select-none group',
  {
    variants: {
      variant: {
        primary: 'px-3 py-2 text-zinc-400 hover:text-nebula-purple focus:text-nebula-purple font-display',
        secondary:
          'px-6 py-2.5 text-white bg-nebula-purple/10 glass-morphism rounded-lg hover:bg-nebula-purple/20 hover:border-nebula-purple/40 text-glow'
      },
      active: {
        true: 'text-nebula-purple border-b border-nebula-purple',
        false: 'border-b border-transparent'
      }
    },
    defaultVariants: {
      variant: 'primary',
      active: false
    }
  }
)
