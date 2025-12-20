"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { Menu, X, Activity, AlertTriangle } from "lucide-react";
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
      <header className="fixed top-0 left-0 right-0 z-40 flex h-14 items-center justify-between border-b border-[#2c3141] bg-[#202432] px-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-slate-300 hover:text-white"
          >
            <Menu size={20} />
          </button>
          <span className="font-semibold text-white">Trackly</span>
        </div>
      </header>

      <aside
        className={`fixed left-0 top-14 z-30 flex h-[calc(100vh-3.5rem)] w-64 flex-col justify-between border-r border-[#2c3141] bg-[#1c1f2b] p-4 text-white transition-transform duration-300
  ${open ? "translate-x-0" : "-translate-x-full"}
  md:translate-x-0 md:top-14`}
      >
        <div>
          <nav className="space-y-1">
            <div
              className={`flex items-center gap-3 rounded-md px-3 py-2 cursor-pointer transition-colors
                ${isMonitors ? "bg-[#2f3648] text-white" : "text-slate-400 hover:bg-[#2a303f] hover:text-white"}
              `}
            >
              <Activity size={18} />
              <span>Monitors</span>
            </div>

            <div
              className={`flex items-center gap-3 rounded-md px-3 py-2 cursor-pointer transition-colors
                ${isIncidents ? "bg-[#2f3648] text-white" : "text-slate-400 hover:bg-[#2a303f] hover:text-white"}
              `}
            >
              <AlertTriangle size={18} />
              <span>Incidents</span>
            </div>
          </nav>
        </div>

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
