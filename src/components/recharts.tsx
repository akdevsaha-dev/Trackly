"use client";

import { trpc } from "@/utils/trpc";
import { Frown, Loader } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

export default function ResponseChart({ siteId }: { siteId: string }) {
  const {
    data: site,
    isLoading,
    isError,
  } = trpc.site.getSiteStatus.useQuery({ siteId });

  if (isLoading)
    return (
      <div className="flex h-screen w-full animate-spin items-center justify-center text-slate-400">
        <Loader />
      </div>
    );

  if (isError || !site)
    return (
      <div className="flex h-screen w-full items-center justify-center gap-2 p-4 text-red-500">
        Error loading chart data <Frown />
      </div>
    );

  const chartData = site.statusLogs
    .map((log) => ({
      checkedAt: new Date(log.checkedAt).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      responseMs: log.responseMs ?? 0,
    }))
    .reverse();

  return (
    <div className="group mx-auto h-screen w-full max-w-4xl rounded-xl bg-white/5 p-6 shadow-lg backdrop-blur transition hover:bg-white/10 hover:shadow-xl">
      <h2 className="mb-1 text-xl font-semibold text-white">
        Response Time (ms)
      </h2>
      <p className="mb-4 text-sm text-slate-400">Recent checks</p>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          {/* Gradient stroke */}
          <defs>
            <linearGradient id="colorResponse" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.1} />
            </linearGradient>
          </defs>

          {/* Grid */}
          <CartesianGrid stroke="#2a2a2a" strokeDasharray="4 4" />

          {/* Axes */}
          <XAxis dataKey="checkedAt" tick={{ fill: "#ccc", fontSize: 12 }} />
          <YAxis
            tick={{ fill: "#ccc", fontSize: 12 }}
            domain={["dataMin - 50", "dataMax + 50"]}
            tickCount={5}
          />

          {/* Tooltip */}
          <Tooltip
            formatter={(value: number) => `${value} ms`}
            labelFormatter={(label: string) => `Checked at ${label}`}
            contentStyle={{
              backgroundColor: "#111",
              borderColor: "#333",
              borderRadius: "6px",
            }}
            labelStyle={{ color: "#fff" }}
            itemStyle={{ color: "#3b82f6" }}
          />

          {/* Chart line */}
          <Line
            type="monotone"
            dataKey="responseMs"
            stroke="url(#colorResponse)"
            strokeWidth={3}
            dot={false}
            activeDot={{
              r: 5,
              stroke: "#3b82f6",
              strokeWidth: 2,
              fill: "#1e40af",
            }}
            isAnimationActive={true}
            animationDuration={600}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
