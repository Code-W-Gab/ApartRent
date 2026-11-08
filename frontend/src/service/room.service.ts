import api from "../api/axios";
import type { ApiResponse, IRoom, createRoomDTO, updateRoomDTO } from "../types/room.types";

export const createRoom = (
  roomData: createRoomDTO
) => api.post('/api/room/create', roomData)

export const getRoom = (
  roomNumber?: number
) => api.get<ApiResponse<IRoom[]>>('/api/room/get', { params: roomNumber ? { roomNumber } : {}})

export const updateRoom = (
  id: string, roomData: updateRoomDTO
) => api.put(`/api/room/${id}`, roomData)

export const deleteRoom = (
  id: string
) => api.delete(`/api/room/${id}`)