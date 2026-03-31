import { NextRequest, NextResponse } from "next/server";
import { fetchCarsFromEncar } from "@/lib/scraper";
import { updateMemoryStore } from "@/lib/store";

export const dynamic = "force-dynamic";
export const maxDuration = 60; // Vercel Pro: up to 300s

const CRON_SECRET = process.env.CRON_SECRET || "";

export async function GET(request: NextRequest) {
  // Verify authorization: either CRON_SECRET header or no secret configured
  const authHeader = request.headers.get("authorization");
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const cars = await fetchCarsFromEncar(200, 5);

    if (cars.length === 0) {
      return NextResponse.json({
        status: "warning",
        message: "No cars fetched from Encar API",
        count: 0,
      });
    }

    // Update in-memory store (available until next cold start)
    updateMemoryStore(cars);

    return NextResponse.json({
      status: "ok",
      count: cars.length,
      updated_at: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Scrape failed:", err);
    return NextResponse.json(
      { status: "error", message: String(err) },
      { status: 500 }
    );
  }
}
