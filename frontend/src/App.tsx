import Header from "./components/common/header";
import Sidebar from "./components/common/sidebar";

export default function App() {
  return(
    <main className="grid h-screen grid-cols-[250px_1fr]">
      <Sidebar />
      <div className="flex min-h-0 flex-col">
        <Header />
        <section className="flex-1 overflow-y-auto bg-[#F6F8FB]">
          body
        </section>
      </div>
    </main>
  )
}