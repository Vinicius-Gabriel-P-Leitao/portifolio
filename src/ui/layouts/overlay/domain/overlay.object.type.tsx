import type { Section } from '@ui/types'

export type OverlayProps = {
  section: Section
  onNavigate: (section: Section) => void
}
