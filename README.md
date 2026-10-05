# Abanoub Rashad — Portfolio

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
npm run dev        # http://localhost:3000  (CMS at /admin)
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
