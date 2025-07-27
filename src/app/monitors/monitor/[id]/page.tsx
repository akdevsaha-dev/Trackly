import ResponseChart from "@/components/recharts";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="flex h-screen w-full bg-[#202432] text-white">
      <ResponseChart siteId={id} />
    </div>
  );
}
