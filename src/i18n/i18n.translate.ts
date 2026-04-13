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
        creating_immersive: 'Sempre criando novos projetos.',
        view_projects: 'Ver projetos'
      },
      about: {
        title: 'Sobre mim',
        description1:
          'Sou Vinícius, desenvolvedor gosto de criar web apps modernos e escaláveis. Tenho experiência em JavaScript/TypeScript, React, Node.js e no ecossistema frontend com CSS, Tailwind CSS. Também utilizo bancos de dados ( PostgreSQL, SQLite3, MongoDb), versionamento com Git/GitHub junto ao git-flow, conteinerização via Docker/Podman.',
        description2:
          'Atualmente, estou expandindo meus conhecimentos em Spring Boot, Kotlin, Android e Rust, explorando tecnologias que me permitem conectar o backend robusto com experiências mobile e cloud-ready.',
        frontend_title: 'Domínio de Front-end',
        backend_title: 'Domínio de Backend',
        db_title: 'Domínio de DB',
        frontend_list: ['Tailwind', 'React', 'Jetpack Compose'],
        backend_list: ['Java', 'Kotlin', 'SpringBoot', 'Rust', 'NodeJs'],
        db_list: ['PostgresSql', 'Sqlite3', 'Firebase', 'MongoDb']
      },
      projects: {
        title: 'Projetos',
        items: [
          {
            title: 'Acerola',
            desc: 'App android feito com intuito de ler quadrinhos no formato cbz e cbr.',
            tech: ['Kotlin', 'Jetpack compose', 'Hilt'],
            preview: 'https://raw.githubusercontent.com/Vinicius-Gabriel-P-Leitao/acerola-android/main/docs/home-screen.png'
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
        creating_immersive: 'Always creating new projects.',
        view_projects: 'View projects'
      },
      about: {
        title: 'About me',
        description1:
          "I'm Vinícius, a developer who enjoys creating modern and scalable web apps. I have experience in JavaScript/TypeScript, React, Node.js and the frontend ecosystem with CSS, Tailwind CSS. I also use databases (PostgreSQL, SQLite3, MongoDB), versioning with Git/GitHub along with git-flow and containerization via Docker/Podman.",
        description2:
          'Currently, I am expanding my knowledge in Spring Boot, Kotlin, Android and Rust, exploring technologies that allow me to connect robust backend with mobile and cloud-ready experiences.',
        frontend_title: 'Frontend Mastery',
        backend_title: 'Backend Mastery',
        db_title: 'DB Mastery',
        frontend_list: ['Tailwind', 'React', 'Jetpack Compose'],
        backend_list: ['Java', 'Kotlin', 'SpringBoot', 'Rust', 'NodeJs'],
        db_list: ['PostgresSql', 'Sqlite3', 'MongoDb', 'Firebase']
      },
      projects: {
        title: 'Projects',
        items: [
          {
            title: 'Acerola',
            desc: 'Android app designed for reading comics in cbz and cbr formats.',
            tech: ['Kotlin', 'Jetpack compose', 'Hilt'],
            preview: 'https://raw.githubusercontent.com/Vinicius-Gabriel-P-Leitao/acerola-android/main/docs/home-screen.png',
            images: [
              {
                title: 'Home',
                url: 'https://raw.githubusercontent.com/Vinicius-Gabriel-P-Leitao/acerola-android/main/docs/home-screen.png'
              },
              {
                title: 'Manga Settings',
                url: 'https://raw.githubusercontent.com/Vinicius-Gabriel-P-Leitao/acerola-android/main/docs/config-manga-screen.png'
              },
              {
                title: 'General Settings',
                url: 'https://raw.githubusercontent.com/Vinicius-Gabriel-P-Leitao/acerola-android/main/docs/config-screen.png'
              },
              {
                title: 'History',
                url: 'https://raw.githubusercontent.com/Vinicius-Gabriel-P-Leitao/acerola-android/main/docs/history-screen.png'
              },
              {
                title: 'Reader Modes',
                url: 'https://raw.githubusercontent.com/Vinicius-Gabriel-P-Leitao/acerola-android/main/docs/reader-screen-modes.png'
              },
              {
                title: 'Webtoon',
                url: 'https://raw.githubusercontent.com/Vinicius-Gabriel-P-Leitao/acerola-android/main/docs/webtom-reader-mode.png'
              }
            ]
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
