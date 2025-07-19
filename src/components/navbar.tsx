import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="fixed z-50 grid h-20 w-full grid-cols-12 bg-white/1 shadow-md backdrop-blur-lg">
      <div className="col-span-3 flex items-center pl-13">
        <Image src={"/logo.svg"} alt="logo" height={100} width={100} />
      </div>
      <div className="col-span-6 flex items-center justify-center gap-6 text-sm">
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
      <div className="col-span-3 flex items-center justify-center gap-10 text-sm">
        <Link href={"/login"} className="hover:text-neutral-400">
          Log in
        </Link>
        <Link
          href={"/signup"}
          className="flex items-center gap-2 underline underline-offset-8 hover:text-neutral-200"
        >
          <div>Sign up</div>
          <ArrowUpRight size={20} />
        </Link>
      </div>
    </div>
  );
};
