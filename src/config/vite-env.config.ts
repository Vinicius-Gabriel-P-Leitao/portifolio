export function getEnvConfig(): ImportMetaEnv {
  return (
    window.__RUNTIME_CONFIG__ ??
    ({
      VITE_EMAILJS_SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
      VITE_EMAILJS_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      VITE_EMAILJS_PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    } as ImportMetaEnv)
  )
}
