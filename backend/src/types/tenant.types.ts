export interface ITenant {
  fullName: string,
  emailAddress: string,
  phoneNumber: string,
  emergencyContactName: string,
  relationship: string,
  emergencyContactNumber: string
}

export type createTenantDTO = ITenant;

export type updateTenantDTO = Partial<ITenant>;

export interface IdParams {
  id: string
}