import { Code2, Server, Cpu, Gauge, Globe, Smartphone, Database, Wrench, Rocket, Palette, ShieldCheck, Bot, type LucideIcon } from "lucide-react";

/** Icons selectable for services in the CMS. */
export const serviceIcons: Record<string, LucideIcon> = {
  Code2, Server, Cpu, Gauge, Globe, Smartphone, Database, Wrench, Rocket, Palette, ShieldCheck, Bot,
};
export const getIcon = (name: string) => serviceIcons[name] ?? Code2;
