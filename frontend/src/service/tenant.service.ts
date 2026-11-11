import api from "../api/axios";
import type { ApiResponse, createTenantDTO, ITenant } from "../types/tenant.types";

export const getTenant = () => api.get<ApiResponse<ITenant[]>>('/api/tenant/get')

export const createTenant = (
  tenantData: createTenantDTO
) => api.post('/api/tenant/create', tenantData)