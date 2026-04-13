import type { VariantProps } from 'class-variance-authority'
import type { HTMLMotionProps } from 'framer-motion'
import type { HTMLAttributes, ReactNode } from 'react'
import type { rootVariants } from './modal.variants'

export interface ModalRootProps extends HTMLMotionProps<'div'>, VariantProps<typeof rootVariants> {
  children: ReactNode
  isOpen: boolean
  onClose?: () => void
  hasOverlay?: boolean
}

export interface ModalHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export interface ModalContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}
