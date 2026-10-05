import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, type Firestore } from "firebase/firestore";
import { getAuth, type Auth } from "firebase/auth";
import { defaultContent, type Content } from "./data";
import { withDefaults } from "./content";

/** Values come from .env.local (see .env.example). */
const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Boolean(config.apiKey && config.projectId);

/** Only this Google account can open /admin and save changes. */
export const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "abanoub.rashad01@gmail.com";

let app: FirebaseApp | undefined;
function getApp() {
  if (!isFirebaseConfigured) return undefined;
  app ??= getApps()[0] ?? initializeApp(config);
  return app;
}
export const db = (): Firestore | undefined => (getApp() ? getFirestore(getApp()!) : undefined);
export const auth = (): Auth | undefined => (getApp() ? getAuth(getApp()!) : undefined);

/** All site content is stored in one Firestore document: portfolio/content */
const CONTENT_PATH = ["portfolio", "content"] as const;

export async function loadContent(): Promise<Content> {
  const d = db();
  if (!d) return defaultContent;
  try {
    const snap = await getDoc(doc(d, ...CONTENT_PATH));
    return snap.exists() ? withDefaults(snap.data() as Partial<Content>) : defaultContent;
  } catch (e) {
    console.warn("CMS: using default content", e);
    return defaultContent;
  }
}

export async function saveContent(content: Content) {
  const d = db();
  if (!d) throw new Error("Firebase is not configured. Add your keys to .env.local.");
  // Firestore rejects `undefined` values, so strip them via JSON round-trip.
  await setDoc(doc(d, ...CONTENT_PATH), JSON.parse(JSON.stringify(content)));
}
