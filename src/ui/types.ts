export type Section = 'home' | 'sobre' | 'projetos' | 'contato'

export interface SceneState {
  section: Section
  color: string
}

export interface Project {
  id: number
  title: string
  description: string
  tech: string[]
}
