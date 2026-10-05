"use client";
import type { Content } from "@/lib/data";
import { Field, TagsField } from "@/components/admin/fields";
import type { TabProps } from "./types";

export function ProfileTab({ content, update }: TabProps) {
  const s = content.site;
  const setSite = (patch: Partial<Content["site"]>) => update("site", { ...s, ...patch });
  return (
    <div className="grid gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-5 sm:grid-cols-2">
      <Field label="Name" value={s.name} onChange={(v) => setSite({ name: v })} />
      <Field label="Full name (footer)" value={s.fullName} onChange={(v) => setSite({ fullName: v })} />
      <Field label="Title" value={s.title} onChange={(v) => setSite({ title: v })} />
      <Field label="Subtitle" value={s.subtitle} onChange={(v) => setSite({ subtitle: v })} />
      <Field label="Email" value={s.email} onChange={(v) => setSite({ email: v })} />
      <Field label="WhatsApp number" value={s.whatsapp} hint="Country code, no + (e.g. 201276534436)" onChange={(v) => setSite({ whatsapp: v })} />
      <TagsField label="Phone numbers" value={s.phones} onChange={(v) => setSite({ phones: v })} />
      <Field label="Resume URL" value={s.resume} hint="e.g. /resume.pdf or a Google Drive link" onChange={(v) => setSite({ resume: v })} />
      <Field label="Location" value={s.location} onChange={(v) => setSite({ location: v })} />
      <Field label="Location note" value={s.locationNote} onChange={(v) => setSite({ locationNote: v })} />
      <Field label="LinkedIn URL" value={s.socials.linkedin} onChange={(v) => setSite({ socials: { ...s.socials, linkedin: v } })} />
      <Field label="GitHub URL" value={s.socials.github} onChange={(v) => setSite({ socials: { ...s.socials, github: v } })} />
      <div className="sm:col-span-2"><TagsField label="Contact form: service options" value={content.projectTypes} onChange={(v) => update("projectTypes", v)} /></div>
    </div>
  );
}
