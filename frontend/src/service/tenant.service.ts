import api from "../api/axios";
import type { ApiResponse, ITenant } from "../types/tenant.types";

export const getTenant = () => api.get<ApiResponse<ITenant[]>>('/api/tenant/get')