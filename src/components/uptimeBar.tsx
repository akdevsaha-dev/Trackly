"use client";

import { motion } from "motion/react";
import { format } from "date-fns";

interface StatusLog {
  checkedAt: string | Date;
  statusCode: number;
}

interface UptimeBarProps {
  logs: StatusLog[];
  isLoading?: boolean;
}

export const UptimeBar = ({ logs, isLoading }: UptimeBarProps) => {
  const maxSegments = 50;
  const displayLogs = [...logs].reverse();

  return (
    <div className="flex w-full items-end gap-[2px] h-10">
      {isLoading ? (
        Array.from({ length: maxSegments }).map((_, i) => (
          <div
            key={i}
            className="flex-1 h-full bg-[#2c3141] animate-pulse rounded-sm"
          />
        ))
      ) : displayLogs.length === 0 ? (
        <div className="w-full text-center text-xs text-gray-500 italic">No history available yet</div>
      ) : (
        displayLogs.map((log, i) => {
          const isDown = log.statusCode < 200 || log.statusCode >= 300;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ delay: i * 0.01 }}
              className={`group relative flex-1 h-full rounded-sm cursor-help transition-colors ${isDown ? "bg-red-500 hover:bg-red-400" : "bg-green-500 hover:bg-green-400"
                }`}
            >
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#1c1f2b] border border-[#2c3141] rounded text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-xl">
                <div className="font-bold">{isDown ? "Down" : "Up"}</div>
                <div className="text-gray-400">{format(new Date(log.checkedAt), "MMM d, HH:mm:ss")}</div>
                {log.statusCode > 0 && <div className="text-gray-400">Status: {log.statusCode}</div>}
              </div>
            </motion.div>
          );
        })
      )}
    </div>
  );
};
