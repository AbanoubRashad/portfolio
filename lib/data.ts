/**
 * Single source of truth for all site content.
 * To add a new project, append an object to `projects` — no component changes needed.
 */
/* Default content. The live site loads content from Firestore (edited at /admin)
   and falls back to these values if Firestore is empty or unreachable. */

export type SiteInfo = {
  name: string; fullName: string; title: string; subtitle: string; email: string;
  phones: string[]; whatsapp: string; location: string; locationNote: string; resume: string;
  socials: { linkedin: string; github: string };
};

export const site: SiteInfo = {
  name: "Abanoub Rashad",
  fullName: "Abanoub Rashad Rushdy",
  title: "Software Engineer & Systems Architect",
  subtitle: "Mechatronics Specialist",
  email: "abanoub.rashad01@gmail.com",
  phones: ["+20 127 653 4436", "+20 100 365 7275"],
  whatsapp: "201276534436",
  location: "Giza / Cairo, Egypt",
  locationNote: "Available worldwide remotely",
  resume: "/resume.pdf",
  socials: {
    linkedin: "https://www.linkedin.com/in/abanoub-rashad-2987811b5",
    github: "https://github.com/AbanoubRashad",
  },
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Engineering Background", href: "#background" },
  { label: "Contact", href: "#contact" },
];

export type Stat = { value: string; label: string };

export const stats: Stat[] = [
  { value: "100%", label: "Project Success Rate" },
  { value: "Multi-Disciplinary", label: "Engineering Background" },
  { value: "Full Stack", label: "Web Capabilities" },
];

export type Service = { icon: string; title: string; description: string; stack: string[] };

export const services: Service[] = [
  {
    icon: "Code2",
    title: "Custom Web Application Development",
    description: "Fast, accessible, production-ready web apps, from landing pages to complex dashboards.",
    stack: ["React", "Next.js", "TypeScript", "Tailwind"],
  },
  {
    icon: "Server",
    title: "API & Backend System Integration",
    description: "Robust REST APIs, third-party integrations and backend services built for reliability.",
    stack: ["Node.js", "C++", "Python"],
  },
  {
    icon: "Cpu",
    title: "Smart Automation & IoT Dashboards",
    description: "Web interfaces that talk to hardware: live telemetry, device control and automation.",
    stack: ["Embedded", "Serial / MQTT", "Realtime UI"],
  },
  {
    icon: "Gauge",
    title: "Technical Consulting & Optimization",
    description: "Architecture reviews, performance tuning and practical engineering advice for your product.",
    stack: ["Architecture", "Performance", "QA"],
  },
];

export type Project = {
  id: string;
  title: string;
  category: string;
  summary: string;
  details: string[];
  tags: string[];
  gradient: string; // Tailwind gradient classes for the cover
  demo?: string;
  repo?: string;
  image?: string; // optional cover image URL
  placeholder?: boolean;
};

