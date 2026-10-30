// Todos los textos de la web, en los dos idiomas.
// Para cambiar algo, edita aquí: las páginas solo pintan lo que hay en este archivo.

export type Lang = 'es' | 'en';

export const links = {
  email: 'alvarogaletmartin@gmail.com',
  github: 'https://github.com/algama12',
  linkedin: 'https://www.linkedin.com/in/alvaro-galet-martin-966438189',
};

type Project = {
  name: string;
  url?: string;
  repo?: string;
  year: string;
  summary: string;
  detail: string;
  stack: string[];
};

type Role = {
  period: string;
  title: string;
  org: string;
  text: string;
};

type Dict = {
  htmlLang: string;
  locale: string;
  meta: { title: string; description: string };
  nav: { projects: string; experience: string; contact: string; switchLabel: string; switchTo: string };
  hero: { role: string; intro: string; location: string; ctaMail: string; cv: string };
  trace: { caption: string; hops: { name: string; note: string }[]; footnote: string; timing: string };
  projects: { title: string; lead: string; items: Project[]; visit: string; code: string };
  experience: { title: string; roles: Role[]; studiesTitle: string; studies: Role[] };
  stack: { title: string; groups: { label: string; items: string }[] };
  contact: { title: string; text: string; mail: string };
  footer: string;
};

