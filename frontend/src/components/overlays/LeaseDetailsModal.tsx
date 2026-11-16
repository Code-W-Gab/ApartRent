import { X } from "lucide-react"

interface ModalProps {
  onClose: () => void
  setIsCreateLeasesModalOpen: () => void
}

export default function LeaseDetailsModal({onClose, setIsCreateLeasesModalOpen}: ModalProps){
  return(
    <div className="flex max-h-[85vh] w-[min(90vw,35rem)] flex-col overflow-hidden rounded-xl bg-white shadow-xl">
      <div className="p-5 flex shrink-0 items-center justify-between border-b border-[#dfe5ed]">
        <h1 className="text-xl font-medium text-[#243E59]">
          Lease - Room 101
        </h1>
        <button onClick={onClose}>
          <X size={20} className="cursor-pointer"/>
        </button>
      </div>
      
      <div className="min-h-0 overflow-y-auto overflow-x-hidden border-b border-[#dfe5ed] p-5">
        <div className="text-gray-500 text-sm flex flex-col gap-2">
          <h1 className="text-lg font-medium text-[#243E59]">Gabriel Concepcion</h1>
          <span>Room 101 - Single Room</span>
          <span>Monthly rent: ₱4,500</span>
          <span>Security deposit: ₱4,500</span>
          <span>Due on the 5th · Payment by cash, bank transfer, or GCash</span>
          <div>Active</div>
        </div>
      </div>

      <div className="p-4 flex items-center justify-end gap-3">
        <button onClick={setIsCreateLeasesModalOpen} className="border border-[#dfe5ed] text-[#526174] px-4 py-1.5 rounded-md hover:border-[#bec1c5] cursor-pointer">Renew lease</button>
        <button className="bg-red-500 text-white px-4 py-1.5 rounded-md cursor-pointer hover:bg-red-600">End lease</button>
      </div>
    </div>
  )
}