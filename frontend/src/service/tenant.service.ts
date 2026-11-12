import api from "../api/axios";
import type { ApiResponse, createTenantDTO, ITenant, tenantFilter } from "../types/tenant.types";

export const getTenant = (
  filters: tenantFilter = {}
) => api.get<ApiResponse<ITenant[]>>('/api/tenant/get', { params: filters })

export const createTenant = (
  tenantData: createTenantDTO
) => api.post('/api/tenant/create', tenantData)