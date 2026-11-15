import { ArrowRight, Check, Info, X } from "lucide-react";
import type { dueDateStatus, IProgress, DropdownOption } from "../../types/leases.types";
import Input from "../common/Input";
import Dropdown from "../common/dropdown";
import type { ITenant } from "../../types/tenant.types";
import { useState } from "react";
import type { IRoom } from "../../types/room.types";
import type { useLease } from "../../hook/useLease";

interface ModalProps {
  onClose: () => void;
  tenants: ITenant[];
  rooms: IRoom[];
  handleCreateLease: ReturnType<typeof useLease>["handleCreateLease"];
}

const progressStepper: IProgress[] = [
  { num: 1, label: "Tenant"},
  { num: 2, label: "Room"},
  { num: 3, label: "Terms"},
  { num: 4, label: "Review"},
]

const dueDateOptions: DropdownOption<dueDateStatus>[] = [
  { option: "1st of each month", value: "1st of each month" },
  { option: "5th of each month", value: "5th of each month" },
  { option: "15th of each month", value: "15th of each month" },
];


export default function CreateLeasesModal({ onClose, tenants, rooms, handleCreateLease }: ModalProps) {
  const [selectedTenantId, setSelectedTenantId] = useState("");
  const [progressNumber, setProgressNumber] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedRoomNumber, setSelectedRoomNumber] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [monthlyRent, setMonthlyRent] = useState("")
  const [securityDeposit, setSecurityDeposit] = useState("")
  const [dueDay, setDueDay] = useState<dueDateStatus>("5th of each month");
  const [gracePeriod, setGracePeriod] = useState("0")
  const [instruction, setInstruction] = useState("Cash by arrangement, bank transfer, or GCash. Include your room number and invoice reference.")
  const [error, setError] = useState("")

  const leaseData = {
    tenant: selectedTenantId,
    room: selectedRoom,
    startDate,
    endDate,
    monthlyRent: Number(monthlyRent),
    securityDeposit: Number(securityDeposit),
    dueDay,
    gracePeriod: Number(gracePeriod),
    instruction
  }

  const tenantOptions: DropdownOption<string>[] = [
    { option: "Select a tenant", value: "" },
    ...tenants.map((tenant) => ({
      option: tenant.fullName,
      value: tenant._id,
    })),
  ];

  const filterRooms = rooms.filter((room) => room.status === "Available");

  const selectedTenant = tenants.find((tenant) => tenant._id === selectedTenantId);

  const handleContinue = () => {
    if(!selectedTenantId){
      setError("Please complete the required fields with valid rental terms.")
      return
    }

    if(progressNumber === 2){
      if(!selectedRoom){
        setError("Please complete the required fields with valid rental terms.")
        return
      }
    }

    if(progressNumber === 3){
      if(!startDate || !endDate || !monthlyRent || !securityDeposit || !monthlyRent || !gracePeriod || !instruction){
        setError("Please complete the required fields with valid rental terms.")
        return
      }
    }

    handleCreateLease(leaseData, onClose)
    setError("")
    setProgressNumber((p) => Math.min(p + 1, progressStepper.length));
  }

  const handleBack = () => {
    if(progressNumber === 1) {
      onClose()
      return
    }

    setProgressNumber((p) => Math.max(p - 1, 1));
  }

  const renderStep = () => {
    switch (progressNumber) {
      case 1:
        return (
          <div className="space-y-5">
            <div className="space-y-1">
              <h1 className="text-lg font-medium text-[#243E59]">
                Select a tenant
              </h1>
              <p className="text-sm text-gray-500">
                Choose an existing tenant for this agreement.
              </p>
            </div>
  
            <Input label="Tenant *" type="select">
              <Dropdown
                id="Tenant *"
                dropdownOptions={tenantOptions}
                value={selectedTenantId}
                setValue={setSelectedTenantId}
              />
            </Input>
  
            <div className="flex items-center gap-2 rounded-md border border-[#dfe5ed] bg-blue-50 px-4 py-2 text-sm text-gray-500">
              <Info size={20} />
              <span>
                This tenant currently has a lease. End or reassign the previous
                agreement before activation.
              </span>
            </div>
          </div>
        );
  
      case 2:
        return (
          <div className="space-y-5">
            <div className="space-y-1">
              <h1 className="text-lg font-medium text-[#243E59]">
                Find the right space
              </h1>
              <p className="text-sm text-gray-500">
                Only available rooms are shown.
              </p>
            </div>
            <div className="space-y-2">
              {
                filterRooms.map((room) => (
                  <label key={room._id} className={`flex w-full cursor-pointer items-center justify-between rounded-lg border  p-4 text-sm text-gray-500 ${selectedRoom === room._id ? "border-amber-300 bg-amber-50" : "border-gray-200"}`}>
                    <div className="flex items-center gap-4">
                      <input
                        type="radio"
                        name="room"
                        value={room._id}
                        className="size-4"
                        checked={selectedRoom === room._id}
                        onChange={(e) => {
                          setSelectedRoom(e.target.value)
                          setMonthlyRent(String(room.monthlyRent))
                          setSecurityDeposit(String(room.deposit))
                          setSelectedRoomNumber(String(room.roomNumber))
                        }}
                      />
                      <div>
                        <h3 className="font-medium text-[#243E59]">Room {room.roomNumber}</h3>
                        <span>{room.type} · Floor {room.floor}</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-[#243E59]">₱{room.monthlyRent}</h3>
                      <span>/month</span>
                    </div>
                  </label>
                ))
              }
            </div>
          </div>
        );
  
      case 3:
        return (
          <div className="space-y-5">
            <div>
              <h1 className="text-lg font-medium text-[#243E59]">
                Make the terms clear
              </h1>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Start date *" type="date" value={startDate} setValue={setStartDate}/>
              <Input label="End date *" type="date" value={endDate} setValue={setEndDate}/>
              <Input label="Monthly rent (₱) *" placeholder="5000" type="number" value={monthlyRent} setValue={setMonthlyRent}/>
              <Input label="Security deposit" placeholder="5000" type="number" value={securityDeposit} setValue={setSecurityDeposit}/>
              <Input label="Monthly due day" type="select">
                <Dropdown
                  id="Monthly due day"
                  dropdownOptions={dueDateOptions}
                  value={dueDay}
                  setValue={setDueDay}
                />
              </Input>
              <Input label="Grace period (days)" type="number" placeholder="1" value={gracePeriod} setValue={setGracePeriod}/>
              <div className="col-span-2">
                <Input label="Payment instruction" type="textarea" placeholder="Enter instruction here..." value={instruction} setValue={setInstruction}/>
              </div>
            </div>
          </div>
        )
  
      case 4:
        return (
          <div className="space-y-5">
            <div>
              <h1 className="text-lg font-medium text-[#243E59]">
                One last look
              </h1>
            </div>
            <div>
              <div className="flex items-center justify-between gap-4 py-3 text-sm text-gray-500 border-b border-gray-200">
                <span>Tenant</span>
                <span className="text-[#243E59] font-medium">{selectedTenant?.fullName}</span>
              </div>
              <div className="flex items-center justify-between gap-4 py-3 text-sm text-gray-500 border-b border-gray-200">
                <span>Room</span>
                <span className="text-[#243E59] font-medium">Room {selectedRoomNumber}</span>
              </div>
              <div className="flex items-center justify-between gap-4 py-3 text-sm text-gray-500 border-b border-gray-200">
                <span>Term</span>
                <span className="text-[#243E59] font-medium">{startDate} - {endDate}</span>
              </div>
              <div className="flex items-center justify-between gap-4 py-3 text-sm text-gray-500 border-b border-gray-200">
                <span>Monthly rent</span>
                <span className="text-[#243E59] font-medium">₱{monthlyRent}</span>
              </div>
              <div className="flex items-center justify-between gap-4 py-3 text-sm text-gray-500 border-b border-gray-200">
                <span>Security deposit</span>
                <span className="text-[#243E59] font-medium">₱{securityDeposit}</span>
              </div>
              <div className="flex items-center justify-between gap-4 py-3 text-sm text-gray-500 border-b border-gray-200">
                <span>Initial rent + deposit</span>
                <span className="text-[#243E59] text-xl font-medium">
                  ₱{(Number(monthlyRent) + Number(securityDeposit)).toLocaleString("en-PH")}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2 text-sm text-gray-500">
              <label className="flex items-center gap-2">
                <input type="checkbox" id="generate" />
                <span>Generate initial rent invoice (₱5,000)</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" id="confirm" />
                <span>I confirm the tenant has agreed to these rental terms.</span>
              </label>
            </div>
          </div>
        );
  
      default:
        return null;
    }
  };

  return(
    <div className="flex max-h-[85vh] w-[min(90vw,46rem)] flex-col overflow-hidden rounded-xl bg-white shadow-xl">
      <div className="flex shrink-0 items-center justify-between border-b border-gray-300 p-5">
        <h1 className="text-xl font-medium">A new chapter starts here</h1>
        <button onClick={onClose} aria-label="Close add room modal">
          <X size={20} className="cursor-pointer" />
        </button>
      </div>
      
      <div className="min-h-0 overflow-y-auto overflow-x-hidden border-b border-gray-300 p-5">
        <div className="space-y-5">
          <div className="grid grid-cols-4 items-center gap-4">
            {progressStepper.map((progress) => {
              const isReached = progress.num <= progressNumber;
              const isCompleted = progress.num < progressNumber;

              return (
                <div key={progress.num} className="flex items-center justify-center gap-2">
                  <div
                    className={`flex size-7 items-center justify-center rounded-full text-sm ${
                      isReached
                        ? "bg-[#243E59] text-[#D6B36A]"
                        : "border border-gray-300 bg-white text-gray-300"
                    }`}
                  >
                    {isCompleted ? <Check size={20} /> : progress.num}
                  </div>
                  <span className={`text-sm ${isReached ? "text-[#243E59]" : "text-gray-300"}`}>
                    {progress.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="border-b border-[#dfe5ed]"></div>
          
          {/* steps */}
          {renderStep()}

          {error && <div className="text-red-400 text-xs">{error}</div>}
        </div>
      </div>

      <div className="p-4 flex items-center justify-end gap-3">
        <button onClick={handleBack} className="border border-[#dfe5ed] text-[#526174] px-4 py-1.5 rounded-md hover:border-[#bec1c5] cursor-pointer">{progressNumber === 1 ? "Cancel" : "Back"}</button>
        <button onClick={handleContinue} className="flex items-center gap-2 bg-[#243E59] text-white px-4 py-1.5 rounded-md cursor-pointer">
          <span>Continue</span>
          <ArrowRight size={17}/>
        </button>
      </div>
    </div>
  )
}