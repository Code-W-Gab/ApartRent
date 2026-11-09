import { Dot } from "lucide-react";
import type { status } from "../../types/room.types";

interface statusProps {
  status: status,
  filterType: string
}

export default function Status({status, filterType}: statusProps) {
  return(
    <div className={`
      ${filterType === "grid" 
        ? "absolute top-2 right-2 flex items-center text-sm border border-white pr-2 rounded-sm" 
        : "inline-flex max-w-full flex-wrap items-center bg-blue-100 rounded-md pr-2 py-0.5 text-xs [&>svg]:shrink-0"
      }
      ${
      status === "Available" ? "text-green-500 bg-green-100" 
      : status === "Occupied" ? "text-blue-500 bg-blue-100"
      : "text-violet-500 bg-violet-100"
      }`}>
      <Dot size={20}/>
      <span>{status}</span>
    </div>
  )
}