import { ArrowUpRight, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="fixed z-50 flex h-20 w-full items-center justify-between bg-white/1 px-6 shadow-md backdrop-blur-lg md:grid md:grid-cols-12">
      <div className="flex items-center md:col-span-3">
        <Image src="/logo.svg" alt="logo" height={50} width={50} />
      </div>
      <div className="hidden items-center justify-center gap-6 text-sm md:col-span-6 md:flex">
        {["Use Cases", "Pricing", "Integration", "Support"].map((item) => (
          <Link
            href={`/${item.toLowerCase().replace(" ", "-")}`}
            className="underline-offset-4 hover:underline"
            key={item}
          >
            {item}
          </Link>
        ))}
      </div>

      <div className="hidden items-center justify-center gap-10 text-sm md:col-span-3 md:flex">
        <Link href="/login" className="hover:text-neutral-400">
          Log in
        </Link>
        <Link
          href="/signup"
          className="flex items-center gap-2 underline underline-offset-8 hover:text-neutral-200"
        >
          <div>Sign up</div>
          <ArrowUpRight size={20} />
        </Link>
      </div>

      <div className="flex items-center gap-4 md:hidden">
        <Link
          href="/signup"
          className="flex items-center gap-1 text-sm underline underline-offset-4"
        >
          <div>Sign up</div>
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </div>
  );
};
