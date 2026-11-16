import { useCallback, useEffect, useState } from "react"
import { createLease, getLease } from "../service/lease.service"
import type { ILease, createLeaseDTO } from "../types/leases.types"

export const useLease = (
  tenantName?: string
) => {
  const [leases, setLeases] = useState<ILease[]>([]);
  const [filterLease, setFilterLease] = useState<ILease[]>([]);

  const handleFetchLeases = async() => {
    try {
      const res = await getLease();
      setLeases(res.data?.data ?? []);
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    handleFetchLeases()
  }, [])

  const handleFilterLeases = useCallback(async () => {
    try {
      const name = tenantName?.trim();
      const res = await getLease(name ? {tenantName: name} : {})
      setFilterLease(res.data.data ?? [])
    } catch (error) {
      console.error("Failed to fetch leases:", error)
    }
  }, [tenantName])

  useEffect(() => {
    void handleFilterLeases();
  }, [handleFilterLeases])

  const handleCreateLease = async(
    leaseData: createLeaseDTO,
    onClose: () => void
  ) => {
    try {
      await createLease(leaseData);
      onClose()
    } catch (error) {
      console.error(error)
    }
  }

  return { handleCreateLease, handleFetchLeases, leases, filterLease }
}