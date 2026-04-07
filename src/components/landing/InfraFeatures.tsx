"use client";
import { motion } from "motion/react";
import { ShieldCheck, Zap, Globe2, Bell, Share2, Terminal } from "lucide-react";

const features = [
  {
    title: "SSL / Certificate Monitoring",
    description: "Never let a certificate expire again. We track expiry dates and chain integrity globally.",
    icon: ShieldCheck,
    tag: "Security"
  },
  {
    title: "Synthetic Transcations",
    description: "Script complex user flows to ensure your checkout or login remains functional 24/7.",
    icon: Terminal,
    tag: "Automation"
  },
  {
    title: "Global Handshake Analysis",
    description: "Monitor TCP, DNS, and TLS handshakes from 24+ global edge locations.",
    icon: Globe2,
    tag: "Network"
  },
  {
    title: "Multi-Channel Alerts",
    description: "Instant notifications via Slack, Discord, Telegram, PagerDuty, and Custom Webhooks.",
    icon: Bell,
    tag: "Alerting"
  },
  {
    title: "Public Status Pages",
    description: "Transparent uptime reporting for your customers with custom domains and branding.",
    icon: Share2,
    tag: "Reporting"
  },
  {
    title: "1-Second Frequency",
    description: "High-resolution monitoring for mission-critical infrastructure with zero delay.",
    icon: Zap,
    tag: "Resolution"
  },
];

export const InfraFeatures = () => {
  return (
    <section className="py-24 px-6 relative bg-black/20">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-20 text-center space-y-4">
          <motion.div 
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             className="font-mono text-[10px] tracking-[0.3em] text-accent uppercase font-bold"
          >
            // Infrastructure Layer
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white font-brand">Built for Scale.</h2>
          <p className="text-white/40 max-w-xl mx-auto font-brand">A full suite of enterprise-grade monitoring tools, distilled into a single, high-performance dashboard.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] p-8 transition-all hover:bg-white/[0.06] hover:border-white/10"
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:via-accent/40 transition-all" />
              
              <div className="mb-6 flex items-center justify-between">
                <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center text-white/60 group-hover:bg-accent/10 group-hover:text-accent transition-all">
                  <feature.icon size={24} strokeWidth={1.5} />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/20 group-hover:text-white/40 transition-colors">{feature.tag}</span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 font-brand">{feature.title}</h3>
              <p className="text-sm text-white/40 font-brand leading-relaxed">{feature.description}</p>
              
              {/* Blueprint Corner Accent */}
              <div className="absolute bottom-0 right-0 h-4 w-4 border-r border-b border-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
