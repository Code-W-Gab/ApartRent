export type status = 
  | "Available"
  | "Occupied"
  | "Reserved"

export type roomType = 
  | "Standard studio"
  | "Single room"
  | "Deluxe studio"

export type floor = 
  | 1
  | 2
  | 3
  | 4

export interface IRoom {
  _id: string
  roomNumber: number,
  floor: floor,
  type: roomType,
  monthlyRent: number,
  deposit: number,
  status: status,
  description?: string,
  amenities: string[],
  notes?: string
}

export type createRoomDTO = Omit<IRoom, "_id">

export type updateRoomDTO = Partial<IRoom>

export interface ApiResponse<T> {
  success: boolean,
  message: string,
  data: T
}
