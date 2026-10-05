"use client";
import { Field, ListEditor } from "@/components/admin/fields";
import type { TabProps } from "./types";

export function StatsTab({ content, update }: TabProps) {
  return (
    <ListEditor
      items={content.stats}
      onChange={(v) => update("stats", v)}
      title={(s) => `${s.value} · ${s.label}`}
      addLabel="Add stat"
      newItem={() => ({ value: "", label: "" })}
      render={(s, set) => (
        <>
          <Field label="Value" value={s.value} placeholder="e.g. 10+" onChange={(v) => set({ value: v })} />
          <Field label="Label" value={s.label} placeholder="e.g. Projects Delivered" onChange={(v) => set({ label: v })} />
        </>
      )}
    />
  );
}
