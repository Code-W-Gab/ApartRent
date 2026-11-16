import api from "../api/axios";
import type { ApiResponse, ILease, createLeaseDTO, filterLease } from "../types/leases.types";

export const createLease = (
  leaseData: createLeaseDTO
) => api.post("/api/lease/create", leaseData)

export const getLease = (
  filter?: filterLease
) => api.get<ApiResponse<ILease[]>>("/api/lease/get", { params: filter })