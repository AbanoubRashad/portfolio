"use client";
import { useContent } from "@/components/content-provider";
import { Mail } from "lucide-react";
import { navLinks } from "@/lib/data";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";

export function Footer() {
  const { site } = useContent();
  return (
    <footer className="border-t border-slate-800/80 py-10">
      <div className="container flex flex-col items-center justify-between gap-6 md:flex-row">
        <p className="text-sm text-slate-400">© {new Date().getFullYear()} {site.fullName}. All rights reserved.</p>
        <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
          {navLinks.map((l) => (
            <li key={l.href}><a href={l.href} className="text-slate-400 hover:text-white">{l.label}</a></li>
          ))}
        </ul>
        <div className="flex gap-3 text-slate-400">
          <a href={site.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-white"><LinkedinIcon className="h-5 w-5" /></a>
          <a href={site.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-white"><GithubIcon className="h-5 w-5" /></a>
          <a href={`mailto:${site.email}`} aria-label="Email" className="hover:text-white"><Mail className="h-5 w-5" /></a>
        </div>
      </div>
    </footer>
  );
}
