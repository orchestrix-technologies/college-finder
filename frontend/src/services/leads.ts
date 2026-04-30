import apiClient from "./api";

export interface LeadPayload {
  name: string;
  email: string;
  phone?: string;
  college?: number;
  course?: number;
  message?: string;
}

export const leadsService = {
  create: (payload: LeadPayload) =>
    apiClient.post("/leads/", payload),
};
