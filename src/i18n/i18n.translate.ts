import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  ptBR: {
    translation: {
      loading: 'Carregando...',
      tabs: [
        { id: 'home', label: 'home' },
        { id: 'about', label: 'sobre' },
        { id: 'projects', label: 'projetos' },
        { id: 'contact', label: 'contato' }
      ],
      home: {
        creative_developer: 'DESENVOLVEDOR<br/>CRIATIVO',
        creating_immersive: 'Criando experiências imersivas usando React e Java.',
        view_projects: 'Ver projetos'
      },
      about: {
        title: 'Sobre mim',
        description1:
          'Sou Vinícius, desenvolvedor full-stack gosto de criar web apps modernos e escaláveis. Tenho experiência em JavaScript/TypeScript, React, Node.js e no ecossistema frontend com CSS, Sass, Tailwind CSS. Também utilizo bancos de dados (SQL, PostgreSQL, SQLite3), versionamento com Git/GitHub junto ao git-flow e conteinerização via Docker.',
        description2:
          'Atualmente, estou expandindo meus conhecimentos em Spring Boot, Kotlin, Android e Jetty, explorando tecnologias que me permitem conectar o backend robusto com experiências mobile e cloud-ready. Estou explorando C, C++ e todo workspace nativo.',
        frontend_title: 'Domínio de Front-end',
        backend_title: 'Domínio de Backend',
        db_title: 'Domínio de DB',
        // NOTE: Por mais que não mude, facilita alterar
        frontend_list: ['TypeScript', 'Tailwind', 'React', 'Jetpack Compose', 'Material3'],
        backend_list: ['Java', 'Kotlin', 'Nodejs', 'NestJs', 'SpringBoot'],
        db_list: ['PostgresSql', 'Sqlite3', 'Firebase']
      }
    }
  },
  en: {
    translation: {
      loading: 'Loading...',
      tabs: [
        { id: 'home', label: 'home' },
        { id: 'about', label: 'about' },
        { id: 'projects', label: 'projects' },
        { id: 'contact', label: 'contact' }
      ],
      home: {
        creative_developer: 'CREATIVE<br/>DEVELOPER',
        creating_immersive: 'Creating immersive experiences using React and Java.',
        view_projects: 'View projects'
      },
      about: {
        title: 'About me',
        description1:
          "I'm Vinícius, a full-stack developer who enjoys creating modern and scalable web apps. I have experience in JavaScript/TypeScript, React, Node.js and the frontend ecosystem with CSS, Sass, Tailwind CSS. I also use databases (SQL, PostgreSQL, SQLite3), versioning with Git/GitHub along with git-flow and containerization via Docker.",
        description2:
          'Currently, I am expanding my knowledge in Spring Boot, Kotlin, Android and Jetty, exploring technologies that allow me to connect robust backend with mobile and cloud-ready experiences. I am exploring C, C++ and the entire native workspace.',
        frontend_title: 'Frontend Mastery',
        backend_title: 'Backend Mastery',
        db_title: 'DB Mastery',
        // NOTE: Por mais que não mude, facilita alterar
        frontend_list: ['TypeScript', 'Tailwind', 'React', 'Jetpack Compose', 'Material3'],
        backend_list: ['Java', 'Kotlin', 'Nodejs', 'NestJs', 'SpringBoot'],
        db_list: ['PostgresSql', 'Sqlite3', 'Firebase']
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
