import { NextResponse } from "next/server";
import { checkAllSites, checkWarmupSite } from "@/server/cron/checkSites";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  if (searchParams.get("secret") !== process.env.CRON_SECRET) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  try {
    await checkAllSites();
    await checkWarmupSite();
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Cron execution failed", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}