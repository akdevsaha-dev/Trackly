"use client";

import { trpc } from "@/utils/trpc";
import { ChevronRight, Dot, Globe, SendHorizontal, Activity, Clock, AlertCircle, ArrowLeft, Zap, Settings2, ExternalLink, Server } from "lucide-react";
import Link from "next/link";
import { formatDistance, subDays, format } from "date-fns";
import { useEffect, useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { UptimeBar } from "./uptimeBar";
import { ResponseTimeChart } from "./responseTimeChart";
import { toast } from "react-hot-toast";

export default function MonitorClient({ siteId }: { siteId: string }) {
  const utils = trpc.useUtils();

  function useNow(interval = 1000) {
    const [now, setNow] = useState(Date.now());
    useEffect(() => {
      const id = setInterval(() => setNow(Date.now()), interval);
      return () => clearInterval(id);
    }, [interval]);

    return now;
  }

  const now = useNow(10_000);

  const { data, isLoading, error } = trpc.site.getSiteStatus.useQuery(
    { siteId },
    {
      refetchInterval: 180_000,
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: true,
      staleTime: 0,
      refetchOnMount: "always",
    },
  );

  const testAlertMutation = trpc.site.testAlert.useMutation({
    onSuccess: (res) => {
      toast.success(res.message);
    },
    onError: (err) => {
      toast.error("Failed to send test alert: " + err.message);
    }
  });

  const updateWarmupMutation = trpc.site.updateWarmupSettings.useMutation({
    onSuccess: () => {
      toast.success("Warmup settings updated");
      utils.site.getSiteStatus.invalidate({ siteId });
    },
    onError: (err) => {
      toast.error("Failed to update warmup settings: " + err.message);
    }
  });

  const [localWarmupEnabled, setLocalWarmupEnabled] = useState(false);
  const [localWarmupUrl, setLocalWarmupUrl] = useState("");

  useEffect(() => {
    if (data) {
      setLocalWarmupEnabled(data.warmUpEnabled ?? false);
      setLocalWarmupUrl(data.warmupUrl ?? "");
    }
  }, [data]);

  const metrics = useMemo(() => {
    if (!data?.statusLogs || data.statusLogs.length === 0) return null;

    const logs = data.statusLogs;
    const totalPings = logs.length;
    const successfulPings = logs.filter(l => l.statusCode >= 200 && l.statusCode < 300).length;
    const uptimePercentage = ((successfulPings / totalPings) * 100).toFixed(2);

    const currentStatus = logs[0].statusCode >= 200 && logs[0].statusCode < 300;
    let lastStatusChangeIndex = logs.findIndex(l => {
      const isUp = l.statusCode >= 200 && l.statusCode < 300;
      return isUp !== currentStatus;
    });

    if (lastStatusChangeIndex === -1) lastStatusChangeIndex = logs.length - 1;
    const statusDuration = formatDistance(new Date(logs[lastStatusChangeIndex].checkedAt), new Date(now));

    const incidents = logs.filter(l => l.statusCode === 0 || l.statusCode >= 400).length;

    return {
      uptimePercentage,
      statusDuration,
      incidents,
      currentStatus
    };
  }, [data?.statusLogs, now]);

  if (isLoading) return (
    <div className="flex h-full w-full items-center justify-center bg-[#1c1f2b]">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 border-4 border-t-[#7E87F0] border-[#2c3141] rounded-full animate-spin" />
        <p className="text-gray-400 animate-pulse">Loading monitor data...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex-1 flex items-center justify-center bg-[#1c1f2b]">
      <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-lg text-center">
        <AlertCircle className="mx-auto mb-4 text-red-500" size={40} />
        <h3 className="text-xl font-bold text-white mb-2">Error Loading Data</h3>
        <p className="text-gray-400">{error.message}</p>
      </div>
    </div>
  );

  const getSiteName = (url: string) => {
    try {
      const { hostname } = new URL(url);
      return hostname.replace(/^www\./, "");
    } catch {
      return "Invalid URL";
    }
  };

  const firstLog = data?.statusLogs?.[0];
  const lastCheckedAt = firstLog?.checkedAt
    ? formatDistance(new Date(firstLog.checkedAt), new Date(now), {
      addSuffix: true,
    })
    : "Not checked yet";

  return (
    <div className="flex h-screen w-full flex-col bg-[#1c1f2b] text-white overflow-hidden">
      <div className="flex h-14 items-center border-b border-b-[#2c3141] px-6 text-sm bg-[#1c1f2b]/80 backdrop-blur-md sticky top-0 z-10">
        <Link
          href="/monitors"
          className="mr-4 flex items-center justify-center h-8 w-8 rounded-lg hover:bg-[#2c3141] text-gray-500 hover:text-white transition-all active:scale-95 border border-transparent hover:border-[#3d4458]"
        >
          <ArrowLeft size={16} />
        </Link>
        <Globe size={15} className="text-gray-500" />
        <div className="pl-3 text-gray-500 font-medium">Monitor</div>
        <ChevronRight className="mx-3 text-gray-700" size={14} />
        <div className="font-semibold text-gray-200">{getSiteName(data?.url ?? "")}</div>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12"
          >
            <div className="flex items-center gap-6">
              <div className={`relative h-16 w-16 flex items-center justify-center rounded-2xl ${!data?.statusLogs?.length ? 'bg-gray-500/10' :
                  metrics?.currentStatus ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                <div className={`h-4 w-4 rounded-full ${!data?.statusLogs?.length ? 'bg-gray-500' :
                    metrics?.currentStatus ? 'bg-green-500' : 'bg-red-500'} ${metrics?.currentStatus ? 'animate-pulse' : ''}`} />
                <div className={`absolute inset-0 rounded-2xl border-2 ${!data?.statusLogs?.length ? 'border-gray-500/20' :
                    metrics?.currentStatus ? 'border-green-500/20' : 'border-red-500/20'}`} />
              </div>

              <div>
                <h1 className="text-4xl font-bold tracking-tight mb-2">
                  {getSiteName(data?.url || "Unknown")}
                </h1>
                <div className="flex items-center gap-3 text-sm font-medium">
                  <span className={
                    !data?.statusLogs?.length ? "text-gray-500" :
                      metrics?.currentStatus ? "text-green-500" : "text-red-500"}>
                    {
                      !data?.statusLogs?.length ? "Pending First Check" :
                        metrics?.currentStatus ? "Operational" : "Down"
                    }
                  </span>
                  <div className="w-1 h-1 rounded-full bg-gray-700" />
                  <span className="text-gray-500">Last check {lastCheckedAt}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => testAlertMutation.mutate({ siteId })}
              disabled={testAlertMutation.isPending}
              className="flex items-center gap-2 rounded-xl bg-[#2a2f3f] px-5 py-3 text-sm font-semibold text-gray-200 hover:bg-[#343a4d] transition-all hover:scale-[1.02] active:scale-[0.98] border border-[#3C4252] disabled:opacity-50"
            >
              <SendHorizontal size={18} className={testAlertMutation.isPending ? "animate-pulse" : ""} />
              {testAlertMutation.isPending ? "Sending..." : "Send test alert"}
            </button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { label: "Uptime (50 checks)", value: metrics ? `${metrics.uptimePercentage}%` : "—", icon: Activity, color: "text-[#7E87F0]" },
              { label: metrics?.currentStatus ? "Up for" : "Down for", value: metrics?.statusDuration || "—", icon: Clock, color: metrics?.currentStatus ? "text-green-400" : "text-red-500" },
              { label: "Incidents (Last 50)", value: metrics?.incidents ?? "—", icon: AlertCircle, color: "text-red-400" },
            ].map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-[#2c3141] bg-[#1c1f2b] p-6 hover:border-[#3d4458] transition-all shadow-lg hover:shadow-2xl"
              >
                <div className="flex justify-between items-start mb-4">
                  <p className="text-sm font-medium text-gray-500">{card.label}</p>
                  <card.icon size={20} className={card.color} />
                </div>
                <h3 className="text-2xl font-bold text-gray-100">{card.value}</h3>
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#7E87F0] transition-all duration-500 group-hover:w-full opacity-40" />
              </motion.div>
            ))}
          </div>

          <div className="space-y-8">

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="rounded-2xl border border-[#2c3141] bg-[#222636]/30 p-8"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-lg font-bold mb-1">Uptime History</h3>
                  <p className="text-sm text-gray-500">Visual representation of the last 50 status checks</p>
                </div>
                <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-wider text-gray-500">
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-500" /> Up</div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-500" /> Down</div>
                </div>
              </div>
              <UptimeBar logs={data?.statusLogs || []} isLoading={isLoading} />
              <div className="mt-4 flex justify-between text-[10px] text-gray-600 font-mono">
                <span>{data?.statusLogs?.length ? format(new Date(data.statusLogs[data.statusLogs.length - 1].checkedAt), "MMM d, HH:mm") : "INITIALIZING"}</span>
                <span>NOW</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="rounded-2xl border border-[#2c3141] bg-[#222636]/30 p-8 h-[400px] flex flex-col"
            >
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-1">Response Time</h3>
                <p className="text-sm text-gray-500">Average latency in milliseconds for recent pings</p>
              </div>
              <div className="flex-1 w-full">
                <ResponseTimeChart logs={data?.statusLogs || []} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="rounded-2xl border border-[#2c3141] bg-[#222636]/30 p-8"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="mt-1 h-10 w-10 flex items-center justify-center rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-500">
                    <Zap size={20} fill="currentColor" className="opacity-80" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
                      Site Warmup
                    </h3>
                    <p className="text-sm text-gray-500 max-w-md">Prevent cold starts and keep your serverless functions active with scheduled pings.</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {data?.provider && (
                    <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2 text-xs font-medium text-gray-400">
                      <Server size={12} />
                      {data.provider} Detected
                    </div>
                  )}
                  <button
                    onClick={() => {
                      const newState = !localWarmupEnabled;
                      setLocalWarmupEnabled(newState);
                      updateWarmupMutation.mutate({
                        siteId,
                        enabled: newState,
                        warmupUrl: localWarmupUrl
                      });
                    }}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${localWarmupEnabled ? 'bg-indigo-500' : 'bg-[#2c3141]'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${localWarmupEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {localWarmupEnabled && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-6 border-t border-[#2c3141]">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                        <div className="md:col-span-3">
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Custom Warmup Path (Optional)</label>
                          <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-600 transition-colors group-focus-within:text-indigo-500">
                              <Settings2 size={16} />
                            </div>
                            <input
                              type="text"
                              autoComplete="off"
                              spellCheck="false"
                              placeholder="/api/ping"
                              value={localWarmupUrl}
                              onChange={(e) => setLocalWarmupUrl(e.target.value)}
                              className="w-full pl-11 pr-4 py-3 bg-[#1c1f2b] border border-[#2c3141] rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
                            />
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            updateWarmupMutation.mutate({
                              siteId,
                              enabled: localWarmupEnabled,
                              warmupUrl: localWarmupUrl
                            });
                          }}
                          disabled={updateWarmupMutation.isPending}
                          className="w-full px-6 py-3 bg-white text-black font-bold text-sm rounded-xl hover:bg-gray-100 transition-all active:scale-95 disabled:opacity-50 h-[46px]"
                        >
                          {updateWarmupMutation.isPending ? "Saving..." : "Save Settings"}
                        </button>
                      </div>
                      <p className="mt-4 text-xs text-gray-600 flex items-center gap-2 italic">
                        <ExternalLink size={12} />
                        By default, Trackly will ping your main URL if this field is left empty.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1c1f2b;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #2c3141;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #3d4458;
        }
      `}</style>
    </div>
  );
}