export const projects: Project[] = [
  {
    id: "sekka",
    title: "Sekka — Food Delivery Platform, Four Roles Synced Live",
    category: "Full-Stack Real-time Web App",
    summary: "An Arabic-first (RTL) food delivery website where the customer, the restaurant, the courier and the admin each get their own section, and every order moves between them live: placed, accepted, cooked, picked up, and delivered with a 4-digit code while the customer watches the courier on a map.",
    details: [
      "Next.js 16 App Router with Cache Components and native i18n (Arabic / English); restaurant pages are prerendered and refreshed the moment the owner edits the menu.",
      "Supabase Postgres with Row Level Security on every table; prices, totals, promo codes and order statuses are decided only in SECURITY DEFINER functions, never trusted from the browser. Couriers claim orders atomically, so exactly one wins.",
      "Live tracking over Supabase Realtime and PostGIS: the courier's marker glides along the map with an ETA; restaurants get a live order board, and an installable courier PWA works one-handed in dark mode.",
      "Partner menu editor with photo upload, admin approvals and delivery-zone fees on a map, promo codes and ratings, plus a one-click /demo that plays the restaurant and courier through the real database rules.",
      "Tested end to end: 99 pgTAP database tests, a Playwright order journey from customer to restaurant to courier with axe accessibility checks, and Lighthouse 100 for accessibility, best practices and SEO.",
    ],
    tags: ["Next.js", "TypeScript", "Supabase", "PostGIS", "Realtime", "PWA", "Arabic RTL"],
    gradient: "from-violet-600/40 via-emerald-500/20 to-transparent",
    image: "/projects/sekka.jpg",
    demo: "https://sekka-eight.vercel.app/en/demo",
    repo: "https://github.com/AbanoubRashad/sekka",
  },
  {
    id: "nabd",
    title: "Nabd — Real-time IoT Monitoring with Real Hardware",
    category: "Mechatronics × Software · Real-time IoT",
    summary: "ESP32-S3 sensor nodes on rooftops, farms, clinics and cold rooms stream to one live dashboard in English and Arabic. Readings reach the screen in under a second, relays switch from the browser with device-confirmed feedback, alerts go out on WhatsApp, and firmware updates are signed and roll back on their own.",
    details: [
      "ESP32-S3 firmware (C++, PlatformIO): TLS MQTT with a pinned CA, a 5,000-reading flash buffer that replays with original timestamps, fail-safe relays, a watchdog, and ECDSA-signed OTA with automatic rollback; native unit tests for the core logic.",
      "Pipeline: EMQX with a per-device ACL → ingest worker (zod validation, idempotent batch inserts, dead letters) → TimescaleDB hypertable with roll-ups; the API pushes readings live over WebSocket and back-fills gaps by sequence number.",
      "Commands you can trust: sent → delivered → confirmed by the device with real timings, a 10 s timeout that restores the true state, and demo visitors limited to simulated devices.",
      "Alert rules as a tested state machine (wait time, hysteresis, cool-down, quiet hours, escalation), WhatsApp Cloud API templates with reply-to-acknowledge, and a 7-day backtest.",
      "Next.js 16 dashboard and marketing site with next-intl RTL, uPlot live charts, a 12-device simulator for the public demo, and 150+ unit, integration and Playwright tests.",
    ],
    tags: ["ESP32-S3", "MQTT", "TimescaleDB", "WebSocket", "Next.js", "Fastify", "Signed OTA", "RTL"],
    gradient: "from-emerald-500/40 via-teal-800/20 to-transparent",
    image: "/projects/nabd.jpg",
    demo: "https://nabd-iot.vercel.app",
    repo: "https://github.com/AbanoubRashad/nabd",
  },
  {
    id: "basma-clinic",
    title: "Basma — Clinic Website & Booking Portal",
    category: "Multi-tenant SaaS · Healthcare",
    summary: "A multi-tenant landing page and booking system for Egyptian clinics (Arabic-first RTL + English): live availability, Paymob deposits, WhatsApp reminders and a reception dashboard. Built to cut no-shows and refill cancelled slots.",
    details: [
      "Generic booking engine (timezone-correct slots, buffers, breaks, branches) with a database-level no-overlap guarantee, proven by a test that fires 20 parallel bookings at one slot.",
      "Paymob deposits confirmed only by an HMAC-verified, idempotent webhook; refunds follow the clinic's cancellation window.",
      "WhatsApp reminders with تأكيد / إلغاء buttons; a cancelled slot is offered to the waiting list and the first patient to accept gets it.",
      "Reception board per doctor, KPIs, walk-ins, roles and audit log; local SEO with JSON-LD per branch; 46 tests, Next.js 16 + TypeScript + SQLite.",
    ],
    tags: ["Next.js", "TypeScript", "SQLite", "Paymob", "WhatsApp", "i18n / RTL"],
    gradient: "from-blue-600/40 via-sky-800/20 to-transparent",
    image: "/projects/clinic.jpg",
    demo: "https://clinic-portal-flax.vercel.app",
    repo: "https://github.com/AbanoubRashad/clinic-portal",
  },
  {
    id: "masyaf",
    title: "Masyaf — Chalet Booking Marketplace",
    category: "Two-sided Marketplace",
    summary: "A trust-first marketplace for North Coast and Ain Sokhna chalets: every unit inspected and photographed, guest money held until check-in, verified reviews and Airbnb / Booking.com calendar sync.",
    details: [
      "Nightly pricing engine (season > weekend uplift > base, per-period minimum nights, weekly discount) with turnover-aware, database-enforced double-booking protection.",
      "iCal export and idempotent import by UID with scheduled and on-demand sync, conflict flags and stale-feed alerts.",
      "Escrow-style money flow: Paymob charge, card deposit authorisation, payout released after check-in, frozen by disputes; refunds per cancellation policy.",
      "Owner calendar with click-to-block and pricing rules, inspector app with on-site photo upload and checklist, admin disputes and payouts; 37 tests.",
    ],
    tags: ["Next.js", "TypeScript", "SQLite", "iCal sync", "Paymob", "RTL"],
    gradient: "from-cyan-700/40 via-sky-900/20 to-transparent",
    image: "/projects/chalet.jpg",
    demo: "https://chalet-marketplace.vercel.app",
    repo: "https://github.com/AbanoubRashad/chalet-marketplace",
  },
  {
    id: "teacher-platform",
    title: "White-label Platform for Thanaweya Amma Teachers",
    category: "Multi-tenant EdTech SaaS",
    summary: "Each teacher gets a branded site and student app on their own domain, with anti-piracy video, prepaid codes sold at centres, timed bubble-sheet exams, a weekly WhatsApp report for parents and an AI study mentor that answers from the teacher's own lectures.",
    details: [
      "Anti-piracy: 2-minute signed playback tokens bound to session and device, one active stream per account, a moving watermark that reappears if removed in DevTools, a device limit and suspicious-login alerts.",
      "Prepaid codes: hashed, unambiguous 12-character codes, printable QR card sheets, lockouts, and redemption that stays correct under 20 parallel attempts.",
      "Sequential unlocking by homework score; server-clocked exams with per-student shuffling, auto-submit and tie-aware ranking.",
      "AI mentor (LLM API): cites the exact lecture second, renders KaTeX step-by-step solutions with the arithmetic re-checked in code, gives hints only on open homework, locks during exams, and shows the teacher a heatmap of the minutes students ask about.",
      "Safety for minors: access rules enforced in retrieval, anti-piracy output guard, PII scrubbing, distress safeguarding, a rule-based coach with quiet hours, budget caps and an A/B readout; 113 tests including a 50-case red team.",
    ],
    tags: ["Next.js", "TypeScript", "Multi-tenant", "LLM API", "AI mentor", "Video security", "RTL"],
    gradient: "from-indigo-600/40 via-violet-900/20 to-transparent",
    image: "/projects/teacher.jpg",
    demo: "https://teacher-platform-lac.vercel.app",
  },
  {
    id: "manhal",
    title: "Manhal — Online Learning Platform",
    category: "Full-Stack E-learning",
    summary: "A bilingual (English / Arabic RTL) online course platform for Egypt and the Arab world, like Udemy or Yanfaa, with Nour, an AI study mentor built on a large language model API.",
    details: [
      "Nour, the AI mentor: streamed tutor chat that answers only from the course (SQLite FTS5 retrieval), cites the lesson, never gives quiz answers and replies in English or Egyptian Arabic.",
      "A study coach with hard limits (gap, weekly cap, quiet hours, back-off), live-session reminders, AI-drafted Q&A answers that instructors approve, wellbeing safeguards and an admin cost dashboard with a budget cap and A/B test.",
      "Node.js 22 with zero npm dependencies: node:http, node:sqlite with safe migrations, scrypt auth, CSRF and CSP protection, and 104 node:test tests.",
      "Paymob checkout with HMAC-verified, idempotent webhooks; Bunny Stream signed video; certificates; an instructor studio with payouts; and a live demo that runs the real server code in the browser.",
    ],
    tags: ["Node.js", "SQLite", "LLM API", "AI mentor", "Paymob", "i18n / RTL"],
    gradient: "from-teal-500/40 via-cyan-800/20 to-transparent",
    image: "/projects/manhal.jpg",
    demo: "https://manhal-learning.web.app",
    repo: "https://github.com/AbanoubRashad/manhal",
  },
  {
    id: "baytak",
    title: "Baytak — Property Consultant Website",
    category: "Full-Stack Real Estate Web App",
    summary: "A calm, bilingual (English / Arabic RTL) website for Romany, an independent property consultant in Cairo, with one live inbox for every chat, call-back and visit request.",
    details: [
      "Next.js 16 App Router with Cache Components: listings are cached and refreshed instantly from the admin, filters stay in the URL, and share images are generated with next/og.",
      "Unit pages with a photo mosaic and lightbox, the developer's payment plan with a live instalment calculator, side-by-side compare and visit booking with a calendar file.",
      "Website chat with live replies over Supabase Realtime, WhatsApp deep links and call-back forms; every conversation becomes a lead.",
      "Admin inbox at /admin: leads, stages, visits board, homes and compounds editor with photo upload. Row Level Security on every table, Zod validation, rate limits and Playwright tests.",
    ],
    tags: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "next-intl / RTL"],
    gradient: "from-sky-500/40 via-blue-700/20 to-transparent",
    image: "/projects/baytak.jpg",
    demo: "https://baytak-gilt.vercel.app",
    repo: "https://github.com/AbanoubRashad/baytak",
  },
  {
    id: "mazaq",
    title: "Mazaq — Coffee Ordering Website & App",
    category: "Full-Stack Web & Mobile",
    summary: "A bilingual (English / Arabic RTL) ordering website and iOS/Android app for a specialty-coffee brand, built as one TypeScript monorepo.",
    details: [
      "Turborepo + pnpm monorepo: a Next.js 16 website and an Expo (iOS + Android) app sharing one design system, menu dataset, cart logic and translations.",
      "Full English and Arabic support with right-to-left layouts on web (next-intl) and mobile (i18next).",
      "Menu browsing, drink customization, cart with VAT and pickup slots, store finder, rewards and checkout.",
      "Typed API layer with a mock backend, ready to swap for a real one (e.g. Supabase); Vitest unit tests and Playwright end-to-end tests.",
    ],
    tags: ["Next.js", "React Native / Expo", "TypeScript", "Tailwind CSS", "Turborepo"],
    gradient: "from-amber-700/40 via-orange-900/20 to-transparent",
    image: "/projects/mazaq.jpg",
    demo: "https://mazaq-coffee.web.app",
    repo: "https://github.com/AbanoubRashad/Mazaq",
  },
  {
    id: "flybirds",
    title: "Flybirds — Footwear E-commerce Store",
    category: "Full-Stack E-commerce",
    summary: "A production-grade direct-to-consumer footwear storefront with faceted catalog, optimistic cart and role-based admin access.",
    details: [
      "Next.js App Router with React Server Components and URL-driven faceted filtering across 20 products and ~800 size/colour variants.",
      "Prisma + PostgreSQL data model; money stored as integer cents and order items snapshot price and name.",
      "Optimistic cart that reconciles with live stock and price on the server via debounced Server Actions.",
      "Auth.js v5 with role-based access control enforced in edge middleware; zod-validated inputs throughout.",
    ],
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Auth.js"],
    gradient: "from-sky-600/40 via-cyan-700/20 to-transparent",
    image: "/projects/flybirds.jpg",
    demo: "https://flybirds-store.web.app",
    repo: "https://github.com/AbanoubRashad/flybirds",
  },
  {
    id: "chess-robot",
    title: "Smart Robotic Control System & UI",
    category: "Mechatronics × Software",
    summary: "Graduation project: a chess-playing robotic arm with interactive control software, move planning and a live UI.",
    details: [
      "Inverse kinematics and motion planning for precise piece placement.",
      "Board-state detection feeding a chess engine for move selection.",
      "Interactive control software for calibration, manual jog and game play.",
    ],
    tags: ["C++", "Python", "Embedded Systems", "Robotics"],
    gradient: "from-emerald-500/40 via-teal-600/20 to-transparent",
    repo: "https://github.com/AbanoubRashad",
  },
  {
    id: "solar-monitor",
    title: "Off-Grid Energy Monitoring Interface",
    category: "Hardware–Software Integration",
    summary: "A telemetry dashboard that tracks real-time output of an off-grid solar system: voltage, current, battery state and yield.",
    details: [
      "Sensor data acquired by a microcontroller and streamed to the web.",
      "Live charts for power output, battery state of charge and daily yield.",
      "Alerts for abnormal readings and low-battery conditions.",
    ],
    tags: ["IoT", "Dashboard", "Embedded C", "Realtime"],
    gradient: "from-amber-500/40 via-orange-600/20 to-transparent",
    repo: "https://github.com/AbanoubRashad/nabd",
  },
];

