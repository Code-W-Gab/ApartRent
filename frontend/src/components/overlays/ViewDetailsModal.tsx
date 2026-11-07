import { Check, DoorOpen, Dot, X } from "lucide-react";
import type { IRoom } from "../../types/room.types";

interface ModalProps {
  onClose: () => void
  room: IRoom
}

export default function ViewDetailsModal({onClose, room}: ModalProps){
  return(
    <div className="flex max-h-[85vh] w-[min(90vw,46rem)] flex-col overflow-hidden rounded-xl bg-white shadow-xl">
      <div className="p-5 flex shrink-0 items-center justify-between border-b border-[#dfe5ed]">
        <h1 className="text-xl font-medium">Room {room.roomNumber}</h1>
        <button onClick={onClose}>
          <X size={20} className="cursor-pointer"/>
        </button>
      </div>
      
      <div className="min-h-0 overflow-y-auto overflow-x-hidden border-b border-[#dfe5ed] p-5">
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-20 h-20 border border-[#dfe5ed] rounded-lg">
                <DoorOpen size={30}/>
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-medium">{room.type}</h3>
                <p className="text-sm text-gray-500">Floor {room.floor}</p>
                <div className="inline-flex items-center text-sm text-blue-500 rounded-sm bg-blue-50 pr-2">
                  <Dot size={20}/>
                  <span>{room.status}</span>
                </div>
              </div>
            </div>
            <button className="text-gray-600 border border-[#dfe5ed] px-4 py-1.5 rounded-md hover:border-[#c6cbd1] cursor-pointer">Edit room</button>
          </div>

          <div className="grid grid-cols-3 border border-[#dfe5ed] rounded-md">
            <div className="border-r border-gray-300 p-4 space-y-1">
              <p className="text-gray-500 text-sm">Monthly rent</p>
              <h2 className="text-xl font-medium">₱{room.monthlyRent}</h2>
            </div>
            <div className="border-r border-gray-300 p-4 space-y-1">
              <p className="text-gray-500 text-sm">Security deposit</p>
              <h2 className="text-xl font-medium">₱{room.deposit}</h2>
            </div>
            <div className="p-4 space-y-1">
              <p className="text-gray-500 text-sm">Current tenant</p>
              <h2 className="text-xl font-medium">Alex Santos</h2>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium">Amenities</h3>
            <div className="flex items-center gap-3">
              {room.amenities.map((amenity, index) => {
                return(
                  <div key={index} className="inline-flex items-center gap-2 px-2 py-0.5 rounded-sm bg-gray-100 text-gray-500 text-sm">
                    <Check size={16}/>
                    <p>{amenity}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}