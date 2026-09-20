"use client";
import { useContent } from "@/components/content-provider";
import { useRef } from "react";
import type { Service } from "@/lib/data";
import { getIcon } from "@/lib/icons";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";

/** Card with a cursor-following glow on hover. */
function ServiceCard({ service }: { service: Service }) {
  const ref = useRef<HTMLDivElement>(null);
  const Icon = getIcon(service.icon);
  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    ref.current!.style.setProperty("--x", `${e.clientX - r.left}px`);
    ref.current!.style.setProperty("--y", `${e.clientY - r.top}px`);
  };
  return (
    <div ref={ref} onMouseMove={onMove}
      className="glow-card group relative h-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-7 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-accent/50">
      <div className="relative">
        <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl border border-accent/30 bg-accent/10 text-accent-soft transition group-hover:shadow-[0_0_24px_-4px_rgba(59,130,246,.6)]">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-semibold text-white">{service.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">{service.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {service.stack.map((s) => <Badge key={s}>{s}</Badge>)}
        </div>
      </div>
    </div>
  );
}

export function Services() {
  const { services } = useContent();
  return (
    <section id="services" className="scroll-mt-24 py-24">
      <div className="container">
        <SectionHeading eyebrow="Services" title="What I Do"
          description="End-to-end freelance engineering, from the interface your users see to the systems running behind it." />
        <div className="grid gap-5 md:grid-cols-2">
          {services.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.08}><ServiceCard service={s} /></FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
