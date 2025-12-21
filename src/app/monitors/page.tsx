"use client";
import { Sidebar } from "@/components/side-bar";
import { trpc } from "@/utils/trpc";
import { CircleX, Dot, Loader, Plus, Repeat2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [search, setSearch] = useState("");

  const { data: sites, isLoading, isError } = trpc.site.getSites.useQuery();
  const getSiteName = (url: string) => {
    try {
      const { hostname } = new URL(url);
      return hostname.replace(/^www\./, "");
    } catch {
      return "Invalid URL";
    }
  };
  const filteredSites = sites?.filter((site) =>
    getSiteName(site.url).toLowerCase().includes(search.toLowerCase()),
  );
  if (isError) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#202432] text-white">
        <div className="flex animate-bounce gap-3 text-red-500">
          <CircleX />
          <div>Error loading sites</div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex min-h-screen w-full bg-[#202432]">
      <Sidebar />

      <main className="flex w-full justify-center bg-[#202432] pt-20 md:ml-64">
        <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-3xl font-semibold text-white">Monitors</h1>

            <div className="flex w-full gap-3 sm:w-auto">
              <input
                type="text"
                value={search}
                className="w-full rounded-md border border-[#3C4252] bg-[#232837] px-3 py-2 text-sm text-[#a6acbc] focus:border-[#7E87F0] focus:ring-2 focus:ring-[#7E87F030] focus:outline-none sm:w-64"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
              />

              <Link
                href="/create-monitor"
                className="rounded-md bg-[#5C63CC] px-4 py-2 text-sm font-medium whitespace-nowrap text-white hover:bg-[#6a70bd]"
              >
                Create monitor
              </Link>
            </div>
          </div>
          <div className="mt-8 space-y-6">
            <div className="group w-full rounded-lg border-[1px] border-[#3b445e]">
              <div className="flex h-14 w-full items-center justify-between">
                <div className="flex items-center text-sm text-slate-500 transition-all duration-200 group-hover:pl-4">
                  <Dot className="opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                  Monitors
                </div>
                <div className="pointer-events-none relative flex items-center opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
                  <div className="group/button relative">
                    <Link
                      href="/create-monitor"
                      className="mr-10 flex items-center justify-center rounded-sm px-1 py-1 text-slate-500 transition-colors hover:bg-[#2f3648]"
                    >
                      <Plus size={18} />
                    </Link>
                    <div className="absolute top-1/2 left-10 ml-1 -translate-y-1/2 rounded bg-[#2f3648] px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity duration-200 group-hover/button:opacity-100">
                      Create Monitor
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-md bg-[#232837]">
                {isLoading ? (
                  <div className="flex h-14 items-center justify-center">
                    <Loader className="animate-spin text-slate-500" />
                  </div>
                ) : filteredSites?.length === 0 ? (
                  <div className="flex h-14 items-center px-5 text-sm font-semibold text-slate-400">
                    <div>No monitors yet</div>
                  </div>
                ) : (
                  filteredSites?.map((site) => (
                    <Link
                      href={`/monitors/monitor/${site.id}`}
                      className="block hover:bg-[#2A303F]"
                      key={site.id}
                    >
                      <div className="flex h-14 justify-between border-t-[1px] border-[#3b445e] px-5 text-gray-400">
                        <div className="flex items-center gap-3">
                          {site.isDown ? (
                            <div className="h-3 w-3 animate-pulse rounded-full bg-red-500"></div>
                          ) : (
                            <div className="h-3 w-3 animate-pulse rounded-full bg-green-400"></div>
                          )}
                          <div>
                            <div className="text-sm font-semibold text-slate-200">
                              {getSiteName(site.url)}
                            </div>
                            {site.isDown ? (
                              <div>Down</div>
                            ) : (
                              <div className="text-xs font-light text-green-400">
                                Up
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="group/item relative flex items-center gap-2 text-slate-400">
                          <Repeat2 className="text-sm font-light" />
                          <div className="text-sm font-light">3m</div>
                          <div className="absolute bottom-full -left-1/2 -translate-x-1/2 rounded bg-[#2f3648] px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity duration-200 group-hover/item:opacity-100">
                            Checked every 3 minutes
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
