// Single source of truth for all portfolio content.
// Derived from public/cv.md — update here when the CV changes.

export const profile = {
  name: 'Darshan Babariya',
  initials: 'DB',
  title: 'Backend & Data Platform Engineer',
  tagline: 'Node.js • Python • TypeScript • AI Platform Integrations • Data Infrastructure • DevOps',
  location: 'Surat, India — Open to Remote (Global)',
  email: 'dgbabariya305@gmail.com',
  phone: '+91 8141447131',
  github: 'https://github.com/darshan2101',
  linkedin: 'https://linkedin.com/in/darshan-babariya-dev',
  resumeUrl: '/Darshan_Babariya_Resume.pdf',
  photo: '/darshan_profile_image.png',
};

export const heroStats = [
  { value: '3.5', suffix: '+', label: 'Years Experience' },
  { value: '400', suffix: '+', label: 'v2 API Endpoints' },
  { value: '18', suffix: '', label: 'AI / Cloud Providers' },
];

export const heroHighlights = [
  { label: 'Backend', detail: 'Node.js, TypeScript, Python, Ruby on Rails, REST APIs at scale' },
  { label: 'AI Platform', detail: 'Multi-provider AI ingestion, LLM orchestration (LangGraph), Claude MCP' },
  { label: 'Data Infra', detail: 'MongoDB, MySQL, Redis — ETL pipelines, petabyte-scale catalogs' },
  { label: 'DevOps', detail: 'Docker, Jenkins CI/CD, AWS, Azure, GCP' },
];

export const recognition = [
  {
    event: 'IBC 2025',
    place: 'Amsterdam',
    kind: 'Award Win',
    featured: true,
    detail:
      'The unified AI integration feature I built — production ingestion across ~18 cloud and AI providers feeding a single MongoDB schema — won StorageDNA the IBC 2025 award.',
  },
  {
    event: 'NAB 2026',
    place: 'Las Vegas',
    kind: 'Showcase',
    detail: 'v2 API platform (400+ endpoints) and Claude MCP layer showcased publicly.',
  },
  {
    event: 'MPTS 2026',
    place: 'London',
    kind: 'Showcase',
    detail: 'DNAFabric AI and API platform features presented to the media-tech industry.',
  },
  {
    event: 'Global Digital Health Summit',
    place: 'Jio World Convention Centre, Mumbai',
    kind: 'Showcase',
    detail: 'Healthray — the healthcare SaaS I helped build — showcased at India’s leading digital health event.',
  },
];

export const skillGroups = [
  {
    key: 'backend',
    title: 'Backend & APIs',
    icon: 'server',
    accent: 'cyan',
    skills: [
      'Node.js', 'JavaScript', 'TypeScript', 'Python', 'Ruby on Rails',
      'Express.js', 'Hapi.js', 'REST APIs', 'Webhook Processing',
      'RSpec', 'Mocha', 'Jest', 'Swagger',
    ],
  },
  {
    key: 'ai',
    title: 'AI & LLM Tooling',
    icon: 'cpu',
    accent: 'blue',
    skills: [
      'Multi-agent Orchestration', 'LangGraph', 'Claude MCP', 'Eval Frameworks',
      'AWS Rekognition', 'Azure Cognitive Services', 'GCP Vision',
      'OpenRouter', 'Groq', 'Cerebras',
    ],
  },
  {
    key: 'data',
    title: 'Databases & Data',
    icon: 'database',
    accent: 'emerald',
    skills: [
      'MongoDB', 'MySQL', 'Redis', 'PostgreSQL (basic)',
      'ETL Pipelines', 'Data Modeling', 'Aggregation Pipelines',
      'Indexing', 'Full-text Search', 'Query Optimization', 'Caching',
    ],
  },
  {
    key: 'devops',
    title: 'DevOps & Cloud',
    icon: 'cloud',
    accent: 'indigo',
    skills: [
      'Docker', 'Jenkins', 'CI/CD', 'AWS (EC2, Lambda, SQS, SNS)',
      'Azure', 'GCP', 'Nginx', 'Capistrano', 'DigitalOcean',
    ],
  },
];

