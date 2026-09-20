"use client";
import { useContent } from "@/components/content-provider";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusDot } from "@/components/ui/status-dot";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

export function Hero() {
  const { site, stats } = useContent();
  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-36 sm:pt-44">
      {/* Background: grid + glows */}
      <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-60 h-72 w-72 rounded-full bg-teal/10 blur-[100px]" />

      <motion.div variants={container} initial="hidden" animate="show" className="container relative text-center">
        <motion.div variants={item} className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-4 py-1.5 text-xs text-slate-300 backdrop-blur">
          <StatusDot /> {site.title} · {site.subtitle}
        </motion.div>

        <motion.h1 variants={item} className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
          Engineering{" "}
          <span className="bg-gradient-to-r from-accent-soft via-accent to-teal bg-clip-text text-transparent">Scalable Web Applications</span>{" "}
          &amp; Smart Systems.
        </motion.h1>

        <motion.p variants={item} className="mx-auto mt-6 max-w-2xl text-base text-slate-400 sm:text-lg">
          Mechatronics graduate turned Software Engineer. I craft high-performance web applications, API integrations,
          and digital solutions with engineering rigor.
        </motion.p>

        <motion.div variants={item} className="mt-9 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <a href="#projects">Explore Projects <ArrowRight className="h-4 w-4" /></a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="#contact">Get In Touch</a>
          </Button>
        </motion.div>

        <motion.div variants={item} className="mt-7 flex justify-center gap-3">
          {[
            { href: site.socials.linkedin, label: "LinkedIn", icon: <LinkedinIcon className="h-4 w-4" /> },
            { href: site.socials.github, label: "GitHub", icon: <GithubIcon className="h-4 w-4" /> },
            { href: `mailto:${site.email}`, label: "Email", icon: <Mail className="h-4 w-4" /> },
          ].map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
              className="grid h-10 w-10 place-items-center rounded-xl border border-slate-800 bg-slate-900/60 text-slate-400 transition hover:border-accent/60 hover:text-white">
              {s.icon}
            </a>
          ))}
        </motion.div>

        {/* Quick stats bar */}
        <motion.div variants={item} className="mx-auto mt-16 grid max-w-3xl grid-cols-1 divide-y divide-slate-800 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.map((s) => (
            <div key={s.label} className="px-6 py-5">
              <div className="text-xl font-bold text-white sm:text-2xl">{s.value}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-slate-500">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
