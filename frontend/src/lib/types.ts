export interface Car {
  id: number;
  manufacturer: string;
  model: string;
  badge: string;
  badge_detail: string;
  year: number;
  mileage: number;
  price: number;
  price_display: string;
  fuel: string;
  transmission: string;
  photo: string | null;
  url: string;
  updated_at: string;
}

export interface CarsResponse {
  total: number;
  page: number;
  limit: number;
  cars: Car[];
}

export interface CarsParams {
  page: number;
  limit: number;
  search: string;
  sort: string;
  year_from: number;
  year_to: number;
  price_from: number;
  price_to: number;
}
