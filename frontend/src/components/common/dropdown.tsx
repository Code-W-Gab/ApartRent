import { ChevronDown } from "lucide-react";

interface DropdownOption {
  option: string
  value: string
}

interface DropdownProps {
  dropdownOptions: DropdownOption[]
}

export default function Dropdown({ dropdownOptions }: DropdownProps) {
  return (
    <div className="relative">
      <select className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-sm text-gray-700 focus:outline-1">
        {dropdownOptions.map((opt, index) => (
          <option key={index} value={opt.value}>
            {opt.option}
          </option>
        ))}
      </select>

      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
        <ChevronDown size={18} />
      </div>
    </div>
  )
}