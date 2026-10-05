"use client";
import type { Project } from "@/lib/data";
import { Checkbox, Field, LinesField, ListEditor, Select, TagsField, TextArea } from "@/components/admin/fields";
import type { TabProps } from "./types";

/** Cover colors a project can use when it has no image. */
const GRADIENTS: Record<string, string> = {
  Blue: "from-blue-600/40 via-indigo-600/20 to-transparent",
  Emerald: "from-emerald-500/40 via-teal-600/20 to-transparent",
  Amber: "from-amber-500/40 via-orange-600/20 to-transparent",
  Purple: "from-purple-600/40 via-fuchsia-600/20 to-transparent",
  Rose: "from-rose-500/40 via-pink-600/20 to-transparent",
  Cyan: "from-cyan-500/40 via-sky-600/20 to-transparent",
};
const gradientName = (g: string) => Object.keys(GRADIENTS).find((k) => GRADIENTS[k] === g) ?? "Blue";

export function ProjectsTab({ content, update }: TabProps) {
  return (
    <ListEditor<Project>
      items={content.projects}
      onChange={(v) => update("projects", v)}
      title={(p) => p.title}
      addLabel="Add project"
      duplicate={(p) => ({ ...p, id: `${p.id}-copy-${Date.now()}`, title: `${p.title} (copy)` })}
      newItem={() => ({ id: `project-${Date.now()}`, title: "New Project", category: "Web Application", summary: "", details: [], tags: [], gradient: GRADIENTS.Blue, repo: content.site.socials.github })}
      render={(p, set) => (
        <>
          <Field label="Title" value={p.title} onChange={(v) => set({ title: v })} />
          <Field label="Category" value={p.category} onChange={(v) => set({ category: v })} />
          <div className="sm:col-span-2"><TextArea label="Short summary" value={p.summary} onChange={(v) => set({ summary: v })} /></div>
          <div className="sm:col-span-2"><LinesField label="Technical details (shown in pop-up)" value={p.details} onChange={(v) => set({ details: v })} /></div>
          <TagsField label="Tech tags" value={p.tags} onChange={(v) => set({ tags: v })} />
          <Select label="Cover color" value={gradientName(p.gradient)} options={Object.keys(GRADIENTS)} onChange={(v) => set({ gradient: GRADIENTS[v] })} />
          <Field label="Live demo URL" value={p.demo} placeholder="https://..." onChange={(v) => set({ demo: v || undefined })} />
          <Field label="GitHub repo URL" value={p.repo} placeholder="https://github.com/..." onChange={(v) => set({ repo: v || undefined })} />
          <div className="sm:col-span-2"><Field label="Cover image URL (optional)" value={p.image} placeholder="https://... (.jpg / .png)" hint="Leave empty to use the cover color" onChange={(v) => set({ image: v || undefined })} />
            {p.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.image} alt="Cover preview" className="mt-3 h-32 w-full max-w-sm rounded-lg border border-slate-800 object-cover" />
            )}</div>
          <Checkbox label='Show "Coming soon" badge' checked={!!p.placeholder} onChange={(v) => set({ placeholder: v })} />
        </>
      )}
    />
  );
}
