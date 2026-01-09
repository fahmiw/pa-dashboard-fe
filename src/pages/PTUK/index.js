import React, { useContext } from "react";
import User from "@/components/User";
import { AppContext } from "@/contexts/AppContext";
import { Menu, FileText, MessageSquare } from "lucide-react"; 
import DonutChart from "./DonutChart";
import UnitPieChart from "./UnitPieChart"; 
import { ptukStats, lhpChartData, pengelolaCards } from "./constants"; 

function PTUK() {
  const { userData, setMobileMenuOpen } = useContext(AppContext);
  const userName = userData?.name || "Administrator";
  const userRole = userData?.role?.toUpperCase() || "ADMIN";

  // Helper Khusus untuk Floating Icon
  const FloatingIcon = ({ icon: Icon, bgClass, colorClass }) => (
    <div className={`absolute -top-5 left-4 md:left-6 w-12 h-12 rounded-xl flex items-center justify-center ${bgClass} shadow-sm border border-white z-10`}>
      {React.isValidElement(Icon) ? 
        React.cloneElement(Icon, { size: 24, className: colorClass }) : 
        <Icon size={24} className={colorClass} />
      }
    </div>
  );

  return (
    <div>
        {/* --- HEADER CORRECTION --- */}
      <div className="flex justify-between items-center px-4 md:px-4 border-b border-gray-100 z-20 bg-white shrink-0 pl-20 md:pl-8 transition-all">
        <div className="flex items-center">
            <h1 className="text-xl  font-bold text-gray-900 tracking-tight">PTUK</h1>
        </div>
        {/* Container User tetap 'w-auto' agar mepet kanan */}
        <div className="w-auto">
            <User
                name={userName}
                previlege={userRole}
                username={userData?.biro_code}
                role={userData?.role}
            />
        </div>
      </div>
    <div className="bg-[#F8FAFC] min-h-screen font-sans p-4 md:p-8 pb-20 overflow-x-hidden relative"> 

      {/* ---  CHART LHP KEMENTRIAN --- */}
      
      <div className="bg-white rounded-[1.5rem] p-6 md:p-10 pt-8 md:pt-12 shadow-sm border border-gray-100 relative overflow-visible mt-8 md:mt-4">
        <FloatingIcon icon={FileText} bgClass="bg-lime-50" colorClass="text-lime-600" />
        
        <div className="ml-14 md:ml-20 mt-1 mb-6 relative z-10">
             <h3 className="font-bold text-gray-900 text-lg md:text-xl">LHP Kementrian</h3>
        </div>
        
        {/* Pada mobile, stack vertikal (flex-col), pada desktop horizontal (md:flex-row) */}
        <div className="flex flex-col md:flex-row items-center md:items-stretch gap-8 mt-2">
             <div className="w-full md:w-[40%] flex items-center justify-center min-h-[250px] md:min-h-[300px]">
                <div className="w-60 h-60 md:w-72 md:h-72"> 
                   <DonutChart data={lhpChartData} height="h-full" />
                </div>
             </div>
             <div className="w-full md:w-[60%] grid grid-cols-2 gap-x-4 md:gap-x-8 gap-y-6 content-center pl-0 md:pl-4 pt-0">
                {/* Stats items... (Kode sama seperti sebelumnya, sudah responsif) */}
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#59C7FF]"></div>
                        <span className="text-xs md:text-sm font-semibold text-gray-600">TL Status Sesuai</span>
                    </div>
                    <span className="text-3xl md:text-[2.5rem] leading-none font-extrabold text-gray-900">1399</span>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FC0166]"></div>
                        <span className="text-xs md:text-sm font-semibold text-gray-600">TL Status belum sesuai</span>
                    </div>
                    <span className="text-3xl md:text-[2.5rem] leading-none font-extrabold text-gray-900">655</span>
                </div>
                <div className="flex flex-col gap-1 justify-end">
                     <div className="flex items-center gap-2">
                         <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#898A8D]"></div>
                         <span className="text-xs md:text-sm font-semibold text-gray-600">TPTD</span>
                     </div>
                     <span className="text-3xl md:text-[2.5rem] leading-none font-extrabold text-gray-900 mt-1">18</span>
                </div>
                <div>
                    <div className="bg-[#3B82F6] rounded-xl p-4 md:p-5 text-white w-full shadow-md shadow-blue-100/50 h-full flex flex-col justify-center">
                        <span className="block text-xs md:text-sm font-medium opacity-90 mb-1">Total Rekomendasi</span>
                        <span className="block text-2xl md:text-3xl font-bold">2.072</span>
                    </div>
                </div>
             </div>
        </div>
      </div>

      {/* ---  6 KARTU STATISTIK --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-y-6 gap-x-6 pt-4">
        {ptukStats.map((item, index) => (
            <div key={index} className={`bg-white rounded-xl p-5 md:p-6 shadow-sm border border-gray-50 border-l-[6px] ${item.border} flex flex-col justify-between min-h-[140px] md:min-h-[160px] hover:shadow-md transition-shadow`}>
                <div>
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${item.bgIcon} flex items-center justify-center mb-3 md:mb-4`}>
                        {React.cloneElement(item.icon, { size: 24 })}
                    </div>
                    <span className="text-sm md:text-base font-medium text-gray-600 block mb-1">{item.title}</span>
                </div>
                <div className="text-2xl md:text-[1.75rem] font-bold text-gray-900 tracking-tight">
                    {item.value}
                </div>
            </div>
        ))}
      </div>

      {/* ---  PENGELOLA KEUANGAN --- */}
      <div className="pt-2 md:pt-4">
        <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-8 pt-4 shadow-sm border border-gray-100 relative overflow-visible mt-8">
            <FloatingIcon icon={MessageSquare} bgClass="bg-lime-50" colorClass="text-lime-600" />
            <div className="ml-14 md:ml-20 mt-1 mb-6 md:mb-8">
                 <h2 className="text-lg md:text-2xl font-bold text-gray-900">Pengelola Keuangan</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4">
                {[...Array(4)].map((_, idx) => (
                    <div key={idx} className="flex items-center justify-center">
                        <UnitPieChart height="h-40 md:h-48" />
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-6 md:mt-8">
                 {pengelolaCards.map((item, index) => (
                     <div key={index} className={`bg-white rounded-xl p-4 md:p-5 shadow-sm border border-gray-50 border-l-[6px] ${item.border} hover:shadow-md transition-all`}>
                         <div className={`w-9 h-9 md:w-10 md:h-10 rounded-lg ${item.bgIcon} flex items-center justify-center mb-3`}>
                             {item.icon}
                         </div>
                         <span className="text-xs md:text-sm font-medium text-gray-600 block mb-2 min-h-[auto] md:min-h-[40px]">{item.title}</span>
                         <span className="text-2xl md:text-3xl font-bold text-gray-900">{item.value}</span>
                     </div>
                 ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4 mt-6 md:mt-8">
                {[...Array(4)].map((_, idx) => (
                    <div key={`bottom-${idx}`} className="flex items-center justify-center">
                         <UnitPieChart height="h-40 md:h-48" />
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default PTUK;