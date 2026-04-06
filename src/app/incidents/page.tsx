"use client";

import { Sidebar } from "@/components/side-bar";
import { trpc } from "@/utils/trpc";
import { AlertTriangle, CheckCircle2, Clock, ShieldCheck, Globe, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import { formatDistance } from "date-fns";
import Link from "next/link";

export default function IncidentsPage() {
  const { data: sites } = trpc.site.getSites.useQuery();
  const { data: incidents, isLoading: isLoadingIncidents } = trpc.site.getIncidents.useQuery();
  
  const activeIncidents = sites?.filter(site => {
    const latestLog = (site as any).statusLogs?.[0];
    if (latestLog) {
      return latestLog.statusCode < 200 || latestLog.statusCode >= 300;
    }
    return site.isDown;
  }) || [];

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
          <header className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-2">Incidents</h1>
              <p className="text-gray-400">Real-time status updates and historical incident reports.</p>
            </div>
            {activeIncidents.length > 0 && (
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 text-sm font-bold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                {activeIncidents.length} Active {activeIncidents.length === 1 ? 'Incident' : 'Incidents'}
              </div>
            )}
          </header>

          <div className="mb-16">
            {activeIncidents.length > 0 ? (
              <div className="grid gap-6">
                {activeIncidents.map((incident) => (
                  <motion.div
                    key={incident.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-8 rounded-3xl border border-red-500/20 bg-red-500/5 group hover:bg-red-500/10 transition-all shadow-xl shadow-red-500/5 gap-6"
                  >
                    <div className="flex items-center gap-5">
                      <div className="p-4 rounded-2xl bg-red-500/20 text-red-500 shadow-inner">
                        <AlertTriangle size={32} />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-xl text-white mb-1">
                          CRITICAL: {getSiteName(incident.url)}
                        </h3>
                        <div className="flex items-center gap-2 text-red-400/80 text-sm font-medium">
                          <span className="flex h-1.5 w-1.5 rounded-full bg-red-500 pulse"></span>
                          System Outage detected automatically
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Link 
                        href={`/monitors/monitor/${incident.id}`}
                        className="px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-bold transition-all border border-white/10"
                      >
                        View Details
                      </Link>
                      <div className="px-4 py-2 rounded-xl bg-red-500 text-white text-xs font-bold uppercase tracking-widest shadow-lg shadow-red-500/20">
                        Investigating
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center p-16 rounded-3xl border border-[#2c3141] bg-[#232837]/30 text-center shadow-inner"
              >
                <div className="w-20 h-20 rounded-3xl bg-green-500/10 flex items-center justify-center text-green-500 mb-8 border border-green-500/20 shadow-xl">
                  <ShieldCheck size={40} />
                </div>
                <h2 className="text-3xl font-bold mb-3 tracking-tight">All Systems Operational</h2>
                <p className="text-gray-500 max-w-lg mx-auto text-lg leading-relaxed">
                  We're monitoring your sites 24/7 to ensure maximum uptime. Currently, no active incidents have been detected across your monitors.
                </p>
              </motion.div>
            )}
          </div>

          <section className="mt-20">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold tracking-tight">Incident History</h3>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
                <Clock size={16} />
                <span>Past 30 Days</span>
              </div>
            </div>

            <div className="rounded-3xl border border-[#2c3141] bg-[#232837]/20 overflow-hidden shadow-2xl backdrop-blur-sm">
              {isLoadingIncidents ? (
                <div className="p-20 text-center text-gray-500">
                  <div className="animate-spin h-10 w-10 border-4 border-t-[#7E87F0] border-[#2c3141] rounded-full mx-auto mb-6" />
                  <p className="font-medium">Fetching historical logs...</p>
                </div>
              ) : incidents && incidents.length > 0 ? (
                <div className="divide-y divide-[#2c3141]">
                  {incidents.map((incident) => (
                    <div key={incident.id} className="p-8 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-[#232837]/40 transition-all group/item gap-4">
                      <div className="flex items-start gap-5">
                        <div className={`p-3 rounded-xl mt-1 shadow-inner ${incident.type === 'DOWN' ? 'bg-red-500/15 text-red-500' : 'bg-green-500/15 text-green-500'}`}>
                          {incident.type === 'DOWN' ? <AlertCircle size={22} /> : <CheckCircle2 size={22} />}
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-bold text-lg text-slate-200 group-hover/item:text-white transition-colors">{getSiteName(incident.site.url)}</span>
                            <span className={`text-[10px] uppercase tracking-widest font-black px-2.5 py-1 rounded-md ${incident.type === 'DOWN' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                              {incident.type}
                            </span>
                          </div>
                          <p className="text-slate-400 group-hover/item:text-slate-300 transition-colors leading-relaxed">{incident.alertReason}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <div className="text-sm font-bold text-slate-300">
                          {formatDistance(new Date(incident.sentAt), new Date(), { addSuffix: true })}
                        </div>
                        <div className="text-[10px] uppercase tracking-tighter text-slate-500 font-mono">
                          Ref: {incident.id.slice(0, 8)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-24 text-center">
                  <div className="w-16 h-16 bg-[#2c3141] rounded-2xl flex items-center justify-center text-slate-600 mx-auto mb-6 border border-[#3d4458]">
                    <Globe size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">No Incident History</h3>
                  <p className="text-gray-500">You haven't had any recorded incidents yet. Keep up the high uptime!</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}
