# Abanoub Rashad — Portfolio

[![CI](https://github.com/AbanoubRashad/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/AbanoubRashad/portfolio/actions/workflows/ci.yml) [![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Next.js 14 (static export) · TypeScript · Tailwind · Framer Motion · Firebase Hosting + Firestore CMS.

**Live site:** https://abanoub--rashad.web.app

## Screenshots

| Hero | About |
|---|---|
| ![Hero](docs/screenshots/home.png) | ![About](docs/screenshots/about.png) |
| **Projects** | **Services** |
| ![Projects](docs/screenshots/projects.png) | ![Services](docs/screenshots/services.png) |
| **Contact** | **Mobile** |
| ![Contact](docs/screenshots/contact.png) | <img src="docs/screenshots/mobile-home.png" width="260" alt="Mobile" /> |

## Run locally
```
npm install
cp .env.example .env.local   # then fill in the Firebase web app keys
npm run dev        # http://localhost:3000  (CMS at /admin)
```

## Checks
```
npm run lint       # ESLint (Next.js + TypeScript rules)
npm test           # Vitest: content merging, backup import, default data
npm run build      # static export to ./out
```
GitHub Actions runs all three on every push.

## Project structure
```
app/                 pages, metadata, sitemap, robots, manifest, icon
app/admin/           CMS shell: sign-in, save, import / export
components/admin/    form fields and one component per CMS tab
components/sections/ public site sections
lib/content.ts       merging stored content over defaults, backup parsing
lib/data.ts          default content (used when Firestore is empty)
lib/firebase.ts      Firestore + Auth (loaded lazily on the public site)
tests/               Vitest suites
```

## CMS (add / edit / delete content)
Open **https://abanoub--rashad.web.app/admin**, sign in with Google (abanoub.rashad01@gmail.com),
edit Projects, Services, Skills, Stats or Profile, then click **Save changes**.
Changes are live immediately. No rebuild or redeploy needed.

Shortcuts: **Ctrl + S** saves, **Discard** undoes unsaved edits, the copy icon duplicates an item,
and **Export / Import backup** saves or restores everything as one JSON file.

The Firebase web keys live in `.env.local` (not committed; see `.env.example`). They are required at build time,
otherwise the site and `/admin` run without the CMS.

Content is stored in Firestore at `portfolio/content`. If it's empty, the site shows the defaults in `lib/data.ts`.

## Deploy code changes
```
npm run build
firebase deploy
```
