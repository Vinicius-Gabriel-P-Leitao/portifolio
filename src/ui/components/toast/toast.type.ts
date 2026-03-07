import type { VariantProps } from 'class-variance-authority'
import type { ReactNode } from 'react'
import type { toastVariants } from './toast.variants'

export interface ToastProps extends VariantProps<typeof toastVariants> {
  id: string
  title?: string
  message: string
  icon?: ReactNode
  onClose: (id: string) => void
}

export type ToastType = VariantProps<typeof toastVariants>['variant']

export interface ToastData {
  id: string
  message: string
  variant?: ToastType
  title?: string
  duration?: number
}
