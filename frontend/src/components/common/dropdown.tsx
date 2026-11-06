import { ChevronDown } from "lucide-react";

interface DropdownOption<T extends string | number> {
  option: string;
  value: T;
}

interface DropdownProps<T extends string | number> {
  id?: string;
  dropdownOptions: DropdownOption<T>[];
  value?: T;
  setValue?: (value: T) => void;
}

export default function Dropdown<T extends string | number>({
  id,
  dropdownOptions,
  value,
  setValue,
}: DropdownProps<T>) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(event) => {
          const selected = dropdownOptions.find(
            (option) => String(option.value) === event.target.value,
          );

          if (selected) {
            setValue?.(selected.value);
          }
        }}
        className="w-full appearance-none rounded-lg border border-[#dfe5ed] bg-white px-4 py-2 pr-10 h-10 text-sm text-[#526174] focus:outline-1"
      >
        {dropdownOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.option}
          </option>
        ))}
      </select>

      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
        <ChevronDown size={18} />
      </div>
    </div>
  );
}