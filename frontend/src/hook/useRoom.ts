import { useEffect, useState } from "react"
import { createRoom, getRoom } from "../service/room.service"
import type { IRoom, createRoomDTO } from "../types/room.types"

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

  return { handleCreateRoom, handleFetchRoom, rooms }
}