export interface INav {
  label: string,
  rooms: number,
  desc: string,
  icon: React.ElementType
}

export interface DropdownOption<T extends string | number> {
  option: string;
  value: T;
}

export type tenantStatus = 
  | "Active"
  | "Pending"
  | "EndingSoon"
  | "MovedOut"