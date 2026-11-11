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


export interface ITenant {
  _id: string,
  fullName: string,
  emailAddress: string,
  phoneNumber: string,
  emergencyContactName: string,
  relationship: string,
  emergencyContactNumber: string
}

export type createTenantDTO = Omit<ITenant, "_id">;

export interface ApiResponse<T> {
  success: boolean,
  message: string,
  data: T
}
  