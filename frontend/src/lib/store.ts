/** In-memory car data store with JSON file fallback. */

import { promises as fs } from "fs";
import path from "path";
import type { Car } from "./types";

interface CarsData {
  count: number;
  cars: Car[];
  updated_at?: string;
}

let memoryStore: CarsData | null = null;

const JSON_PATH = path.join(process.cwd(), "public", "data", "cars.json");

/** Load cars from memory cache or JSON file. */
export async function loadCars(): Promise<CarsData> {
  if (memoryStore && memoryStore.cars.length > 0) {
    return memoryStore;
  }

  try {
    const raw = await fs.readFile(JSON_PATH, "utf-8");
    const data = JSON.parse(raw) as CarsData;
    memoryStore = data;
    return data;
  } catch {
    return { count: 0, cars: [] };
  }
}

/** Save cars to memory cache and persist to JSON file. */
export async function saveCars(cars: Car[]): Promise<void> {
  const data: CarsData = {
    count: cars.length,
    cars,
    updated_at: new Date().toISOString(),
  };
  memoryStore = data;

  try {
    const dir = path.dirname(JSON_PATH);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(JSON_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    // On Vercel, filesystem writes may fail (read-only). That's fine — we have memory cache.
    console.warn("Could not write cars.json (expected on Vercel):", err);
  }
}

/** Update memory store without writing to disk. */
export function updateMemoryStore(cars: Car[]): void {
  memoryStore = {
    count: cars.length,
    cars,
    updated_at: new Date().toISOString(),
  };
}
