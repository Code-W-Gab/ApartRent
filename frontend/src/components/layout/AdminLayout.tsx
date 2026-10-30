import Sidebar from "../common/sidebar";
import Header from "../common/header";
import type React from "react";

interface LayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: LayoutProps){
  return(
    <main className="grid h-screen grid-cols-[250px_1fr]">
      <Sidebar />
      <div className="flex min-h-0 flex-col">
        <Header />
        <section className="flex-1 overflow-y-auto bg-[#F6F8FB]">
          {children}
        </section>
      </div>
    </main>
  )
}