type status = 
  | "Available"
  | "Occupied"
  | "Reserved"

type roomType = 
  | "Standard studio"
  | "Single room"
  | "Deluxe studio"

export interface IRoom {
  roomNumber: number,
  floor: number,
  type: roomType,
  monthlyRent: number,
  deposit: number,
  status: status,
  description?: string,
  amenities: [string],
  notes?: string
}

export type createRoomDTO = IRoom

export type updateRoomDto = Partial<IRoom>

export interface IdParams {
  id: string
}