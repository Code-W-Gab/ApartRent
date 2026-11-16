import { RequestHandler } from "express";
import { unlink } from "node:fs";
import { createRoomDTO, IdParams, IRoom, updateRoomDto } from "../types/room.types";
import roomSchema from "../models/room.schema";

export const createRoom: RequestHandler = async (req, res) => {
  const files = (req.files as Express.Multer.File[] | undefined) ?? [];

  try {
    // FormData sends the room details as a JSON string.
    const input = JSON.parse(req.body.data);

    if (!input || typeof input !== "object" || Array.isArray(input)) {
      throw new Error("Invalid room data");
    }

    const newRoom = await roomSchema.create({
      roomNumber: input.roomNumber,
      floor: input.floor,
      type: input.type,
      monthlyRent: input.monthlyRent,
      deposit: input.deposit,
      status: input.status,
      description: input.description,
      amenities: input.amenities,
      notes: input.notes,

      // Save URL paths in MongoDB.
      photos: files.map((file) => `/uploads/rooms/${file.filename}`),
    });

    res.status(201).json({
      success: true,
      message: "Room added successfully",
      data: newRoom,
    });
  } catch (error) {
    // Remove uploaded files if saving the room fails.
    await Promise.allSettled(
      files.map((file) => unlink(file.path))
    );

    const invalidInput =
      error instanceof SyntaxError ||
      (error instanceof Error &&
        ["ValidationError", "CastError"].includes(error.name)) ||
      (error instanceof Error && error.message === "Invalid room data");

    res.status(invalidInput ? 400 : 500).json({
      success: false,
      message: invalidInput
        ? "Please check the room details."
        : "Could not create the room.",
    });
  }
};

export const updateRoom: RequestHandler<IdParams, {}, updateRoomDto> = async (req, res) => {
  try {
    const room = await roomSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: 'after', runValidators: true }
    );

    if(!room) return res.status(404).json({ message: "Room not found" })

    res.status(200).json({
      success: true,
      message: "Room updated successfully",
      data: room
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}

export const deleteRoom: RequestHandler<IdParams, {}, {}> = async (req, res) => {
  try {
    const room = await roomSchema.findByIdAndDelete(req.params.id);

    if(!room) return res.status(404).json({ message: "Room not found" })

    res.status(200).json({
      success: true,
      message: "Room deleted successfully"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}

export const getRoom: RequestHandler = async (req, res) => {
  try {
    // search filter by room number
    const roomNumberQuery = req.query.roomNumber;

    const filter: {
      $expr?: {
        $regexMatch: {
          input: { $toString: string };
          regex: string;
        };
      };
      status?: IRoom["status"];
      floor?: IRoom["floor"];
    } = {};

    if (roomNumberQuery !== undefined) {
      if (
        typeof roomNumberQuery !== "string" ||
        !/^\d+$/.test(roomNumberQuery.trim())
      ) {
        return res.status(400).json({
          success: false,
          message: "roomNumber must contain digits only",
        });
      }

      filter.$expr = {
        $regexMatch: {
          input: { $toString: "$roomNumber" },
          regex: roomNumberQuery.trim(),
        },
      };
    }

    const statusQuery = req.query.status;
    if (statusQuery !== undefined) {
      const validStatuses: IRoom["status"][] = [
        "Available",
        "Occupied",
        "Reserved",
      ];

      const matchedStatus =
        typeof statusQuery === "string"
          ? validStatuses.find((status) => status === statusQuery)
          : undefined;

      if (!matchedStatus) {
        return res.status(400).json({
          success: false,
          message: "Invalid status",
        });
      }

      filter.status = matchedStatus;
    }

    const floorQuery = req.query.floor;
    if (floorQuery !== undefined) {
      const floorNumber =
        typeof floorQuery === "string" ? Number(floorQuery) : NaN;
      const validFloor = ([1, 2, 3, 4] as const).find(
        (floor) => floor === floorNumber,
      );

      if (!validFloor) {
        return res.status(400).json({
          success: false,
          message: "Invalid floor",
        });
      }

      filter.floor = validFloor;
    }

    // get all rooms
    const room = await roomSchema.find(filter);

    res.status(200).json({
      success: true,
      message: "Room retrieved successfully",
      data: room
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}