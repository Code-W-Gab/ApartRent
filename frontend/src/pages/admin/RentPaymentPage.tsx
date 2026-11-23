import { Clock, Download, FileText, Plus, Search, ShieldCheck, Wallet } from "lucide-react"
import AdminLayout from "../../components/layout/AdminLayout"
import type { DropdownOption, INav, paymentStatus } from "../../types/payment.types"
import Dropdown from "../../components/common/dropdown";
import Invoices from "../../components/common/Invoices";

const paymentStatusOptions: DropdownOption<paymentStatus | "">[] = [
  { option: "All leases", value: "" },
  { option: "Paid", value: "Paid" },
  { option: "Overdue", value: "Overdue" },
  { option: "Unpaid", value: "Unpaid" }
];

export default function RentPaymentPage() {

  const navOption:INav[] = [
    { label: "Total invoiced", amount: 15000, desc: "March 2026 billing", icon: FileText },
    { label: "Verified payments", amount: 10000, desc: "Actual payments received", icon: ShieldCheck },
    { label: "Outstanding balance", amount: 2000, desc: "Pending submissions not deducted", icon: Clock },
    { label: "Awaiting verification", amount: 1000, desc: "Not yet included in collections", icon: Wallet },
  ]

  return(
    <main>
      <AdminLayout>
        <div className="p-6">
          <header>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h3 className="text-xs text-[#D6B36A]">RENT & PAYMENT</h3>
                <h1 className="text-3xl font-semibold text-[#243E59]">Rent & Payments</h1>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-3 rounded-md border border-gray-200 text-gray-500 bg-white cursor-pointer">
                  <FileText size={18}/>
                  <span className="text-sm">Generate invoices</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-3 rounded-md text-white bg-[#243E59] cursor-pointer">
                  <Plus size={18}/>
                  <span className="text-sm">Record payment</span>
                </button>
              </div>
            </div>
            <div className="text-gray-500 text-sm mt-2">Track invoices, verify payments, and keep every peso accounted for.</div>
          </header>

          <section className="mt-8 space-y-8">
           <div className="grid grid-cols-4 gap-6">
              {navOption.map((nav, index) => {
                return(
                  <div key={index} className="border border-[#dfe5ed] bg-white p-4 rounded-xl space-y-2.5">
                    <div className="flex items-center justify-between text-gray-500">
                      <h4>{nav.label}</h4>
                      <div className="border border-[#dfe5ed] flex items-center justify-center p-1 rounded-md bg-gray-100">
                        <nav.icon size={18}/>
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-[#243E59]">₱{nav.amount}</div>
                    <p className="text-xs text-gray-500">{nav.desc}</p>
                  </div>
                )
              })}
            </div>

            <div className="border border-[#dfe5ed] rounded-xl bg-white">
              <div className="p-4 flex items-center justify-between border-b border-[#dfe5ed] text-gray-500 text-sm">
                <div className="flex items-center gap-4">
                  <button>Invoices</button>
                  <button>Payments</button>
                  <button>Payment verification</button>
                </div>
                <button className="flex items-center gap-2 text-xs">
                  <Download size={17}/>
                  <span>Export CSV</span>
                </button>
              </div>
              <div className="p-4 flex items-center justify-between border-b border-[#dfe5ed]">
                <div className="inline-flex items-center gap-2 w-70 border border-[#dfe5ed] px-3 py-2 rounded-lg">
                  <Search size={18} className="text-gray-500"/>
                  <input 
                    type="text" 
                    placeholder="Search by invoices, tenant, room..."
                    className="text-sm focus:outline-none text-gray-600 w-full"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <Dropdown dropdownOptions={paymentStatusOptions}/>
                </div>
              </div>

              <Invoices/>

              <div className="flex items-center gap-2 text-sm text-gray-500 p-3">
                <ShieldCheck size={18}/>
                <span>Pending and rejected submissions do not reduce invoice balances.</span>
              </div>
              
            </div>
            
          </section>
        </div>
      </AdminLayout>
    </main>
  )
}