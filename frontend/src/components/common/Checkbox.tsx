interface CheckboxProps {
  label: string;
}

export default function Checkbox({ label }: CheckboxProps) {
  return (
    <div className="flex items-center gap-2">
      <input type="checkbox" id={label} className="size-4" />
      <label htmlFor={label} className="text-sm text-gray-600">
        {label}
      </label>
    </div>
  );
}