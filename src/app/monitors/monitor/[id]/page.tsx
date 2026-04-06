import MonitorClient from "@/components/monitorClient";
import { Sidebar } from "@/components/side-bar";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="flex h-screen w-full bg-[#1c1f2b]">
      <Sidebar />
      <main className="flex-1 md:ml-64 bg-[#1c1f2b] overflow-hidden">
        <MonitorClient siteId={id} />
      </main>
    </div>
  );
}
