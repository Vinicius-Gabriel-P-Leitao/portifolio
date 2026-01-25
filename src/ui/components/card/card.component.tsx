import clsx from 'clsx'
import type { FC } from 'react'
import type { CardContentProps, CardHeaderProps, CardImageProps, CardRootProps, CardTitleProps } from './card.type'
import { rootVariants } from './card.variants'

const Root: FC<CardRootProps> = ({ children, size, width, height, className, ...props }) => {
  return (
    <div className={clsx(rootVariants({ size, width, height }), className)} {...props}>
      {children}
    </div>
  )
}

const Header: FC<CardHeaderProps> = ({ children, className, ...props }) => (
  <div className={clsx('flex flex-col items-center mb-4', className)} {...props}>
    {children}
  </div>
)

const Image: FC<CardImageProps> = ({ src, children, className, ...props }) => (
  <div className={clsx('h-40 w-full rounded-xl mb-4 flex items-center justify-center overflow-hidden bg-indigo-900/20', className)} {...props}>
    {src ? <img src={src} alt='' className='object-cover w-full h-full rounded-xl' /> : children}
  </div>
)

const Title: FC<CardTitleProps> = ({ children, className, ...props }) => (
  <h3 className={clsx('text-xl font-bold text-white', className)} {...props}>
    {children}
  </h3>
)

const Content: FC<CardContentProps> = ({ children, className, ...props }) => (
  <div className={clsx('text-slate-400 text-sm', className)} {...props}>
    {children}
  </div>
)

export const Card = {
  Root,
  Header,
  Image,
  Title,
  Content
}
