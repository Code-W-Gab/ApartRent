import { BookOpen, BuildingComplex, DoorOpen, FileText, LayoutDashboard, Megaphone, UsersRound, WalletMinimal } from "lucide-react"
import type React from "react"
import { Link } from "react-router-dom"

export default function sidebar(){

  interface INav {
    name: string,
    icon: React.ElementType,
    to: string
  }

  const navOption: INav[] = [
    { name: "Dashboard", icon: LayoutDashboard, to: "/dashboard" }, 
    { name: "Rooms", icon:  DoorOpen, to: "/rooms" }, 
    { name: "Tenants", icon: UsersRound, to: "/tenants" },
    { name: "Leases", icon: FileText, to: "/leases" },  
    { name: "Rent & Payments", icon: WalletMinimal, to: "/rents&payment" }, 
    { name: "House Rules", icon: BookOpen, to: "/rules" }, 
    { name: "Announcements", icon: Megaphone, to: "/announcements" }, 
  ]


  return(
    <div className="bg-[#243E59] px-4 space-y-3">
      <div className="py-6 flex items-center gap-3 px-2.5">
        <BuildingComplex size={26} className="text-[#D6B36A]"/>
        <div className="text-xl font-bold text-white">Apart<span className="text-gray-400">Rent</span></div>
      </div>
      <div>
        <div>
          <h1 className="text-xs text-gray-300 mb-3 px-2.5">WORKSPACE</h1>
        </div>
        <nav className="flex flex-col gap-2">
          {navOption.map(nav => {
            const active = location.pathname === nav.to;

            return(
              <Link to={nav.to} className={`text-gray-300 flex items-center gap-3 px-2.5 py-2.5 rounded-md hover:bg-gray-500 cursor-pointer ${active ? "bg-gray-500 text-white" : ""}`}>
                <nav.icon size={20}/>
                <span>{nav.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}