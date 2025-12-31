import React, { useContext } from "react";
import Card from "@/components/Card";
import DonutChart from "./components/DonutChart";
import User from "@/components/User";
// TAMBAHAN: Import icon Menu
import { Leaf, PieChart, List, Menu } from "lucide-react";
import { formatCurrency, formatNumber } from "@/services/GeneralHelper";
import { AppContext } from "@/contexts/AppContext";

function StatusPSP() {
  const { setMobileMenuOpen } = useContext(AppContext);

  // --- 1. DATA DUMMY ---
  const statusData = {
    total: 520072,
    sudah: 336300,
    belum: 193826,
  };

  const nilaiData = {
    sudah: 12849958013451,
    belum: 3334097635354,
  };

  const tableData = [
    { name: "Sekretariat Jenderal", sudah: 27590, belum: 732, total: 34722, persentase: 98 },
    { name: "Inspektorat Jenderal", sudah: 1289, belum: 0, total: 1289, persentase: 100 },
    { name: "Ditjen Binapenta", sudah: 23021, belum: 16989, total: 40198, persentase: 63.2 },
    { name: "PHI dan Jamsostek", sudah: 10403, belum: 9402, total: 19805, persentase: 56 },
  ];

  // --- 2. CONFIG CHART ---
  const chartStatusData = [
    { value: statusData.sudah, name: "Sudah PSP", itemStyle: { color: "#C0D756" } },
    { value: statusData.belum, name: "Belum PSP", itemStyle: { color: "#8E8E93" } },
  ];

  const chartNilaiData = [
    { value: nilaiData.sudah, name: "Sudah PSP", itemStyle: { color: "#C0D756" } },
    { value: nilaiData.belum, name: "Belum PSP", itemStyle: { color: "#8E8E93" } },
  ];

  // --- 3. HELPER COMPONENTS ---
  const CardIcon = ({ icon: Icon, colorClass, bgClass }) => (
    <div className={`absolute -top-5 left-6 w-10 h-10 rounded-full flex items-center justify-center ${bgClass} shadow-sm border border-white`}>
      <Icon size={20} className={colorClass} />
    </div>
  );

  const LegendItem = ({ color, label, value, isCurrency = false }) => (
    <div className="flex flex-col mb-4">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
        <span className="text-gray-600 text-sm font-medium">{label}</span>
      </div>
      <span className="text-xl font-bold text-gray-900 ml-5 break-all">
        {isCurrency ? formatCurrency(value) : formatNumber(value)}
      </span>
    </div>
  );

  const PercentageBadge = ({ value }) => {
    let style = "bg-gray-100 text-gray-600";
    if (value >= 90) style = "bg-green-100 text-green-600";
    else if (value >= 60) style = "bg-yellow-100 text-yellow-600";
    else style = "bg-pink-100 text-pink-600";

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold ${style}`}>
        {value}%
      </span>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans p-4 md:p-8">
      
      {/* 1. HAMBURGER MENU (MOBILE ONLY) */}
      <button 
          onClick={() => setMobileMenuOpen(prev => !prev)}
          className="fixed top-4 left-4 z-50 p-2.5 bg-white/90 backdrop-blur-sm rounded-xl shadow-md border border-gray-100 text-gray-600 hover:bg-gray-50 active:scale-95 active:bg-gray-200 transition-all cursor-pointer md:hidden"
      >
          <Menu size={24} />
      </button>

      {/* HEADER PAGE (Ditambah pl-16 di mobile agar tidak tertutup tombol menu) */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 md:gap-0 pl-14 md:pl-0">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
          Barang Milik Negara
        </h1>
        <div className="self-end md:self-auto">
           <User name={"Administrator"} previlege={"Administrator"} />
        </div>
      </div>

      {/* GRID ATAS: 2 CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 pt-4"> 
        
        {/* CARD 1: STATUS PENETAPAN */}
        <Card className="p-6 pt-10 rounded-[2rem] bg-white shadow-sm border border-gray-100 relative overflow-visible">
          <CardIcon icon={Leaf} bgClass="bg-green-50" colorClass="text-[#C0D756]" />
          
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Status Penetapan Status Penggunaan
          </h3>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="w-[180px] h-[180px] shrink-0">
              <DonutChart 
                data={chartStatusData} 
                height="h-full" 
                radius={["55%", "85%"]} 
              />
            </div>

            <div className="flex flex-col w-full md:w-auto">
               <LegendItem color="#40C4FF" label="Total Aset" value={statusData.total} />
               <div className="grid grid-cols-2 gap-x-8 md:flex md:flex-col md:gap-x-0">
                 <LegendItem color="#C0D756" label="Sudah PSP" value={statusData.sudah} />
                 <LegendItem color="#8E8E93" label="Belum PSP" value={statusData.belum} />
               </div>
            </div>
          </div>
        </Card>

        {/* CARD 2: NILAI BMN */}
        <Card className="p-6 pt-10 rounded-[2rem] bg-white shadow-sm border border-gray-100 relative overflow-visible">
          <CardIcon icon={PieChart} bgClass="bg-pink-50" colorClass="text-pink-500" />
          
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Nilai BMN Berdasarkan Status PSP
          </h3>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="w-[180px] h-[180px] shrink-0">
              <DonutChart 
                data={chartNilaiData} 
                height="h-full" 
                radius={["55%", "85%"]} 
              />
            </div>

            <div className="flex flex-col w-full md:w-auto">
               <LegendItem 
                 color="#C0D756" 
                 label="Sudah PSP" 
                 value={nilaiData.sudah} 
                 isCurrency={true} 
               />
               <LegendItem 
                 color="#8E8E93" 
                 label="Belum PSP" 
                 value={nilaiData.belum} 
                 isCurrency={true} 
               />
            </div>
          </div>
        </Card>

      </div>

      {/* CARD BAWAH: TABLE RINCIAN */}
      <Card className="p-6 pt-10 rounded-[2rem] bg-white shadow-sm border border-gray-100 relative mt-8 overflow-visible">
        <CardIcon icon={List} bgClass="bg-yellow-50" colorClass="text-yellow-500" />
        
        <h3 className="text-lg font-bold text-gray-900 mb-6">
          Rincian Status PSP per Eselon 1
        </h3>

        <div className="w-full overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full min-w-[800px] text-sm text-left">
            <thead className="text-white bg-blue-500 uppercase font-bold text-xs">
              <tr>
                <th className="px-6 py-4 rounded-tl-xl">Eselon 1</th>
                <th className="px-6 py-4">Sudah PSP</th>
                <th className="px-6 py-4">Belum PSP</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4 rounded-tr-xl">Persentase</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index} className="border-b border-gray-100 last:border-none hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-gray-800">{row.name}</td>
                  <td className="px-6 py-4 text-gray-600">{formatNumber(row.sudah)}</td>
                  <td className="px-6 py-4 text-gray-600">{formatNumber(row.belum)}</td>
                  <td className="px-6 py-4 text-gray-600">{formatNumber(row.total)}</td>
                  <td className="px-6 py-4">
                    <PercentageBadge value={row.persentase} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

    </div>
  );
}

export default StatusPSP;