import { RequestHandler } from "express";
import { createRoomDTO, IdParams, updateRoomDto } from "../types/room.types";
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
    const filter: { roomNumber?: number } = {};

    if (roomNumberQuery !== undefined){
      if(typeof roomNumberQuery !== "string" || roomNumberQuery.trim() === "") {
        return res.status(400).json({
          success: false,
          message: "roomNumber must be a valid number"
        });
      }

      const roomNumber = Number(roomNumberQuery);

      if (!Number.isSafeInteger(roomNumber) || roomNumber <= 0) {
        return res.status(400).json({
          success: false,
          message: "roomNumber must be a positive integer",
        });
      }

      filter.roomNumber = roomNumber;
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