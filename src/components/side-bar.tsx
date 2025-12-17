"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";

export const Sidebar = () => {
  const { data: session, status } = useSession();
  if (status === "loading") return null;
  return (
    <div className=" h-screen">
      <div className="relative bottom-0 h-12 bg-green-300">
        <Image
          className="relative"
          src={`${session?.user.image}`}
          alt="hello"
          height={20}
          width={20}
        />
      </div>
    </div>
  );
};
