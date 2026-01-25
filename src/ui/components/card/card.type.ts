import type { VariantProps } from 'class-variance-authority'
import type { HTMLAttributes, ReactNode } from 'react'
import type { rootVariants } from './card.variants'

export interface CardRootProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof rootVariants> {
  children: ReactNode
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export interface CardImageProps extends HTMLAttributes<HTMLDivElement> {
  src?: string
  children?: ReactNode
}

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode
}

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}
