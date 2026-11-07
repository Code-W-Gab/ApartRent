import api from "../api/axios";
import type { ApiResponse, IRoom, createRoomDTO } from "../types/room.types";

export const createRoom = (
  roomData: createRoomDTO
) => api.post('/api/room/create', roomData)

export const getRoom = (
) => api.get<ApiResponse<IRoom[]>>('/api/room/get')