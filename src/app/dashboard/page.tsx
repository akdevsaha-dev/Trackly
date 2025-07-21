"use client";
import { trpc } from "@/utils/trpc";

export default function page() {
  const { data: user, isLoading, error } = trpc.user.getUser.useQuery();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div> error loading data</div>;
  }
  return (
    <div className="h-screen w-full items-center justify-center text-white">
      {user?.id}
    </div>
  );
}
