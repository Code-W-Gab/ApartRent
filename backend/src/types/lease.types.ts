import { Types } from "mongoose";

export const leaseStatuses = ["Active", "Ending Soon", "Draft", "Ended", "Terminated"] as const;
export const dueDays = ["1st of each month", "5th of each month", "15th of each month"] as const;
export interface ILease {
  tenantName: string
  tenant: Types.ObjectId;
  room: Types.ObjectId;
  startDate: Date;
  endDate: Date;
  monthlyRent: number;
  securityDeposit: number;
  dueDay: typeof dueDays[number];
  gracePeriod: number;
  instruction: string;
  status: typeof leaseStatuses[number];
}

export interface CreateLeaseBody {
  tenant: string;
  room: string;
  startDate: string;
  endDate: string;
  monthlyRent: number;
  securityDeposit?: number;
  dueDay?: string;
  gracePeriod?: number;
  instruction?: string;
  status?: string;
}