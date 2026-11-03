interface InputProps {
  label: string,
  type: string,
  placeholder?: string
  children?: React.ReactElement
}

export default function Input({label, type, placeholder, children}: InputProps) {
  return(
    <div className="flex flex-col gap-1.5">
      <label htmlFor={label} className="text-[#526174] text-sm font-medium">{label}</label>
      {
      type === "text" 
      ? <input 
          type={type} 
          id={label}
          placeholder={placeholder}
          className="border border-[#dfe5ed] text-[#526174] px-3 py-2 h-10 rounded-md text-sm"
        />
      : type === "number" 
      ? <input 
          type={type} 
          id={label}
          placeholder={placeholder}
          min={0}
          className="border border-[#dfe5ed] text-[#526174] px-3 py-2 h-10 rounded-md text-sm"
        />
      : type === "file"
      ? <input 
          type="file"
          id={label}
          className="border border-[#dfe5ed] bg-gray-100 text-[#526174] px-3 py-2 h-10 w-full rounded-md text-sm "
        />
      : type === "textarea" 
      ? <textarea 
          id={label}
          placeholder={placeholder} 
          rows={4} 
          className="border border-[#dfe5ed] text-[#526174] rounded-md text-sm p-2"
        ></textarea>
      : children
      }
    </div>
  )
}