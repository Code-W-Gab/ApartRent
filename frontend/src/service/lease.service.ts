import api from "../api/axios";
import type { ApiResponse, ILease, createLeaseDTO } from "../types/leases.types";

export const createLease = (
  leaseData: createLeaseDTO
) => api.post("/api/lease/create", leaseData)

export const getLease = (
) => api.get<ApiResponse<ILease[]>>("/api/lease/get")