import { createLease } from "../service/lease.service"
import type { createLeaseDTO } from "../types/leases.types"

export const useLease = () => {

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

  return { handleCreateLease }
}