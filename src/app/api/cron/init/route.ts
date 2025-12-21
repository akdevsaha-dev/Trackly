import { NextResponse } from "next/server";
import { checkAllSites, checkWarmupSite } from "@/server/cron/checkSites";

export async function GET() {
  try {
    await checkAllSites();
    await checkWarmupSite();
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Cron execution failed", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}