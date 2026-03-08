import clsx from 'clsx'
import { buttonVariants } from './button.variants'
import type { ButtonProps } from './button.type'

export function Button({ children, icon, variant, active, className, ...props }: ButtonProps) {
  return (
    <button className={clsx(buttonVariants({ variant, active }), className)} {...props}>
      {icon && <span className='flex items-center'>{icon}</span>}
      {children && <span>{children}</span>}
    </button>
  )
}