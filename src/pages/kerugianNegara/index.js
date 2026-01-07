import React, { useEffect, useRef, useState } from "react";
import Title from "@/components/Title";
import Paper from "@/components/Paper";
import User from "@/components/User";
import { Flame, TrendingUp, BarChart3 } from "lucide-react";
import BarChart from "./BarChart";

/* ================= DATA ================= */
const ESELON_OPTIONS = [
  "BINALAVOTAS", "BINAPENTA", "PHI & JAMSO", "SEKRETARIAT JENDERAL KEMNAKER",
  "BINWASNAKER", "BARENBANG", "INSPEKTORAT JENDERAL"
];

const PNBP_DATA = [
  { eselon: "DITJEN BINALAVOTAS", kerugian: 5290360987000, tdkLanjut: 3290360987000, sisa: 305715270761, persentase: 98 },
  { eselon: "DITJEN BINAPENTA & PKK", kerugian: 5290360987000, tdkLanjut: 3290360987000, sisa: 305715270761, persentase: 98 },
  { eselon: "DITJEN PHI & JAMSOS", kerugian: 5290360987000, tdkLanjut: 3290360987000, sisa: 305715270761, persentase: 98 },
  { eselon: "SEKRETARIAT JENDERAL", kerugian: 5290360987000, tdkLanjut: 3290360987000, sisa: 305715270761, persentase: 98 },
  { eselon: "DITJEN BINWASNAKER & K3", kerugian: 5290360987000, tdkLanjut: 3290360987000, sisa: 305715270761, persentase: 98 },
  { eselon: "BARENBANG", kerugian: 5290360987000, tdkLanjut: 3290360987000, sisa: 305715270761, persentase: 98 },
  { eselon: "ITJEN", kerugian: 5290360987000, tdkLanjut: 3290360987000, sisa: 305715270761, persentase: 98 },
  { eselon: "DITJEN BINALAVOTAS (Euro)", kerugian: 5290360987000, tdkLanjut: 3290360987000, sisa: 305715270761, persentase: 98 },
];

/* ================= COMPONENTS ================= */

const MultiSelect = ({ label, options, value, setValue }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const toggle = (item) => {
    setValue((prev) => prev.includes(item) ? prev.filter((v) => v !== item) : [...prev, item]);
  };


    return (
    <div ref={ref} className="relative w-full h-[45px]"> {/* Ganti min-w-[400px] jadi w-full */}
        <p className="absolute -top-2 left-2 bg-[#f8fafc] px-1 text-[10px] text-gray-400 uppercase font-bold z-10">{label}</p>
        <div onClick={() => setOpen(!open)} className="h-full flex items-center justify-between border rounded-lg px-3 bg-white cursor-pointer shadow-sm">
        <div className="flex gap-1 overflow-hidden items-center max-w-[85%]">
            {value.length === 0 ? <span className="text-gray-400 text-xs">Pilih {label}</span> : 
            <>
                {value.slice(0, 1).map((item) => ( // Hanya tampilkan 1 di HP agar rapi
                <span key={item} className="bg-sky-400 text-white px-2 py-0.5 rounded-md text-[12px] flex items-center gap-1 whitespace-nowrap">
                    {item}
                </span>
                ))}
                {value.length > 1 && <span className="text-[10px] text-gray-500 font-bold">+{value.length - 1}</span>}
            </>
            }
        </div>
        <span className="text-gray-400 text-[10px]">▼</span>
        </div>
        {/* Dropdown tetap sama */}
    </div>
    );
};

const StatCardPNBP = ({ label, value, color, icon: Icon, iconColor }) => (
  <div className={`bg-white p-6 rounded-xl flex flex-col justify-center h-32 border-l-8 ${color} shadow-sm w-full`}>
    <div className="flex items-center gap-3 mb-2">
      <div className={`w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center ${iconColor}`}>
        <Icon size={18} />
      </div>
      <p className="text-gray-500 font-medium text-sm">{label}</p>
    </div>
    <p className="text-xl md:text-3xl font-bold text-gray-800">Rp {value.toLocaleString('id-ID')}</p>
  </div>
);

