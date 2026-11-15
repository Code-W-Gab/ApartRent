import api from "../api/axios";
import type { createLeaseDTO } from "../types/leases.types";

export const createLease = (
  leaseData: createLeaseDTO
) => api.post("/api/lease/create", leaseData)