export type Competency = { key: string; label: string; items: string[]; note: string };

export const competencies: Competency[] = [
  {
    key: "software",
    label: "Software & Web",
    items: ["JavaScript", "TypeScript", "HTML5 / CSS3", "React", "Next.js", "C++", "C", "Python", "Embedded C"],
    note: "Modern web stack plus low-level languages, so I can write the dashboard and the firmware behind it.",
  },
  {
    key: "hardware",
    label: "Hardware & Systems",
    items: ["Arduino IDE", "SolidWorks", "MATLAB", "Simulink", "EasyEDA", "Proteus", "PCB Design"],
    note: "Mechatronics training in modeling, simulation and circuit design brings systems thinking to software.",
  },
  {
    key: "leadership",
    label: "Leadership & PM",
    items: ["IDT President", "Team Leadership", "Budgeting (20k+ EGP)", "Corporate Relations", "Six Sigma Fundamentals", "Quality Assurance"],
    note: "Led IDT teams, managed budgets over 20k EGP and handled partnerships with Schneider Electric and Juhayna.",
  },
];

export const projectTypes = [
  "Web Application",
  "Website / Landing Page",
  "API & Backend",
  "IoT / Hardware Dashboard",
  "Consulting",
  "Other",
];

/** Everything editable from the CMS. */
export type Content = {
  site: SiteInfo;
  stats: Stat[];
  services: Service[];
  projects: Project[];
  competencies: Competency[];
  projectTypes: string[];
};

export const defaultContent: Content = { site, stats, services, projects, competencies, projectTypes };