/* ================= MAIN PAGE ================= */
export default function KerugianNegara() {
  const [eselon, setEselon] = useState(["BINALAVOTAS", "BARENBANG"]);
  const [selectedYear, setSelectedYear] = useState("2024");
  
  // SOLUSI ERROR: Definisi variabel years
  const years = Array.from({ length: 2024 - 1999 + 1 }, (_, i) => (2024 - i).toString());

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans">
      <div className="flex justify-between items-center px-8 py-2 bg-white border-b shadow-sm">
        <Title>PTUK</Title>
        <User />
      </div>

      <div className="p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-end gap-4 w-full">
        {/* Filter Pilih Tahun */}
        <div className="relative w-full md:w-[150px]">
            <p className="absolute -top-2 left-2 bg-[#f8fafc] px-1 text-[10px] text-gray-400 uppercase font-bold z-10">
            Pilih Tahun
            </p>
            <div className="relative">
            <select 
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full border rounded-lg pl-4 pr-8 py-2.5 text-sm bg-white shadow-sm outline-none appearance-none cursor-pointer hover:border-sky-400 transition-all h-[45px]"
            >
                {years.map((y) => (
                <option key={y} value={y}>{y}</option>
                ))}
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-[10px] pointer-events-none">▼</span>
            </div>
        </div>

        {/* Filter MultiSelect Eselon 1 */}
        <div className="w-full md:w-[400px]">
            <MultiSelect 
            label="Eselon 1" 
            options={ESELON_OPTIONS} 
            value={eselon} 
            setValue={setEselon} 
            />
        </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatCardPNBP label="Kerugian Negara" value={397328376733} color="border-[#fc0166]" icon={Flame} iconColor="text-[#fc0166]" />
          <StatCardPNBP label="Jumlah Tindak Lanjut" value={83328376733} color="border-[#bcdd51]" icon={TrendingUp} iconColor="text-[#bcdd51]" />
        </div>

        <Paper className="p-8 shadow-sm">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 bg-sky-100 rounded-lg">
                <BarChart3 size={18} className="text-sky-500" />
              </div>
              <h2 className="font-bold text-gray-800 text-lg">Rekap Tindak Lanjut & Kerugian Negara</h2>
            </div>
            <p className="text-xs text-gray-400 ml-9">Jumlah Tindak Lanjut dan Kerugian Negara Kementrian Ketenagakerjaan</p>
          </div>

          <div className="h-[500px] w-full">
            {/* Pastikan BarChart Anda menerima props data */}
            <BarChart data={PNBP_DATA} />
          </div>

          <div className="flex justify-center gap-10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#bcdd51] rounded-full"></div>
              <span className="text-[10px] font-bold uppercase text-gray-500">Jumlah Tindak Lanjut</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#fc0166] rounded-full"></div>
              <span className="text-[10px] font-bold uppercase text-gray-500">Kerugian Negara</span>
            </div>
          </div>
     

        {/* --- TABLE SECTION --- */}
        <div className="bg-white mt-5 rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto"> {/* Wrapper agar tabel bisa di-scroll ke samping di HP */}
            <table className="w-full text-left border-collapse min-w-[800px]"> {/* min-w memastikan kolom tidak berhimpitan */}
            <thead className="bg-[#42a5f5] text-white text-[11px] font-bold uppercase tracking-widest">
                <tr>
                <th className="px-6 py-5">Eselon 1</th>
                <th className="px-6 py-5 text-right">Kerugian Negara</th>
                <th className="px-6 py-5 text-right">Jumlah Tindak Lanjut</th>
                <th className="px-6 py-5 text-right">Sisa</th>
                <th className="px-6 py-5 text-center">Persentase</th>
                </tr>
            </thead>
            <tbody className="text-[11px] text-gray-600">
                {PNBP_DATA.map((item, index) => (
                <tr 
                    key={index} 
                    className={`border-b border-gray-50 hover:bg-sky-50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-sky-50/20"}`}
                >
                    <td className="px-6 py-4 font-bold text-gray-700 uppercase whitespace-normal min-w-[200px] leading-tight">
                    {item.eselon}
                    </td>
                    <td className="px-6 py-4 font-mono text-gray-400 text-right">
                    {item.kerugian.toLocaleString('id-ID')}.000
                    </td>
                    <td className="px-6 py-4 font-mono text-gray-400 text-right">
                    {item.tdkLanjut.toLocaleString('id-ID')}.000
                    </td>
                    <td className="px-6 py-4 font-mono text-gray-400 text-right">
                    {item.sisa.toLocaleString('id-ID')}
                    </td>
                    <td className="px-6 py-4 text-center">
                    <span className="bg-[#e8f5e9] text-[#2e7d32] px-3 py-1 rounded-full font-black text-[10px]">
                        {item.persentase}%
                    </span>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
           </Paper>
      </div>
    </div>
  );
}