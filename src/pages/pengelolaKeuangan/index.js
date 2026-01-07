import React, { useEffect, useRef, useState } from "react";
import Title from "@/components/Title";
import Paper from "@/components/Paper";
import User from "@/components/User";

import { formatCurrency } from "@/services/GeneralHelper";
import { Flame, TrendingUp, BarChart3 } from "lucide-react";
import BarChart from "./BarChart";

/* ================= DATA ================= */
const ESELON_OPTIONS = [
  "BINALAVOTAS", "BINAPENTA", "PHI & JAMSO", "SEKRETARIAT JENDERAL KEMNAKER",
  "BINWASNAKER", "BARENBANG", "INSPEKTORAT JENDERAL"
];

const PNBP_DATA = [
  { id: "04", eselon: "04 - Ditjen Pembinaan Penempatan Tenaga Kerja dan Perluasan Kesempatan Kerja", target: 529036098000, realisasi: 3290360987000, persentase: 98 },
  { id: "08", eselon: "08 - Ditjen Pembinaan Pengawasan Ketenagakerjaan dan Keselamatan dan Kesehatan Kerja", target: 529036098000, realisasi: 3290360987000, persentase: 98 },
  { id: "13", eselon: "13 - Direktorat Jenderal Pembinaan Pelatihan Vokasi dan Produktivitas", target: 529036098000, realisasi: 3290360987000, persentase: 98 },
  { id: "01", eselon: "01 - Sekretariat Jenderal", target: 529036098000, realisasi: 3290360987000, persentase: 98 },
  { id: "11", eselon: "11 - Badan Perencanaan dan Pengembangan Ketenagakerjaan", target: 529036098000, realisasi: 3290360987000, persentase: 98 },
  { id: "05", eselon: "05 - Ditjen Pembinaan Hubungan Industrial dan Jaminan Sosial Tenaga Kerja", target: 529036098000, realisasi: 3290360987000, persentase: 98 },
  { id: "02", eselon: "02 - Inspektorat Jenderal", target: 529036098000, realisasi: 3290360987000, persentase: 98 },
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
    <div ref={ref} className="relative min-w-[400px] min-h-[50px]">
      <p className="absolute -top-2 left-2 bg-[#f8fafc] px-1 text-[10px] text-gray-400 uppercase font-bold z-10">{label}</p>
      <div onClick={() => setOpen(!open)} className="min-h-[40px] flex flex-wrap items-center gap-2 border rounded-lg px-3 py-2.5 bg-white cursor-pointer shadow-sm">
        {value.length === 0 ? <span className="text-gray-400 text-xs">Pilih {label}</span> : 
          <div className="flex gap-1 overflow-hidden max-w-[300px]">
            {value.slice(0, 2).map((item) => (
              <span key={item} className="bg-sky-400 text-white px-2 py-1 rounded-full text-[15px] flex items-center gap-1 whitespace-nowrap">
                {item} <button onClick={(e) => { e.stopPropagation(); toggle(item); }}>×</button>
              </span>
            ))}
            {value.length > 2 && <span className="text-[10px] text-gray-500 font-bold">+{value.length - 2}</span>}
          </div>
        }
        <span className="ml-auto text-gray-400 text-[10px]">▼</span>
      </div>
      {open && (
        <div className="absolute z-[100] mt-1 w-full bg-white border rounded-lg shadow-xl max-h-48 overflow-auto">
          {options.map((opt) => (
            <div key={opt} onClick={() => toggle(opt)} className={`px-4 py-2 text-xs hover:bg-sky-50 cursor-pointer ${value.includes(opt) ? "bg-sky-100 font-bold" : ""}`}>
              {opt} {value.includes(opt) && "✓"}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const StatCardPNBP = ({ label, value, color, icon: Icon, iconColor }) => (
  <div className={`bg-white p-6 rounded-xl flex flex-col justify-center h-32 border-l-8 ${color} shadow-sm w-full transition-transform hover:scale-[1.01]`}>
    <div className="flex items-center gap-3 mb-2">
      <div className={`w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center ${iconColor}`}>
        <Icon size={18} />
      </div>
      <p className="text-gray-700 font-semibold text-sm">{label}</p>
    </div>
    <p className="text-3xl font-bold text-gray-800">Rp {value.toLocaleString('id-ID')}</p>
  </div>
);

const StatCard = ({ label, value, color, bg, iconColor }) => (
  <div className={`bg-white p-5 rounded-xl shadow-md border-l-4 ${color} flex flex-col justify-between h-36 transition-transform hover:scale-[1.02]`}>
    <div className={`w-10 h-10 rounded-full ${bg} flex items-center justify-center text-xl shadow-inner ${iconColor}`}>
      <Flame size={20} />
    </div>
    <div>
      <p className="text-gray-600 text-xs font-medium leading-tight">{label}</p>
      <p className="text-3xl font-bold mt-1 text-gray-800">{value}</p>
    </div>
  </div>
);

/* ================= MAIN PAGE ================= */
export default function PengelolaKeuangan() {
  const [activeView, setActiveView] = useState("info");
  const [eselon, setEselon] = useState(["BINALAVOTAS", "BARENBANG"]);
  
  return (
    <div className="bg-[#f8fafc] min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center px-8 py-4 bg-white border-b shadow-sm">
        <Title>PTUK</Title>
        <User />
      </div>

      <div className="p-8 space-y-6">
        {/* TOP CONTROLS */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveView("info")}
              className={`px-6 py-2 rounded-full text-sm font-bold transition shadow-md
                ${activeView === "info" ? "bg-sky-500 text-white" : "bg-white text-sky-600 hover:bg-sky-100"}`}
            >
              Realisasi Penerimaan
            </button>
            <button
              onClick={() => setActiveView("keuangan")}
              className={`px-6 py-2 rounded-full text-sm font-bold transition shadow-md
                ${activeView === "keuangan" ? "bg-sky-500 text-white" : "bg-white text-sky-700 hover:bg-sky-100"}`}
            >
              Pengelola Keuangan
            </button>
          </div>

          <div className="w-full lg:w-[450px]">
            <MultiSelect label="Eselon 1" options={ESELON_OPTIONS} value={eselon} setValue={setEselon} />
            
          </div>
        </div>

        {/* --- VIEW 1: REALISASI PNBP --- */}
        {activeView === "info" && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StatCardPNBP label="Jumlah Realisasi PNBP" value={1407328376733} color="border-[#bcdd51]" icon={TrendingUp} iconColor="text-[#bcdd51]" />
              <StatCardPNBP label="Target PNBP Kementrian" value={397328376733} color="border-[#fc0166]" icon={Flame} iconColor="text-[#fc0166]" />
            </div>

            <Paper className="p-8">
              <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2 mb-8">
                <BarChart3 size={20} className="text-sky-500" />
                <h2 className="font-bold text-gray-800 uppercase tracking-wide">Target dan Realisasi Penerimaan PNBP</h2>
              </div>
                <div className="h-72 flex items-center justify-center  mb-6  rounded-xl italic text-gray-400">
                  < BarChart/>
                </div>
                <div className="flex justify-center p-3 gap-10 text-[10px] font-black uppercase text-gray-500">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 bg-sky-500 rounded-full shadow-sm"></div> Target PNBP</div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 bg-pink-500 rounded-full shadow-sm"></div> Realisasi PNBP</div>
                </div>
              </div>
           
           <div className="bg-white rounded-2xl mt-4  border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#42a5f5] text-white text-[11px] font-bold uppercase tracking-widest">
                  <tr>
                    <th className="px-8 py-5">Eselon 1</th>
                    <th className="px-8 py-5">Target PNBP</th>
                    <th className="px-8 py-5">Jumlah Realisasi PNBP</th>
                    <th className="px-8 py-5 text-center">Persentase</th>
                  </tr>
                </thead>
                <tbody className="text-[12px] text-gray-600">
                  {PNBP_DATA.map((item, index) => (
                    <tr 
                      key={index} 
                      className={`border-b border-gray-50 transition-colors hover:bg-sky-50/50 ${
                        index % 2 === 0 ? "bg-white" : "bg-[#f8fafc]"
                      }`}
                    >
                      <td className="px-8 py-5 font-semibold text-gray-700 leading-relaxed w-[45%]">
                        {item.eselon}
                      </td>
                      <td className="px-8 py-5 font-mono text-gray-500">
                        {item.target.toLocaleString('id-ID')}
                      </td>
                      <td className="px-8 py-5 font-mono text-gray-500">
                        {item.realisasi.toLocaleString('id-ID')}
                      </td>
                      <td className="px-8 py-5 text-center">
                        <span className="bg-[#e8f5e9] text-[#2e7d32] px-4 py-1.5 rounded-full font-black text-[10px] shadow-sm">
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
        )}

        {/* --- VIEW 2: PENGELOLA KEUANGAN --- */}
        {activeView === "keuangan" && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StatCardPNBP label=" Pagu DIPA SUmber Dana PNBPh" value={1407328376733} color="border-[#bcdd51]" icon={TrendingUp} iconColor="text-[#bcdd51]" />
              <StatCardPNBP label="Jumlah Realisasi Penggunaan Dana PNBP" value={397328376733} color="border-[#fc0166]" icon={Flame} iconColor="text-[#fc0166]" />
            </div>

            <Paper className="p-8">
              <div className="flex flex-col gap-10">
              <div className="flex items-center gap-2 mb-8">
                <BarChart3 size={20} className="text-sky-500" />
                <h2 className="font-bold text-gray-800 uppercase tracking-wide">Target dan Realisasi Penerimaan PNBP</h2>
              </div>
                <div className="h-72 flex items-center justify-center mb-6  rounded-xl italic text-gray-400">
                  < BarChart/>
                </div>
                <div className="flex justify-center p-3 gap-10 text-[10px] font-black uppercase text-gray-500">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 bg-sky-500 rounded-full shadow-sm"></div>Pagu DIPA SUmber Dana PNBP</div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 bg-pink-500 rounded-full shadow-sm"></div>Jumlah Realisasi Penggunaan Dana PNBP</div>
                </div>
              </div>
            </Paper>

           <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#42a5f5] text-white text-[11px] font-bold uppercase tracking-widest">
                  <tr>
                    <th className="px-8 py-5">Eselon 1</th>
                    <th className="px-8 py-5">Target PNBP</th>
                    <th className="px-8 py-5">Jumlah Realisasi PNBP</th>
                    <th className="px-8 py-5 text-center">Persentase</th>
                  </tr>
                </thead>
                <tbody className="text-[12px] text-gray-600">
                  {PNBP_DATA.map((item, index) => (
                    <tr 
                      key={index} 
                      className={`border-b border-gray-50 transition-colors hover:bg-sky-50/50 ${
                        index % 2 === 0 ? "bg-white" : "bg-[#f8fafc]"
                      }`}
                    >
                      <td className="px-8 py-5 font-semibold text-gray-700 leading-relaxed w-[45%]">
                        {item.eselon}
                      </td>
                      <td className="px-8 py-5 font-mono text-gray-500">
                        {item.target.toLocaleString('id-ID')}
                      </td>
                      <td className="px-8 py-5 font-mono text-gray-500">
                        {item.realisasi.toLocaleString('id-ID')}
                      </td>
                      <td className="px-8 py-5 text-center">
                        <span className="bg-[#e8f5e9] text-[#2e7d32] px-4 py-1.5 rounded-full font-black text-[10px] shadow-sm">
                          {item.persentase}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}