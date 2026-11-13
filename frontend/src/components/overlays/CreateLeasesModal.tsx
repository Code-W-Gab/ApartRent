import { ArrowLeft, ArrowRight, Info, X } from "lucide-react";
import type { IProgress } from "../../types/leases.types";
import Input from "../common/Input";
import Dropdown from "../common/dropdown";
import type { DropdownOption, ITenant } from "../../types/tenant.types";
import { useState } from "react";

interface ModalProps {
  onClose: () => void;
  tenants: ITenant[];
  // handleCreateRoom: ReturnType<typeof useRoom>["handleCreateRoom"];
}

const progressStepper: IProgress[] = [
  { num: 1, label: "Tenant"},
  { num: 2, label: "Room"},
  { num: 3, label: "Terms"},
  { num: 4, label: "Review"},
]



export default function CreateLeasesModal({ onClose, tenants }: ModalProps) {
  const [selectedTenantId, setSelectedTenantId] = useState("");
  const [progressNumber, setProgressNumber] = useState(1);
  const [error, setError] = useState("")

  const tenantOptions: DropdownOption<string>[] = [
    { option: "Select a tenant", value: "" },
    ...tenants.map((tenant) => ({
      option: tenant.fullName,
      value: tenant._id,
    })),
  ];

  const handleContinue = () => {
    if(!selectedTenantId){
      setError("Please complete the required fields with valid rental terms.")
      return
    }

    setError("")
    setProgressNumber((p) => Math.min(p + 1, progressStepper.length));
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
        return <div>{/* Room selection */}</div>;
  
      case 3:
        return <div>{/* Lease terms */}</div>;
  
      case 4:
        return <div>{/* Review lease */}</div>;
  
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
            {progressStepper.map((progress) => (
              <div key={progress.num} className="flex items-center justify-center gap-2">
                <div className={`${progress.num !== progressNumber ? "text-gray-300 border border-gray-300 bg-white" : "text-[#D6B36A] bg-[#243E59]"} text-sm size-7 flex items-center justify-center rounded-full`}>{progress.num}</div>
                <span className={`${progress.num !== progressNumber ? "text-gray-300" : "text-[#243E59]"} text-sm`}>{progress.label}</span>
              </div>
            ))}
          </div>

          <div className="border-b border-[#dfe5ed]"></div>
          
          {/* steps */}
          {renderStep()}

          {!selectedTenantId && error && <div className="text-red-400 text-xs">{error}</div>}
        </div>
      </div>

      <div className="p-4 flex items-center justify-end gap-3">
        <button className="border border-[#dfe5ed] text-[#526174] px-4 py-1.5 rounded-md hover:border-[#bec1c5] cursor-pointer">Cancel</button>
        <button onClick={handleContinue} className="flex items-center gap-2 bg-[#243E59] text-white px-4 py-1.5 rounded-md cursor-pointer">
          <span>Continue</span>
          <ArrowRight size={17}/>
        </button>
      </div>
    </div>
  )
}