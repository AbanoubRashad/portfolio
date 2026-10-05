"use client";
import { serviceIcons } from "@/lib/icons";
import { Field, ListEditor, Select, TagsField, TextArea } from "@/components/admin/fields";
import type { TabProps } from "./types";

export function ServicesTab({ content, update }: TabProps) {
  return (
    <ListEditor
      items={content.services}
      onChange={(v) => update("services", v)}
      title={(s) => s.title}
      addLabel="Add service"
      newItem={() => ({ icon: "Code2", title: "New Service", description: "", stack: [] })}
      render={(s, set) => (
        <>
          <Field label="Title" value={s.title} onChange={(v) => set({ title: v })} />
          <Select label="Icon" value={s.icon} options={Object.keys(serviceIcons)} onChange={(v) => set({ icon: v })} />
          <div className="sm:col-span-2"><TextArea label="Description" value={s.description} onChange={(v) => set({ description: v })} /></div>
          <div className="sm:col-span-2"><TagsField label="Tech badges" value={s.stack} onChange={(v) => set({ stack: v })} /></div>
        </>
      )}
    />
  );
}
