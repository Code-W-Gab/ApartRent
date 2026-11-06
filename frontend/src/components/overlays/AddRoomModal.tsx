import { X } from "lucide-react";
import Input from "../common/Input";
import Dropdown from "../common/dropdown";
import Checkbox from "../common/Checkbox";
import type { roomType, status, floor } from '../../types/room.types'
import { useState } from "react";
import { useRoom } from "../../hook/useRoom";

interface ModalProps {
  onClose: () => void;
}

interface DropdownOption<T> {
  option: string;
  value: T;
}

const floorOptions: DropdownOption<floor>[] = [
  { option: "1", value: 1 },
  { option: "2", value: 2 },
  { option: "3", value: 3 },
  { option: "4", value: 4 },
];

const roomTypeOptions: DropdownOption<roomType>[] = [
  { option: "Standard studio", value: "Standard studio" },
  { option: "Single room", value: "Single room" },
  { option: "Deluxe studio", value: "Deluxe studio" },
];

const statusTypeOptions: DropdownOption<status>[] = [
  { option: "Available", value: "Available" },
  { option: "Occupied", value: "Occupied" },
  { option: "Reserved", value: "Reserved" },
];

export default function AddRoomModal({ onClose }: ModalProps) {
  const [roomNumber, setRoomNumber] = useState("");
  const [floor, setFloor] = useState<floor>(1);
  const [type, setType] = useState<roomType>("Standard studio");
  const [monthlyRent, setMonthlyRent] = useState("");
  const [deposit, setDeposit] = useState("");
  const [status, setStatus] = useState<status>("Available");
  const [description, setDescription] = useState("");
  const [amenities, setAmenities] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const { handleCreateRoom } = useRoom()

  const roomData = {
    roomNumber: Number(roomNumber),
    floor,
    type,
    monthlyRent: Number(monthlyRent),
    deposit: Number(deposit),
    status,
    description,
    amenities,
    notes
  }


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
            <Input
              label="Room number *"
              type="text"
              placeholder="e.g. 405"
              value={roomNumber}
              setValue={setRoomNumber}
            />

            <Input label="Floor *" type="select">
              <Dropdown<floor>
                id="Floor *"
                dropdownOptions={floorOptions}
                value={floor}
                setValue={setFloor}
              />
            </Input>

            <Input label="Room type *" type="select">
              <Dropdown<roomType>
                id="Room type *"
                dropdownOptions={roomTypeOptions}
                value={type}
                setValue={setType}
              />
            </Input>

            <Input
              label="Monthly rent (₱) *"
              type="number"
              placeholder="5000"
              value={monthlyRent}
              setValue={setMonthlyRent}
            />

            <Input
              label="Security deposit (₱) *"
              type="number"
              placeholder="5000"
              value={deposit}
              setValue={setDeposit}
            />

            <Input label="Occupancy status" type="select">
              <Dropdown<status>
                id="Occupancy status"
                dropdownOptions={statusTypeOptions}
                value={status}
                setValue={setStatus}
              />
            </Input>

            <div className="col-span-2 space-y-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="amenities" className="text-[#526174] text-sm font-medium">Amenities</label>
                <div className="flex items-center gap-4">
                  {["Air conditioning", "Private bathroom", "Wi-Fi", "Kitchenette"].map(
                    (amenity) => (
                      <Checkbox
                        key={amenity}
                        label={amenity}
                        checked={amenities.includes(amenity)}
                        setChecked={(checked) => {
                          setAmenities((previous) =>
                            checked
                              ? [...previous.filter((item) => item !== amenity), amenity]
                              : previous.filter((item) => item !== amenity),
                          );
                        }}
                      />
                    ),
                  )}
                </div>
              </div>

              <Input
                label="Description"
                type="textarea"
                placeholder="What makes this room feel like home?"
                value={description}
                setValue={setDescription}
              />

              <Input
                label="Room photos"
                type="file"
                setFiles={(files) => setPhotos(Array.from(files ?? []))}
              />

              <Input
                label="Administrative notes"
                type="textarea"
                placeholder="Internal notes, not visible to tenants"
                value={notes}
                setValue={setNotes}
              />
            </div>

            
          </div>
        </div>
      </div>

      <div className="p-4 flex items-center justify-end gap-3">
        <button onClick={onClose} className="border border-[#dfe5ed] text-[#526174] px-4 py-1.5 rounded-md hover:border-[#bec1c5] cursor-pointer">Cancel</button>
        <button onClick={() => handleCreateRoom(roomData, onClose)} className="bg-[#243E59] text-white px-4 py-1.5 rounded-md cursor-pointer">Save room</button>
      </div>
    </div>
  );
}