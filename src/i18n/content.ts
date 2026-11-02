// Todos los textos de la web, en los dos idiomas.
// Para cambiar algo, edita aquí: las páginas solo pintan lo que hay en este archivo.

export type Lang = 'es' | 'en';

export const links = {
  email: 'alvarogaletmartin@gmail.com',
  github: 'https://github.com/algama12',
  linkedin: 'https://www.linkedin.com/in/alvaro-galet-martin-966438189',
};

// Captura o vídeo de un proyecto destacado.
// El archivo se busca en public/projects/<slug>.webp (y opcionalmente <slug>.mp4).
// Si no existe, la web pinta un marco con "captura pendiente" y el build no falla.
type ProjectMedia = {
  alt: string;    // describe lo que se ve en la captura (ajústalo cuando la tengas)
  width: number;  // tamaño real del archivo, evita saltos de maquetación
  height: number;
};

// Diagrama de arquitectura del homelab, dibujado en código en lugar de una captura.
// Los nombres de servicios son nombres propios; las notas y grupos se traducen.
type DiagramNode = { name: string; note: string };
export type HomelabDiagram = {
  description: string;   // texto alternativo completo para lectores de pantalla
  publicPath: string;    // etiqueta del grupo de la ruta pública
  edge: DiagramNode[];   // Internet → Cloudflare → Cloudflare Tunnel
  server: DiagramNode;
  docker: string;        // etiqueta del grupo de servicios
  services: (DiagramNode & { public?: boolean })[]; // public = destino de la ruta pública
  admin: DiagramNode;    // acceso privado, fuera de la ruta pública
  ops: DiagramNode[];    // copias y alertas
};

type Project = {
  slug: string;
  name: string;
  url?: string;
  repo?: string;
  year: string;
  summary: string;
  detail: string;
  stack: string[];
  featured?: boolean;   // destacado: grande, con captura y línea de resultado
  media?: ProjectMedia;
  diagram?: HomelabDiagram; // en lugar de captura: diagrama dibujado en código
  metric?: string;      // cifra real y comprobable; vacío = no se muestra
  outcome?: string;     // resultado o uso real; vacío = no se muestra
};

type Role = {
  period: string;
  title: string;
  org: string;
  text: string;
};

type StatusCopy = {
  title: string;
  // Estados del panel: sin JS, ok, informe viejo (>15 min), sin datos
  states: { idle: string; ok: string; stale: string; offline: string };
  updated: string;      // {rel} = "hace 2 min"
  lastReport: string;   // {rel}
  noReport: string;
  sample: string;
  noscript: string;
  labels: { uptime: string; temps: string; services: string; backup: string };
  servicesValue: string; // {n}
};

