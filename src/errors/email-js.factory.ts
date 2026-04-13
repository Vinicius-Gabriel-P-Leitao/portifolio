import { AlertCircle, Wifi, ShieldAlert, FileWarning, HelpCircle } from 'lucide-react'
import i18n from '../i18n/i18n.translate'
import type { EmailError, ErrorDisplay } from './types'

export const EmailErrors = {
  limitReached: (cause?: unknown): EmailError => ({
    type: 'limit-reached',
    message: 'Limite de envio atingido',
    cause
  }),

  invalidKey: (cause?: unknown): EmailError => ({
    type: 'invalid-key',
    message: 'Chave pública inválida',
    cause
  }),

  serviceUnavailable: (cause?: unknown): EmailError => ({
    type: 'service-unavailable',
    message: 'Serviço temporariamente indisponível',
    cause
  }),

  network: (cause?: unknown): EmailError => ({
    type: 'network-error',
    message: 'Erro de conexão',
    cause
  }),

  invalidParams: (cause?: unknown): EmailError => ({
    type: 'invalid-params',
    message: 'Parâmetros inválidos',
    cause
  }),

  unknown: (message: string, cause?: unknown): EmailError => ({
    type: 'unknown',
    message,
    cause
  })
}

// biome-ignore lint/suspicious/noExplicitAny: Necessário para poder verificar se o erro é realmente do email-js
export function mapEmailJsError(error: any): EmailError {
  const text = error?.text || error?.message || JSON.stringify(error) || ''

  if (text.includes('limit')) return EmailErrors.limitReached(error)
  if (text.includes('key') || text.includes('token')) return EmailErrors.invalidKey(error)
  if (text.includes('network') || text.includes('connection')) return EmailErrors.network(error)
  if (text.includes('parameter') || text.includes('template')) return EmailErrors.invalidParams(error)
  if (text.includes('service') || text.includes('unavailable')) return EmailErrors.serviceUnavailable(error)

  return EmailErrors.unknown(text, error)
}

export function emailErrorToDisplay(error: EmailError): ErrorDisplay {
  switch (error.type) {
    case 'limit-reached':
      return {
        message: i18n.t('errors.email.limitReached'),
        icon: ShieldAlert,
        severity: 'warning'
      }

    case 'invalid-key':
      return {
        message: i18n.t('errors.email.invalidKey'),
        icon: FileWarning,
        severity: 'error'
      }

    case 'service-unavailable':
      return {
        message: i18n.t('errors.email.serviceUnavailable'),
        icon: AlertCircle,
        severity: 'error'
      }

    case 'network-error':
      return {
        message: i18n.t('errors.email.network'),
        icon: Wifi,
        severity: 'error'
      }

    case 'invalid-params':
      return {
        message: i18n.t('errors.email.invalidParams'),
        icon: FileWarning,
        severity: 'warning'
      }

    default:
      return {
        message: i18n.t('errors.email.unknown'),
        icon: HelpCircle,
        severity: 'error'
      }
  }
}
