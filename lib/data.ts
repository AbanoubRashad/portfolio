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
    id: "baytak",
    title: "Baytak — Property Consultant Website",
    category: "Real Estate Web App",
    summary: "A calm, bilingual (English / Arabic RTL) website for an independent property consultant in Egypt: browse compounds and units, compare, plan payments, book visits and chat.",
    details: [
      "Search with area, budget, bedroom, type, developer, delivery and size filters synced to the URL, plus sorting and pagination.",
      "Unit pages with a swipeable gallery and lightbox, the developer's payment plan and a live instalment calculator.",
      "Visit booking with Egyptian mobile validation and calendar export; side-by-side compare of up to three units.",
      "Chat widget with office-hours logic, WhatsApp deep links and a lead dashboard; light and dark themes, accessible and mobile-first.",
    ],
    tags: ["JavaScript", "HTML5", "CSS", "i18n / RTL", "Firebase Hosting"],
    gradient: "from-sky-500/40 via-blue-700/20 to-transparent",
    demo: "https://baytak-demo.web.app",
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
    repo: "https://github.com/AbanoubRashad",
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
