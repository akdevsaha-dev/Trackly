"use client";

import { Sidebar } from "@/components/side-bar";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { User, Bell, Shield, CreditCard, Mail, ExternalLink, Moon, Sparkles, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { trpc } from "@/utils/trpc";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const { data: session, update } = useSession();
  const [name, setName] = useState("");

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session]);

  const updateNameMutation = trpc.user.updateName.useMutation({
    onSuccess: async () => {
      toast.success("Username updated successfully");
      await update();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update username");
    }
  });

  const handleSave = () => {
    if (!name || name.trim().length < 2) {
      toast.error("Name must be at least 2 characters long");
      return;
    }
    updateNameMutation.mutate({ name });
  };

  const sections = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ];

  return (
    <div className="flex min-h-screen w-full bg-[#1c1f2b] text-white">
      <Sidebar />

      <main className="flex-1 md:ml-64 bg-[#1c1f2b]">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <header className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-2 text-white">Settings</h1>
            <p className="text-gray-400">Manage your account preferences and system settings.</p>
          </header>

          <div className="flex flex-col md:flex-row gap-12">
            <nav className="w-full md:w-56 space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${section.id === 'profile'
                    ? 'bg-[#7E87F0]/10 text-[#7E87F0] border border-[#7E87F0]/20'
                    : 'text-gray-500 hover:text-white hover:bg-[#232837]'
                    }`}
                >
                  <section.icon size={18} />
                  {section.label}
                </button>
              ))}
            </nav>

            <div className="flex-1 space-y-12">
              <section className="space-y-6">
                <div className="flex items-center gap-3 border-b border-[#2c3141] pb-4">
                  <User size={20} className="text-[#7E87F0]" />
                  <h3 className="text-xl font-bold">Profile Information</h3>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="relative group">
                    {session?.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt="Profile"
                        width={100}
                        height={100}
                        className="rounded-3xl ring-4 ring-[#2c3141] group-hover:ring-[#7E87F0]/30 transition-all duration-300"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-3xl bg-[#2c3141] flex items-center justify-center text-3xl font-bold text-gray-500">
                        {session?.user?.name?.charAt(0) || 'U'}
                      </div>
                    )}
                    <button className="absolute -bottom-2 -right-2 p-2 bg-[#7E87F0] rounded-xl text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <Sparkles size={14} />
                    </button>
                  </div>

                  <div className="flex-1 grid gap-6 w-full">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Display Name</label>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="flex-1 bg-[#232837] border border-[#2c3141] rounded-xl px-4 py-3 text-sm focus:border-[#7E87F0] focus:ring-1 focus:ring-[#7E87F0] outline-none transition-all"
                          placeholder={session?.user?.name || session?.user?.email?.split('@')[0] || "Your display name"}
                        />
                        <button
                          onClick={handleSave}
                          disabled={updateNameMutation.isPending || name === session?.user?.name}
                          className="px-6 py-3 bg-[#7E87F0] hover:bg-[#6a74e8] disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed text-white rounded-xl font-bold text-xs transition-all shadow-lg shadow-[#7E87F0]/10 flex items-center justify-center gap-2"
                        >
                          {updateNameMutation.isPending ? (
                            <>
                              <Loader2 size={14} className="animate-spin" />
                              Saving...
                            </>
                          ) : (
                            "Save Changes"
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Email Address</label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                          <input
                            type="email"
                            disabled
                            defaultValue={session?.user?.email || ""}
                            className="w-full bg-[#232837]/50 border border-[#2c3141] rounded-xl pl-12 pr-4 py-3 text-sm text-gray-400 cursor-not-allowed"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-6">
                <div className="flex items-center gap-3 border-b border-[#2c3141] pb-4">
                  <CreditCard size={20} className="text-[#7E87F0]" />
                  <h3 className="text-xl font-bold">Subscription Plan</h3>
                </div>

                <div className="bg-gradient-to-br from-[#7E87F0]/10 to-[#7E87F0]/5 border border-[#7E87F0]/20 rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7E87F0]/20 text-[#7E87F0] text-[10px] uppercase font-bold tracking-widest mb-4">
                      Current Plan
                    </div>
                    <h4 className="text-3xl font-bold text-white mb-1">Free Tier</h4>
                    <p className="text-gray-400 text-sm">You are currently using the free version of Trackly.</p>
                  </div>
                  <button className="whitespace-nowrap px-8 py-3 bg-[#7E87F0] hover:bg-[#6a74e8] text-white rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(126,135,240,0.3)]">
                    Upgrade to Premium
                  </button>
                </div>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl border border-[#2c3141] bg-[#232837]/30 hover:bg-[#232837]/50 transition-all cursor-pointer group">
                  <div className="flex items-center justify-between mb-4">
                    <Moon className="text-gray-500 group-hover:text-[#7E87F0] transition-colors" size={24} />
                    <div className="w-10 h-6 bg-[#2c3141] rounded-full relative">
                      <div className="absolute left-1 top-1 w-4 h-4 bg-[#7E87F0] rounded-full" />
                    </div>
                  </div>
                  <h4 className="font-bold mb-1">Dark Mode</h4>
                  <p className="text-xs text-gray-500">Automatically switch between light and dark themes.</p>
                </div>

                <div className="p-6 rounded-2xl border border-[#2c3141] bg-[#232837]/30 hover:bg-[#232837]/50 transition-all cursor-pointer group">
                  <div className="flex items-center justify-between mb-4">
                    <Sparkles className="text-gray-500 group-hover:text-[#7E87F0] transition-colors" size={24} />
                    <ExternalLink className="text-gray-700" size={16} />
                  </div>
                  <h4 className="font-bold mb-1">API Access</h4>
                  <p className="text-xs text-gray-500">Manage your API tokens for programmatic monitoring.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
