import { HeroSection } from "@/components/heroSection";
import { Navbar } from "@/components/navbar";
import { ProductionPulse } from "@/components/landing/ProductionPulse";
import { InfraFeatures } from "@/components/landing/InfraFeatures";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const starData = [
  { top: "12%", left: "8%", delay: "0s" },
  { top: "18%", left: "85%", delay: "1.5s" },
  { top: "35%", left: "12%", delay: "3s" },
  { top: "42%", left: "75%", delay: "0.5s" },
  { top: "58%", left: "5%", delay: "2.2s" },
  { top: "65%", left: "92%", delay: "1.2s" },
  { top: "82%", left: "15%", delay: "4s" },
  { top: "88%", left: "80%", delay: "0.8s" },
];

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-deep-charcoal selection:bg-accent selection:text-white">
      <div className="grain-overlay" />

      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/heroimage.jpg')] bg-cover bg-center grayscale" />
        <div className="absolute inset-0 bg-gradient-to-b from-deep-charcoal via-transparent to-deep-charcoal" />
      </div>

      <svg className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-20">
        <defs>
          <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        <line x1="20%" y1="0" x2="20%" y2="100%" stroke="rgba(126, 135, 240, 0.15)" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="80%" y1="0" x2="80%" y2="100%" stroke="rgba(126, 135, 240, 0.15)" strokeWidth="1" strokeDasharray="4 4" />
      </svg>

      <div className="pointer-events-none fixed inset-0 z-0">
        {starData.map((star, i) => (
          <div
            key={i}
            className="absolute h-[1px] w-[1px] rounded-full bg-white blur-[0.5px] animate-pulse"
            style={{
              top: star.top,
              left: star.left,
              animationDelay: star.delay,
              animationDuration: "4s"
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <Navbar />
        <HeroSection />

        <ProductionPulse />

        <section className="relative flex flex-col items-center py-24 md:py-32">
          <div className="container mx-auto px-6 text-center">
            <div className="mb-16 inline-block rounded-full border border-white/5 bg-white/5 px-6 py-2 font-mono text-[10px] tracking-widest text-white/40 uppercase">
              // Integrated Intelligence
            </div>

            <div className="relative mx-auto max-w-6xl rounded-2xl border border-white/5 bg-black/40 p-4 backdrop-blur-xl md:p-8">
              <div className="absolute -top-[1px] left-1/2 h-[1px] w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

              <Image
                src="/dashboard.png"
                alt="Dashboard Preview"
                height={1200}
                width={1200}
                className="rounded-lg shadow-2xl transition-transform duration-700 hover:scale-[1.02]"
              />

              <div className="mt-12 grid gap-8 md:grid-cols-3">
                {[
                  { label: "Uptime", value: "99.99%", desc: "Guaranteed availability" },
                  { label: "Latency", value: "< 24ms", desc: "Global edge network" },
                  { label: "Alerts", value: "Instant", desc: "Zero-latency notifications" }
                ].map((stat, i) => (
                  <div key={stat.label} className="text-left md:text-center">
                    <div className="text-xs font-bold tracking-widest text-white/30 uppercase mb-2 font-mono">{stat.label}</div>
                    <div className="text-3xl font-bold text-white mb-1 font-brand">{stat.value}</div>
                    <div className="text-sm text-white/40 font-brand">{stat.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <InfraFeatures />

        <section className="py-32 px-6">
          <div className="container mx-auto max-w-4xl text-center space-y-10">
            <h2 className="text-4xl md:text-7xl font-extrabold text-white font-brand leading-none">Ready to achieve <br /><span className="text-accent">Total Visibility?</span></h2>
            <p className="text-white/40 text-lg md:text-xl font-brand max-w-xl mx-auto">Join the 2,000+ developers monitoring their critical infrastructure with Trackly.</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-6">
              <Link href="/signup" className="group flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-white font-bold transition-transform hover:scale-105 active:scale-95">
                <span>Deploy Your First Monitor</span>
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/pricing" className="px-8 py-4 text-white/60 hover:text-white transition-colors font-bold font-brand">
                View Pricing Plans
              </Link>
            </div>
          </div>
        </section>

        <footer className="border-t border-white/5 bg-black/40 py-12 backdrop-blur-xl">
          <div className="container mx-auto px-6 text-center font-mono text-[10px] tracking-widest text-white/20 uppercase">
            © 2026 Trackly Intelligence Systems // All rights reserved.
          </div>
        </footer>
      </div>
    </main>
  );
}
