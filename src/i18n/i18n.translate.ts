import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  ptBR: {
    translation: {
      home: {
        'creative_developer': 'DESENVOLVEDOR<br/>CRIATIVO',
        'creating_immersive': 'Criando experiências imersivas usando React e Java.',
        'view_projects': 'Ver projetos'
      }
    }
  },
  en: {
    translation: {
      home: {
        'creative_developer': 'CREATIVE<br/>DEVELOPER',
        'creating_immersive': 'Creating immersive experiences using React and Java.',
        'view_projects': 'View projects'
      }
    }
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'ptBR',
  interpolation: {
    escapeValue: false
  }
})

export default i18n
