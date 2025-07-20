import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  //
  return (
    <div className="h-screen w-full bg-[url('/background-start.jpg')] bg-contain bg-no-repeat text-white">
      <div className="flex h-[10vh] w-full items-center pl-10">
        <Image src={"/logo.svg"} alt="logo" height={100} width={100} />
      </div>
      <div className="flex justify-center pt-14 text-center text-2xl font-bold text-transparent">
        <div className="w-[140px] bg-gradient-to-b from-neutral-100 via-slate-300 to-slate-700 bg-clip-text">
          Trackly
        </div>
      </div>
      <div className="mt-10 flex w-full justify-center text-center text-7xl font-medium tracking-normal text-neutral-200">
        <div className="w-[50%]">Radically better observability stack</div>
      </div>

      <div className="flex w-full flex-col items-center">
        <div className="mt-5 w-[50%] px-14 text-center text-xl text-slate-100">
          Track uptime, response time, and performance effortlessly with our
          advanced monitoring platform
        </div>
        <div className="mt-5 flex w-[50%] justify-center gap-4">
          <input
            type="text"
            className="w-[300px] rounded-lg border-[1px] border-[#242c4a] bg-[#1E1F2D] px-4 py-3 text-sm focus:outline-none"
            placeholder="https://example.com"
          />
          <button className="cursor-pointer rounded-lg border-[2px] border-[#797fd1f9] bg-[#656ad3] px-6 py-2 text-sm font-semibold text-white hover:bg-[#656bd3da]">
            Start Monitoring
          </button>
        </div>
        <div className="mt-8 text-center text-slate-500">
          Start monitoring for free or{" "}
          <Link
            href={""}
            className="text-slate-400 underline decoration-slate-600 underline-offset-2 hover:decoration-slate-300"
          >
            book a demo
          </Link>
        </div>
      </div>
    </div>
  );
}
