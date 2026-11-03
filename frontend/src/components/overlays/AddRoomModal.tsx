import { X } from "lucide-react";
import Input from "../common/Input";
import Dropdown from "../common/dropdown";
import Checkbox from "../common/Checkbox";

interface ModalProps {
  onClose: () => void;
}

interface DropdownOption {
  option: string;
  value: string;
}

const floorOptions: DropdownOption[] = [
  { option: "1", value: "" },
  { option: "2", value: "" },
  { option: "3", value: "" },
  { option: "4", value: "" },
];

const roomTypeOptions: DropdownOption[] = [
  { option: "Standard studio", value: "" },
  { option: "Single room", value: "" },
  { option: "Deluxe studio", value: "" },
];

const statusTypeOptions: DropdownOption[] = [
  { option: "Available", value: "" },
  { option: "Occupied", value: "" },
  { option: "Reserved", value: "" },
];

export default function AddRoomModal({ onClose }: ModalProps) {
  return (
    <div className="flex max-h-[85vh] w-[min(90vw,46rem)] flex-col overflow-hidden rounded-xl bg-white shadow-xl">
      <div className="flex shrink-0 items-center justify-between border-b border-gray-300 p-5">
        <h1 className="text-xl font-medium">Make room for a new beginning</h1>
        <button onClick={onClose} aria-label="Close add room modal">
          <X size={20} className="cursor-pointer" />
        </button>
      </div>

      <div className="min-h-0 overflow-y-auto overflow-x-hidden border-b border-gray-300 p-5">
        <div className="space-y-5">
          <p className="text-sm text-gray-500">
            Add the essentials. You can always update the little details later.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <Input label="Room number *" type="text" placeholder="e.g. 405" />
            <Input label="Floor *" type="select">
              <Dropdown dropdownOptions={floorOptions} />
            </Input>
            <Input label="Room type *" type="select">
              <Dropdown dropdownOptions={roomTypeOptions} />
            </Input>
            <Input label="Monthly rent (₱) *" type="number" placeholder="5,000" />
            <Input label="Security deposit (₱) *" type="number" placeholder="5,000" />
            <Input label="Occupancy status" type="select">
              <Dropdown dropdownOptions={statusTypeOptions} />
            </Input>

            <div className="col-span-2">
              <Input
                label="Description"
                type="textarea"
                placeholder="What makes this room feel like home?"
              />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-[#526174]">Amenities</h3>
            <div className="mt-3 flex items-center gap-4">
              <Checkbox label="Air conditioning"/>
              <Checkbox label="Private bathroom"/>
              <Checkbox label="Wi-Fi"/>
              <Checkbox label="Kitchenette"/>
            </div>
          </div>

          <Input label="Room photos" type="file"/>
          <Input 
              label="Administrative notes"
              type="textarea"
              placeholder="Internal notes, not visible to tenants"
            />
        </div>
      </div>

      <div className="p-4 flex items-center justify-end gap-3">
        <button onClick={onClose} className="border border-[#dfe5ed] text-[#526174] px-4 py-1.5 rounded-md hover:border-[#bec1c5] cursor-pointer">Cancel</button>
        <button className="bg-[#243E59] text-white px-4 py-1.5 rounded-md cursor-pointer">Save room</button>
      </div>
    </div>
  );
}