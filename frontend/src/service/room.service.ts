import api from "../api/axios";
import type { createRoomDTO } from "../types/room.types";

export const createRoom = (
  roomData: createRoomDTO
) => api.post('/api/room/create', roomData)