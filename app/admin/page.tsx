"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, type User } from "firebase/auth";
import { Download, ExternalLink, LogOut, RotateCcw, Save, Loader2, Undo2, Upload } from "lucide-react";
import { defaultContent, type Content } from "@/lib/data";
import { ADMIN_EMAIL, auth, isFirebaseConfigured, loadContent, saveContent } from "@/lib/firebase";
import { parseBackup } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ProjectsTab } from "@/components/admin/tabs/projects-tab";
import { ProfileTab } from "@/components/admin/tabs/profile-tab";
import { StatsTab } from "@/components/admin/tabs/stats-tab";
import { SkillsTab } from "@/components/admin/tabs/skills-tab";
import { ServicesTab } from "@/components/admin/tabs/services-tab";

const TABS = ["Projects", "Services", "Skills", "Stats", "Profile & Contact"] as const;
type Tab = (typeof TABS)[number];


export default function AdminPage() {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [content, setContent] = useState<Content | null>(null);
  const [saved, setSaved] = useState<string>("");
  const [tab, setTab] = useState<Tab>("Projects");
  const [status, setStatus] = useState<{ type: "ok" | "error"; msg: string } | null>(null);
  const [saving, setSaving] = useState(false);
  // Bumped whenever content is replaced wholesale, so text fields re-read their values.
  const [version, setVersion] = useState(0);
  const fileInput = useRef<HTMLInputElement>(null);

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
    loadContent().then((c) => { replaceContent(c); setSaved(JSON.stringify(c)); });
  }, [isAdmin]);

  // Warn before leaving with unsaved changes.
  useEffect(() => {
    const h = (e: BeforeUnloadEvent) => { if (dirty) e.preventDefault(); };
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [dirty]);

  const replaceContent = (c: Content) => { setContent(c); setVersion((v) => v + 1); };

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

  // Ctrl/Cmd + S saves.
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        if (dirty && !saving) handleSave();
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  });

  const discard = () => {
    if (window.confirm("Discard all unsaved changes?")) replaceContent(JSON.parse(saved) as Content);
  };

  const importJson = async (file: File) => {
    try {
      replaceContent(parseBackup(await file.text()));
      setStatus({ type: "ok", msg: `Imported ${file.name}. Review it, then click Save changes to publish.` });
    } catch (e) {
      setStatus({ type: "error", msg: e instanceof Error ? e.message : "Import failed" });
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
            {dirty && <Button variant="ghost" size="sm" onClick={discard}><Undo2 className="h-4 w-4" /> Discard</Button>}
            <Button size="sm" onClick={handleSave} disabled={!dirty || saving} title="Ctrl + S">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {dirty ? "Save changes" : "Saved"}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => signOut(auth()!)} aria-label="Sign out"><LogOut className="h-4 w-4" /></Button>
          </div>
        </div>
      </header>

      <main key={version} className="container py-8">
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

        {tab === "Projects" && <ProjectsTab content={content} update={update} />}

        {tab === "Services" && <ServicesTab content={content} update={update} />}

        {tab === "Skills" && <SkillsTab content={content} update={update} />}

        {tab === "Stats" && <StatsTab content={content} update={update} />}

        {tab === "Profile & Contact" && <ProfileTab content={content} update={update} />}

        <div className="mt-10 flex flex-wrap gap-3 border-t border-slate-800 pt-6">
          <Button variant="outline" size="sm" onClick={exportJson}><Download className="h-4 w-4" /> Export backup (JSON)</Button>
          <Button variant="outline" size="sm" onClick={() => fileInput.current?.click()}><Upload className="h-4 w-4" /> Import backup</Button>
          <input ref={fileInput} type="file" accept="application/json,.json" className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) importJson(f); e.target.value = ""; }} />
          <Button variant="ghost" size="sm" onClick={() => { if (window.confirm("Replace everything with the original default content? (Not saved until you click Save.)")) replaceContent(defaultContent); }}>
            <RotateCcw className="h-4 w-4" /> Reset to defaults
          </Button>
        </div>
      </main>
    </div>
  );
}
