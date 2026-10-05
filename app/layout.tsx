import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/data";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://abanoub--rashad.web.app"),
  title: "Abanoub Rashad | Software Engineer & Systems Architect",
  description:
    "Mechatronics engineer turned software engineer. Scalable web applications, API integrations and smart-system dashboards for clients worldwide.",
  keywords: ["Abanoub Rashad", "Full Stack Developer", "Next.js", "Freelance", "Mechatronics", "IoT", "Egypt"],
  openGraph: {
    title: "Abanoub Rashad | Software Engineer & Systems Architect",
    description: "Engineering scalable web applications & smart systems.",
    type: "website",
    url: "/",
    siteName: "Abanoub Rashad",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Abanoub Rashad — Engineering scalable web applications & smart systems" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abanoub Rashad | Software Engineer & Systems Architect",
    description: "Engineering scalable web applications & smart systems.",
    images: ["/og.png"],
  },
  alternates: { canonical: "/" },
};

/** Structured data so search engines know who the site belongs to. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.fullName,
  jobTitle: site.title,
  url: "https://abanoub--rashad.web.app",
  image: "https://abanoub--rashad.web.app/profile.jpg",
  email: `mailto:${site.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Cairo", addressCountry: "EG" },
  sameAs: [site.socials.linkedin, site.socials.github],
};

export const viewport: Viewport = { themeColor: "#090D16" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${jakarta.variable}`}>
      <head>
        {/* Content is loaded from Firestore on every visit; open the connection early. */}
        <link rel="preconnect" href="https://firestore.googleapis.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
        {children}
      </body>
    </html>
  );
}
