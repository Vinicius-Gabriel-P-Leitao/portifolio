import emailjs from '@emailjs/browser'
import { useCallback } from 'react'
import { emailErrorToDisplay, mapEmailJsError } from '../errors/email-js.factory'
import type { ErrorDisplay } from '../errors/types'
import type { Result } from '@utils/result.util'
import { getEnvConfig } from '@config/vite-env.config'

export type EmailData = {
  name: string
  time?: string
  email: string
  message: string
}

export const useSendEmail = () => {
  const config = getEnvConfig()

  const sendEmail = useCallback(
    async (data: EmailData): Promise<Result<string, ErrorDisplay>> => {
      try {
        const result = await emailjs.send(config.VITE_EMAILJS_SERVICE_ID, config.VITE_EMAILJS_TEMPLATE_ID, data, config.VITE_EMAILJS_PUBLIC_KEY)
        return { ok: true, value: result.text }
      } catch (error: unknown) {
        return { ok: false, error: emailErrorToDisplay(mapEmailJsError(error)) }
      }
    },
    [config.VITE_EMAILJS_PUBLIC_KEY, config.VITE_EMAILJS_SERVICE_ID, config.VITE_EMAILJS_TEMPLATE_ID]
  )

  return { sendEmail }
}
