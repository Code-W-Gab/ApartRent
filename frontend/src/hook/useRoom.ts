import { useEffect, useState } from "react"
import { createRoom, deleteRoom, getRoom, updateRoom } from "../service/room.service"
import type { IRoom, createRoomDTO, updateRoomDTO } from "../types/room.types"

export const useRoom = () => {
  const [rooms, setRooms] = useState<IRoom[]>([]);

  const handleFetchRoom = async () => {
    try {
      const res = await getRoom()
      setRooms(res.data.data ?? [])
    } catch (error) {
      console.error("Failed to fetch rooms:", error)
    }
  }

  useEffect(() => {
    handleFetchRoom()
  }, [])

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

  return { handleCreateRoom, handleFetchRoom, handleUpdateRoom, handleDeleteRoom, rooms }
}