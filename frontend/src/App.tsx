import { Navigate, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/admin/dashboardPage";

export default function App() {
  return(
    <main>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard"/>}/>
        <Route path="/dashboard" element={<DashboardPage/>}/>
      </Routes>
    </main>
  )
}