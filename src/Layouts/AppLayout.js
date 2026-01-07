import React, { useContext } from "react"; // 1. Import 
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import Sidebar from "../components/Sidebar";
import User from "../components/User";
import { AppContext } from "../contexts/AppContext"; // 2. Import Context

function AppLayout({ children, isAdmin }) {
  // 3. Ganti useState lokal dengan Global Context
  // HAPUS: const [sidebarOpen, setSidebarOpen] = useState(false);
  const { mobileMenuOpen, setMobileMenuOpen } = useContext(AppContext);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f9fafb]">

      {/* === HAMBURGER (MOBILE ONLY) === */}
      {!mobileMenuOpen && (
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="
            fixed top-3 left-4 
            z-[9999]
            p-2.5 
            bg-white rounded-xl shadow
            md:hidden
          "
        >
          <Menu size={24} />
        </button>
      )}


      {/* === OVERLAY MOBILE === */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* === SIDEBAR === */}
      <aside
        className={`
          fixed top-0 left-0 z-50 w-[260px] h-screen overflow-auto
          transform transition-transform duration-300
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static
        `}
      >
        <Sidebar isAdmin={isAdmin} onNavigate={() => setMobileMenuOpen(false)} />
      </aside>
      
      {/* Konten utama */}
      
      <main className="flex-1 p-0 overflow-auto transition-all duration-300 relative">
        {children}
      </main>
    </div>

  );
}

export default AppLayout;