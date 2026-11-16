import { ArrowUpRight, Clock, DoorOpen, FileText, Plus, Search } from "lucide-react"
import AdminLayout from "../../components/layout/AdminLayout"
import type { DropdownOption, INav, leasesStatus } from "../../types/leases.types"
import Dropdown from "../../components/common/dropdown"
import { useState } from "react";
import CreateLeasesModal from "../../components/overlays/CreateLeasesModal";
import { useTenant } from "../../hook/useTenant";
import { useRoom } from "../../hook/useRoom";
import { useLease } from "../../hook/useLease";
import { formatDate } from "../../utils/date";
import LeaseDetailsModal from "../../components/overlays/LeaseDetailsModal";


const leasesOptions: DropdownOption<leasesStatus | "">[] = [
  { option: "All leases", value: "" },
  { option: "Active", value: "Active" },
  { option: "Ending soon", value: "Ending Soon" },
  { option: "Draft", value: "Draft" },
  { option: "Ended", value: "Ended" },
  { option: "Terminated", value: "Terminated" }
];

export default function LeasesPage() {
  const [isCreateLeasesModalOpen, setIsCreateLeasesModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const { tenants } = useTenant();
  const { allRooms } = useRoom();
  const { handleCreateLease, leases } = useLease();

  const navOption:INav[] = [
    { label: "Active leases", rooms: 14, desc: "Current rental agreements", icon: FileText },
    { label: "Ending soon", rooms: 3, desc: "Within the next 30 days", icon: Clock },
    { label: "Available rooms", rooms: 3, desc: "Ready for a new lease", icon: DoorOpen }
  ]

  return(
    <main>
      <AdminLayout>
        <div className="p-6">
          <header>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h3 className="text-xs text-[#D6B36A]">LEASE MANAGEMENT</h3>
                <h1 className="text-3xl font-semibold text-[#243E59]">Leases</h1>
              </div>
              <div>
                <button onClick={() => setIsCreateLeasesModalOpen(true)} className="flex items-center gap-2 px-4 py-3 rounded-md text-white bg-[#243E59] cursor-pointer">
                  <Plus size={18}/>
                  <span className="text-sm">Create lease</span>
                </button>
              </div>
            </div>
            <div className="text-gray-500 text-sm mt-2">Keep every agreement, renewal, and move-in in one place.</div>
          </header>

          <section className="mt-8 space-y-8">
            <div className="grid grid-cols-3 gap-6">
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
                      placeholder="Search by tenant name..."
                      className="text-sm focus:outline-none text-gray-600 w-full"
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <Dropdown dropdownOptions={leasesOptions}/>
                  </div>
                </div>

                <div className="border-b border-[#dfe5ed]">
                  <div className="grid grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.8fr)] *:min-w-0 *:wrap-anywhere items-center gap-4 p-4 text-sm bg-[#F6F8FB] text-gray-500 ">
                    <span>Tenant / room</span>
                    <span>Start date</span>
                    <span>End date</span>
                    <span>Rent</span>
                    <span>Due date</span>
                    <span>Status</span>
                    <span>Action</span>
                  </div>

                  {
                    leases.length === 0
                    ? <div className="col-span-3 text-sm text-gray-500">No lease found. Try a different lease or add a lease.</div>
                    : leases.map((lease) => {
                        const tenant = tenants.find((tenant) => tenant._id === lease.tenant)
                        const roomNumber = allRooms.find((room) => room._id === lease.room)
                        const dueDay = lease.dueDay?.slice(0, lease.dueDay.indexOf(" "));

                        return(
                          <div key={lease._id} className="grid grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.8fr)] *:min-w-0 *:wrap-anywhere items-center gap-4 p-4 text-sm text-gray-500 ">
                            <div className="flex flex-col">
                              <span className="text-gray-600 font-medium">{tenant?.fullName}</span>
                              <span className="text-xs">Room {roomNumber?.roomNumber}</span>
                            </div>
                            <span>{formatDate(lease.startDate)}</span>
                            <span>{formatDate(lease.endDate)}</span>
                            <span>₱{lease.monthlyRent}</span>
                            <span>{dueDay}</span>
                            <span>Active</span>
                            <button 
                              onClick={() => setIsDetailsModalOpen(true)}
                              className="flex flex-wrap items-center gap-1.5 hover:underline hover:text-gray-700 cursor-pointer"
                            >
                              <span>Details</span>
                              <ArrowUpRight size={16}/>
                            </button>
                          </div>
                        )
                      })
                  }
                </div>
              </div>
          </section>

          {isDetailsModalOpen && (
            <div className="fixed inset-0 flex bg-gray-800/50 items-center justify-center z-40">
              <div className="z-50">
                <LeaseDetailsModal
                  onClose={() => setIsDetailsModalOpen(false)}
                  setIsCreateLeasesModalOpen={() => setIsCreateLeasesModalOpen(true)}
                />
              </div>
            </div>
          )}

          {isCreateLeasesModalOpen && (
            <div className="fixed inset-0 flex bg-gray-800/50 items-center justify-center z-40">
              <div className="z-50">
                <CreateLeasesModal
                  onClose={() => setIsCreateLeasesModalOpen(false)}
                  tenants={tenants}
                  rooms={allRooms}
                  handleCreateLease={handleCreateLease}
                />
              </div>
            </div>
          )}
        </div>
      </AdminLayout>
    </main>
  )
}