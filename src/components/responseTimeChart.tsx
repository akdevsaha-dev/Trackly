"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { format } from "date-fns";

interface StatusLog {
  checkedAt: string | Date;
  responseMs: number;
}

interface ResponseTimeChartProps {
  logs: StatusLog[];
}

export const ResponseTimeChart = ({ logs }: ResponseTimeChartProps) => {
  const data = [...logs].reverse().map((log) => ({
    time: format(new Date(log.checkedAt), "HH:mm"),
    fullTime: format(new Date(log.checkedAt), "MMM d, HH:mm:ss"),
    latency: log.responseMs === 0 ? null : log.responseMs,
  }));

  if (logs.length === 0) {
      return <div className="flex h-full items-center justify-center text-sm text-gray-500 italic">No data available</div>
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#7E87F0" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#7E87F0" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2c3141" />
        <XAxis
          dataKey="time"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#64748b", fontSize: 10 }}
          minTickGap={30}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#64748b", fontSize: 10 }}
          unit="ms"
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1c1f2b",
            borderColor: "#2c3141",
            borderRadius: "8px",
            fontSize: "12px",
          }}
          itemStyle={{ color: "#7E87F0" }}
          labelStyle={{ color: "#94a3b8", marginBottom: "4px" }}
          labelFormatter={(label, payload) => payload[0]?.payload?.fullTime || label}
        />
        <Area
          type="monotone"
          dataKey="latency"
          stroke="#7E87F0"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorLatency)"
          dot={{ r: 0 }}
          activeDot={{ r: 4, strokeWidth: 0, fill: "#7E87F0" }}
          connectNulls={true}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
