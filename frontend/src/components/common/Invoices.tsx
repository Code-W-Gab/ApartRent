import { ArrowUpRight } from "lucide-react";

export default function Invoices(){
  return(
    <div className="border-b border-[#dfe5ed]">
      <div className="grid grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.8fr)] *:min-w-0 *:wrap-anywhere items-center gap-4 p-4 text-sm bg-[#F6F8FB] text-gray-500 ">
        <span>Tenant / room</span>
        <span>Billing period</span>
        <span>Due date</span>
        <span>Total</span>
        <span>Balance</span>
        <span>Status</span>
        <span>Action</span>
      </div>

      <div className="grid grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.8fr)] *:min-w-0 *:wrap-anywhere items-center gap-4 p-4 text-sm text-gray-500 ">
        <div className="flex flex-col">
          <span className="text-gray-600 font-medium">Gabriel Concepcion</span>
          <span className="text-xs">Room 101</span>
        </div>
        <span>November 2026</span>
        <span>Nov 05, 2026</span>
        <span>₱4,500</span>
        <span>₱0</span>
        <span>Paid</span>
        <button 
          className="flex flex-wrap items-center gap-1.5 hover:underline hover:text-gray-700 cursor-pointer"
        >
          <span>Details</span>
          <ArrowUpRight size={16}/>
        </button>
      </div>
    </div>
  )
}