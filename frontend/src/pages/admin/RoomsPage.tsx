import { ArrowRight, ArrowUpRight, BuildingComplex, DoorOpen, LayoutGrid, List, Plus, Search, UserRound, UsersRound, Wrench, X } from "lucide-react"
import AdminLayout from "../../components/layout/AdminLayout"
import Dropdown from "../../components/common/dropdown"
import { useState } from "react"
import ViewDetailsModal from "../../components/overlays/ViewDetailsModal"
import AddRoomModal from "../../components/overlays/AddRoomModal"
import { useRoom } from "../../hook/useRoom"
import type { floor, IRoom, status, INav, activeFilter } from "../../types/room.types"
import Status from "../../components/common/Status"

interface DropdownOption<T extends string | number> {
  option: string;
  value: T;
}

const floorOptions: DropdownOption<floor | "">[] = [
  { option: "All floors", value: "" },
  { option: "Floor 1", value: 1 },
  { option: "Floor 2", value: 2 },
  { option: "Floor 3", value: 3 },
  { option: "Floor 4", value: 4 },
];

const statusOptions: DropdownOption<status | "">[] = [
  { option: "All statuses", value: "" },
  { option: "Available", value: "Available" },
  { option: "Occupied", value: "Occupied" },
  { option: "Reserved", value: "Reserved" },
];

