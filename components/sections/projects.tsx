"use client";
import { useContent } from "@/components/content-provider";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Plus } from "lucide-react";
import type { Project } from "@/lib/data";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { GithubIcon } from "@/components/ui/icons";
import { ProjectModal } from "./project-modal";

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <motion.article whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md transition-colors hover:border-accent/50">
      <button onClick={onOpen} className={`relative h-44 w-full bg-gradient-to-br ${project.gradient} bg-slate-900 text-left`} aria-label={`Open ${project.title}`}>
        {project.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-80 transition group-hover:opacity-100" />
        ) : (
          <div className="absolute inset-0 bg-grid opacity-40" />
        )}
        <span className="absolute left-4 top-4 rounded-full bg-slate-950/60 px-3 py-1 text-xs text-slate-300 backdrop-blur">{project.category}</span>
        {project.placeholder && (
          <span className="absolute right-4 top-4 rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-amber-300">Coming soon</span>
        )}
        <ArrowUpRight className="absolute bottom-4 right-4 h-6 w-6 text-white/60 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white" />
      </button>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold text-white">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{project.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">{project.tags.map((t) => <Badge key={t}>{t}</Badge>)}</div>
        <div className="mt-5 flex items-center gap-4 border-t border-slate-800 pt-4 text-sm">
          <button onClick={onOpen} className="font-medium text-accent-soft hover:text-white">Details</button>
          {project.demo && <a href={project.demo} className="flex items-center gap-1 text-slate-400 hover:text-white"><ExternalLink className="h-4 w-4" /> Demo</a>}
          {project.repo && <a href={project.repo} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-slate-400 hover:text-white"><GithubIcon className="h-4 w-4" /> Code</a>}
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  const { projects } = useContent();
  const [selected, setSelected] = useState<Project | null>(null);
  return (
    <section id="projects" className="scroll-mt-24 py-24">
      <div className="container">
        <SectionHeading eyebrow="Featured Projects" title="Selected Work"
          description="Where software meets engineering. Click any project for the technical breakdown." />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <FadeIn key={p.id} delay={i * 0.08} className="h-full"><ProjectCard project={p} onOpen={() => setSelected(p)} /></FadeIn>
          ))}
          {/* Slot showing where the next project goes */}
          <FadeIn delay={0.3} className="h-full">
            <a href="#contact" className="flex h-full min-h-[280px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-700 p-6 text-center text-slate-500 transition hover:border-accent/60 hover:text-slate-300">
              <Plus className="h-8 w-8" />
              <span className="font-medium">Your project could be next</span>
              <span className="text-sm">Let&apos;s talk →</span>
            </a>
          </FadeIn>
        </div>
      </div>
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
