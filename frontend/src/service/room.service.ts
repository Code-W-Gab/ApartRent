import api from "../api/axios";
import type { ApiResponse, IRoom, RoomFilters, createRoomDTO, updateRoomDTO } from "../types/room.types";

export const createRoom = (
  roomData: createRoomDTO,
  photos: File[] = []
) => {
  const formData = new FormData();

  formData.append("data", JSON.stringify(roomData));

  photos.forEach((photo) => {
    formData.append("photos", photo);
  });

  return api.post<ApiResponse<IRoom>>(
    "/api/room/create",
    formData
  );
};

export const getRoom = (
  filters: RoomFilters = {}
) => api.get<ApiResponse<IRoom[]>>('/api/room/get', { params: filters })

export const updateRoom = (
  id: string, roomData: updateRoomDTO
) => api.put(`/api/room/${id}`, roomData)

export const deleteRoom = (
  id: string
) => api.delete(`/api/room/${id}`)