export const featuredProjects = [
  {
    title: 'DNAFabric — StorageDNA',
    role: 'Backend & Data Platform Engineer (Remote — USA)',
    period: 'Apr 2024 – Apr 2026',
    icon: 'cloud',
    color: 'from-cyan-500 to-blue-600',
    description:
      'AI-powered media asset management platform serving enterprise clients including Netflix, Warner Bros., and Pinewood Studios — petabyte-scale catalogs.',
    highlights: [
      'Shipped production ingestion across ~18 cloud and AI providers — audio AI (AssemblyAI, Whisper, Trint), video AI (TwelveLabs, MomentsLab, Azure Video Indexer), vision AI, cloud storage, and media platforms — the feature behind StorageDNA’s IBC 2025 award win',
      'Authored 8 provider-specific normalizers feeding a unified MongoDB schema; the contract held across two years of provider drift, making each new provider a one-file adapter change',
      'Rewrote 400+ REST API endpoints to v2 for dual consumption: client self-service frontends and an internal Claude MCP server, with error semantics designed for LLM-agent recovery — showcased at NAB 2026 and MPTS 2026',
      'Replaced a legacy Java Lucene catalog indexer with a Node.js job-queue ingestion engine — converted multi-hour batch reporting into live, on-demand workflow analytics',
      'Built a programmatic provider cost calculator replacing a manual Tableau-driven analyst workflow with a composable, client-configurable system',
    ],
    tech: ['Node.js', 'Python', 'MongoDB', 'AWS', 'Azure', 'GCP', 'Claude MCP'],
  },
  {
    title: 'Daedalus',
    role: 'Author — Open Source',
    period: 'Mar 2026 – Present',
    icon: 'workflow',
    color: 'from-violet-500 to-fuchsia-600',
    link: 'https://github.com/darshan2101/Daedalus',
    description:
      'Multi-agent LLM orchestration system across six providers, built around deterministic, testable agent outputs.',
    highlights: [
      'Each agent runs a plan-execute-evaluate loop targeting >0.88 component-level scores; parallel agent outputs pass conflict resolution before checkpoint commit to MongoDB',
      'Per-agent model assignment across 6 providers (Groq, OpenRouter, Cerebras, Scaleway, Ollama) with circuit breakers backed by Upstash Redis — unhealthy providers isolated per agent role to avoid thundering herd on rate limits',
      'Async topological wave execution on LangGraph: waves run concurrently, the next starts only when dependencies resolve',
      '137 unit and integration tests across ~20 source files',
    ],
    tech: ['Python', 'LangGraph', 'MongoDB', 'Redis', 'OpenRouter', 'Groq'],
  },
  {
    title: 'Healthray',
    role: 'Software Developer — Backend',
    period: 'Jan 2023 – Apr 2026',
    icon: 'database',
    color: 'from-blue-500 to-indigo-600',
    description:
      'Multi-tenant healthcare SaaS serving 1,500+ organizations and 10,000+ doctors — showcased at the Global Digital Health Summit, Mumbai.',
    highlights: [
      'Owned the admin panel, multi-tenant RBAC, laboratory module, Docker infrastructure, Jenkins CI/CD, and database layer end-to-end',
      'Built and maintained 150+ REST API endpoints across three Node.js modules (EMR, Laboratory, Admin Panel)',
      'Designed a subscription-tiered, resource-level RBAC system resolving three layers per request — plan gates, role scope, tenant isolation — with Redis absorbing load, no restarts or manual cache invalidation',
      'Reduced query execution time from 16–17s to 1–2s on high-load endpoints using composite indexes and precomputed MySQL views',
      'Integrated Razorpay payments — subscriptions, async webhooks, automated invoicing — eliminating a fully manual billing workflow',
    ],
    tech: ['Node.js', 'MySQL', 'Redis', 'MongoDB', 'Ruby on Rails', 'Docker', 'Jenkins'],
  },
];

