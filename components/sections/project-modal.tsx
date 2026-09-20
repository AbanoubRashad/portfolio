"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { ExternalLink, X } from "lucide-react";
import type { Project } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/ui/icons";

/** Accessible project detail dialog (Radix Dialog). */
export function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  return (
    <Dialog.Root open={!!project} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-slate-800 bg-ink-900 p-0 shadow-2xl focus:outline-none">
          {project && (
            <>
              <div className={`relative h-40 bg-gradient-to-br ${project.gradient} bg-slate-900`}>
                {project.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={project.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
                ) : (
                  <div className="absolute inset-0 bg-grid opacity-40" />
                )}
                <Dialog.Close className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-lg bg-slate-900/70 text-slate-300 hover:text-white" aria-label="Close">
                  <X className="h-4 w-4" />
                </Dialog.Close>
              </div>
              <div className="p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-accent-soft">{project.category}</p>
                <Dialog.Title className="mt-2 text-2xl font-bold text-white">{project.title}</Dialog.Title>
                <Dialog.Description className="mt-3 text-slate-400">{project.summary}</Dialog.Description>
                <ul className="mt-5 list-disc space-y-2 pl-5 text-sm text-slate-300">
                  {project.details.map((d) => <li key={d}>{d}</li>)}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((t) => <Badge key={t}>{t}</Badge>)}
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  {project.demo && (
                    <Button asChild size="sm"><a href={project.demo} target="_blank" rel="noreferrer"><ExternalLink className="h-4 w-4" /> Live Demo</a></Button>
                  )}
                  {project.repo && (
                    <Button asChild size="sm" variant="outline"><a href={project.repo} target="_blank" rel="noreferrer"><GithubIcon className="h-4 w-4" /> Source</a></Button>
                  )}
                </div>
              </div>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
