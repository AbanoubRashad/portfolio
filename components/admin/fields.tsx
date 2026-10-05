"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, ArrowDown, ArrowUp, Copy, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const base =
  "w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-white placeholder:text-slate-600 outline-none focus:border-accent focus:ring-2 focus:ring-accent/30";

export function Field({ label, value, onChange, placeholder, hint }: {
  label: string; value: string | undefined; onChange: (v: string) => void; placeholder?: string; hint?: string;
}) {
  return (
    <label className="grid gap-1.5 text-xs font-medium text-slate-400">
      {label}
      <input className={base} value={value ?? ""} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      {hint && <span className="font-normal text-slate-600">{hint}</span>}
    </label>
  );
}

export function TextArea({ label, value, onChange, rows = 3, hint }: {
  label: string; value: string; onChange: (v: string) => void; rows?: number; hint?: string;
}) {
  return (
    <label className="grid gap-1.5 text-xs font-medium text-slate-400">
      {label}
      <textarea className={cn(base, "resize-y")} rows={rows} value={value} onChange={(e) => onChange(e.target.value)} />
      {hint && <span className="font-normal text-slate-600">{hint}</span>}
    </label>
  );
}

/** Edit a string[] as comma-separated text (e.g. tags). */
export function TagsField({ label, value, onChange }: { label: string; value: string[]; onChange: (v: string[]) => void }) {
  const [text, setText] = useState(value.join(", "));
  return (
    <Field label={label} value={text} hint="Separate with commas"
      onChange={(t) => { setText(t); onChange(t.split(",").map((s) => s.trim()).filter(Boolean)); }} />
  );
}

/** Edit a string[] one item per line (e.g. bullet points). */
export function LinesField({ label, value, onChange }: { label: string; value: string[]; onChange: (v: string[]) => void }) {
  const [text, setText] = useState(value.join("\n"));
  return (
    <TextArea label={label} value={text} rows={4} hint="One item per line"
      onChange={(t) => { setText(t); onChange(t.split("\n").map((s) => s.trim()).filter(Boolean)); }} />
  );
}

export function Select({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <label className="grid gap-1.5 text-xs font-medium text-slate-400">
      {label}
      <select className={base} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

export function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-2 text-sm text-slate-300">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 accent-blue-500" />
      {label}
    </label>
  );
}

/**
 * Generic list editor: add, delete, reorder and expand items.
 * `render` receives the item and an `update` function for partial changes.
 * `duplicate` customizes copies (e.g. to give them a new id).
 */
export function ListEditor<T>({ items, onChange, render, title, newItem, addLabel, duplicate }: {
  items: T[];
  onChange: (items: T[]) => void;
  render: (item: T, update: (patch: Partial<T>) => void) => React.ReactNode;
  title: (item: T) => string;
  newItem: () => T;
  addLabel: string;
  duplicate?: (item: T) => T;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
    setOpen(open === i ? j : open);
  };
  const remove = (i: number) => {
    if (!window.confirm(`Delete "${title(items[i]) || "this item"}"?`)) return;
    onChange(items.filter((_, k) => k !== i));
    setOpen(null);
  };
  const copy = (i: number) => {
    const clone = duplicate ? duplicate(items[i]) : (JSON.parse(JSON.stringify(items[i])) as T);
    onChange([...items.slice(0, i + 1), clone, ...items.slice(i + 1)]);
    setOpen(i + 1);
  };
  const btn = "grid h-8 w-8 place-items-center rounded-md text-slate-400 hover:bg-slate-800 hover:text-white disabled:opacity-30";

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="rounded-xl border border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-2 px-4 py-3">
            <button className="flex flex-1 items-center gap-2 text-left text-sm font-medium text-white" onClick={() => setOpen(open === i ? null : i)}>
              {open === i ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              {title(item) || <span className="italic text-slate-500">Untitled</span>}
            </button>
            <button className={btn} onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up"><ArrowUp className="h-4 w-4" /></button>
            <button className={btn} onClick={() => move(i, 1)} disabled={i === items.length - 1} aria-label="Move down"><ArrowDown className="h-4 w-4" /></button>
            <button className={btn} onClick={() => copy(i)} aria-label="Duplicate" title="Duplicate"><Copy className="h-4 w-4" /></button>
            <button className={cn(btn, "hover:text-red-400")} onClick={() => remove(i)} aria-label="Delete"><Trash2 className="h-4 w-4" /></button>
          </div>
          {open === i && (
            <div className="grid gap-4 border-t border-slate-800 p-4 sm:grid-cols-2">
              {render(item, (patch) => onChange(items.map((it, k) => (k === i ? { ...it, ...patch } : it))))}
            </div>
          )}
        </div>
      ))}
      <button
        onClick={() => { onChange([...items, newItem()]); setOpen(items.length); }}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-700 py-3 text-sm text-slate-400 hover:border-accent hover:text-white"
      >
        <Plus className="h-4 w-4" /> {addLabel}
      </button>
    </div>
  );
}
