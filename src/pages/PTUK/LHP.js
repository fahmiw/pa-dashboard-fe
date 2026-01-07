import React, { useContext } from "react";
import User from "@/components/User";
import { AppContext } from "@/contexts/AppContext";
import { Menu } from "lucide-react";

function LHP() {
  const { userData, setMobileMenuOpen } = useContext(AppContext);
  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans p-4 md:p-8">
      <div className="flex justify-between items-center mb-8 pl-12 md:pl-0">
         <div className="flex items-center gap-4">
            <button onClick={() => setMobileMenuOpen(p => !p)} className="md:hidden p-2 bg-white rounded-lg shadow-sm"><Menu size={20}/></button>
            <h1 className="text-3xl font-bold text-gray-900">LHP Kementrian</h1>
         </div>
         <User name={userData?.name} previlege={userData?.role} />
      </div>
      <div className="bg-white p-8 rounded-[2rem] shadow-sm min-h-[500px]">
         <p>Konten Tabel LHP akan ditampilkan di sini.</p>
      </div>
    </div>
  );
}
export default LHP;