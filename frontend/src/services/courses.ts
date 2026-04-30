import apiClient from "./api";
import type { PaginatedResponse } from "./colleges";

export interface Course {
  id: number;
  college: number;
  college_name: string;
  name: string;
  slug: string;
  description: string;
  duration_years: number | null;
  fee_per_year: string | null;
}

export const coursesService = {
  list: (params?: Record<string, string>) =>
    apiClient.get<PaginatedResponse<Course>>("/courses/", { params }),

  detail: (id: number) =>
    apiClient.get<Course>(`/courses/${id}/`),
};
