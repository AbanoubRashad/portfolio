import type { Content } from "@/lib/data";

/** Props every CMS tab receives: the draft content and a setter for one top-level field. */
export type TabProps = {
  content: Content;
  update: <K extends keyof Content>(key: K, value: Content[K]) => void;
};
