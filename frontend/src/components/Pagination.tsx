"use client";

import { useFiltersStore } from "@/store/useFiltersStore";

interface Props {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: Props) {
  const setPage = useFiltersStore((s) => s.setPage);

  const getPages = (): (number | "...")[] => {
    const pages: (number | "...")[] = [];
    const delta = 2;

    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

    pages.push(1);
    if (left > 2) pages.push("...");
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < totalPages - 1) pages.push("...");
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const handleClick = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="flex justify-center items-center gap-1.5 mt-10">
      <button
        onClick={() => handleClick(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-3 py-2 text-sm font-medium text-muted hover:text-gold disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        ←
      </button>

      {getPages().map((p, i) =>
        p === "..." ? (
          <span key={`dots-${i}`} className="px-2 py-2 text-muted text-sm">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => handleClick(p)}
            className={`min-w-[36px] h-9 text-sm font-medium transition-colors ${
              p === currentPage
                ? "bg-gold text-black"
                : "text-muted hover:text-gold"
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => handleClick(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-3 py-2 text-sm font-medium text-muted hover:text-gold disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        →
      </button>
    </nav>
  );
}
