import { Check, DoorOpen, Dot, X } from "lucide-react";

interface ModalProps {
  onClose: () => void
}

export default function ViewDetailsModal({onClose}: ModalProps){
  return(
    <div className="bg-white w-200 h-140 rounded-xl">
      <div className="p-5 flex items-center justify-between border-b border-gray-300">
        <h1 className="text-xl font-medium">Room 101</h1>
        <button onClick={onClose}>
          <X size={20} className="cursor-pointer"/>
        </button>
      </div>
      <div className="p-5 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-20 h-20 border border-gray-300 rounded-lg">
              <DoorOpen size={30}/>
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-medium">Single room</h3>
              <p className="text-sm text-gray-500">Floor 1</p>
              <div className="inline-flex items-center text-sm text-blue-500 rounded-sm bg-blue-50 pr-2">
                <Dot size={20}/>
                <span>Occupied</span>
              </div>
            </div>
          </div>
          <button className="text-gray-600 border border-gray-300 px-4 py-1.5 rounded-md hover:border-gray-500 cursor-pointer">Edit room</button>
        </div>

        <div className="grid grid-cols-3 border border-gray-300 rounded-md">
          <div className="border-r border-gray-300 p-4 space-y-1">
            <p className="text-gray-500 text-sm">Monthly rent</p>
            <h2 className="text-xl font-medium">₱4,500</h2>
          </div>
          <div className="border-r border-gray-300 p-4 space-y-1">
            <p className="text-gray-500 text-sm">Security deposit</p>
            <h2 className="text-xl font-medium">₱4,500</h2>
          </div>
          <div className="p-4 space-y-1">
            <p className="text-gray-500 text-sm">Current tenant</p>
            <h2 className="text-xl font-medium">Alex Santos</h2>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-medium">Amenities</h3>
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-sm bg-gray-100 text-gray-500 text-sm">
              <Check size={16}/>
              <p>Private bathroom</p>
            </div>
            <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-sm bg-gray-100 text-gray-500 text-sm">
              <Check size={16}/>
              <p>Wi-Fi ready</p>
            </div>
            <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-sm bg-gray-100 text-gray-500 text-sm">
              <Check size={16}/>
              <p>Air conditioning</p>
            </div>
            <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-sm bg-gray-100 text-gray-500 text-sm">
              <Check size={16}/>
              <p>Natural light</p>
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}