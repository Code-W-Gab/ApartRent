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


export const updateRoom = (
  id: string,
  roomData: updateRoomDTO,
  photos: File[] = [],
  existingPhotos?: string[]
) => {
  const formData = new FormData();

  formData.append(
    "data",
    JSON.stringify({
      ...roomData,
      existingPhotos,
    })
  );

  photos.forEach((photo) => {
    formData.append("photos", photo);
  });

  return api.put<ApiResponse<IRoom>>(
    `/api/room/${id}`,
    formData
  );
};

export const getRoom = (
  filters: RoomFilters = {}
) => api.get<ApiResponse<IRoom[]>>('/api/room/get', { params: filters })

export const deleteRoom = (
  id: string
) => api.delete(`/api/room/${id}`)