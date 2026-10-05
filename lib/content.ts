import { defaultContent, type Content } from "./data";

/** Merge stored content over defaults so missing fields never break the site. */
export function withDefaults(data: Partial<Content> | undefined): Content {
  return {
    ...defaultContent,
    ...data,
    site: { ...defaultContent.site, ...data?.site, socials: { ...defaultContent.site.socials, ...data?.site?.socials } },
  };
}

/** Parse an exported backup file. Throws a readable error if it isn't one. */
export function parseBackup(text: string): Content {
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("This file isn't valid JSON.");
  }
  const d = data as Partial<Content> | null;
  if (!d || typeof d !== "object" || !Array.isArray(d.projects) || !d.site || typeof d.site !== "object") {
    throw new Error("This file isn't a portfolio backup.");
  }
  return withDefaults(d);
}