export const experience = [
  {
    company: 'StorageDNA — via Bigscal Technologies (Contract)',
    role: 'Backend & Data Platform Engineer',
    period: 'Apr 2024 – Apr 2026',
    location: 'Remote, USA',
    description:
      'Small 5–10 person engineering team building DNAFabric, an AI-powered media asset management platform for Netflix, Warner Bros., and Pinewood Studios.',
    achievements: [
      'Shipped production ingestion across ~18 cloud and AI providers, coordinated by a ~3,000 LOC Python orchestrator handling retries, scheduling, and run state — basis of the IBC 2025 award win',
      'Rewrote 400+ REST endpoints to v2 for client self-service and Claude MCP consumption, showcased at NAB 2026 (Las Vegas) and MPTS 2026 (London)',
      'Replaced a Java Lucene catalog indexer with a Node.js job-queue ingestion engine — batch reporting became live workflow analytics',
      'Implemented batch and event-driven ETL pipelines (Node.js + Python) for media enrichment at petabyte-class scale — transcription, label detection, celebrity recognition, content moderation',
      'Designed MongoDB compound indexes and aggregation pipelines for fast full-text and structured querying across enriched catalogs',
    ],
  },
  {
    company: 'Bigscal Technologies Pvt. Ltd.',
    role: 'Software Developer',
    period: 'Jan 2023 – Apr 2026',
    location: 'Surat, India',
    description:
      'Primary project: Healthray — multi-tenant healthcare SaaS serving 1,500+ organizations and 10,000+ doctors. Joined at ~50 engineers, now 150+.',
    achievements: [
      'Owned admin panel, multi-tenant RBAC, laboratory module, Docker infrastructure, Jenkins CI/CD, and the database layer end-to-end',
      'Built 150+ REST API endpoints across three Node.js modules (EMR, Laboratory, Admin Panel)',
      'Cut query times from 16–17s to 1–2s via composite indexes and precomputed MySQL views',
      'Rebuilt Docker infrastructure — Alpine multi-stage builds, isolated bridge networks per module — eliminating Redis cache pollution and queue interference',
      'Automated WhatsApp patient campaigns via Vartalaap, cutting setup effort by 70%',
      'Resolved a systemic encryption inconsistency across high-frequency MySQL fields, closing a data-layer security risk on patient records',
    ],
  },
];

export const deepDives = [
  {
    title: 'Lucene Indexer → Node.js Ingestion Engine',
    context: 'DNAFabric',
    tech: 'Node.js · Job Queues · MongoDB',
    period: '2024 – 2026',
    description:
      'Replaced a slow Java Lucene-based catalog indexer with a job-queue-backed Node.js engine. Multi-hour batch reporting became live project- and workflow-level analytics — clients now query file-level metadata (size, modTime, extensions, workflow attribution) on demand.',
  },
  {
    title: 'Provider Cost Calculator',
    context: 'DNAFabric',
    tech: 'Node.js · MongoDB · Cron',
    period: '2024 – 2026',
    description:
      'Cron-driven monthly ingestion of provider cost data, formulas ported from a manual Tableau workflow into reusable Node.js services, and a blueprint pattern joining 15+ default providers with client-added custom ones. A manual analyst workflow became fully composable and client-configurable.',
  },
  {
    title: 'Dynamic RBAC with Live Permission Updates',
    context: 'Healthray',
    tech: 'Node.js · MySQL · Redis',
    period: '2023 – 2026',
    description:
      'Real-time permission resolution evaluating every request against live role state. Resolves three layers per request — subscription plan gates, role-level resource scope, strict tenant isolation — with Redis absorbing overhead under concurrent admin changes. No restarts, no manual cache invalidation.',
  },
  {
    title: 'Multi-Module CI/CD on Shared Infrastructure',
    context: 'Healthray',
    tech: 'Docker · Jenkins · Linux',
    period: '2023 – 2026',
    description:
      'Alpine base images with multi-stage builds and a dedicated Docker bridge network per module to isolate Redis instances and queue workers. Eliminated cross-module data integrity issues, shrank images, and made per-module Jenkins deployments independent and predictable.',
  },
];

export const sideProjects = [
  'Serverless media extraction pipeline on AWS (Lambda, SQS, EC2, SNS) with real-time alerting',
  'This portfolio — React.js on Vercel',
  'Real-time chat app with Rails Turbo Streams for pub/sub practice',
];

export const education = {
  degree: 'B.Tech, Computer Engineering',
  school: 'Gujarat Technological University (GTU)',
  period: '2019 – 2023',
  gpa: 'GPA: 9.0 / 10',
};
