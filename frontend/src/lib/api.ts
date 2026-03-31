import type { CarsParams, CarsResponse } from "./types";

export async function fetchCars(params: Partial<CarsParams>): Promise<CarsResponse> {
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.set("page", String(params.page));
  if (params.limit) searchParams.set("limit", String(params.limit));
  if (params.search) searchParams.set("search", params.search);
  if (params.sort) searchParams.set("sort", params.sort);
  if (params.year_from) searchParams.set("year_from", String(params.year_from));
  if (params.year_to) searchParams.set("year_to", String(params.year_to));
  if (params.price_from) searchParams.set("price_from", String(params.price_from));
  if (params.price_to) searchParams.set("price_to", String(params.price_to));

  const res = await fetch(`/api/cars?${searchParams.toString()}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}
