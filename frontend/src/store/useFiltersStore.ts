import { create } from "zustand";

interface FiltersState {
  page: number;
  search: string;
  sort: string;
  yearFrom: number;
  yearTo: number;
  priceFrom: number;
  priceTo: number;

  setPage: (p: number) => void;
  setSearch: (s: string) => void;
  setSort: (s: string) => void;
  setYearFrom: (y: number) => void;
  setYearTo: (y: number) => void;
  setPriceFrom: (p: number) => void;
  setPriceTo: (p: number) => void;
  resetFilters: () => void;
}

const initialState = {
  page: 1,
  search: "",
  sort: "price_asc",
  yearFrom: 0,
  yearTo: 0,
  priceFrom: 0,
  priceTo: 0,
};

export const useFiltersStore = create<FiltersState>((set) => ({
  ...initialState,
  setPage: (page) => set({ page }),
  setSearch: (search) => set({ search, page: 1 }),
  setSort: (sort) => set({ sort, page: 1 }),
  setYearFrom: (yearFrom) => set({ yearFrom, page: 1 }),
  setYearTo: (yearTo) => set({ yearTo, page: 1 }),
  setPriceFrom: (priceFrom) => set({ priceFrom, page: 1 }),
  setPriceTo: (priceTo) => set({ priceTo, page: 1 }),
  resetFilters: () => set(initialState),
}));
