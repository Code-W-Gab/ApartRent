import { X } from "lucide-react";
import Input from "../common/Input";
import Dropdown from "../common/dropdown";

interface ModalProps {
  onClose: () => void
}

interface DropdownOption {
  option: string,
  value: string
}

const floorOptions: DropdownOption[] = [
  { option: "1", value: "" },
  { option: "2", value: "" },
  { option: "3", value: "" },
  { option: "4", value: "" },
]

const roomTypeOptions: DropdownOption[] = [
  { option: "Standard studio", value: "" },
  { option: "Single room", value: "" },
  { option: "Deluxe studio", value: "" },
]

const statusTypeOptions: DropdownOption[] = [
  { option: "Available", value: "" },
  { option: "Occupied", value: "" },
  { option: "Reserved", value: "" },
]

export default function AddRoomModal({onClose}: ModalProps){
  return(
    <div className="bg-white w-200 h-140 rounded-xl">
      <div className="p-5 flex items-center justify-between border-b border-gray-300">
        <h1 className="text-xl font-medium">Make room for a new beginning</h1>
        <button onClick={onClose}>
          <X size={20} className="cursor-pointer"/>
        </button>
      </div>
      
      <div className="p-5 space-y-6">
        <p className="text-gray-500 text-sm">Add the essentials. You can always update the little details later.</p>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Room number *" type="text" placeholder="e.g. 405"/>
          <Input label="Floor *" type="select">
            <Dropdown dropdownOptions={floorOptions}/>
          </Input>
          <Input label="Room type *" type="select">
            <Dropdown dropdownOptions={roomTypeOptions}/>
          </Input>
          <Input label="Monthly rent (₱) *" type="number" placeholder="5,000"/>
          <Input label="Security deposit (₱) *" type="number" placeholder="5,000"/>
          <Input label="Occupancy status" type="select">
            <Dropdown dropdownOptions={statusTypeOptions}/>
          </Input>
          <div className="col-span-2">
            <Input
              label="Description"
              type="textarea"
              placeholder="What makes this room feel like home?"
            />
          </div>
        </div>
      </div>
    </div>
  )
}