import { Check, DoorOpen, Dot, Trash2, X } from "lucide-react";
import type { floor, IRoom, roomType, status } from "../../types/room.types";
import { useEffect, useState } from "react";
import Input from "../common/Input";
import Dropdown from "../common/dropdown";
import Checkbox from "../common/Checkbox";
import { useRoom } from "../../hook/useRoom";

interface ModalProps {
  onClose: () => void
  room: IRoom
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

export default function ViewDetailsModal({onClose, room}: ModalProps){
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
  const [isEdit, setIsEdit] = useState(false);
  const { handleUpdateRoom, handleDeleteRoom } = useRoom();

  useEffect(() => {
    setRoomNumber(String(room.roomNumber));
    setFloor(room.floor);
    setType(room.type);
    setMonthlyRent(String(room.monthlyRent));
    setDeposit(String(room.deposit));
    setStatus(room.status);
    setDescription(room.description ?? "");
    setAmenities(room.amenities ?? []);
    setNotes(room.notes ?? "");
  }, [room]);


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

  return(
    <div className="flex max-h-[85vh] w-[min(90vw,46rem)] flex-col overflow-hidden rounded-xl bg-white shadow-xl">
      <div className="p-5 flex shrink-0 items-center justify-between border-b border-[#dfe5ed]">
        <h1 className="text-xl font-medium">
          {isEdit ? `Edit Room ${room.roomNumber}` : `Room ${room.roomNumber}`}
        </h1>
        <button onClick={onClose}>
          <X size={20} className="cursor-pointer"/>
        </button>
      </div>
      
      <div className="min-h-0 overflow-y-auto overflow-x-hidden border-b border-[#dfe5ed] p-5">
        {
          isEdit 
          ? <div className="space-y-5">
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

                <div className="flex items-center justify-end gap-3">
                  <button onClick={onClose} className="border border-[#dfe5ed] text-[#526174] px-4 py-1.5 rounded-md hover:border-[#bec1c5] cursor-pointer">Cancel</button>
                  <button onClick={() => handleUpdateRoom(room._id, roomData, onClose)} className="bg-[#243E59] text-white px-4 py-1.5 rounded-md cursor-pointer">Save room</button>
                </div>
              </div>
            </div>

          : <div className="space-y-5">
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
                <button onClick={() => setIsEdit(true)} className="text-gray-600 border border-[#dfe5ed] px-4 py-1.5 rounded-md hover:border-[#c6cbd1] cursor-pointer">Edit room</button>
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

              <div className="flex items-center justify-end">
                <button onClick={() => handleDeleteRoom(room._id, onClose)} className="flex items-center gap-2 border border-red-300 text-red-500 hover:border-red-400 cursor-pointer px-4 py-1.5 text-sm rounded-md">
                  <Trash2 size={16}/>
                  <span>Delete</span>
                </button>
              </div>
            </div>
        }
      </div>
    </div>
  )
}