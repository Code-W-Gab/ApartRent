interface CheckboxProps {
  label: string;
  checked: boolean;
  setChecked: (checked: boolean) => void;
}

export default function Checkbox({
  label,
  checked,
  setChecked,
}: CheckboxProps) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id={label}
        checked={checked}
        onChange={(event) => setChecked(event.target.checked)}
        className="size-4"
      />
      <label htmlFor={label} className="text-sm text-gray-600">
        {label}
      </label>
    </div>
  );
}