"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { Menu, Activity, AlertTriangle } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const Sidebar = () => {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);

  const pathname = usePathname();
  const isMonitors = pathname.startsWith("/monitors");
  const isIncidents = pathname.startsWith("/incidents");

  if (status === "loading") return null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-40 rounded-md bg-[#1c1f2b] p-2 text-slate-300 hover:text-white md:hidden"
      >
        <Menu size={20} />
      </button>

      <aside
        className={`fixed top-0 left-0 z-30 flex h-screen w-64 flex-col justify-between border-r border-[#2c3141] bg-[#1c1f2b] p-4 text-white transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <nav className="space-y-1">
          <div
            className={`flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 transition-colors ${
              isMonitors
                ? "bg-[#2f3648] text-white"
                : "text-slate-400 hover:bg-[#2a303f] hover:text-white"
            }`}
          >
            <Activity size={18} />
            <span>Monitors</span>
          </div>

          <div
            className={`flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 transition-colors ${
              isIncidents
                ? "bg-[#2f3648] text-white"
                : "text-slate-400 hover:bg-[#2a303f] hover:text-white"
            }`}
          >
            <AlertTriangle size={18} />
            <span>Incidents</span>
          </div>
        </nav>
        <div className="flex items-center gap-3">
          {session?.user?.image && (
            <Image
              src={session.user.image}
              alt="User"
              height={36}
              width={36}
              className="rounded-full"
            />
          )}
          <span className="text-sm">{session?.user?.name}</span>
        </div>
      </aside>
    </>
  );
};
