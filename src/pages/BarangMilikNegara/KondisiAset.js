import React, { useContext } from "react";
import Card from "@/components/Card";
import DonutChart from "./components/DonutChart";
import User from "@/components/User";
// TAMBAHAN: Import icon Menu
import { Leaf, PieChart, List, Menu } from "lucide-react";
import { formatCurrency, formatNumber } from "@/services/GeneralHelper";
import { AppContext } from "@/contexts/AppContext";

function KondisiAset() {
  const { setMobileMenuOpen } = useContext(AppContext);

  // --- 1. DATA DUMMY ---
  const kondisiData = {
    total: 520072,
    baik: 336300,
    rusakRingan: 193826,
    rusakBerat: 193826,
    nilaiAset: 16920388457705
  };

  const nilaiKondisiData = {
    baik: 15831069013295,
    rusakRingan: 44958013451,
    rusakBerat: 20097635354
  };

  const tableData = [
    { name: "Sekretariat Jenderal", baik: 23378, rusakRingan: 9, rusakBerat: 4941, total: 28328 },
    { name: "Inspektorat Jenderal", baik: 1257, rusakRingan: 32, rusakBerat: 0, total: 1289 },
    { name: "Ditjen Binapenta", baik: 35171, rusakRingan: 16, rusakBerat: 5011, total: 40198 },
    { name: "PHI dan Jamsostek", baik: 3039, rusakRingan: 0, rusakBerat: 7399, total: 10438 },
  ];

  // --- 2. CONFIG CHART ---
  const chartKondisiData = [
    { value: kondisiData.baik, name: "Kondisi Baik", itemStyle: { color: "#C0D756" } },
    { value: kondisiData.rusakRingan, name: "Rusak Ringan", itemStyle: { color: "#FFB300" } },
    { value: kondisiData.rusakBerat, name: "Rusak Berat", itemStyle: { color: "#F50057" } },
  ];

  const chartNilaiData = [
    { value: nilaiKondisiData.baik, name: "Kondisi Baik", itemStyle: { color: "#C0D756" } },
    { value: nilaiKondisiData.rusakRingan, name: "Rusak Ringan", itemStyle: { color: "#FFB300" } },
    { value: nilaiKondisiData.rusakBerat, name: "Rusak Berat", itemStyle: { color: "#F50057" } },
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
        <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: color }}></div>
        <span className="text-gray-600 text-sm font-medium">{label}</span>
      </div>
      <span className="text-xl font-bold text-gray-900 ml-5 break-all">
        {isCurrency ? formatCurrency(value) : formatNumber(value)}
      </span>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen font-sans p-4 md:p-8">
      
      {/* HEADER PAGE (Padding left mobile untuk menghindari tombol menu) */}
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
        
        {/* CARD 1: KONDISI ASET */}
        <Card className="p-6 pt-10 rounded-[2rem] bg-white shadow-sm border border-gray-100 relative overflow-visible">
          <CardIcon icon={Leaf} bgClass="bg-green-50" colorClass="text-[#C0D756]" />
          
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Kondisi Aset
          </h3>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="w-[180px] h-[180px] shrink-0">
              <DonutChart 
                data={chartKondisiData} 
                height="h-full" 
                radius={["55%", "85%"]} 
              />
            </div>

            <div className="flex flex-col w-full md:w-auto">
               <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                   <LegendItem color="#40C4FF" label="Total Aset" value={kondisiData.total} />
                   <LegendItem color="#C0D756" label="Kondisi Baik" value={kondisiData.baik} />
                   <LegendItem color="#FFB300" label="Rusak Ringan" value={kondisiData.rusakRingan} />
                   <LegendItem color="#F50057" label="Rusak berat" value={kondisiData.rusakBerat} />
               </div>
               <div className="mt-2">
                    <LegendItem 
                        color="#8E8E93" 
                        label="Nilai Aset" 
                        value={kondisiData.nilaiAset} 
                        isCurrency={true} 
                    />
               </div>
            </div>
          </div>
        </Card>

        {/* CARD 2: NILAI ASET */}
        <Card className="p-6 pt-10 rounded-[2rem] bg-white shadow-sm border border-gray-100 relative overflow-visible">
          <CardIcon icon={PieChart} bgClass="bg-pink-50" colorClass="text-pink-500" />
          
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Nilai Aset Berdasarkan Kondisi
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
                 label="Kondisi Baik" 
                 value={nilaiKondisiData.baik} 
                 isCurrency={true} 
               />
               <LegendItem 
                 color="#FFB300" 
                 label="Rusak Ringan" 
                 value={nilaiKondisiData.rusakRingan} 
                 isCurrency={true} 
               />
               <LegendItem 
                 color="#F50057" 
                 label="Rusak Berat" 
                 value={nilaiKondisiData.rusakBerat} 
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
          Rincian Kondisi Aset per Eselon 1
        </h3>

        <div className="w-full overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full min-w-[800px] text-sm text-left">
            <thead className="text-white bg-blue-500 uppercase font-bold text-xs">
              <tr>
                <th className="px-6 py-4 rounded-tl-xl">Eselon 1</th>
                <th className="px-6 py-4">Baik</th>
                <th className="px-6 py-4">Rusak Ringan</th>
                <th className="px-6 py-4">Rusak Berat</th>
                <th className="px-6 py-4 rounded-tr-xl">Total</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index} className="border-b border-gray-100 last:border-none hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-gray-800">{row.name}</td>
                  <td className="px-6 py-4 text-gray-600">{formatNumber(row.baik)}</td>
                  <td className="px-6 py-4 text-gray-600">{formatNumber(row.rusakRingan)}</td>
                  <td className="px-6 py-4 text-gray-600">{formatNumber(row.rusakBerat)}</td>
                  <td className="px-6 py-4 font-bold text-blue-600">{formatNumber(row.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

    </div>
  );
}

export default KondisiAset;