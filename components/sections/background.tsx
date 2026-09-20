"use client";
import { useContent } from "@/components/content-provider";
import * as Tabs from "@radix-ui/react-tabs";
import { motion } from "framer-motion";
import { Award, Code2, Cpu, Users } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { Card } from "@/components/ui/card";

const icons: Record<string, typeof Code2> = { software: Code2, hardware: Cpu, leadership: Users };

const highlights = [
  { title: "Graduation Project", text: "Chess-playing robotic arm with custom control software." },
  { title: "IDT President", text: "Led teams and events; partnerships with Schneider Electric & Juhayna." },
  { title: "Quality Mindset", text: "Six Sigma fundamentals applied to software quality and delivery." },
];

export function Background() {
  const { competencies } = useContent();
  return (
    <section id="background" className="scroll-mt-24 py-24">
      <div className="container">
        <SectionHeading eyebrow="Engineering Background" title="Mechatronics Is My Advantage"
          description="Hardware, control systems and leadership experience that make me a sharper software engineer." />

        <FadeIn>
          <Tabs.Root defaultValue={competencies[0]?.key}>
            <Tabs.List className="mb-6 inline-flex flex-wrap gap-1 rounded-xl border border-slate-800 bg-slate-900/60 p-1 backdrop-blur" aria-label="Competencies">
              {competencies.map((c) => {
                const Icon = icons[c.key] ?? Code2;
                return (
                  <Tabs.Trigger key={c.key} value={c.key}
                    className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-slate-400 transition data-[state=active]:bg-accent data-[state=active]:text-white hover:text-white">
                    <Icon className="h-4 w-4" /> {c.label}
                  </Tabs.Trigger>
                );
              })}
            </Tabs.List>

            {competencies.map((c) => (
              <Tabs.Content key={c.key} value={c.key} className="focus:outline-none">
                <Card className="p-7">
                  <p className="mb-6 max-w-2xl text-slate-400">{c.note}</p>
                  <div className="flex flex-wrap gap-3">
                    {c.items.map((item, i) => (
                      <motion.span key={item} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.04 }}
                        className="rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm text-slate-200 transition hover:border-teal/60 hover:text-white hover:shadow-[0_0_20px_-6px_rgba(16,185,129,.6)]">
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </Card>
              </Tabs.Content>
            ))}
          </Tabs.Root>
        </FadeIn>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {highlights.map((h, i) => (
            <FadeIn key={h.title} delay={i * 0.08}>
              <Card className="h-full p-6">
                <Award className="mb-3 h-5 w-5 text-teal" />
                <h3 className="font-semibold text-white">{h.title}</h3>
                <p className="mt-1 text-sm text-slate-400">{h.text}</p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
