import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  ptBR: {
    translation: {
      site: {
        name: 'VINICIUS-GPL.COM'
      },
      languages: {
        ptBR: 'Português',
        en: 'English'
      },
      loading: 'Carregando...',
      tabs: [
        {
          id: 'home',
          label: 'home'
        },
        {
          id: 'about',
          label: 'sobre'
        },
        {
          id: 'projects',
          label: 'projetos'
        },
        {
          id: 'contact',
          label: 'contato'
        }
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
        frontend_list: ['TypeScript', 'Tailwind', 'React', 'Jetpack Compose', 'Material3'],
        backend_list: ['Java', 'Kotlin', 'Nodejs', 'NestJs', 'SpringBoot'],
        db_list: ['PostgresSql', 'Sqlite3', 'Firebase']
      },
      projects: {
        title: 'Projetos',
        items: [
          {
            title: 'Acerola',
            desc: 'App android feito com intuito de ler mangás/quadrinhos no formato cbz e cbr.',
            tech: ['Kotlin', 'Jetpack compose', 'Hilt']
          },
          {
            title: 'Arch sticker',
            desc: 'App android feito com intuito de aprender stacks antigas do android.',
            tech: ['Java', 'Xml', 'C++']
          },
          {
            title: 'Auth server',
            desc: 'Projeto de servidor de autenticação em java com spring security',
            tech: ['Java', 'Spring', 'React', 'Jwt']
          }
        ]
      },
      contact: {
        title: 'Vamos Criar Juntos',
        modalTitle: 'Contato',
        form: {
          name: 'Nome',
          namePlaceholder: 'Seu nome',
          email: 'Email',
          emailPlaceholder: 'seu@email.com',
          message: 'Mensagem',
          messagePlaceholder: 'Sua mensagem...',
          send: 'Enviar',
          sending: 'Enviando...'
        },
        toast: {
          successTitle: 'Sucesso',
          successMessage: 'Email enviado com sucesso!',
          errorTitle: 'Erro'
        }
      },
      errors: {
        email: {
          limitReached: 'Limite de envios diários atingido. Tente novamente amanhã.',
          invalidKey: 'Erro de configuração no envio de email. Contate o administrador.',
          serviceUnavailable: 'Serviço de email indisponível no momento.',
          network: 'Erro de conexão. Verifique sua internet.',
          invalidParams: 'Dados de envio inválidos.',
          unknown: 'Ocorreu um erro desconhecido ao enviar o email.'
        }
      }
    }
  },
  en: {
    translation: {
      site: {
        name: 'VINICIUS-GPL.COM'
      },
      languages: {
        ptBR: 'Português',
        en: 'English'
      },
      loading: 'Loading...',
      tabs: [
        {
          id: 'home',
          label: 'home'
        },
        {
          id: 'about',
          label: 'about'
        },
        {
          id: 'projects',
          label: 'projects'
        },
        {
          id: 'contact',
          label: 'contact'
        }
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
        frontend_list: ['TypeScript', 'Tailwind', 'React', 'Jetpack Compose', 'Material3'],
        backend_list: ['Java', 'Kotlin', 'Nodejs', 'NestJs', 'SpringBoot'],
        db_list: ['PostgresSql', 'Sqlite3', 'Firebase']
      },
      projects: {
        title: 'Projects',
        items: [
          {
            title: 'Acerola',
            desc: 'Android app designed for reading manga/comics in cbz and cbr formats.',
            tech: ['Kotlin', 'Jetpack compose', 'Hilt']
          },
          {
            title: 'Arch sticker',
            desc: 'Android app designed to learn legacy android stacks.',
            tech: ['Java', 'Xml', 'C++']
          },
          {
            title: 'Auth server',
            desc: 'Authentication server project in Java with Spring Security.',
            tech: ['Java', 'Spring', 'React', 'Jwt']
          }
        ]
      },
      contact: {
        title: "Let's Create Together",
        modalTitle: 'Contact',
        form: {
          name: 'Name',
          namePlaceholder: 'Your name',
          email: 'Email',
          emailPlaceholder: 'your@email.com',
          message: 'Message',
          messagePlaceholder: 'Your message...',
          send: 'Send',
          sending: 'Sending...'
        },
        toast: {
          successTitle: 'Success',
          successMessage: 'Email sent successfully!',
          errorTitle: 'Error'
        }
      },
      errors: {
        email: {
          limitReached: 'Daily sending limit reached. Try again tomorrow.',
          invalidKey: 'Email sending configuration error. Contact administrator.',
          serviceUnavailable: 'Email service temporarily unavailable.',
          network: 'Connection error. Check your internet.',
          invalidParams: 'Invalid sending data.',
          unknown: 'An unknown error occurred while sending email.'
        }
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
