import "@/server/cron/startCron"
import { NextResponse } from "next/server"

export async function GET() {
    return NextResponse.json({ message: "Cron initialized" })
}