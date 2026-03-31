"use client";

import type { Car } from "@/lib/types";

function formatMileage(km: number): string {
  return `${km.toLocaleString("en-US")} km`;
}

export function CarCard({ car }: { car: Car }) {
  const title = [car.manufacturer, car.model, car.badge]
    .filter(Boolean)
    .join(" ");

  return (
    <article className="group bg-card overflow-hidden border border-divider card-hover">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#1a1a1a]">
        {car.photo ? (
          <img
            src={car.photo}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#333]">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}
        {/* Year badge */}
        {car.year > 0 && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-black/70 backdrop-blur-sm text-gold text-xs font-semibold font-heading tracking-wider">
            {car.year > 9999 ? Math.floor(car.year / 100) : car.year}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <h3 className="text-sm sm:text-base font-bold text-white leading-snug line-clamp-2 min-h-[2.5rem]">
          {title || "No title"}
        </h3>

        {/* Meta */}
        <div className="mt-2 flex flex-wrap gap-2">
          {car.mileage > 0 && (
            <span className="inline-flex items-center gap-1 text-xs text-muted bg-[#1a1a1a] px-2 py-1">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="M12 6v6l4 2" />
              </svg>
              {formatMileage(car.mileage)}
            </span>
          )}
          {car.fuel && (
            <span className="inline-flex items-center text-xs text-muted bg-[#1a1a1a] px-2 py-1">
              {car.fuel}
            </span>
          )}
          {car.transmission && (
            <span className="inline-flex items-center text-xs text-muted bg-[#1a1a1a] px-2 py-1">
              {car.transmission}
            </span>
          )}
        </div>

        {/* Price + CTA */}
        <div className="mt-4 flex items-end justify-between">
          <span className="text-lg sm:text-xl font-bold text-gold font-heading">
            {car.price_display}
          </span>
          <a
            href={car.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary px-4 py-2 text-xs"
          >
            View Details
          </a>
        </div>
      </div>
    </article>
  );
}

export function CarCardSkeleton() {
  return (
    <div className="bg-card overflow-hidden border border-divider">
      <div className="aspect-[4/3] skeleton" />
      <div className="p-5 space-y-3">
        <div className="h-4 w-3/4 skeleton rounded" />
        <div className="h-3 w-1/2 skeleton rounded" />
        <div className="flex justify-between items-end pt-2">
          <div className="h-6 w-24 skeleton rounded" />
          <div className="h-8 w-20 skeleton rounded" />
        </div>
      </div>
    </div>
  );
}
