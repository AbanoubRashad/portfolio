"use client";
import { Field, ListEditor, TagsField, TextArea } from "@/components/admin/fields";
import type { TabProps } from "./types";

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `item-${Date.now()}`;

export function SkillsTab({ content, update }: TabProps) {
  return (
    <ListEditor
      items={content.competencies}
      onChange={(v) => update("competencies", v)}
      title={(c) => c.label}
      addLabel="Add skill category (tab)"
      newItem={() => ({ key: `cat-${Date.now()}`, label: "New Category", items: [], note: "" })}
      render={(c, set) => (
        <>
          <Field label="Tab name" value={c.label} onChange={(v) => set({ label: v, key: c.key || slug(v) })} />
          <div />
          <div className="sm:col-span-2"><TextArea label="Description" value={c.note} onChange={(v) => set({ note: v })} /></div>
          <div className="sm:col-span-2"><TagsField label="Skills" value={c.items} onChange={(v) => set({ items: v })} /></div>
        </>
      )}
    />
  );
}
