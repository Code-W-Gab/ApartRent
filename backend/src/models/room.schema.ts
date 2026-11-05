import mongoose from "mongoose";
import { IRoom } from "../types/room.types";

const roomSchema = new mongoose.Schema<IRoom>({
  roomNumber: {
    type: Number,
    required: true
  },
  floor: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  monthlyRent: {
    type: Number,
    required: true
  },
  deposit: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  amenities: {
    type: [String],
    required: true,
    default: []
  },
  notes: {
    type: String
  }
}, { timestamps: true })

export default mongoose.model<IRoom>("Room", roomSchema)