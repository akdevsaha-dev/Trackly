"use client";
import { auth } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

export default async function Page() {
  const session = await auth();
  if (!session?.user) {
    toast.error("Login to view dashboard");
    redirect("/login");
  }
  return (
    <div className="h-screen w-full bg-[url('/.jpg')] text-white">
      <div className="flex h-[10vh] w-full items-center pl-10">
        <Image src={"/logo.svg"} alt="logo" height={100} width={100} />
      </div>
      <div className="w-full pt-24 text-center text-6xl font-medium tracking-normal text-neutral-200">
        Monitor Your Websites in Real-Time
      </div>

      <div className="flex w-full flex-col items-center">
        <div className="mt-5 w-[50%] px-14 text-center text-xl text-slate-100">
          Track uptime, response time, and performance effortlessly with our
          advanced monitoring platform
        </div>
        <div className="mt-5 flex w-[50%] justify-center gap-4">
          <input
            type="text"
            className="w-[300px] rounded-md border-[1px] border-[#515a7b] bg-[#313647] px-4 py-2 text-sm focus:outline-none"
            placeholder="https://example.com"
          />
          <button className="cursor-pointer rounded-md bg-white px-6 py-2 text-sm font-semibold text-black hover:bg-neutral-200">
            Start Monitoring
          </button>
        </div>
        <div className=""></div>
      </div>
    </div>
  );
}
