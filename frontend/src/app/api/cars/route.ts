import { NextRequest, NextResponse } from "next/server";
import { loadCars } from "@/lib/store";
import type { Car } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20")));
  const search = (searchParams.get("search") || "").toLowerCase().trim();
  const sort = searchParams.get("sort") || "price_asc";
  const yearFrom = parseInt(searchParams.get("year_from") || "0");
  const yearTo = parseInt(searchParams.get("year_to") || "0");
  const priceFrom = parseInt(searchParams.get("price_from") || "0");
  const priceTo = parseInt(searchParams.get("price_to") || "0");

  const data = await loadCars();
  let cars = [...data.cars];

  // Filter: search
  if (search) {
    cars = cars.filter(
      (c) =>
        c.manufacturer.toLowerCase().includes(search) ||
        c.model.toLowerCase().includes(search) ||
        c.badge.toLowerCase().includes(search)
    );
  }

  // Filter: year
  if (yearFrom) cars = cars.filter((c) => c.year >= yearFrom);
  if (yearTo) cars = cars.filter((c) => c.year <= yearTo);

  // Filter: price
  if (priceFrom) cars = cars.filter((c) => c.price >= priceFrom);
  if (priceTo) cars = cars.filter((c) => c.price <= priceTo);

  // Sort
  const sortFns: Record<string, (a: Car, b: Car) => number> = {
    price_asc: (a, b) => a.price - b.price,
    price_desc: (a, b) => b.price - a.price,
    year_desc: (a, b) => b.year - a.year,
    year_asc: (a, b) => a.year - b.year,
    mileage_asc: (a, b) => a.mileage - b.mileage,
  };
  cars.sort(sortFns[sort] || sortFns.price_asc);

  const total = cars.length;
  const start = (page - 1) * limit;
  const paged = cars.slice(start, start + limit);

  return NextResponse.json({
    total,
    page,
    limit,
    cars: paged,
  });
}
