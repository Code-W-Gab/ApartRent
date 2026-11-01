import { Navigate, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/admin/DashboardPage";
import RoomsPage from "./pages/admin/RoomsPage";
import TenantsPage from "./pages/admin/TenantsPage";
import LeasesPage from "./pages/admin/LeasesPage";
import RentPaymentPage from "./pages/admin/RentPaymentPage";
import RulesPage from "./pages/admin/RulesPage";
import AnnouncementsPage from "./pages/admin/AnnouncementsPage";

export default function App() {
  return(
    <main>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard"/>}/>
        <Route path="/dashboard" element={<DashboardPage/>}/>
        <Route path="/rooms" element={<RoomsPage/>}/>
        <Route path="/tenants" element={<TenantsPage/>}/>
        <Route path="/leases" element={<LeasesPage/>}/>
        <Route path="/rents&payment" element={<RentPaymentPage/>}/>
        <Route path="/rules" element={<RulesPage/>}/>
        <Route path="/announcements" element={<AnnouncementsPage/>}/>
      </Routes>
    </main>
  )
}