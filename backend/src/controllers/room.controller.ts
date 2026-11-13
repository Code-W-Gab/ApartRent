import { RequestHandler } from "express";
import { createRoomDTO, IdParams, IRoom, updateRoomDto } from "../types/room.types";
import roomSchema from "../models/room.schema";

export const createRoom: RequestHandler<{}, {}, createRoomDTO> = async (req, res) => {
  try {
    const newRoom = await roomSchema.create(req.body);

    res.status(201).json({
      success: true,
      message: "Room added successfully",
      data: newRoom
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}

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