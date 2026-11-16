import { RequestHandler } from "express";
import mongoose from "mongoose";
import leaseSchema from "../models/lease.schema";
import roomSchema from "../models/room.schema";
import tenantSchema from "../models/tenant.schema";
import { dueDays, leaseStatuses } from "../types/lease.types";

interface CreateLeaseBody {
  tenant: string;
  room: string;
  startDate: string;
  endDate: string;
  monthlyRent: number;
  securityDeposit?: number;
  dueDay?: string;
  gracePeriod?: number;
  instruction?: string;
  status?: string;
}

const liveStatuses = ["Active", "Ending Soon"] as const;

function isDuplicateKeyError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === 11000
  );
}

export const createLease: RequestHandler<{}, {}, CreateLeaseBody> = async (
  req,
  res,
) => {
  try {
    const body = req.body;

    if (!body || typeof body !== "object") {
      return res.status(400).json({ success: false, message: "Invalid request body" });
    }

    if (
      typeof body.tenant !== "string" ||
      !mongoose.isValidObjectId(body.tenant) ||
      typeof body.room !== "string" ||
      !mongoose.isValidObjectId(body.room)
    ) {
      return res.status(400).json({
        success: false,
        message: "Valid tenant and room IDs are required",
      });
    }

    const startDate = new Date(body.startDate);
    const endDate = new Date(body.endDate);

    if (
      Number.isNaN(startDate.getTime()) ||
      Number.isNaN(endDate.getTime()) ||
      endDate <= startDate
    ) {
      return res.status(400).json({
        success: false,
        message: "End date must be after a valid start date",
      });
    }

    if (!Number.isFinite(body.monthlyRent) || body.monthlyRent <= 0) {
      return res.status(400).json({
        success: false,
        message: "Monthly rent must be a number greater than zero",
      });
    }

    const securityDeposit = body.securityDeposit ?? 0;
    const gracePeriod = body.gracePeriod ?? 0;

    if (!Number.isFinite(securityDeposit) || securityDeposit < 0) {
      return res.status(400).json({
        success: false,
        message: "Security deposit must be zero or greater",
      });
    }

    if (!Number.isInteger(gracePeriod) || gracePeriod < 0) {
      return res.status(400).json({
        success: false,
        message: "Grace period must be a whole number of zero or greater",
      });
    }

    const dueDay =
      body.dueDay === undefined
        ? "5th of each month"
        : dueDays.find((day) => day === body.dueDay);

    if (!dueDay) {
      return res.status(400).json({
        success: false,
        message: "Invalid due day",
      });
    }

    const status =
      body.status === undefined
        ? "Active"
        : leaseStatuses.find((value) => value === body.status);

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Invalid lease status",
      });
    }

    if (body.instruction !== undefined && typeof body.instruction !== "string") {
      return res.status(400).json({
        success: false,
        message: "Instruction must be text",
      });
    }

    const [tenant, room] = await Promise.all([
      tenantSchema.findById(body.tenant),
      roomSchema.findById(body.room),
    ]);

    if (!tenant) {
      return res.status(404).json({ success: false, message: "Tenant not found" });
    }
    if (!room) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }
    if (room.status !== "Available") {
      return res.status(409).json({
        success: false,
        message: "Room is not available",
      });
    }

    const isLive = liveStatuses.some((liveStatus) => liveStatus === status);

    if (isLive) {
      const existingLease = await leaseSchema.exists({
        $or: [{ tenant: tenant._id }, { room: room._id }],
        status: { $in: liveStatuses },
      });

      if (existingLease) {
        return res.status(409).json({
          success: false,
          message: "Tenant or room already has an active lease",
        });
      }

      // Claim the room atomically so concurrent requests can't both lease it.
      const claimedRoom = await roomSchema.findOneAndUpdate(
        { _id: room._id, status: "Available" },
        { $set: { status: "Occupied" } },
        { new: true },
      );

      if (!claimedRoom) {
        return res.status(409).json({
          success: false,
          message: "Room is no longer available",
        });
      }
    }

    try {
      const lease = await leaseSchema.create({
        tenantName: tenant.fullName,
        tenant: tenant._id,
        room: room._id,
        startDate,
        endDate,
        monthlyRent: body.monthlyRent,
        securityDeposit,
        dueDay,
        gracePeriod,
        instruction: body.instruction ?? "",
        status,
      });

      return res.status(201).json({
        success: true,
        message: "Lease created successfully",
        data: lease,
      });
    } catch (error) {
      // If lease creation fails after claiming the room, release it if no live lease uses it.
      if (isLive) {
        const roomHasLiveLease = await leaseSchema.exists({
          room: room._id,
          status: { $in: liveStatuses },
        });

        if (!roomHasLiveLease) {
          await roomSchema.updateOne(
            { _id: room._id, status: "Occupied" },
            { $set: { status: "Available" } },
          );
        }
      }

      if (isDuplicateKeyError(error)) {
        return res.status(409).json({
          success: false,
          message: "Tenant or room already has an active lease",
        });
      }

      throw error;
    }
  } catch (error) {
    console.error("Create lease failed:", error);
    return res.status(500).json({
      success: false,
      message: "Could not create lease",
    });
  }
};

export const getLease: RequestHandler = async(req, res) => {
  try {
    // Search filter by name
    const tenantNameQuery = req.query.tenantName;
    const filter: {
      tenantName?: RegExp
    } = {};

    if (tenantNameQuery !== undefined){
      if(typeof tenantNameQuery !== "string" || tenantNameQuery.trim() === ""){
        return res.status(400).json({
          success: false,
          message: "Full Name must be valid "
        })
      }

      const escapedName = tenantNameQuery.trim().replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );

      filter.tenantName = new RegExp(escapedName, "i");
    }

    const lease = await leaseSchema.find(filter);

    res.status(200).json({
      success: true,
      message: "Leases retrieved successfully",
      data: lease
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error "
    })
  }
}