import { describe, expect, it } from "vitest";
import { defaultContent } from "@/lib/data";
import { serviceIcons } from "@/lib/icons";

const isUrl = (s: string) => /^https?:\/\/[^\s]+$/.test(s);

describe("default content", () => {
  it("has unique project ids", () => {
    const ids = defaultContent.projects.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("uses valid demo and repo links", () => {
    for (const p of defaultContent.projects) {
      if (p.demo) expect(isUrl(p.demo), `${p.id} demo`).toBe(true);
      if (p.repo) expect(isUrl(p.repo), `${p.id} repo`).toBe(true);
    }
  });

  it("only uses service icons that exist", () => {
    for (const s of defaultContent.services) expect(Object.keys(serviceIcons)).toContain(s.icon);
  });

  it("has a WhatsApp number in international format", () => {
    expect(defaultContent.site.whatsapp).toMatch(/^\d{10,15}$/);
  });
});
