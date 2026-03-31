/** Encar.com scraper — fetches listings via public API. */

import type { Car } from "./types";
import {
  translateManufacturer,
  translateFuel,
  translateTransmission,
  parseYear,
  formatPriceKRW,
} from "./translations";

const ENCAR_API_URL = "http://api.encar.com/search/car/list/general";
const ENCAR_PHOTO_BASE = "https://ci.encar.com/carpicture";

const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  Accept: "application/json, text/javascript, */*; q=0.01",
  Referer: "https://www.encar.com/",
};

const DEFAULT_PARAMS: Record<string, string> = {
  count: "true",
  q: "(And.Hidden.N._.CarType.Y.)",
  sr: "|ModifiedDate|0|200",
  inav: "|Metadata|Sort",
};

function photoUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  const p = path.trim();
  let url = p.startsWith("http") ? p : `${ENCAR_PHOTO_BASE}${p}`;
  if (url.endsWith("_")) url += "001.jpg";
  return url;
}

interface EncarRaw {
  Id?: number;
  Manufacturer?: string;
  Model?: string;
  Badge?: string;
  BadgeDetail?: string;
  Year?: number;
  Mileage?: number;
  Price?: number;
  FuelType?: string;
  Transmission?: string;
  Photo?: string;
}

function parseCar(raw: EncarRaw): Car {
  const id = raw.Id ?? 0;
  const price = raw.Price ?? 0;
  const year = parseYear(raw.Year ?? 0);
  return {
    id,
    manufacturer: translateManufacturer(raw.Manufacturer ?? ""),
    model: raw.Model ?? "",
    badge: raw.Badge ?? "",
    badge_detail: raw.BadgeDetail ?? "",
    year,
    mileage: raw.Mileage ?? 0,
    price,
    price_display: formatPriceKRW(price),
    fuel: translateFuel(raw.FuelType ?? ""),
    transmission: translateTransmission(raw.Transmission ?? ""),
    photo: photoUrl(raw.Photo),
    url: `https://www.encar.com/dc/dc_cardetailview.do?carid=${id}`,
    updated_at: new Date().toISOString(),
  };
}

export async function fetchCarsFromEncar(
  pageSize = 200,
  maxPages = 5
): Promise<Car[]> {
  const cars: Car[] = [];

  for (let page = 0; page < maxPages; page++) {
    const offset = page * pageSize;
    const params = new URLSearchParams({
      ...DEFAULT_PARAMS,
      sr: `|ModifiedDate|${offset}|${pageSize}`,
    });

    try {
      const resp = await fetch(`${ENCAR_API_URL}?${params}`, {
        headers: HEADERS,
      });
      if (!resp.ok) {
        console.error(`HTTP error on page ${page}: ${resp.status}`);
        break;
      }

      const data = await resp.json();
      const results: EncarRaw[] = data.SearchResults ?? [];
      if (results.length === 0) break;

      for (const item of results) {
        cars.push(parseCar(item));
      }

      const total = data.Count ?? 0;
      if (offset + pageSize >= total) break;

      console.log(`Page ${page + 1} done (${cars.length} cars)`);
    } catch (err) {
      console.error(`Fetch error on page ${page}:`, err);
      break;
    }
  }

  console.log(`Total fetched: ${cars.length} cars`);
  return cars;
}
