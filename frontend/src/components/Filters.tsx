"use client";

import { useFiltersStore } from "@/store/useFiltersStore";
import { useCallback, useRef } from "react";

const SORT_OPTIONS = [
  { value: "price_asc", label: "Price ↑" },
  { value: "price_desc", label: "Price ↓" },
  { value: "year_desc", label: "Year ↓ (newest)" },
  { value: "year_asc", label: "Year ↑ (oldest)" },
  { value: "mileage_asc", label: "Mileage ↑" },
];

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 30 }, (_, i) => currentYear - i);

export function Filters() {
  const { search, sort, yearFrom, yearTo, setSearch, setSort, setYearFrom, setYearTo } =
    useFiltersStore();

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setSearch(val), 350);
    },
    [setSearch]
  );

  const selectClasses =
    "px-4 py-3 bg-card text-white text-sm border border-divider focus:outline-none focus:border-gold cursor-pointer appearance-none";

  return (
    <section
      id="catalog"
      className="sticky top-[72px] z-40 bg-primary/95 backdrop-blur-md border-b border-divider"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-4">
        <h2 className="text-xl sm:text-2xl font-heading font-bold uppercase tracking-[0.05em] text-white mb-4">
          Find your <span className="text-gold">dream car</span>
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              defaultValue={search}
              onChange={handleSearch}
              placeholder="Search: brand, model…"
              className="w-full pl-9 pr-4 py-3 bg-card border border-divider text-white text-sm focus:outline-none focus:border-gold transition-colors placeholder-[#555]"
            />
          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className={selectClasses}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Year from */}
          <select
            value={yearFrom}
            onChange={(e) => setYearFrom(Number(e.target.value))}
            className={selectClasses}
          >
            <option value={0}>Year from</option>
            {YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          {/* Year to */}
          <select
            value={yearTo}
            onChange={(e) => setYearTo(Number(e.target.value))}
            className={selectClasses}
          >
            <option value={0}>Year to</option>
            {YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}