export default function RoomsPage() {
  const [isViewDetailsModalOpen, setIsViewDetailsModalOpen] = useState<boolean>(false)
  const [isAddRoomModalOpen, setIsAddRoomModalOpen] = useState<boolean>(false);
  const [selectedRoom, setSelectedRoom] = useState<IRoom | null>(null);
  const [roomNumberSearch, setRoomNumberSearch] = useState(""); 
  const [statusFilter, setStatusFilter] = useState<status | "">("");
  const [floorFilter, setFloorFilter] = useState<floor | "">("");
  const [isActiveFilter, setIsActiveFilter] = useState<activeFilter>("grid");
  const [page, setPage] = useState(1);
  const pageSize = 9;
  const searchValue = roomNumberSearch.trim();
  const roomNumber = /^\d+$/.test(searchValue)
    ? Number(searchValue)
    : undefined;
  const {
    rooms,
    handleCreateRoom,
    handleUpdateRoom,
    handleDeleteRoom,
  } = useRoom(
    roomNumber,
    statusFilter || undefined,
    floorFilter || undefined,
  );

  const totalRooms = rooms.length;
  const totalPages = Math.max(1, Math.ceil(totalRooms / pageSize));

  // Keep the displayed page valid when rooms are deleted.
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;

  const paginatedRooms = rooms.slice(startIndex, startIndex + pageSize);

  const firstRecord = totalRooms === 0 ? 0 : startIndex + 1;
  const lastRecord = Math.min(startIndex + pageSize, totalRooms);


  const navOption:INav[] = [
    { label: "Total rooms", rooms: rooms.length, desc: "Your entire property", icon: BuildingComplex },
    { label: "Occupied", rooms: rooms.filter(room => room.status === "Occupied").length, desc: "A place to call home", icon: UsersRound },
    { label: "Available", rooms: rooms.filter(room => room.status === "Available").length, desc: "Ready for move-in", icon: DoorOpen },
    { label: "Under maintenance", rooms: 1, desc: "Getting a little attention", icon: Wrench }
  ]

  const clearFilters = () => {
    setRoomNumberSearch("")
    setFloorFilter("")
    setStatusFilter("")
    setPage(1)
  }

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
                <button onClick={() => setIsAddRoomModalOpen(true)} className="flex items-center gap-2 px-4 py-3 rounded-md text-white bg-[#243E59]">
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
                    value={roomNumberSearch}
                    onChange={(e) => {
                      setRoomNumberSearch(e.target.value);
                      setPage(1)
                    }}
                    className="text-sm focus:outline-none text-gray-600 w-full"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <Dropdown
                    dropdownOptions={statusOptions}
                    value={statusFilter}
                    setValue={(value) => {
                      setStatusFilter(value);
                      setPage(1)
                    }}
                  />

                  <Dropdown
                    dropdownOptions={floorOptions}
                    value={floorFilter}
                    setValue={(value) => {
                      setFloorFilter(value);
                      setPage(1);
                    }}
                  />

                  <div className="flex items-center gap-4 border border-[#dfe5ed] px-3 py-2 h-10 rounded-lg text-sm">
                    <button onClick={() => setIsActiveFilter('grid')} className={`cursor-pointer ${isActiveFilter === "grid" ? "text-black" : "text-gray-500"}`}>
                      <LayoutGrid size={18}/>
                    </button>
                    <button onClick={() => setIsActiveFilter('list')} className={`cursor-pointer ${isActiveFilter === "list" ? "text-black" : "text-gray-500"}`}>
                      <List size={18}/>
                    </button>
                  </div>

                  { 
                    roomNumberSearch !== "" || statusFilter !== "" || floorFilter !== ""
                    ? <div className="border-l pl-3 border-[#dfe5ed]">
                        <button onClick={() => clearFilters()} className="flex items-center gap-1 text-sm px-2 py-2 rounded-lg text-white bg-blue-500 cursor-pointer hover:bg-blue-400">
                          <X size={16}/>
                          <span>Clear Filters</span>
                        </button>
                      </div>
                    : ""
                  }
                </div>
              </div>
              
              {/* GRID ROOMS */}
              {
              isActiveFilter === "grid"
              ? <div className="p-4 grid grid-cols-3 2xl:grid-cols-4 gap-4 border-b border-[#dfe5ed]">
                  {
                    rooms.length === 0 
                    ? <div className="col-span-3 text-sm text-gray-500">No rooms found. Try a different room number or add a room.</div>
                    : paginatedRooms.map((room) => {
                      return(
                        <div key={room._id} className="border border-[#dfe5ed] rounded-lg">
                          <div className="relative flex items-center justify-center h-40 bg-gray-200 rounded-tl-lg rounded-tr-lg">
                            <DoorOpen size={40}/>
                            <Status status={room.status} filterType={isActiveFilter}/>
                            <div className="absolute bottom-2 left-4 text-sm text-gray-500">{room.floor} / {room.roomNumber}</div>
                          </div>
                          <div className="p-4 space-y-3">
                            <h1 className="text-lg font-medium">Room {room.roomNumber}</h1>
                            <div className="text-sm text-gray-500">{room.type} - Floor {room.floor}</div>
                            <div >
                              <span className="text-2xl font-medium">₱{room.monthlyRent}</span>
                              <span className="text-sm text-gray-500"> / month</span>
                            </div> 
                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                              <UserRound size={16}/>
                              <span>Gabriel Concepcion</span>
                            </div>
                            <button onClick={() => {
                              setIsViewDetailsModalOpen(true)
                              setSelectedRoom(room)
                            }} className="flex items-center justify-between w-full border border-[#dfe5ed] text-gray-700 px-3 py-1.5 rounded-md cursor-pointer hover:border-gray-500">
                              <span>View details</span>
                              <ArrowRight size={18}/>
                            </button>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              : <div className="border-b border-[#dfe5ed]">
                  <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,0.8fr)] *:min-w-0 *:wrap-anywhere] items-center gap-4 p-4 text-sm bg-[#F6F8FB] text-gray-500 ">
                    <span>Room</span>
                    <span>Type</span>
                    <span>Monthly rent</span>
                    <span>Tenant</span>
                    <span>Status</span>
                    <span>Action</span>
                  </div>

                  {
                    rooms.length === 0 
                    ? <div className="col-span-3 text-sm text-gray-500 p-4">No rooms found. Try a different room number or add a room.</div>
                    : paginatedRooms.map((room) => {
                      return(
                        <div key={room._id} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,0.8fr)] *:min-w-0 *:wrap-anywhere] items-center gap-4 px-4 py-3 text-sm text-gray-500">
                          <span className="text-gray-600 font-medium">Room {room.roomNumber}</span>
                          <span>{room.type}</span>
                          <span>₱{room.monthlyRent}</span>
                          <span>Gabriel Concepcion</span>
                          <div>
                            <Status status={room.status} filterType={isActiveFilter}/>
                          </div>
                          <button 
                            onClick={() => {
                              setIsViewDetailsModalOpen(true)
                              setSelectedRoom(room)
                            }} 
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
              }

              <div className="p-4 flex flex-wrap items-center justify-between gap-3">
                <div className="text-sm text-gray-500" aria-live="polite">
                  Showing {firstRecord}–{lastRecord} of {totalRooms} records
                </div>

                <nav aria-label="Rooms pagination" className="flex items-center gap-3">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => setPage(Math.max(1, currentPage - 1))}
                    className="border border-gray-300 text-gray-500 px-3 py-1.5
                              rounded-md text-sm enabled:cursor-pointer
                              enabled:hover:border-gray-500 disabled:opacity-40
                              disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>

                  <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
                    className="border border-gray-300 text-gray-500 px-3 py-1.5
                              rounded-md text-sm enabled:cursor-pointer
                              enabled:hover:border-gray-500 disabled:opacity-40
                              disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </nav>
              </div>

            </div>
          </section>

          {isViewDetailsModalOpen && selectedRoom && (
            <div className="fixed inset-0 flex bg-gray-800/50 items-center justify-center z-40">
              <div className="z-50">
              <ViewDetailsModal
                room={selectedRoom}
                handleUpdateRoom={handleUpdateRoom}
                handleDeleteRoom={handleDeleteRoom}
                onClose={() => {
                  setIsViewDetailsModalOpen(false)
                  setSelectedRoom(null)
                }}
              />
              </div>
            </div>
          )}

          {isAddRoomModalOpen && (
            <div className="fixed inset-0 flex bg-gray-800/50 items-center justify-center z-40">
              <div className="z-50">
                <AddRoomModal
                  handleCreateRoom={handleCreateRoom}
                  onClose={() => setIsAddRoomModalOpen(false)}
                />
              </div>
            </div>
          )}
        </div>
      </AdminLayout>
    </main>
  )
}