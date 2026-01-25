export type Section = 'home' | 'about' | 'projects' | 'contact'

export type SectionI18n = {
  id: Section
  label: string
}

export type SceneState = {
  section: Section
  color: string
}

export type Project = {
  id: number
  title: string
  description: string
  tech: string[]
}