type Dict = {
  htmlLang: string;
  locale: string;
  meta: { title: string; description: string };
  a11y: { skip: string; mainNav: string };
  nav: { projects: string; experience: string; contact: string; switchLabel: string; switchTo: string };
  hero: { role: string; intro: string; location: string; ctaMail: string; cv: string };
  status: StatusCopy;
  trace: { caption: string; hops: { name: string; note: string }[]; footnote: string; timing: string; timingPending: string };
  projects: {
    title: string;
    lead: string;
    moreTitle: string;
    items: Project[];
    visit: string;
    code: string;
    mediaPending: string;
  };
  experience: { title: string; roles: Role[]; studiesTitle: string; studies: Role[] };
  stack: { title: string; groups: { label: string; items: string }[] };
  contact: { title: string; text: string; mail: string };
  footer: string;
  build: string; // {date}
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
    a11y: { skip: 'Saltar al contenido', mainNav: 'Principal' },
    nav: { projects: 'Proyectos', experience: 'Experiencia', contact: 'Contacto', switchLabel: 'Read in English', switchTo: 'EN' },
    hero: {
      role: 'Desarrollador backend',
      intro:
        'Diseño y mantengo plataformas en PHP con Symfony y Laravel, y llevo la IA a productos que usa gente de verdad: desde una notaría hasta un aula de enfermería. Ahora lidero el backend de Casino Gran Vía.',
      location: 'Melilla, España · disponible en remoto',
      ctaMail: 'Escríbeme',
      cv: 'Descargar CV',
    },
    status: {
      title: 'homelab',
      states: {
        idle: 'servido desde casa',
        ok: 'en línea',
        stale: 'sin datos recientes',
        offline: 'sin datos del servidor',
      },
      updated: 'actualizado {rel}',
      lastReport: 'último informe {rel}',
      noReport: 'el servidor aún no ha enviado su informe',
      sample: 'datos de ejemplo',
      noscript: 'El estado en directo necesita JavaScript.',
      labels: {
        uptime: 'encendido',
        temps: 'temp. cpu · gpu',
        services: 'servicios',
        backup: 'última copia',
      },
      servicesValue: '{n} en marcha',
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
      timing: 'respuesta recibida en {ms} ms',
      timingPending: 'midiendo la respuesta…',
    },
    projects: {
      title: 'Proyectos',
      lead: 'Productos que he construido de principio a fin.',
      moreTitle: 'Otros trabajos',
      visit: 'Visitar',
      code: 'Código',
      mediaPending: 'captura pendiente',
      items: [
        {
          slug: 'casosclinicos',
          name: 'CasosClinicos',
          url: 'https://casosclinicos.eu',
          year: '2026',
          featured: true,
          summary: 'Simulación de pacientes con IA para formación en enfermería.',
          detail:
            'Los estudiantes entrevistan a un paciente simulado y practican la valoración clínica. Diseñado junto a una profesional de enfermería que lo valida con casos reales.',
          stack: ['Next.js', 'Clerk', 'Supabase', 'OpenRouter'],
          media: { alt: 'Portada de CasosClinicos: una paciente simulada de urgencias con su motivo de consulta y el inicio de la entrevista', width: 1600, height: 940 },
          metric: 'Probado con más de 30 estudiantes de enfermería',
          outcome: '',
        },
        {
          slug: 'getbrief',
          name: 'GetBrief',
          url: 'https://getbrief.es',
          year: '2026',
          featured: true,
          summary: 'Briefs de proyecto conversacionales para freelancers.',
          detail:
            'El freelancer define sus preguntas y comparte un enlace; su cliente conversa con una IA y el freelancer recibe un brief estructurado.',
          stack: ['Next.js 15', 'Supabase Auth', 'OpenRouter', 'Tailwind', 'Vercel'],
          media: { alt: 'Portada de GetBrief: «Deja de perder tiempo con clientes que no saben explicarse»', width: 1600, height: 929 },
          metric: '',
          outcome: '',
        },
        {
          slug: 'cdia-tutor',
          name: 'CDIA Tutor',
          url: 'https://cdiatutor.online',
          repo: 'https://github.com/algama12/cdia-tutor',
          year: '2026',
          featured: false,
          summary: 'Tutor con IA para alumnos de primero de Ciencia de Datos e IA (UGR).',
          detail:
            'Proyecto de fin de máster. Aplicación completa con autenticación y un tutor conversacional, cubierta por tests unitarios y end-to-end.',
          stack: ['Next.js 15', 'Supabase', 'OpenRouter', 'Vitest', 'Playwright'],
          media: { alt: 'CDIA Tutor: sesión de tutoría con la IA', width: 1600, height: 1000 },
          metric: '162 tests unitarios y end-to-end',
          outcome: '',
        },
        {
          slug: 'asistente-notarial',
          name: 'Asistente notarial con IA',
          year: '2025',
          summary: 'Análisis documental y redacción de borradores de escrituras para una notaría.',
          detail:
            'Herramienta interna que analiza la documentación de cancelaciones hipotecarias y genera el borrador de la escritura notarial. La diseñé y desarrollé en Gyoza Studio, sobre Google Vertex AI.',
          stack: ['PHP', 'Google Vertex AI'],
        },
        {
          slug: 'homelab',
          name: 'Homelab de IA',
          year: '2026',
          featured: true,
          summary: 'Infraestructura propia para modelos locales y automatizaciones.',
          detail:
            'Servidor doméstico con Ollama y Open WebUI sobre GPU, n8n para automatizaciones, DNS propio con AdGuard Home, acceso privado por Tailscale y copias cifradas a la nube. También sirve esta web.',
          stack: ['Ubuntu', 'Docker', 'Ollama', 'n8n', 'Cloudflare Tunnel', 'Tailscale'],
          diagram: {
            description:
              'Diagrama de arquitectura del homelab. Ruta pública: Internet, Cloudflare (TLS y caché en el borde) y Cloudflare Tunnel, sin puertos abiertos en casa, hasta el servidor doméstico. El servidor usa Ubuntu, Docker y una GPU RTX 4060 Ti, y ejecuta en Docker: Caddy, que sirve esta web; Ollama y Open WebUI, con modelos locales en la GPU; n8n para automatizaciones; y AdGuard Home como DNS propio. La administración entra por una ruta privada aparte, con Tailscale. Las copias diarias cifradas van a Backblaze B2 y la monitorización envía alertas por Telegram.',
            publicPath: 'ruta pública',
            edge: [
              { name: 'Internet', note: 'petición entrante' },
              { name: 'Cloudflare', note: 'TLS · caché en el borde' },
              { name: 'Cloudflare Tunnel', note: 'sin puertos abiertos' },
            ],
            server: { name: 'Servidor en casa', note: 'Ubuntu · Docker · RTX 4060 Ti 16 GB' },
            docker: 'servicios en Docker',
            services: [
              { name: 'Caddy', note: 'sirve esta web', public: true },
              { name: 'Ollama + Open WebUI', note: 'modelos locales en la GPU' },
              { name: 'n8n', note: 'automatizaciones' },
              { name: 'AdGuard Home', note: 'DNS propio' },
            ],
            admin: { name: 'Tailscale', note: 'admin privado, no público' },
            ops: [
              { name: 'Backblaze B2', note: 'copias diarias cifradas' },
              { name: 'Telegram', note: 'alertas de monitorización' },
            ],
          },
          metric: 'Gemma 4 26B y gpt-oss 20B en local · backups diarios con restauración probada',
          outcome: 'Briefing diario con el modelo local e informe semanal del servidor, por Telegram',
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
            'Plataformas internas a medida (pagos, CRMs) como partner tecnológico de empresas como Goiko y WeTour.',
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
        { label: 'IA', items: 'Claude Code, Vertex AI, OpenRouter, Ollama, agentes y RAG' },
        { label: 'Infraestructura', items: 'Linux, Docker, Apache, Cloudflare, Tailscale, CI/CD' },
      ],
    },
    contact: {
      title: 'Hablemos',
      text: 'Si tienes un proyecto o un puesto en el que encaje, escríbeme. Respondo en español o en inglés.',
      mail: 'Enviar un correo',
    },
    footer: 'Hecho con Astro y servido desde mi homelab en Melilla.',
    build: 'build {date}',
  },

  en: {
    htmlLang: 'en',
    locale: 'en_US',
    meta: {
      title: 'Álvaro Galet · Backend developer',
      description:
        'Backend developer (PHP, Symfony, Laravel) who ships AI into real products. Lead Backend at Casino Gran Vía, Spain.',
    },
    a11y: { skip: 'Skip to content', mainNav: 'Main' },
    nav: { projects: 'Projects', experience: 'Experience', contact: 'Contact', switchLabel: 'Leer en español', switchTo: 'ES' },
    hero: {
      role: 'Backend developer',
      intro:
        'I design and run PHP platforms with Symfony and Laravel, and I bring AI into products real people use, from a notary’s office to a nursing classroom. I currently lead the backend at Casino Gran Vía.',
      location: 'Melilla, Spain · open to remote work',
      ctaMail: 'Get in touch',
      cv: 'Download CV',
    },
    status: {
      title: 'homelab',
      states: {
        idle: 'served from home',
        ok: 'online',
        stale: 'no recent data',
        offline: 'no data from the server',
      },
      updated: 'updated {rel}',
      lastReport: 'last report {rel}',
      noReport: 'the server hasn’t sent its report yet',
      sample: 'sample data',
      noscript: 'Live status needs JavaScript.',
      labels: {
        uptime: 'uptime',
        temps: 'cpu · gpu temp',
        services: 'services',
        backup: 'last backup',
      },
      servicesValue: '{n} running',
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
      timing: 'response received in {ms} ms',
      timingPending: 'measuring the response…',
    },
    projects: {
      title: 'Projects',
      lead: 'Products I built end to end.',
      moreTitle: 'Other work',
      visit: 'Visit',
      code: 'Code',
      mediaPending: 'screenshot pending',
      items: [
        {
          slug: 'casosclinicos',
          name: 'CasosClinicos',
          url: 'https://casosclinicos.eu',
          year: '2026',
          featured: true,
          summary: 'AI patient simulation for nursing education.',
          detail:
            'Students interview a simulated patient and practise clinical assessment. Designed with a nursing professional who validates it against real cases.',
          stack: ['Next.js', 'Clerk', 'Supabase', 'OpenRouter'],
          media: { alt: 'CasosClinicos landing page: a simulated emergency patient with her chief complaint and the start of the interview', width: 1600, height: 940 },
          metric: 'Tested with 30+ nursing students',
          outcome: '',
        },
        {
          slug: 'getbrief',
          name: 'GetBrief',
          url: 'https://getbrief.es',
          year: '2026',
          featured: true,
          summary: 'Conversational project briefs for freelancers.',
          detail:
            'The freelancer sets their questions and shares a link; the client chats with an AI and the freelancer gets a structured brief.',
          stack: ['Next.js 15', 'Supabase Auth', 'OpenRouter', 'Tailwind', 'Vercel'],
          media: { alt: 'GetBrief landing page (Spanish): “Stop wasting time with clients who can’t explain what they want”', width: 1600, height: 929 },
          metric: '',
          outcome: '',
        },
        {
          slug: 'cdia-tutor',
          name: 'CDIA Tutor',
          url: 'https://cdiatutor.online',
          repo: 'https://github.com/algama12/cdia-tutor',
          year: '2026',
          featured: false,
          summary: 'AI tutor for first-year Data Science & AI students (University of Granada).',
          detail:
            'My master’s final project. A full application with auth and a conversational tutor, covered by unit and end-to-end tests.',
          stack: ['Next.js 15', 'Supabase', 'OpenRouter', 'Vitest', 'Playwright'],
          media: { alt: 'CDIA Tutor: a tutoring session with the AI', width: 1600, height: 1000 },
          metric: '162 unit and end-to-end tests',
          outcome: '',
        },
        {
          slug: 'notary-assistant',
          name: 'AI notary assistant',
          year: '2025',
          summary: 'Document analysis and deed drafting for a notary’s office.',
          detail:
            'Internal tool that analyses mortgage-cancellation paperwork and drafts the notarial deed. I designed and built it at Gyoza Studio, on Google Vertex AI.',
          stack: ['PHP', 'Google Vertex AI'],
        },
        {
          slug: 'homelab',
          name: 'AI homelab',
          year: '2026',
          featured: true,
          summary: 'My own infrastructure for local models and automation.',
          detail:
            'A home server running Ollama and Open WebUI on GPU, n8n for automation, my own DNS with AdGuard Home, private access over Tailscale and encrypted cloud backups. It also serves this site.',
          stack: ['Ubuntu', 'Docker', 'Ollama', 'n8n', 'Cloudflare Tunnel', 'Tailscale'],
          diagram: {
            description:
              'Architecture diagram of the homelab. Public path: Internet, Cloudflare (TLS and edge cache) and Cloudflare Tunnel, with no ports open at home, to the home server. The server runs Ubuntu, Docker and an RTX 4060 Ti GPU, and hosts on Docker: Caddy, which serves this site; Ollama and Open WebUI, running local models on the GPU; n8n for automation; and AdGuard Home as my own DNS. Admin access comes in over a separate private path, with Tailscale. Encrypted daily backups go to Backblaze B2 and monitoring sends alerts to Telegram.',
            publicPath: 'public path',
            edge: [
              { name: 'Internet', note: 'incoming request' },
              { name: 'Cloudflare', note: 'TLS · edge cache' },
              { name: 'Cloudflare Tunnel', note: 'no open ports' },
            ],
            server: { name: 'Home server', note: 'Ubuntu · Docker · RTX 4060 Ti 16 GB' },
            docker: 'services on Docker',
            services: [
              { name: 'Caddy', note: 'serves this site', public: true },
              { name: 'Ollama + Open WebUI', note: 'local models on the GPU' },
              { name: 'n8n', note: 'automation' },
              { name: 'AdGuard Home', note: 'own DNS' },
            ],
            admin: { name: 'Tailscale', note: 'private admin, not public' },
            ops: [
              { name: 'Backblaze B2', note: 'encrypted daily backups' },
              { name: 'Telegram', note: 'monitoring alerts' },
            ],
          },
          metric: 'Gemma 4 26B and gpt-oss 20B running locally · daily backups with tested restores',
          outcome: 'Daily briefing from the local model and a weekly server report, via Telegram',
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
            'Custom internal platforms (payments, CRMs) as technology partner for companies such as Goiko and WeTour.',
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
        { label: 'AI', items: 'Claude Code, Vertex AI, OpenRouter, Ollama, agents and RAG' },
        { label: 'Infrastructure', items: 'Linux, Docker, Apache, Cloudflare, Tailscale, CI/CD' },
      ],
    },
    contact: {
      title: 'Let’s talk',
      text: 'If you have a project or a role where I’d fit, drop me a line. I reply in English or Spanish.',
      mail: 'Send an email',
    },
    footer: 'Built with Astro and served from my homelab in Melilla.',
    build: 'build {date}',
  },
};

// Ruta equivalente en el otro idioma
export const altPath = (lang: Lang) => (lang === 'es' ? '/en/' : '/');
export const cvPath = (lang: Lang) => `/cv/alvaro-galet-cv-${lang}.pdf`;
export const homePath = (lang: Lang) => (lang === 'es' ? '/' : '/en/');