export const t: Record<Lang, Dict> = {
  es: {
    htmlLang: 'es',
    locale: 'es_ES',
    meta: {
      title: 'Álvaro Galet · Desarrollador backend',
      description:
        'Desarrollador backend (PHP, Symfony, Laravel) que integra IA en productos reales. Lead Backend en Casino Gran Vía, Melilla.',
    },
    nav: { projects: 'Proyectos', experience: 'Experiencia', contact: 'Contacto', switchLabel: 'Read in English', switchTo: 'EN' },
    hero: {
      role: 'Desarrollador backend',
      intro:
        'Diseño y mantengo plataformas en PHP con Symfony y Laravel, y llevo la IA a productos que usa gente de verdad: desde una notaría hasta un aula de enfermería. Ahora lidero el backend de Casino Gran Vía.',
      location: 'Melilla, España · disponible en remoto',
      ctaMail: 'Escríbeme',
      cv: 'Descargar CV',
    },
    trace: {
      caption: 'Lo que acaba de pasar para que leas esto',
      hops: [
        { name: 'Tu navegador', note: 'pide alvaro-galet.com' },
        { name: 'Cloudflare', note: 'TLS y caché en el borde' },
        { name: 'Cloudflare Tunnel', note: 'sin puertos abiertos en casa' },
        { name: 'Caddy en Docker', note: 'sirve el HTML estático' },
        { name: 'Homelab', note: 'Ubuntu · RTX 4060 Ti' },
      ],
      footnote:
        'Esta web no vive en un hosting: se sirve desde un servidor que monté y administro en casa, con copias diarias a Backblaze B2 y monitorización con alertas por Telegram.',
      timing: 'Respuesta recibida en {ms} ms',
    },
    projects: {
      title: 'Proyectos',
      lead: 'Productos que he construido de principio a fin, solo.',
      visit: 'Visitar',
      code: 'Código',
      items: [
        {
          name: 'Asistente notarial con IA',
          year: '2025',
          summary: 'Análisis documental y redacción de escrituras para una notaría.',
          detail:
            'Herramienta interna que analiza la documentación de cancelaciones hipotecarias y genera el borrador de la escritura notarial. La diseñé y desarrollé en solitario en Gyoza Studio, sobre Google Vertex AI.',
          stack: ['PHP', 'Google Vertex AI'],
        },
        {
          name: 'CDIA Tutor',
          url: 'https://cdiatutor.online',
          repo: 'https://github.com/algama12/cdia-tutor',
          year: '2026',
          summary: 'Tutor con IA para alumnos de primero de Ciencia de Datos e IA (UGR).',
          detail:
            'Proyecto de fin de máster. Aplicación completa con autenticación, tutor conversacional y una batería de 162 tests unitarios y end-to-end.',
          stack: ['Next.js 15', 'Supabase', 'OpenRouter', 'Vitest', 'Playwright'],
        },
        {
          name: 'GetBrief',
          url: 'https://getbrief.es',
          year: '2026',
          summary: 'Briefs de proyecto conversacionales para freelancers.',
          detail:
            'El freelancer define sus preguntas y comparte un enlace; su cliente conversa con una IA y el freelancer recibe un brief estructurado.',
          stack: ['Next.js 15', 'Supabase Auth', 'OpenRouter', 'Tailwind', 'Vercel'],
        },
        {
          name: 'CasosClinicos',
          url: 'https://casosclinicos.eu',
          year: '2026',
          summary: 'Simulación de pacientes con IA para formación en enfermería.',
          detail:
            'Los estudiantes entrevistan a un paciente simulado y practican la valoración clínica. Diseñado junto a una profesional de enfermería que lo valida con casos reales.',
          stack: ['Next.js', 'Clerk', 'Supabase', 'OpenRouter'],
        },
        {
          name: 'Homelab de IA',
          year: '2026',
          summary: 'Infraestructura propia para modelos locales y automatizaciones.',
          detail:
            'Servidor doméstico con Ollama y Open WebUI sobre GPU, n8n para automatizaciones, DNS propio con AdGuard Home, acceso privado por Tailscale y copias cifradas a la nube. También sirve esta web.',
          stack: ['Ubuntu', 'Docker', 'Ollama', 'n8n', 'Cloudflare Tunnel', 'Tailscale'],
        },
      ],
    },
    experience: {
      title: 'Experiencia',
      roles: [
        {
          period: '2026 — hoy',
          title: 'Lead Backend Developer',
          org: 'Casino Gran Vía',
          text:
            'Responsable de la arquitectura backend de la plataforma de juego online (Laravel). Lidero la migración a un nuevo proveedor de plataforma en un entorno regulado por la DGOJ, integro proveedores de juegos y autenticación con Keycloak, y estoy montando atención al cliente con IA.',
        },
        {
          period: '2023 — 2026',
          title: 'Desarrollador backend',
          org: 'Gyoza Studio',
          text:
            'Plataformas internas a medida (pagos, CRMs) como partner tecnológico de empresas como Goiko y WeTour. Desarrollo en solitario de una herramienta de IA para una notaría.',
        },
      ],
      studiesTitle: 'Formación',
      studies: [
        { period: '2026 — hoy', title: 'Grado en Ciencia de Datos e Inteligencia Artificial', org: 'Universidad de Granada', text: '' },
        { period: '2026', title: 'Máster en Desarrollo de Software con IA', org: 'BIG School', text: '' },
        { period: '2021 — 2023', title: 'CFGS Desarrollo de Aplicaciones Multiplataforma', org: '', text: '' },
      ],
    },
    stack: {
      title: 'Con qué trabajo',
      groups: [
        { label: 'Backend', items: 'PHP, Symfony, Laravel, MySQL, PostgreSQL, Redis' },
        { label: 'Frontend', items: 'TypeScript, Next.js, Tailwind' },
        { label: 'IA', items: 'Vertex AI, OpenRouter, Ollama, agentes y RAG' },
        { label: 'Infraestructura', items: 'Linux, Docker, Apache, Cloudflare, Tailscale, CI/CD' },
      ],
    },
    contact: {
      title: 'Hablemos',
      text: 'Si tienes un proyecto o un puesto en el que encaje, escríbeme. Respondo en español o en inglés.',
      mail: 'Enviar un correo',
    },
    footer: 'Hecho con Astro y servido desde mi homelab en Melilla.',
  },

  en: {
    htmlLang: 'en',
    locale: 'en_US',
    meta: {
      title: 'Álvaro Galet · Backend developer',
      description:
        'Backend developer (PHP, Symfony, Laravel) who ships AI into real products. Lead Backend at Casino Gran Vía, Spain.',
    },
    nav: { projects: 'Projects', experience: 'Experience', contact: 'Contact', switchLabel: 'Leer en español', switchTo: 'ES' },
    hero: {
      role: 'Backend developer',
      intro:
        'I design and run PHP platforms with Symfony and Laravel, and I bring AI into products real people use, from a notary’s office to a nursing classroom. I currently lead the backend at Casino Gran Vía.',
      location: 'Melilla, Spain · open to remote work',
      ctaMail: 'Get in touch',
      cv: 'Download CV',
    },
    trace: {
      caption: 'What just happened so you could read this',
      hops: [
        { name: 'Your browser', note: 'requests alvaro-galet.com' },
        { name: 'Cloudflare', note: 'TLS and edge cache' },
        { name: 'Cloudflare Tunnel', note: 'no ports open at home' },
        { name: 'Caddy in Docker', note: 'serves static HTML' },
        { name: 'Homelab', note: 'Ubuntu · RTX 4060 Ti' },
      ],
      footnote:
        'This site isn’t on a hosting plan: it’s served from a server I built and run at home, with daily backups to Backblaze B2 and monitoring with Telegram alerts.',
      timing: 'Response received in {ms} ms',
    },
    projects: {
      title: 'Projects',
      lead: 'Products I built end to end, on my own.',
      visit: 'Visit',
      code: 'Code',
      items: [
        {
          name: 'AI notary assistant',
          year: '2025',
          summary: 'Document analysis and deed drafting for a notary’s office.',
          detail:
            'Internal tool that analyses mortgage-cancellation paperwork and drafts the notarial deed. I designed and built it alone at Gyoza Studio, on Google Vertex AI.',
          stack: ['PHP', 'Google Vertex AI'],
        },
        {
          name: 'CDIA Tutor',
          url: 'https://cdiatutor.online',
          repo: 'https://github.com/algama12/cdia-tutor',
          year: '2026',
          summary: 'AI tutor for first-year Data Science & AI students (University of Granada).',
          detail:
            'My master’s final project. A full application with auth, a conversational tutor and 162 unit and end-to-end tests.',
          stack: ['Next.js 15', 'Supabase', 'OpenRouter', 'Vitest', 'Playwright'],
        },
        {
          name: 'GetBrief',
          url: 'https://getbrief.es',
          year: '2026',
          summary: 'Conversational project briefs for freelancers.',
          detail:
            'The freelancer sets their questions and shares a link; the client chats with an AI and the freelancer gets a structured brief.',
          stack: ['Next.js 15', 'Supabase Auth', 'OpenRouter', 'Tailwind', 'Vercel'],
        },
        {
          name: 'CasosClinicos',
          url: 'https://casosclinicos.eu',
          year: '2026',
          summary: 'AI patient simulation for nursing education.',
          detail:
            'Students interview a simulated patient and practise clinical assessment. Designed with a nursing professional who validates it against real cases.',
          stack: ['Next.js', 'Clerk', 'Supabase', 'OpenRouter'],
        },
        {
          name: 'AI homelab',
          year: '2026',
          summary: 'My own infrastructure for local models and automation.',
          detail:
            'A home server running Ollama and Open WebUI on GPU, n8n for automation, my own DNS with AdGuard Home, private access over Tailscale and encrypted cloud backups. It also serves this site.',
          stack: ['Ubuntu', 'Docker', 'Ollama', 'n8n', 'Cloudflare Tunnel', 'Tailscale'],
        },
      ],
    },
    experience: {
      title: 'Experience',
      roles: [
        {
          period: '2026 — now',
          title: 'Lead Backend Developer',
          org: 'Casino Gran Vía',
          text:
            'I own the backend architecture of the online gaming platform (Laravel). I’m leading the migration to a new platform provider in an environment regulated by Spain’s gambling authority (DGOJ), integrating game providers and Keycloak authentication, and building AI customer support.',
        },
        {
          period: '2023 — 2026',
          title: 'Backend developer',
          org: 'Gyoza Studio',
          text:
            'Custom internal platforms (payments, CRMs) as technology partner for companies such as Goiko and WeTour. Sole developer of an AI tool for a notary’s office.',
        },
      ],
      studiesTitle: 'Education',
      studies: [
        { period: '2026 — now', title: 'BSc in Data Science and Artificial Intelligence', org: 'University of Granada', text: '' },
        { period: '2026', title: 'Master’s in AI-Assisted Software Development', org: 'BIG School', text: '' },
        { period: '2021 — 2023', title: 'Higher Diploma in Multiplatform App Development', org: '', text: '' },
      ],
    },
    stack: {
      title: 'What I work with',
      groups: [
        { label: 'Backend', items: 'PHP, Symfony, Laravel, MySQL, PostgreSQL, Redis' },
        { label: 'Frontend', items: 'TypeScript, Next.js, Tailwind' },
        { label: 'AI', items: 'Vertex AI, OpenRouter, Ollama, agents and RAG' },
        { label: 'Infrastructure', items: 'Linux, Docker, Apache, Cloudflare, Tailscale, CI/CD' },
      ],
    },
    contact: {
      title: 'Let’s talk',
      text: 'If you have a project or a role where I’d fit, drop me a line. I reply in English or Spanish.',
      mail: 'Send an email',
    },
    footer: 'Built with Astro and served from my homelab in Melilla.',
  },
};

// Ruta equivalente en el otro idioma
export const altPath = (lang: Lang) => (lang === 'es' ? '/en/' : '/');
export const cvPath = (lang: Lang) => `/cv/alvaro-galet-cv-${lang}.pdf`;
