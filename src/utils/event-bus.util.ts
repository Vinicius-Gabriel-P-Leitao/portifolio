/** biome-ignore-all lint/suspicious/noExplicitAny: Any explicito para receber os erro */
type EventHandler<T = any> = (data: T) => void

class EventBus {
  private events: Record<string, EventHandler[]> = {}

  on<T = any>(event: string, handler: EventHandler<T>): void {
    if (!this.events[event]) this.events[event] = []

    this.events[event].push(handler)
  }

  off<T = any>(event: string, eventHandler: EventHandler<T>): void {
    if (!this.events[event]) return

    this.events[event] = this.events[event].filter((handler) => {
      return handler !== eventHandler
    })
  }

  emit<T = any>(event: string, data: T): void {
    if (!this.events[event]) return

    this.events[event].forEach((handler) => {
      handler(data)
    })
  }
}

export const bus = new EventBus()
