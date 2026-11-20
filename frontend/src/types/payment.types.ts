export interface INav {
  label: string,
  amount: number,
  desc: string,
  icon: React.ElementType
}

export interface DropdownOption<T extends string | number> {
  option: string;
  value: T;
}

export type paymentStatus = 
  | "Paid"
  | "Overdue"
  | "Unpaid"