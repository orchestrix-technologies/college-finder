import apiClient from "./api";

export interface College {
  id: number;
  name: string;
  slug: string;
  description: string;
  location: string;
  website: string;
  established_year: number | null;
}

export interface PaginatedResponse<T> {
  success: boolean;
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export const collegesService = {
  list: (params?: Record<string, string>) =>
    apiClient.get<PaginatedResponse<College>>("/colleges/", { params }),

  detail: (slug: string) =>
    apiClient.get<College>(`/colleges/${slug}/`),
};
