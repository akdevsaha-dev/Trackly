import MonitorClient from "@/components/monitorClient";
import { Sidebar } from "@/components/side-bar";

export default async function Page({
  params,
}: {
  params: { id: string };
}) {
  const { id } =await params;

  return (
    <div className="flex h-screen w-full bg-[#202432] text-white">
      <div className="hidden w-[20vw] bg-[#232837] md:block">
        {/* <Sidebar /> */}
      </div>

      <MonitorClient siteId={id} />
    </div>
  );
}