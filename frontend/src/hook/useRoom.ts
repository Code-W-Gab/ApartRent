import { useCallback, useEffect, useState } from "react"
import { createRoom, deleteRoom, getRoom, updateRoom } from "../service/room.service"
import type { IRoom, createRoomDTO, floor, status, updateRoomDTO } from "../types/room.types"

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
    onClose: () => void
  ) => {
    try {
      await createRoom(roomData)
      await handleFetchRoom()
      console.log(roomData)
      onClose()
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateRoom = async (
    id: string, 
    roomData: updateRoomDTO, 
    onClose: () => void
  ) => {
    try {
      await updateRoom(id, roomData)
      await handleFetchRoom()
      onClose()
    } catch (error) {
      console.log(error)
    }
  }

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