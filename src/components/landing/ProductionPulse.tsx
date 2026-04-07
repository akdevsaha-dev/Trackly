"use client";
import { motion } from "motion/react";
import { Activity, Globe, Zap, Server, Clock, AlertCircle } from "lucide-react";

const statusUpdates = [
  { id: 1, service: "Auth API", status: "Operational", time: "2s ago", latency: "12ms" },
  { id: 2, service: "CDN / Edge", status: "Operational", time: "5s ago", latency: "8ms" },
  { id: 3, service: "DB Cluster", status: "Degraded", time: "12s ago", latency: "450ms" },
];

export const ProductionPulse = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent/5 text-accent font-mono text-[10px] uppercase tracking-widest"
            >
              <Activity size={12} className="animate-pulse" />
              Real-time Production Feed
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl font-extrabold font-brand tracking-tight text-white leading-tight">
              Monitor Everything. <br />
              <span className="text-white/40">In Absolute Precision.</span>
            </h2>
            
            <p className="text-lg text-white/50 font-brand max-w-lg leading-relaxed">
              Trackly doesn't just check if your site is up. We analyze every millisecond of the handshake, ensuring your production environment stays bulletproof.
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-4">
              {[
                { icon: Globe, label: "Global Edge", value: "24 Nodes" },
                { icon: Zap, label: "Frequency", value: "Every 1s" },
              ].map((item, i) => (
                <div key={item.label} className="space-y-1">
                  <div className="flex items-center gap-2 text-white/40">
                    <item.icon size={14} />
                    <span className="text-[10px] uppercase font-mono tracking-widest leading-none">{item.label}</span>
                  </div>
                  <div className="text-xl font-bold text-white font-brand">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex-1 w-full relative group">
            {/* Mockup Container (Redesigned to match Product UI) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative aspect-square md:aspect-video rounded-3xl border border-border-main bg-panel p-8 backdrop-blur-2xl overflow-hidden shadow-2xl"
            >
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <div className="relative h-10 w-10 flex items-center justify-center rounded-xl bg-green-500/10">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    <div className="absolute inset-0 rounded-xl border border-green-500/20" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white font-brand leading-none mb-1">production-api.trackly.app</div>
                    <div className="text-[10px] text-green-500 uppercase font-mono tracking-wider">Operational</div>
                  </div>
                </div>
                <div className="flex gap-1.5 leading-none px-3 py-1.5 rounded-lg bg-white/5 border border-white/5">
                  <Clock size={12} className="text-white/40" />
                  <span className="text-[10px] text-white/40 font-mono">Last check: 2s ago</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: "Uptime", value: "99.98%", icon: Activity, color: "text-accent" },
                  { label: "Incidents", value: "0", icon: AlertCircle, color: "text-red-400" },
                ].map((card, idx) => (
                  <div key={card.label} className="p-4 rounded-2xl border border-white/5 bg-white/5">
                    <div className="flex justify-between items-start mb-2">
                       <span className="text-[10px] uppercase font-mono text-white/30">{card.label}</span>
                       <card.icon size={14} className={card.color} />
                    </div>
                    <div className="text-xl font-bold text-white font-brand">{card.value}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <div className="text-[10px] uppercase font-mono text-white/20 tracking-widest mb-2">Dependency Status</div>
                {statusUpdates.map((update, idx) => (
                  <div 
                    key={update.id}
                    className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/[0.02] group/row"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-1.5 w-1.5 rounded-full ${update.status === 'Operational' ? 'bg-green-500' : 'bg-red-500'}`} />
                      <div className="text-xs font-medium text-white/70 font-brand">{update.service}</div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono text-white/40">{update.latency}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Blueprint Gradient Reveal */}
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 via-transparent to-transparent pointer-events-none" />
            </motion.div>
            
            {/* Floating Decorative Elements */}
            <div className="absolute -top-12 -right-12 h-32 w-32 bg-accent/10 blur-[60px] -z-10 group-hover:bg-accent/20 transition-all" />
            <div className="absolute -bottom-12 -left-12 h-40 w-40 bg-accent/20 blur-[80px] -z-10 group-hover:bg-accent/30 transition-all" />
          </div>
        </div>
      </div>
    </section>
  );
};
