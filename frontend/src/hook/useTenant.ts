import { useEffect, useState } from "react"
import type { createTenantDTO, ITenant } from "../types/tenant.types"
import { createTenant, getTenant } from "../service/tenant.service";

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

  const handleCreateTenant = async (
    tenantData: createTenantDTO,
    onClose: () => void
  ) => {
    try {
      await createTenant(tenantData);
      await handleFetchTenants();
      onClose()
    } catch (error) {
      console.error(error);
    }
  }

  return { handleFetchTenants, handleCreateTenant, tenants }
}