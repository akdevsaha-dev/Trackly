"use client";

import { Sidebar } from "@/components/side-bar";
import { trpc } from "@/utils/trpc";
import { AlertTriangle, CheckCircle2, Clock, ShieldCheck, Globe, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import { formatDistance } from "date-fns";

export default function IncidentsPage() {
  const { data: sites } = trpc.site.getSites.useQuery();
  const { data: incidents, isLoading: isLoadingIncidents } = trpc.site.getIncidents.useQuery();
  
  const activeIncidents = sites?.filter(site => site.isDown) || [];

  const getSiteName = (url: string) => {
    try {
      const { hostname } = new URL(url);
      return hostname.replace(/^www\./, "");
    } catch {
      return url || "Unknown Site";
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-[#1c1f2b] text-white">
      <Sidebar />

      <main className="flex-1 md:ml-64 bg-[#1c1f2b]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <header className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-2">Incidents</h1>
            <p className="text-gray-400">Track and manage system outages and performance issues.</p>
          </header>

          <div className="mb-12">
            {activeIncidents.length > 0 ? (
              <div className="grid gap-4">
                {activeIncidents.map((incident) => (
                  <motion.div
                    key={incident.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between p-6 rounded-2xl border border-red-500/20 bg-red-500/5 group hover:bg-red-500/10 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-red-500/20 text-red-500">
                        <AlertTriangle size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-white">System Outage: {getSiteName(incident.url)}</h3>
                        <p className="text-red-400/80 text-sm">Ongoing • Detected automatically</p>
                      </div>
                    </div>
                    <div className="px-4 py-1.5 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider">
                      Critical
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center p-12 rounded-3xl border border-[#2c3141] bg-[#232837]/30 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500 mb-6 border border-green-500/20">
                  <ShieldCheck size={32} />
                </div>
                <h2 className="text-2xl font-bold mb-2">All Systems Operational</h2>
                <p className="text-gray-500 max-w-md mx-auto">
                  No active incidents detected. We're monitoring your sites 24/7 to ensure maximum uptime.
                </p>
              </motion.div>
            )}
          </div>

          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Incident History</h3>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock size={16} />
                <span>Recent Alerts</span>
              </div>
            </div>

            <div className="rounded-2xl border border-[#2c3141] bg-[#232837]/20 overflow-hidden">
              {isLoadingIncidents ? (
                <div className="p-12 text-center text-gray-500">
                  <div className="animate-spin h-8 w-8 border-4 border-t-[#7E87F0] border-[#2c3141] rounded-full mx-auto mb-4" />
                  <p>Loading incident history...</p>
                </div>
              ) : incidents && incidents.length > 0 ? (
                <div className="divide-y divide-[#2c3141]">
                  {incidents.map((incident) => (
                    <div key={incident.id} className="p-6 flex items-start justify-between hover:bg-[#232837]/30 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-lg mt-1 ${incident.type === 'DOWN' ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
                          {incident.type === 'DOWN' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold">{getSiteName(incident.site.url)}</span>
                            <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full ${incident.type === 'DOWN' ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
                              {incident.type}
                            </span>
                          </div>
                          <p className="text-sm text-gray-400">{incident.alertReason}</p>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 font-medium whitespace-nowrap ml-4">
                        {formatDistance(new Date(incident.sentAt), new Date(), { addSuffix: true })}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center text-gray-500">
                  <div className="flex justify-center mb-4">
                    <CheckCircle2 size={40} className="text-[#7E87F0]/30" />
                  </div>
                  <p>No past incidents recorded.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
