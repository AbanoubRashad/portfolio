import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { Card } from "@/components/ui/card";

const points = [
  "Engineering discipline applied to every line of code",
  "Comfortable from the pixel to the microcontroller",
  "Clear communication, clean handover and on-time delivery",
];

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-24">
      <div className="container grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <FadeIn className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-accent/30 to-teal/20 blur-2xl" />
          <Card className="relative overflow-hidden p-2">
            <Image src="/profile.jpg" alt="Abanoub Rashad" width={400} height={400} priority
              className="aspect-square w-full rounded-xl object-cover" />
          </Card>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent-soft">About</p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            An engineer who builds for the web and beyond.
          </h2>
          <p className="mt-5 text-slate-400">
            I&apos;m Abanoub Rashad Rushdy, a Mechatronics engineer turned software engineer based in Cairo. My background
            in control systems, embedded hardware and robotics shapes how I build software: structured, measurable and
            reliable.
          </p>
          <p className="mt-4 text-slate-400">
            Today I help startups and businesses worldwide ship modern web applications, connect systems through APIs, and
            build interfaces for smart hardware.
          </p>
          <ul className="mt-6 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-slate-300">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal" /> {p}
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}
