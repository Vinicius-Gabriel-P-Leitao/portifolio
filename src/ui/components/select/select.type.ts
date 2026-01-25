import type { VariantProps } from 'class-variance-authority'
import type { ReactNode } from 'react'
import type { selectVariants } from './select.variants'

export type SelectValue = {
  label: string
  value: string
}

export interface SelectProps extends VariantProps<typeof selectVariants> {
  value?: string
  icon?: ReactNode
  className?: string
  values: SelectValue[]
  onChange?: (value: string) => void
}
