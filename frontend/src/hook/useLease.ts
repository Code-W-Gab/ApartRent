import { useEffect, useState } from "react"
import { createLease, getLease } from "../service/lease.service"
import type { ILease, createLeaseDTO } from "../types/leases.types"

export const useLease = () => {
  const [leases, setLeases] = useState<ILease[]>([]);

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

  return { handleCreateLease, handleFetchLeases, leases }
}