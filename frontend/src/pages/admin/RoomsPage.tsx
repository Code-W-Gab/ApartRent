import { BuildingComplex, DoorOpen, Plus, Search, UserRound, UsersRound, Wrench } from "lucide-react"
import AdminLayout from "../../components/layout/AdminLayout"
import Dropdown from "../../components/common/dropdown"
import type React from "react"

interface INav {
  label: string,
  rooms: number,
  desc: string,
  icon: React.ElementType
}

const navOption:INav[] = [
  { label: "Total rooms", rooms: 18, desc: "Your entire property", icon: BuildingComplex },
  { label: "Occupied", rooms: 14, desc: "A place to call home", icon: UsersRound },
  { label: "Available", rooms: 3, desc: "Ready for move-in", icon: DoorOpen },
  { label: "Under maintenance", rooms: 1, desc: "Getting a little attention", icon: Wrench }
]

interface DropdownOption {
  option: string,
  value: string
}

const floorOptions: DropdownOption[] = [
  { option: "All floors", value: "" },
  { option: "floor 1", value: "" },
  { option: "floor 2", value: "" },
  { option: "floor 3", value: "" },
  { option: "floor 4", value: "" },
]

const statusOptions: DropdownOption[] = [
  { option: "All statuses", value: "" },
  { option: "Available", value: "" },
  { option: "Occupied", value: "" },
  { option: "Reserved", value: "" },
  { option: "Maintenance", value: "" },
]


export default function RoomsPage() {
  return(
    <main>
      <AdminLayout>
        <div className="p-6">
          <header>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h3 className="text-xs text-[#D6B36A]">ROOMS & OCCUPANCY</h3>
                <h1 className="text-3xl font-semibold text-[#243E59]">Rooms</h1>
              </div>
              <div>
                <button className="flex items-center gap-2 px-4 py-3 rounded-md text-white bg-[#243E59]">
                  <Plus size={18}/>
                  <span className="text-sm">Add room</span>
                </button>
              </div>
            </div>
            <div className="text-gray-500 text-sm mt-2">Manage your rooms, welcome new tenants, and make space for what’s next.</div>
          </header>

          <section className="mt-8 space-y-8">
            <div className="grid grid-cols-4 gap-4">
              {navOption.map((nav, index) => {
                return(
                  <div key={index} className="border border-gray-300 bg-white p-4 rounded-xl space-y-2.5">
                    <div className="flex items-center justify-between text-gray-500">
                      <h4>{nav.label}</h4>
                      <div className="border border-gray-300 flex items-center justify-center p-1 rounded-md bg-gray-100">
                        <nav.icon size={18}/>
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-[#243E59]">{nav.rooms}</div>
                    <p className="text-xs text-gray-500">{nav.desc}</p>
                  </div>
                )
              })}
            </div>
            
            <div className="border border-gray-300 rounded-xl">
              <div className="p-4 flex items-center justify-between border-b border-gray-300">
                <div className="inline-flex items-center gap-2 w-70 border border-gray-300 px-3 py-2 rounded-lg">
                  <Search size={18} className="text-gray-500"/>
                  <input type="text" placeholder="Search room number..." className="text-sm focus:outline-none"/>
                </div>

                <div className="flex items-center gap-4">
                  <Dropdown dropdownOptions={statusOptions}/>
                  <Dropdown dropdownOptions={floorOptions}/>
                </div>
              </div>

              <div className="p-4 grid grid-cols-3 gap-4 ">
                <div className="border border-gray-300 rounded-lg">
                  <div className="flex items-center justify-center h-40 bg-gray-200 rounded-tl-lg rounded-tr-lg">
                    <DoorOpen size={40}/>
                  </div>
                  <div className="p-4 space-y-3">
                    <h1 className="text-lg font-medium">Room 101</h1>
                    <div className="text-sm text-gray-500">Single room - Floor 1</div>
                    <div >
                      <span className="text-2xl font-medium">₱4,500</span>
                      <span className="text-sm text-gray-500"> / month</span>
                    </div> 
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <UserRound size={16}/>
                      <span>Gabriel Concepcion</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </AdminLayout>
    </main>
  )
}