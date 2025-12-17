"use client";

import { trpc } from "@/utils/trpc";
import { ChevronRight, Dot, Globe, SendHorizontal } from "lucide-react";

export default function MonitorClient({ siteId }: { siteId: string }) {
  const { data, isLoading, error } = trpc.site.getSiteStatus.useQuery(
    {
      siteId,
    },
    {
      refetchInterval: 180_000,
    },
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  const getSiteName = (url: string) => {
    try {
      const { hostname } = new URL(url);
      return hostname.replace(/^www\./, "");
    } catch {
      return "Invalid URL";
    }
  };
  return (
    <div className="flex h-screen w-full flex-col">
      <div className="flex h-14 items-center border-b border-b-[#2c3141] px-6 text-sm">
        <Globe size={15} color="#757d96" />
        <div className="pl-3 text-[#757d96]">Monitor</div>
        <ChevronRight className="ml-3" size={14} />
        <div className="pl-3">{getSiteName(data?.url!)}</div>
      </div>
      <div className="w-full flex-1 px-20">
        <div className="mt-28">
          <div className="flex items-center gap-5">
            {data?.isDown ? (
              <div className="h-3 w-3 animate-pulse rounded-full bg-red-600"></div>
            ) : (
              <div className="h-3 w-3 animate-pulse rounded-full bg-green-600"></div>
            )}

            <div>
              <div className="text-3xl font-semibold">
                {getSiteName(data?.url || "Unknown")}
              </div>
              <div className="flex items-center gap-2 text-sm">
                {data?.isDown ? (
                  <span className="text-red-400">Down</span>
                ) : (
                  <span className="text-green-400">Up</span>
                )}

                <Dot size={18} className="text-gray-500" />

                <span className="text-gray-400">Checked every 3 minutes</span>
              </div>
            </div>
          </div>
          <div className="mt-12 flex">
            <div className="flex items-center gap-2 rounded-md px-2 py-1 text-gray-400 hover:bg-[#2c3141]">
              <SendHorizontal size={18} />
              <div>Send test alert</div>
            </div>
          </div>
          <div className="mt-6 flex w-full items-center gap-5 pr-12">
            <div className="h-26 flex-1 rounded-lg border border-[#323746] bg-[#242938]">
              <div className="px-5 py-4 text-sm text-gray-400">
                Currently up for
              </div>
              <div></div>
            </div>
            <div className="h-26 flex-1 rounded-lg border border-[#323746] bg-[#242938]">
              <div className="px-5 py-4 text-sm text-gray-400">
                Last checked at
              </div>
              <div></div>
            </div>
            <div className="h-26 flex-1 rounded-lg border border-[#323746] bg-[#242938]">
              <div className="px-5 py-4 text-sm text-gray-400">Incidents</div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
