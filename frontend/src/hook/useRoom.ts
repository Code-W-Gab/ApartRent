import { useCallback, useEffect, useState } from "react"
import { createRoom, deleteRoom, getRoom, updateRoom } from "../service/room.service"
import type { IRoom, createRoomDTO, floor, status, updateRoomDTO } from "../types/room.types"
import { isAxiosError } from "axios";

export const useRoom = (
  roomNumber?: number,
  statusFilter?: status,
  floorFilter?: floor
) => {
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [allRooms, setAllRooms] = useState<IRoom[]>([]);

  const handleFetchRoom = useCallback(async () => {
    try {
      const res = await getRoom({
        roomNumber,
        status: statusFilter,
        floor: floorFilter,
      });
      setRooms(res.data.data ?? []);
    } catch (error) {
      console.error("Failed to fetch rooms:", error);
    }
  }, [roomNumber, statusFilter, floorFilter]);

  useEffect(() => {
    void handleFetchRoom(); 
  }, [handleFetchRoom]);

  const handleFetchAllRooms = async() => {
    try {
      const res = await getRoom();
      setAllRooms(res.data.data ?? []);
    } catch (error) {
      console.error("Failed to fetch all rooms:", error);
    }
  }

  useEffect(() => {
    handleFetchAllRooms()
  })

  const handleCreateRoom = async (
    roomData: createRoomDTO,
    onClose: () => void,
    photos: File[] = []
  ) => {
    try {
      await createRoom(roomData, photos);
      await handleFetchRoom();
      onClose();
    } catch (error) {
      console.error("Failed to create room:", error);
      window.alert("Could not save the room. Check the details and photos.");
    }
  };

  const handleUpdateRoom = async (
    id: string,
    roomData: updateRoomDTO,
    onClose: () => void,
    photos: File[] = [],
    existingPhotos?: string[]
  ) => {
    try {
      await updateRoom(id, roomData, photos, existingPhotos);
      await handleFetchRoom();
      onClose();
    } catch (error) {
      console.error("Failed to update room:", error);
  
      const message = isAxiosError<{ message: string }>(error)
        ? error.response?.data?.message
        : undefined;
  
      window.alert(message ?? "Could not update the room.");
    }
  };

  const handleDeleteRoom = async (
    id: string,
    onClose: () => void
  ) => {
    try {
      await deleteRoom(id)
      await handleFetchRoom()
      onClose()
    } catch (error) {
      console.log(error)
    }
  }

  return { handleCreateRoom, handleFetchRoom, handleUpdateRoom, handleDeleteRoom, rooms, allRooms }
}