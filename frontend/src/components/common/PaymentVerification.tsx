import { ArrowRight, Calendar, Clock, Eye, Receipt } from "lucide-react";

export default function PaymentVerification(){
  return(
    <div className="border-b border-[#dfe5ed] p-4 grid grid-cols-2 gap-4">
      <div className="space-y-5 p-4 border border-[#dfe5ed] rounded-lg">
        <div className="flex items-center gap-4 justify-between">
          <div className="flex items-center gap-2">
            <div className="size-9 rounded-full flex items-center justify-center bg-green-500 text-sm">
              GC
            </div>
            <div className="text-gray-500">
              <h1 className="font-medium text-[#243E59]">Gabriel Concepcion</h1>
              <span className="text-sm">Room 401 · PAY-2026-012</span>
            </div>
          </div>
          <div className="text-sm">pending verification</div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <h1 className="text-[#243E59] text-3xl font-medium">₱5,000</h1>
          <p className="text-gray-500 text-sm">Bank transfer</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <Calendar size={16}/>
            <span>Mar 18, 2026</span>
          </div>
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <Clock size={16}/>
            <span>Submitted today</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 bg-gray-100 border border-gray-300 rounded-md p-3 text-gray-500">
          <div className="flex items-center gap-3">
            <Receipt size={24}/>
            <div className="text-sm ">
              <h1>Payment submission</h1>
              <span>Fictional sample · No real bank details</span>
            </div>
          </div>
          <Eye size={20}/>
        </div>

        <button className="flex items-center gap-4 justify-between text-white bg-[#243E59] w-full py-3 px-4 rounded-md">
          <span>Review submission</span>
          <ArrowRight size={20}/>
        </button>
      </div>
    </div>
  )
}