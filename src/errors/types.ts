import type { LucideIcon } from 'lucide-react'

export type EmailErrorType = 'limit-reached' | 'invalid-key' | 'service-unavailable' | 'network-error' | 'invalid-params' | 'unknown'

export interface EmailError {
  type: EmailErrorType
  message?: string
  cause?: unknown
}

export interface ErrorDisplay {
  message: string
  icon: LucideIcon
  severity: 'error' | 'warning' | 'info'
}
