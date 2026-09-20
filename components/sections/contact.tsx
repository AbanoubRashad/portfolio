"use client";
import { useContent } from "@/components/content-provider";
import { useState } from "react";
import { CheckCircle2, Mail, MapPin, Phone, Send } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const field =
  "w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30";

/**
 * Contact form. With no backend, it opens the visitor's email app with a pre-filled message.
 * To receive submissions directly, swap `handleSubmit` for a call to Formspree, Resend or an API route.
 */
export function Contact() {
  const { site, projectTypes } = useContent();
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const subject = `New project inquiry: ${d.get("type")}`;
    const body = `Name: ${d.get("name")}\nEmail: ${d.get("email")}\nService: ${d.get("type")}\n\n${d.get("message")}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const details = [
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: Phone, label: "Phone / WhatsApp", value: site.phones.join("  /  "), href: `https://wa.me/${site.whatsapp}` },
    { icon: MapPin, label: "Location", value: `${site.location} (${site.locationNote})` },
  ];

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden py-24">
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-80 w-[700px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />
      <div className="container relative">
        <SectionHeading eyebrow="Contact" title="Let's Build Something Exceptional Together."
          description="Tell me about your project. I usually reply within 24 hours." />

        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <FadeIn className="space-y-4">
            {details.map(({ icon: Icon, label, value, href }) => (
              <Card key={label} className="flex items-start gap-4 p-5">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent-soft"><Icon className="h-5 w-5" /></div>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wider text-slate-500">{label}</p>
                  {href ? (
                    <a href={href} target="_blank" rel="noreferrer" className="break-words text-slate-200 hover:text-white">{value}</a>
                  ) : (
                    <p className="text-slate-200">{value}</p>
                  )}
                </div>
              </Card>
            ))}
          </FadeIn>

          <FadeIn delay={0.1}>
            <Card className="p-6 sm:p-8">
              {sent ? (
                <div className="flex min-h-[380px] flex-col items-center justify-center text-center">
                  <CheckCircle2 className="h-12 w-12 text-teal" />
                  <h3 className="mt-4 text-xl font-semibold text-white">Thanks! Your email is ready to send.</h3>
                  <p className="mt-2 text-slate-400">Your email app opened with your message. Hit send and I&apos;ll get back to you soon.</p>
                  <Button variant="outline" className="mt-6" onClick={() => setSent(false)}>Send another</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm text-slate-300">Name
                    <input name="name" required placeholder="Your name" className={field} />
                  </label>
                  <label className="grid gap-2 text-sm text-slate-300">Email
                    <input name="email" type="email" required placeholder="you@company.com" className={field} />
                  </label>
                  <label className="grid gap-2 text-sm text-slate-300 sm:col-span-2">Project Type / Services Needed
                    <select name="type" required defaultValue="" className={field}>
                      <option value="" disabled>Select a service</option>
                      {projectTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </label>
                  <label className="grid gap-2 text-sm text-slate-300 sm:col-span-2">Message
                    <textarea name="message" required rows={5} placeholder="Tell me about your project, timeline and budget..." className={`${field} resize-none`} />
                  </label>
                  <Button type="submit" size="lg" className="sm:col-span-2">
                    <Send className="h-4 w-4" /> Send Message
                  </Button>
                </form>
              )}
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
