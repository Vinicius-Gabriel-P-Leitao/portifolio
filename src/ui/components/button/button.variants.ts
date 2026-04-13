import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  'cursor-pointer relative uppercase tracking-[0.2em] font-display font-medium transition-all duration-300 flex items-center justify-center gap-2 select-none group',
  {
    variants: {
      variant: {
        primary: 'px-3 py-2 text-zinc-400 hover:text-nebula-purple focus:text-nebula-purple',
        secondary:
          'px-6 py-2.5 text-white bg-nebula-purple/10 glass-morphism rounded-lg hover:bg-nebula-purple/20 hover:border-nebula-purple/40 text-glow',
        cta: 'px-8 py-4 text-white bg-white/5 border border-white/10 rounded-full backdrop-blur-md hover:bg-white/10 hover:border-indigo-400/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]'
      },
      active: {
        true: '',
        false: ''
      }
    },
    compoundVariants: [
      {
        variant: 'primary',
        active: true,
        className: 'text-white border-b border-nebula-purple'
      },
      {
        variant: 'primary',
        active: false,
        className: 'border-b border-transparent'
      }
    ],
    defaultVariants: {
      variant: 'primary',
      active: false
    }
  }
)
