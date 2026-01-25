import { cva } from 'class-variance-authority'

export const selectVariants = cva('cursor-pointer relative w-full bg-transparent uppercase tracking-widest transition-colors', {
  variants: {
    variant: {
      primary: 'text-zinc-400 hover:text-white focus-within:text-white'
    },
    active: {
      true: 'text-white border-b border-white',
      false: 'border-b border-transparent'
    },
    hasIcon: {
      true: 'pl-8',
      false: 'pl-0'
    }
  },
  defaultVariants: {
    variant: 'primary',
    active: false,
    hasIcon: false
  }
})

export const itemVariants = cva('cursor-pointer uppercase tracking-widest transition-colors', {
  variants: {
    active: {
      true: 'text-white',
      false: 'text-zinc-400 hover:text-white'
    }
  },
  defaultVariants: {
    active: false
  }
})
