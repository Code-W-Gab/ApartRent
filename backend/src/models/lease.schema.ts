import mongoose from "mongoose";
import { dueDays, ILease, leaseStatuses } from "../types/lease.types";

const schema = new mongoose.Schema<ILease>({
  tenant: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Tenant", 
    required: true 
  },
  room: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Room", 
    required: true 
  },
  startDate: { 
    type: Date, 
    required: true 
  },
  endDate: { 
    type: Date, 
    required: true 
  },
  monthlyRent: { 
    type: Number, 
    required: true, 
    min: 0.01 
  },
  securityDeposit: { 
    type: Number, 
    default: 0, 
    min: 0 
  },
  dueDay: { 
    type: String, 
    enum: dueDays, 
    default: "5th of each month" 
  },
  gracePeriod: { 
    type: Number, 
    default: 0, 
    min: 0, 
    validate: Number.isInteger 
  },
  instruction: { 
    type: String, 
    trim: true, 
    default: "" },
  status: { 
    type: String, 
    enum: leaseStatuses, 
    default: "Active" 
  },
}, { timestamps: true });

// A live agreement reserves its tenant and room until explicitly ended.
for (const key of ["tenant", "room"] as const) {
  schema.index({ [key]: 1 }, {
    unique: true,
    partialFilterExpression: { status: { $in: ["Active", "Ending Soon"] } },
  });
}
export default mongoose.model<ILease>("Lease", schema);
