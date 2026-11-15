export interface INav {
  label: string,
  rooms: number,
  desc: string,
  icon: React.ElementType
}

export interface IProgress {
  num: number,
  label: string
}

export interface DropdownOption<T extends string | number> {
  option: string;
  value: T;
}

export type dueDateStatus = 
  | "1st of each month"
  | "5th of each month"
  | "15th of each month"
  
export type leasesStatus = 
  | "Active"
  | "Ending Soon"
  | "Draft"
  | "Ended"
  | "Terminated"

export interface createLeaseDTO {
  tenant: string;
  room: string;
  startDate: string;
  endDate: string;
  monthlyRent: number;
  securityDeposit?: number;
  dueDay?: dueDateStatus;
  gracePeriod?: number;
  instruction?: string;
  status?: leasesStatus;
}