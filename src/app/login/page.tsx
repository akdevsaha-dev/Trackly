"use client";
import { InputBox } from "@/components/inputBox";
import { ChevronRight } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [agree, setAgree] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);

  const submitHandler = async () => {
    if (!email || !password) {
      toast.error("Please fill all the fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        toast.error("Invalid email or password.");
      } else {
        toast.success("Successfully signed in!");
        router.push("/get-started");
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-screen w-full text-white">
      <div className="flex h-[10vh] w-full items-center pl-10">
        <Image src={"/logo.svg"} alt="logo" height={100} width={100} />
      </div>
      <div className="flex h-[90vh] w-full flex-col items-center justify-center">
        <div className="h-[70vh] w-[420px]">
          <div className="mb-2 text-3xl/9 font-medium tracking-tight text-zinc-300">
            Welcome to trackly
          </div>
          <div className="flex flex-col">
            <InputBox
              label="Email address"
              type="email"
              value={email}
              placeholder="name@work-email.com"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  passwordRef.current?.focus();
                }
              }}
            />
            <InputBox
              ref={passwordRef}
              value={password}
              label="Password"
              type="password"
              placeholder="••••••• •••••• •••••"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  submitHandler();
                }
              }}
            />

            <div className="mt-5 flex w-full items-center gap-4">
              <input
                className="h-4 w-4"
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
              <label className="text-sm font-light text-white">
                Remember me
              </label>
            </div>
            <button
              onClick={submitHandler}
              className={
                "mt-6 flex h-10 w-full items-center justify-center gap-2 border-[1px] bg-cyan-300 text-center text-sm font-semibold text-neutral-700 hover:bg-cyan-200"
              }
            >
              Continue
              <ChevronRight size={15} />
            </button>
          </div>
          <div className="mt-5 flex w-full items-center gap-4">
            <div className="h-px flex-1 bg-neutral-700" />
            <span className="text-sm text-gray-300">OR</span>
            <div className="h-px flex-1 bg-neutral-700" />
          </div>
          <div className="mt-5 flex w-full justify-between">
            <div
              className="flex w-[200px] cursor-pointer items-center justify-center gap-3 border-[1px] border-neutral-800 py-2 hover:bg-neutral-950"
              onClick={() => signIn("google", { redirectTo: "/dashboard" })}
            >
              <Image src={"/google.svg"} alt="google" height={15} width={15} />
              <div className="text-sm font-semibold">Google</div>
            </div>
            <div
              className="flex w-[200px] cursor-pointer items-center justify-center gap-3 border-[1px] border-neutral-800 py-2 hover:bg-neutral-950"
              onClick={() => signIn("github", { redirectTo: "/dashboard" })}
            >
              <Image
                src={"/github-mark.svg"}
                alt="google"
                height={20}
                width={20}
              />
              <div className="text-sm font-semibold">Github</div>
            </div>
          </div>
          <div className="mt-10 text-center">
            <span className="mr-1 text-sm font-light text-neutral-300">
              Not using trackly yet?
            </span>
            <Link
              href={"/signup"}
              className="text-sm font-semibold text-cyan-300 hover:text-cyan-200"
            >
              Create an account now.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
