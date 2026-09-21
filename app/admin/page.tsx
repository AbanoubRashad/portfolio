"use client";
import { useEffect, useMemo, useState } from "react";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, type User } from "firebase/auth";
import { Download, ExternalLink, LogOut, RotateCcw, Save, Loader2 } from "lucide-react";
import { defaultContent, type Content, type Project } from "@/lib/data";
import { ADMIN_EMAIL, auth, isFirebaseConfigured, loadContent, saveContent } from "@/lib/firebase";
import { serviceIcons } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { Checkbox, Field, LinesField, ListEditor, Select, TagsField, TextArea } from "@/components/admin/fields";
import { cn } from "@/lib/utils";

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

const TABS = ["Projects", "Services", "Skills", "Stats", "Profile & Contact"] as const;
type Tab = (typeof TABS)[number];

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `item-${Date.now()}`;

export default function AdminPage() {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [content, setContent] = useState<Content | null>(null);
  const [saved, setSaved] = useState<string>("");
  const [tab, setTab] = useState<Tab>("Projects");
  const [status, setStatus] = useState<{ type: "ok" | "error"; msg: string } | null>(null);
  const [saving, setSaving] = useState(false);

  const isAdmin = user?.email === ADMIN_EMAIL;
  const dirty = useMemo(() => content !== null && JSON.stringify(content) !== saved, [content, saved]);

  // Track sign-in state.
  useEffect(() => {
    const a = auth();
    if (!a) return setUser(null);
    return onAuthStateChanged(a, setUser);
  }, []);

  // Load content once the owner is signed in.
  useEffect(() => {
    if (!isAdmin) return;
    loadContent().then((c) => { setContent(c); setSaved(JSON.stringify(c)); });
  }, [isAdmin]);

  // Warn before leaving with unsaved changes.
  useEffect(() => {
    const h = (e: BeforeUnloadEvent) => { if (dirty) e.preventDefault(); };
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [dirty]);

  const update = <K extends keyof Content>(key: K, value: Content[K]) => setContent((c) => (c ? { ...c, [key]: value } : c));

  const handleSave = async () => {
    if (!content) return;
    setSaving(true);
    setStatus(null);
    try {
      await saveContent(content);
      setSaved(JSON.stringify(content));
      setStatus({ type: "ok", msg: "Saved! Your live site is updated." });
    } catch (e) {
      setStatus({ type: "error", msg: e instanceof Error ? e.message : "Save failed" });
    } finally {
      setSaving(false);
    }
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `portfolio-content-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  };

  // ---------- Gate screens ----------
  const Shell = ({ children }: { children: React.ReactNode }) => (
    <div className="grid min-h-screen place-items-center bg-ink p-6">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/60 p-8 text-center backdrop-blur-md">{children}</div>
    </div>
  );

  if (!isFirebaseConfigured)
    return (
      <Shell>
        <h1 className="text-xl font-bold text-white">Firebase isn&apos;t configured</h1>
        <p className="mt-3 text-sm text-slate-400">Copy <code>.env.example</code> to <code>.env.local</code>, fill in your Firebase web app keys, then rebuild.</p>
      </Shell>
    );
  if (user === undefined) return <Shell><Loader2 className="mx-auto h-6 w-6 animate-spin text-slate-400" /></Shell>;
  if (!user)
    return (
      <Shell>
        <h1 className="text-2xl font-bold text-white">Portfolio CMS</h1>
        <p className="mt-2 text-sm text-slate-400">Sign in to manage your portfolio content.</p>
        <Button className="mt-6 w-full" onClick={() => signInWithPopup(auth()!, new GoogleAuthProvider())}>Sign in with Google</Button>
      </Shell>
    );
  if (!isAdmin)
    return (
      <Shell>
        <h1 className="text-xl font-bold text-white">Access denied</h1>
        <p className="mt-2 text-sm text-slate-400">{user.email} is not allowed to edit this site.</p>
        <Button variant="outline" className="mt-6" onClick={() => signOut(auth()!)}>Sign out</Button>
      </Shell>
    );
  if (!content) return <Shell><Loader2 className="mx-auto h-6 w-6 animate-spin text-slate-400" /></Shell>;

  // ---------- Editor ----------
  return (
    <div className="min-h-screen bg-ink">
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-ink/90 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between gap-3">
          <div>
            <h1 className="font-bold text-white">Portfolio CMS</h1>
            <p className="text-xs text-slate-500">{user.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex"><a href="/" target="_blank"><ExternalLink className="h-4 w-4" /> View site</a></Button>
            <Button size="sm" onClick={handleSave} disabled={!dirty || saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {dirty ? "Save changes" : "Saved"}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => signOut(auth()!)} aria-label="Sign out"><LogOut className="h-4 w-4" /></Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {status && (
          <div className={cn("mb-6 rounded-xl border px-4 py-3 text-sm", status.type === "ok" ? "border-teal/40 bg-teal/10 text-teal" : "border-red-500/40 bg-red-500/10 text-red-300")}>
            {status.msg}
          </div>
        )}

        <nav className="mb-6 flex flex-wrap gap-1 rounded-xl border border-slate-800 bg-slate-900/60 p-1">
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={cn("rounded-lg px-4 py-2 text-sm font-medium", tab === t ? "bg-accent text-white" : "text-slate-400 hover:text-white")}>
              {t}
            </button>
          ))}
        </nav>

        {tab === "Projects" && (
          <ListEditor<Project>
            items={content.projects}
            onChange={(v) => update("projects", v)}
            title={(p) => p.title}
            addLabel="Add project"
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
                <div className="sm:col-span-2"><Field label="Cover image URL (optional)" value={p.image} placeholder="https://... (.jpg / .png)" hint="Leave empty to use the cover color" onChange={(v) => set({ image: v || undefined })} /></div>
                <Checkbox label='Show "Coming soon" badge' checked={!!p.placeholder} onChange={(v) => set({ placeholder: v })} />
              </>
            )}
          />
        )}

        {tab === "Services" && (
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
        )}

        {tab === "Skills" && (
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
        )}

        {tab === "Stats" && (
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
        )}

        {tab === "Profile & Contact" && (() => {
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
        })()}

        <div className="mt-10 flex flex-wrap gap-3 border-t border-slate-800 pt-6">
          <Button variant="outline" size="sm" onClick={exportJson}><Download className="h-4 w-4" /> Export backup (JSON)</Button>
          <Button variant="ghost" size="sm" onClick={() => { if (window.confirm("Replace everything with the original default content? (Not saved until you click Save.)")) setContent(defaultContent); }}>
            <RotateCcw className="h-4 w-4" /> Reset to defaults
          </Button>
        </div>
      </main>
    </div>
  );
}
