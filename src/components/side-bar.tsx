"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { Menu, Activity, AlertTriangle, LayoutDashboard, Settings, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

export const Sidebar = () => {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  const navItems = [
    { name: "Monitors", href: "/monitors", icon: Activity },
    { name: "Incidents", href: "/incidents", icon: AlertTriangle },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  if (status === "loading") return null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-40 rounded-xl bg-[#232837] p-2.5 text-slate-300 hover:text-white border border-[#2c3141] shadow-lg md:hidden transition-all active:scale-95"
      >
        <Menu size={20} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed top-0 left-0 z-50 flex h-screen w-64 flex-col justify-between border-r border-[#2c3141] bg-[#1c1f2b] p-6 text-white transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="space-y-8">
          <div className="flex items-center gap-3 px-3">
            <div className="w-8 h-8 rounded-lg bg-[#7E87F0] flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(126,135,240,0.3)]">T</div>
            <span className="text-xl font-bold tracking-tight">Trackly</span>
          </div>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`group relative flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 font-medium ${isActive
                    ? "bg-[#7E87F0]/10 text-[#7E87F0]"
                    : "text-slate-400 hover:bg-[#2a303f] hover:text-white"
                    }`}
                >
                  <item.icon size={18} className={isActive ? "text-[#7E87F0]" : "text-gray-500 group-hover:text-gray-300"} />
                  <span>{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute left-0 w-1 h-6 bg-[#7E87F0] rounded-r-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto pt-6 border-t border-[#2c3141]">
          <div className="flex items-center justify-between group cursor-pointer p-2 rounded-xl hover:bg-[#232837] transition-all">
            <div className="flex items-center gap-3 overflow-hidden">
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="User"
                  height={36}
                  width={36}
                  className="rounded-full ring-2 ring-[#2c3141] group-hover:ring-[#7E87F0]/30 transition-all"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-[#7E87F0]/10 flex items-center justify-center text-xs font-bold text-[#7E87F0] border border-[#7E87F0]/20">
                  {session?.user?.name?.[0] || session?.user?.email?.[0]?.toUpperCase() || "U"}
                </div>
              )}
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold truncate group-hover:text-white transition-colors">
                  {session?.user?.name || session?.user?.email?.split('@')[0]}
                </span>
                <span className="text-[10px] text-gray-500 group-hover:text-gray-400 transition-colors uppercase tracking-widest font-bold">Free Plan</span>
              </div>
            </div>
            <LogOut size={14} className="text-gray-600 hover:text-red-400 transition-colors ml-2 flex-shrink-0" />
          </div>
        </div>
      </aside>
    </>
  );
};
