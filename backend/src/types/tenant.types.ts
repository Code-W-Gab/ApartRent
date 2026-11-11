export interface ITenant {
  fullName: string,
  emailAddress: string,
  phoneNumber: string,
  emergencyContactName: string,
  relationship: string,
  emergencyContactNumber: string
}

export type createTenantDTO = ITenant;