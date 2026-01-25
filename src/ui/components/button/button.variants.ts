import { cva } from 'class-variance-authority'

export const buttonVariants = cva('cursor-pointer relative uppercase tracking-widest transition-colors flex items-center gap-2 select-none', {
  variants: {
    variant: {
      primary: 'text-zinc-400 hover:text-white focus:text-white',
      secondary: 'text-white bg-zinc-800 hover:bg-zinc-700'
    },
    active: {
      true: 'text-white border-b border-white',
      false: 'border-b border-transparent'
    },
    hasIcon: {
      true: 'pl-2',
      false: 'pl-0'
    }
  },
  defaultVariants: {
    variant: 'primary',
    active: false,
    hasIcon: false
  }
})
