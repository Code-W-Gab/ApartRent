import { ArrowUpRight, DoorOpen, FileText, Mail, Plus, Search, UsersRound } from "lucide-react"
import AdminLayout from "../../components/layout/AdminLayout"
import type { DropdownOption, INav, tenantStatus } from "../../types/tenant.types"
import Dropdown from "../../components/common/dropdown"


const navOption:INav[] = [
  { label: "Active tenants", rooms: 10, desc: "Across your property", icon: UsersRound },
  { label: "Pending invitations", rooms: 0, desc: "Waiting to be welcomed", icon: Mail },
  { label: "Expiring leases", rooms: 0, desc: "In the next 30 days", icon: FileText },
  { label: "Recently moved out", rooms: 1, desc: "This month", icon: DoorOpen }
]


const tenantsOptions: DropdownOption<tenantStatus | "">[] = [
  { option: "All tenants", value: "" },
  { option: "Active", value: "Active" },
  { option: "Pending invitation", value: "Pending" },
  { option: "Ending soon", value: "EndingSoon" },
  { option: "Moved out", value: "MovedOut" },
];

export default function TenantsPage() {
  return(
    <main>
      <AdminLayout>
        <div className="p-6">
          <header>
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h3 className="text-xs text-[#D6B36A]">TENANT DIRECTORY</h3>
                  <h1 className="text-3xl font-semibold text-[#243E59]">Tenants</h1>
                </div>
                <div>
                  <button className="flex items-center gap-2 px-4 py-3 rounded-md text-white bg-[#243E59]">
                    <Plus size={18}/>
                    <span className="text-sm">Add tenant</span>
                  </button>
                </div>
              </div>
              <div className="text-gray-500 text-sm mt-2">Keep your tenant information organized, connected, and easy to find.</div>
            </header>
            
            <section className="mt-8 space-y-8">
              <div className="grid grid-cols-4 gap-4">
                {navOption.map((nav, index) => {
                  return(
                    <div key={index} className="border border-[#dfe5ed] bg-white p-4 rounded-xl space-y-2.5">
                      <div className="flex items-center justify-between text-gray-500">
                        <h4>{nav.label}</h4>
                        <div className="border border-[#dfe5ed] flex items-center justify-center p-1 rounded-md bg-gray-100">
                          <nav.icon size={18}/>
                        </div>
                      </div>
                      <div className="text-3xl font-bold text-[#243E59]">{nav.rooms}</div>
                      <p className="text-xs text-gray-500">{nav.desc}</p>
                    </div>
                  )
                })}
              </div>

              <div className="border border-[#dfe5ed] rounded-xl bg-white">
                <div className="p-4 flex items-center justify-between border-b border-[#dfe5ed]">
                  <div className="inline-flex items-center gap-2 w-70 border border-[#dfe5ed] px-3 py-2 rounded-lg">
                    <Search size={18} className="text-gray-500"/>
                    <input 
                      type="text" 
                      min="1"
                      step="1"
                      placeholder="Search room number..."
                      className="text-sm focus:outline-none text-gray-600 w-full"
                    />
                  </div>
                  <Dropdown dropdownOptions={tenantsOptions}/>
                </div>

                <div className="border-b border-[#dfe5ed]">
                  <div className="grid grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.8fr)] *:min-w-0 *:wrap-anywhere items-center gap-4 p-4 text-sm bg-[#F6F8FB] text-gray-500 ">
                    <span>Tenant</span>
                    <span>Type</span>
                    <span>Leases ends</span>
                    <span>Monthly rent</span>
                    <span>Balance</span>
                    <span>Account</span>
                    <span>Action</span>
                  </div>

                  <div className="grid grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.8fr)] *:min-w-0 *:wrap-anywhere items-center gap-4 p-4 text-sm text-gray-500 ">
                    <div className="flex flex-col">
                      <span className="text-gray-600 font-medium">Gabriel Concepcion</span>
                      <span className="text-xs">Gab@gmail.com</span>
                    </div>
                    <span>101</span>
                    <span>Mar 31, 2026</span>
                    <span>₱4,000</span>
                    <span>₱0</span>
                    <span>Active</span>
                    <button 
                      className="flex flex-wrap items-center gap-1.5 hover:underline hover:text-gray-700 cursor-pointer"
                    >
                      <span>View</span>
                      <ArrowUpRight size={16}/>
                    </button>
                  </div>
                </div>

                <div className="p-4 text-sm text-gray-500">14 tenants</div>
              </div>
            </section>
        </div>
      </AdminLayout>
    </main>
  )
}