import { cva } from 'class-variance-authority'

export const buttonVariants = cva('cursor-pointer relative uppercase tracking-widest transition-colors flex items-center justify-center gap-2 select-none', {
  variants: {
    variant: {
      primary: 'px-3 py-2 text-zinc-400 hover:text-white focus:text-white',
      secondary: 'px-4 py-2 text-white bg-zinc-800 rounded-lg hover:bg-zinc-700'
    },
    active: {
      true: 'text-white border-b border-white',
      false: 'border-b border-transparent'
    }
  },
  defaultVariants: {
    variant: 'primary',
    active: false
  }
})