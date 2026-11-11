import { useEffect, useState } from "react"
import type { ITenant } from "../types/tenant.types"
import { getTenant } from "../service/tenant.service";

export const useTenant = () => {
  const [tenants, setTenants] = useState<ITenant[]>([]);

  const handleFetchTenants = async () => {
    try {
      const res = await getTenant();
      setTenants(res.data.data ?? [])
    } catch (error) {
      console.error("Failed to fetch tenants:", error);
    }
  }

  useEffect(() => {
    handleFetchTenants();
  }, []);

  return { handleFetchTenants, tenants }
}