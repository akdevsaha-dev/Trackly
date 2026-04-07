import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 z-50 flex h-20 w-full items-center justify-between border-b border-white/5 bg-black/40 px-6 backdrop-blur-xl md:grid md:grid-cols-12 md:px-12">
      <div className="flex items-center md:col-span-3">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-gradient-to-br from-neutral-800 to-black p-[1px]">
            <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-black">
              <Image src="/logo.svg" alt="logo" height={32} width={32} className="opacity-90 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          <span className="text-xl font-bold tracking-tight text-white/90 font-brand">Trackly.</span>
        </Link>
      </div>
      
      <div className="hidden items-center justify-center gap-8 text-sm font-medium tracking-wide text-white/60 md:col-span-6 md:flex font-brand">
        {["Use Cases", "Pricing", "Integration", "Support"].map((item) => (
          <Link
            href={`/${item.toLowerCase().replace(" ", "-")}`}
            className="transition-colors hover:text-white"
            key={item}
          >
            {item}
          </Link>
        ))}
      </div>

      <div className="hidden items-center justify-end gap-8 text-sm font-medium md:col-span-3 md:flex font-brand">
        <Link href="/login" className="text-white/60 transition-colors hover:text-white">
          Log in
        </Link>
        <Link
          href="/signup"
          className="flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-5 py-2 text-accent transition-all hover:bg-accent hover:text-white"
        >
          <span>Sign up</span>
          <ArrowUpRight size={18} />
        </Link>
      </div>

      <div className="flex items-center gap-4 md:hidden">
        <Link
          href="/signup"
          className="flex items-center gap-1 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-sm text-accent"
        >
          <span>Sign up</span>
          <ArrowUpRight size={14} />
        </Link>
      </div>
    </nav>
  );
};
