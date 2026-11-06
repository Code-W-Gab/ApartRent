import { createRoom } from "../service/room.service"
import type { createRoomDTO } from "../types/room.types"

export const useRoom = () => {
  const handleCreateRoom = async (
    roomData: createRoomDTO,
    onClose: () => void
  ) => {
    try {
      await createRoom(roomData)
      console.log(roomData)
      onClose()
    } catch (error) {
      console.log(error)
    }
  }

  return { handleCreateRoom }
}