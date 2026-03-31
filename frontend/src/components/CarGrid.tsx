"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchCars } from "@/lib/api";
import { useFiltersStore } from "@/store/useFiltersStore";
import { CarCard, CarCardSkeleton } from "./CarCard";
import { Pagination } from "./Pagination";

const LIMIT = 20;

export function CarGrid() {
  const { page, search, sort, yearFrom, yearTo, priceFrom, priceTo } =
    useFiltersStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["cars", page, search, sort, yearFrom, yearTo, priceFrom, priceTo],
    queryFn: () =>
      fetchCars({
        page,
        limit: LIMIT,
        search,
        sort,
        year_from: yearFrom,
        year_to: yearTo,
        price_from: priceFrom,
        price_to: priceTo,
      }),
  });

  if (isLoading) {
    return (
      <section className="max-w-[1320px] mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <CarCardSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="max-w-[1320px] mx-auto px-4 sm:px-6 py-16 text-center">
        <p className="text-muted text-lg">
          Failed to load data. Please try again later.
        </p>
      </section>
    );
  }

  const cars = data?.cars ?? [];
  const total = data?.total ?? 0;

  if (cars.length === 0) {
    return (
      <section className="max-w-[1320px] mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="text-[#333] mb-4">
          <svg
            className="mx-auto"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </div>
        <p className="text-muted text-lg">
          No results found. Try adjusting your search criteria.
        </p>
      </section>
    );
  }

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <section className="max-w-[1320px] mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted">
          Found{" "}
          <span className="font-semibold text-white">
            {total.toLocaleString()}
          </span>{" "}
          vehicles
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination currentPage={page} totalPages={totalPages} />
      )}
    </section>
  );
}
