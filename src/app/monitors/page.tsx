/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Sidebar } from "@/components/side-bar";
import { trpc } from "@/utils/trpc";
import { CircleX, Dot, Loader, Plus, Repeat2, Trash2, AlertTriangle, X } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Page() {
  const [search, setSearch] = useState("");
  const [siteToDelete, setSiteToDelete] = useState<{ id: string, url: string } | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data: sites, isLoading, isError, error } = trpc.site.getSites.useQuery();
  const utils = trpc.useUtils();

  const deleteMutation = trpc.site.deleteSite.useMutation({
    onSuccess: () => {
      toast.success("Monitor deleted successfully");
      utils.site.getSites.invalidate();
      setIsDeleteModalOpen(false);
      setSiteToDelete(null);
    },
    onError: (err) => {
      toast.error("Failed to delete monitor: " + err.message);
    }
  });

  const handleDeleteClick = (e: React.MouseEvent, site: any) => {
    e.preventDefault();
    e.stopPropagation();
    setSiteToDelete(site);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (siteToDelete) {
      deleteMutation.mutate({ siteId: siteToDelete.id });
    }
  };

  const getSiteName = (url: string) => {
    try {
      const { hostname } = new URL(url);
      return hostname.replace(/^www\./, "");
    } catch {
      return "Invalid URL";
    }
  };

  if (isError) {
    return (
      <div className="flex min-h-screen w-full bg-[#1c1f2b]">
        <Sidebar />
        <main className="flex-1 flex items-center justify-center p-6 md:ml-64">
          <div className="max-w-md w-full bg-[#232837] border border-red-500/20 rounded-3xl p-8 text-center shadow-2xl">
            <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500 mx-auto mb-6 border border-red-500/20">
              <CircleX size={32} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Connection Error</h2>
            <p className="text-gray-400 mb-2">We couldn{"'"}t fetch your monitors.</p>
            <p className="text-red-400/80 text-xs font-mono mb-8 bg-red-500/5 py-2 px-3 rounded-lg border border-red-500/10">
              {error?.message || "Unknown error occurred"}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 bg-[#7E87F0] hover:bg-[#6a74e8] text-white rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-[#7E87F0]/20"
            >
              Try Again
            </button>
          </div>
        </main>
      </div>
    );
  }

  const filteredSites = sites?.filter((site: any) =>
    getSiteName(site.url).toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex min-h-screen w-full bg-[#1c1f2b]">
      <Sidebar />

      <main className="flex w-full justify-center bg-[#1c1f2b] pt-20 md:ml-64">
        <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-4xl font-bold text-white tracking-tight">Monitors</h1>

            <div className="flex w-full gap-3 sm:w-auto">
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={search}
                  className="w-full rounded-xl border border-[#2c3141] bg-[#232837] px-4 py-2.5 text-sm text-slate-300 placeholder:text-slate-600 focus:border-[#7E87F0]/50 focus:ring-4 focus:ring-[#7E87F0]/10 focus:outline-none transition-all"
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search monitors..."
                />
              </div>

              <Link
                href="/create-monitor"
                className="rounded-xl bg-[#7E87F0] px-5 py-2.5 text-sm font-bold whitespace-nowrap text-white hover:bg-[#6a74e8] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#7E87F0]/20"
              >
                Create Monitor
              </Link>
            </div>
          </div>

          <div className="mt-12 space-y-6">
            <div className="group w-full rounded-2xl border border-[#2c3141] bg-[#1c1f2b] overflow-hidden shadow-sm">
              <div className="flex h-12 w-full items-center justify-between px-6 bg-[#232837]/50 border-b border-[#2c3141]">
                <div className="flex items-center text-xs font-bold uppercase tracking-widest text-slate-500">
                  <Dot className="text-[#7E87F0]" size={24} />
                  Active Monitors
                </div>
                <Link
                  href="/create-monitor"
                  className="flex items-center justify-center rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-[#2c3141] hover:text-white"
                >
                  <Plus size={18} />
                </Link>
              </div>

              <div className="divide-y divide-[#2c3141]">
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex h-16 items-center justify-between px-6 animate-pulse">
                      <div className="flex items-center gap-4">
                        <div className="h-4 w-4 rounded-full bg-[#2c3141]" />
                        <div className="space-y-2">
                          <div className="h-4 w-32 rounded bg-[#2c3141]" />
                          <div className="h-3 w-16 rounded bg-[#2c3141]" />
                        </div>
                      </div>
                      <div className="h-6 w-20 rounded bg-[#2c3141]" />
                    </div>
                  ))
                ) : !filteredSites || filteredSites.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-16 h-16 bg-[#232837] rounded-2xl flex items-center justify-center text-slate-600 mb-4 border border-[#2c3141]">
                      <Plus size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">No monitors found</h3>
                    <p className="text-sm text-gray-500 mb-6">Start tracking your first website today.</p>
                    <Link
                      href="/create-monitor"
                      className="text-sm font-bold text-[#7E87F0] hover:text-[#6a74e8] transition-colors"
                    >
                      Add Monitor
                    </Link>
                  </div>
                ) : (
                  filteredSites.map((site: any) => {
                    const latestLog = site.statusLogs?.[0];
                    const isDown = latestLog
                      ? (latestLog.statusCode < 200 || latestLog.statusCode >= 300)
                      : site.isDown;

                    return (
                      <Link
                        href={`/monitors/monitor/${site.id}`}
                        className="block hover:bg-[#232837]/50 transition-colors group/row"
                        key={site.id}
                      >
                        <div className="flex h-16 items-center justify-between px-6">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <div className={`h-3 w-3 rounded-full ${
                                !site.statusLogs?.length ? 'bg-slate-500' :
                                isDown ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)] animate-pulse' : 
                                'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]'
                              }`} />
                              <div className={`absolute -inset-1 rounded-full border ${
                                !site.statusLogs?.length ? 'border-slate-500/20' :
                                isDown ? 'border-red-500/20' : 
                                'border-green-500/20'
                              }`} />
                            </div>
                            <div>
                              <div className="text-sm font-bold text-slate-200 group-hover/row:text-[#7E87F0] transition-colors leading-none mb-1.5">
                                {getSiteName(site.url)}
                              </div>
                              <div className={`text-[10px] font-bold uppercase tracking-widest ${
                                !site.statusLogs?.length ? 'text-slate-500' :
                                isDown ? 'text-red-400' : 'text-green-400'
                              }`}>
                                {
                                  !site.statusLogs?.length ? 'Pending' :
                                  isDown ? 'Down' : 'Operational'
                                }
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="hidden sm:flex items-center gap-2 group/item relative cursor-help">
                              <Repeat2 size={14} className="text-slate-600" />
                              <span className="text-xs font-mono text-slate-500">5m</span>
                              <div className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-[#1c1f2b] border border-[#2c3141] rounded text-[10px] whitespace-nowrap opacity-0 group-hover/item:opacity-100 pointer-events-none transition-opacity z-10 shadow-xl">
                                Checked every 3 minutes
                              </div>
                            </div>
                            <button
                              onClick={(e) => handleDeleteClick(e, site)}
                              disabled={deleteMutation.isPending}
                              className="p-2 rounded-lg hover:bg-red-500/10 text-slate-600 hover:text-red-500 transition-all active:scale-95 disabled:opacity-50"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </Link>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDeleteModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[#2c3141] bg-[#232837] p-8 shadow-2xl"
            >
              <div className="absolute top-4 right-4 text-slate-500 hover:text-white cursor-pointer transition-colors" onClick={() => setIsDeleteModalOpen(false)}>
                <X size={20} />
              </div>

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-500 border border-red-500/20">
                <AlertTriangle size={28} />
              </div>

              <h2 className="mb-2 text-2xl font-bold text-white">Delete Monitor?</h2>
              <p className="mb-8 text-sm leading-relaxed text-slate-400">
                Are you sure you want to delete <span className="font-bold text-slate-200">{getSiteName(siteToDelete?.url || "")}</span>?
                This action is permanent and will delete all historical uptime logs and statistics.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 rounded-xl border border-[#2c3141] bg-[#1c1f2b] py-3 text-sm font-bold text-white transition-all hover:bg-[#2c3141] active:scale-95"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={deleteMutation.isPending}
                  className="flex-1 rounded-xl bg-red-500 py-3 text-sm font-bold text-white transition-all hover:bg-red-600 active:scale-95 shadow-lg shadow-red-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {deleteMutation.isPending ? (
                    <Loader size={16} className="animate-spin" />
                  ) : (
                    "Delete Monitor"
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
