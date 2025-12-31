import React, { useContext } from "react"; // 1. Import useContext
import Sidebar from "../components/Sidebar";
import { AppContext } from "../contexts/AppContext"; // 2. Import Context

function AppLayout({ children, isAdmin }) {
  // 3. Ganti useState lokal dengan Global Context
  // HAPUS: const [sidebarOpen, setSidebarOpen] = useState(false);
  const { mobileMenuOpen, setMobileMenuOpen } = useContext(AppContext);

  return (
    <div className="flex h-screen overflow-hidden">
      
      {/* Overlay mobile */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[55] md:hidden" // z-index harus > 50 (header) tapi < 60 (sidebar)
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-[60] w-64 bg-gray-100 transform transition-transform duration-300
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:flex
        `}
      >
        {/* Update onNavigate agar menutup sidebar global */}
        <Sidebar isAdmin={isAdmin} onNavigate={() => setMobileMenuOpen(false)} />
      </aside>

      {/* Konten utama */}
      <main className="flex-1 p-0 overflow-auto transition-all duration-300 relative">
        
        {/* CATATAN: 
           Tombol Hamburger bawaan Layout ini (☰) mungkin akan double dengan yang di Tata Usaha.
           Jika King ingin menyembunyikannya khusus di halaman Tata Usaha, bisa pakai CSS conditional.
           Tapi untuk sekarang, biarkan dulu agar halaman lain tetap punya tombol menu.
        */}
        <div className="md:hidden sticky top-0 z-40 pl-4 pt-2 absolute"> 
          {/* Saya buat absolute/hidden atau styling minimalis jika bertabrakan */}
        </div>

        {children}
      </main>
    </div>
  );
}

export default AppLayout;