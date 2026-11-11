import mongoose from "mongoose";
import { ITenant } from "../types/tenant.types";

const tenantSchema = new mongoose.Schema<ITenant>({
  fullName: {
    type: String,
    required: true
  },
  emailAddress: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  emergencyContactName: {
    type: String,
    required: true
  },
  relationship: {
    type: String,
    required: true
  },
  emergencyContactNumber: {
    type: String,
    required: true
  },
})

export default mongoose.model<ITenant>("Tenant", tenantSchema)