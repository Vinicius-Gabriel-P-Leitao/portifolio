import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  ptBR: {
    translation: {
      'CREATIVE DEVELOPER': 'DESENVOLVEDOR<br/>CRIATIVO',
      'CREATE IMMERSIVE': 'Criando experiências imersivas usando React e Java.',
      'VIEW PROJECT': 'Ver projetos'
    }
  },
  en: {
    translation: {
      'CREATIVE DEVELOPER': 'CREATIVE<br/>DEVELOPER',
      'CREATE IMMERSIVE': 'Creating immersive experiences using React and Java.',
      'VIEW PROJECT': 'View projects'
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
