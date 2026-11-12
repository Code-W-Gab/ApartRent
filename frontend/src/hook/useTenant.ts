import { useCallback, useEffect, useState } from "react"
import type { createTenantDTO, ITenant } from "../types/tenant.types"
import { createTenant, getTenant } from "../service/tenant.service";

export const useTenant = (
  fullName?: string
) => {
  const [tenants, setTenants] = useState<ITenant[]>([]);
  const [filterTenants, setFilterTenants] = useState<ITenant[]>([]);

  const handleFilterTenants = useCallback(async () => {
    try {
      const name = fullName?.trim();
      const res = await getTenant(name ? { fullName: name } : {});
      setFilterTenants(res.data.data ?? []);
    } catch (error) {
      console.error("Failed to fetch tenants:", error);
    }
  }, [fullName])

  useEffect(() => {
    void handleFilterTenants();
  }, [handleFilterTenants])

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

  return { handleFetchTenants, handleCreateTenant, tenants, filterTenants }
}