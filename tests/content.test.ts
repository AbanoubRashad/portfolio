import { describe, expect, it } from "vitest";
import { parseBackup, withDefaults } from "@/lib/content";
import { defaultContent } from "@/lib/data";

describe("withDefaults", () => {
  it("returns the defaults when nothing is stored", () => {
    expect(withDefaults(undefined)).toEqual(defaultContent);
  });

  it("keeps stored values and fills missing fields", () => {
    const merged = withDefaults({ stats: [{ value: "10+", label: "Projects" }] });
    expect(merged.stats).toEqual([{ value: "10+", label: "Projects" }]);
    expect(merged.projects).toBe(defaultContent.projects);
  });

  it("merges nested site and social fields", () => {
    const merged = withDefaults({ site: { email: "new@example.com" } as never });
    expect(merged.site.email).toBe("new@example.com");
    expect(merged.site.name).toBe(defaultContent.site.name);
    expect(merged.site.socials.github).toBe(defaultContent.site.socials.github);
  });
});

describe("parseBackup", () => {
  it("round-trips an exported backup", () => {
    expect(parseBackup(JSON.stringify(defaultContent))).toEqual(defaultContent);
  });

  it("rejects text that isn't JSON", () => {
    expect(() => parseBackup("not json")).toThrow("isn't valid JSON");
  });

  it("rejects JSON that isn't a portfolio backup", () => {
    expect(() => parseBackup("{}")).toThrow("isn't a portfolio backup");
    expect(() => parseBackup('{"projects": "x", "site": {}}')).toThrow("isn't a portfolio backup");
    expect(() => parseBackup("null")).toThrow("isn't a portfolio backup");
  });
});
