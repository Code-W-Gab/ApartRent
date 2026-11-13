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

export type leasesStatus = 
  | "Active"
  | "Ending Soon"
  | "Draft"
  | "Ended"
  | "Terminated"