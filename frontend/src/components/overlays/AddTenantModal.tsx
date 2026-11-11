import { X } from "lucide-react"
import Input from "../common/Input"
import { useState } from "react"
import type { useTenant } from "../../hook/useTenant";

interface ModalProps {
  onClose: () => void;
  handleCreateRoom: ReturnType<typeof useTenant>["handleCreateTenant"];
}

export default function AddTenantModal({onClose, handleCreateRoom}: ModalProps) {
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [emergencyContactName, setEmergencyContactName] = useState("")
  const [relationship, setRelationship] = useState("")
  const [emergencyContactNumber, setEmergencyContactNumber] = useState("")

  const tenantData = {
    fullName,
    emailAddress,
    phoneNumber,
    emergencyContactName,
    emergencyContactNumber,
    relationship
  }

  return(
    <div className="flex max-h-[85vh] w-[min(90vw,35rem)] flex-col overflow-hidden rounded-xl bg-white shadow-xl">
      <div className="flex shrink-0 items-center justify-between border-b border-gray-300 p-5">
        <h1 className="text-xl font-medium">Welcome someone new</h1>
        <button onClick={onClose} aria-label="Close add room modal">
          <X size={20} className="cursor-pointer" />
        </button>
      </div>

      <div className="min-h-0 overflow-y-auto overflow-x-hidden border-b border-gray-300 p-5">
        <div className="space-y-5">
          <p className="text-sm text-gray-500">
            Create their profile first, then invite them to their own tenant portal.
          </p>

          <div className="space-y-4">
            <Input 
              label="Full name *" 
              placeholder="e.g. Juan Dela Cruz" 
              type="text"
              value={fullName}
              setValue={setFullName}
            />

            <Input 
              label="Email address *" 
              placeholder="tenant@example.com" 
              type="text"
              value={emailAddress}
              setValue={setEmailAddress}
            />

            <Input 
              label="Phone number *" 
              placeholder="09xx xxx xxxx" 
              type="text"
              value={phoneNumber}
              setValue={setPhoneNumber}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input 
                label="Emergency contact name" 
                placeholder="Juan Dela Cruz" 
                type="text"
                value={emergencyContactName}
                setValue={setEmergencyContactName}
              />
              <Input 
                label="Relationship" 
                placeholder="Father, Mother, Siblings, etc." 
                type="text"
                value={relationship}
                setValue={setRelationship}
              />
            </div>

            <Input 
              label="Emergency contact number" 
              placeholder="09xx xxx xxxx" 
              type="text"
              value={emergencyContactNumber}
              setValue={setEmergencyContactNumber}
            />
          </div>
        </div>
      </div>

      <div className="p-4 flex items-center justify-end gap-3">
        <button onClick={onClose} className="border border-[#dfe5ed] text-[#526174] px-4 py-1.5 rounded-md hover:border-[#bec1c5] cursor-pointer">Cancel</button>
        <button onClick={() => handleCreateRoom(tenantData, onClose)} className="bg-[#243E59] text-white px-4 py-1.5 rounded-md cursor-pointer">Save tenant</button>
      </div>
    </div>
  )
}