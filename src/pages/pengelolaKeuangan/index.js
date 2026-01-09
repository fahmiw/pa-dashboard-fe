import React, { useEffect, useRef, useState } from "react";
import Title from "@/components/Title";
import Paper from "@/components/Paper";
import User from "@/components/User";

import { formatCurrency } from "@/services/GeneralHelper";
import { Flame, TrendingUp, BarChart3, ChevronDown, X } from "lucide-react";
import BarChart from "./BarChart";

/* ================= DATA ================= */
const ESELON_OPTIONS = [
  "BINALAVOTAS",
  "BINAPENTA",
  "PHI & JAMSO",
  "SEKRETARIAT JENDERAL KEMNAKER",
  "BINWASNAKER",
  "BARENBANG",
  "INSPEKTORAT JENDERAL",
];

const PNBP_DATA = [
  {
    id: "04",
    eselon:
      "04 - Ditjen Pembinaan Penempatan Tenaga Kerja dan Perluasan Kesempatan Kerja",
    target: 529036098000,
    realisasi: 3290360987000,
    persentase: 98,
  },
  {
    id: "08",
    eselon:
      "08 - Ditjen Pembinaan Pengawasan Ketenagakerjaan dan Keselamatan dan Kesehatan Kerja",
    target: 529036098000,
    realisasi: 3290360987000,
    persentase: 98,
  },
  {
    id: "13",
    eselon:
      "13 - Direktorat Jenderal Pembinaan Pelatihan Vokasi dan Produktivitas",
    target: 529036098000,
    realisasi: 3290360987000,
    persentase: 98,
  },
  {
    id: "01",
    eselon: "01 - Sekretariat Jenderal",
    target: 529036098000,
    realisasi: 3290360987000,
    persentase: 98,
  },
  {
    id: "11",
    eselon: "11 - Badan Perencanaan dan Pengembangan Ketenagakerjaan",
    target: 529036098000,
    realisasi: 3290360987000,
    persentase: 98,
  },
  {
    id: "05",
    eselon:
      "05 - Ditjen Pembinaan Hubungan Industrial dan Jaminan Sosial Tenaga Kerja",
    target: 529036098000,
    realisasi: 3290360987000,
    persentase: 98,
  },
  {
    id: "02",
    eselon: "02 - Inspektorat Jenderal",
    target: 529036098000,
    realisasi: 3290360987000,
    persentase: 98,
  },
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
    setValue((prev) =>
      prev.includes(item) ? prev.filter((v) => v !== item) : [...prev, item]
    );
  };

  return (
    <div ref={ref} className="relative w-full md:min-w-[400px]">
      <p className="absolute -top-2 left-2 bg-[#f8fafc] px-1 text-[9px] md:text-[10px] text-gray-400 uppercase font-bold z-10">
        {label}
      </p>
      <div
        onClick={() => setOpen(!open)}
        className="min-h-[45px] flex items-center justify-between gap-2 border rounded-lg px-3 py-2 bg-white cursor-pointer shadow-sm"
      >
        <div className="flex flex-wrap gap-1 max-w-[85%] overflow-hidden">
          {value.length === 0 ? (
            <span className="text-gray-400 text-xs">Pilih {label}</span>
          ) : (
            <>
              {value.slice(0, 1).map((item) => (
                <span
                  key={item}
                  className="bg-sky-400 text-white px-2 py-0.5 rounded-full text-[11px] md:text-[13px] flex items-center gap-1"
                >
                  {item}{" "}
                  <X
                    size={12}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggle(item);
                    }}
                  />
                </span>
              ))}
              {value.length > 1 && (
                <span className="text-[10px] text-gray-500 font-bold">
                  +{value.length - 1}
                </span>
              )}
            </>
          )}
        </div>
        <ChevronDown size={14} className="text-gray-400" />
      </div>
      {open && (
        <div className="absolute z-[100] mt-1 w-full bg-white border rounded-lg shadow-xl max-h-48 overflow-auto">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => toggle(opt)}
              className={`px-4 py-2 text-[11px] md:text-xs hover:bg-sky-50 cursor-pointer flex justify-between ${
                value.includes(opt) ? "bg-sky-100 font-bold text-sky-700" : ""
              }`}
            >
              {opt} {value.includes(opt) && "✓"}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const StatCardPNBP = ({ label, value, color, icon: Icon, iconColor }) => (
  <div
    className={`bg-white p-4 md:p-6 rounded-xl flex flex-col justify-center h-28 md:h-32 border-l-8 ${color} shadow-sm w-full transition-transform hover:scale-[1.01]`}
  >
    <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
      <div
        className={`w-7 h-7 md:w-8 md:h-8 rounded-full bg-gray-50 flex items-center justify-center ${iconColor}`}
      >
        <Icon size={16} />
      </div>
      <p className="text-gray-700 font-semibold text-xs md:text-sm">{label}</p>
    </div>
    <p className="text-xl md:text-3xl font-bold text-gray-800 break-words leading-tight">
      <span className="text-sm md:text-lg font-medium mr-1 text-gray-500">
        Rp
      </span>
      {value.toLocaleString("id-ID")}
    </p>
  </div>
);

/* ================= MAIN PAGE ================= */
export default function PengelolaKeuangan() {
  const [activeView, setActiveView] = useState("info");
  const [eselon, setEselon] = useState(["BINALAVOTAS", "BARENBANG"]);

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      {/* HEADER - Padding adjusted for mobile */}
      <div className="flex justify-between items-center px-4 md:px-4 border-b border-gray-100 z-20 bg-white shrink-0 pl-20 md:pl-8 transition-all">
        <div className="flex items-center">
          <Title>PTUK</Title>
        </div>
        <div className="w-auto">
           <User name={"Test"} previlege={"Administrator"} />
        </div>
      </div>

      <div className="p-4 md:p-8 space-y-6">
        {/* TOP CONTROLS - Stacked on mobile */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
            <button
              onClick={() => setActiveView("info")}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-[11px] md:text-sm font-bold transition shadow-sm
                ${
                  activeView === "info"
                    ? "bg-sky-500 text-white"
                    : "bg-white text-sky-600 border border-sky-100 hover:bg-sky-50"
                }`}
            >
              Realisasi Penerimaan
            </button>
            <button
              onClick={() => setActiveView("keuangan")}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-[11px] md:text-sm font-bold transition shadow-sm
                ${
                  activeView === "keuangan"
                    ? "bg-sky-500 text-white"
                    : "bg-white text-sky-700 border border-sky-100 hover:bg-sky-50"
                }`}
            >
              Pengelola Keuangan
            </button>
          </div>

          <div className="w-full lg:w-[450px]">
            <MultiSelect
              label="Eselon 1"
              options={ESELON_OPTIONS}
              value={eselon}
              setValue={setEselon}
            />
          </div>
        </div>

        {/* --- VIEW CONTENT --- */}
        <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <StatCardPNBP
              label={
                activeView === "info"
                  ? "Jumlah Realisasi PNBP"
                  : "Pagu DIPA Sumber Dana PNBP"
              }
              value={1407328376733}
              color="border-[#bcdd51]"
              icon={TrendingUp}
              iconColor="text-[#bcdd51]"
            />
            <StatCardPNBP
              label={
                activeView === "info"
                  ? "Target PNBP Kementerian"
                  : "Jumlah Realisasi Penggunaan Dana"
              }
              value={397328376733}
              color="border-[#fc0166]"
              icon={Flame}
              iconColor="text-[#fc0166]"
            />
          </div>

          <Paper className="p-4 md:p-8 relative">
            <div className="absolute -top-5 left-6 w-10 h-10 rounded-full bg-[#ecfdf3] flex items-center justify-center text-[#bcdd51] shadow-sm border border-white">
              <BarChart3 size={20} />
            </div>
            <div className="flex flex-col gap-4 md:gap-6">
              <div className="flex items-center gap-2 mt-2 mb-4 md:mb-8">
                <h2 className="font-bold text-xs md:text-sm text-gray-800 uppercase tracking-wide">
                  {activeView === "info"
                    ? "Target dan Realisasi Penerimaan PNBP"
                    : "Analisis Penggunaan Dana PNBP"}
                </h2>
              </div>

              {/* Chart container responsive height */}
              <div className="h-60 md:h-80 w-full flex items-center justify-center mb-4 rounded-xl italic text-gray-400">
                <BarChart />
              </div>

              {/* Legend font smaller on mobile */}
              <div className="flex flex-wrap justify-center p-2 gap-4 md:gap-10 text-[9px] md:text-[10px] font-black uppercase text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-sky-500 rounded-full"></div>
                  {activeView === "info" ? "Target PNBP" : "Pagu DIPA"}
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-pink-500 rounded-full"></div>
                  {activeView === "info"
                    ? "Realisasi PNBP"
                    : "Realisasi Penggunaan"}
                </div>
              </div>

              {/* Responsive Table Wrapper */}
              <div className="bg-white rounded-xl mt-4 border border-gray-100 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead className="bg-[#42a5f5] text-white text-[9px] md:text-[11px] font-bold uppercase tracking-widest">
                      <tr>
                        <th className="px-4 py-4 md:px-8 md:py-5">Eselon 1</th>
                        <th className="px-4 py-4 md:px-8 md:py-5">
                          Target / Pagu
                        </th>
                        <th className="px-4 py-4 md:px-8 md:py-5">Realisasi</th>
                        <th className="px-4 py-4 md:px-8 md:py-5 text-center">
                          {" "}
                          %{" "}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-[10px] md:text-[12px] text-gray-600">
                      {PNBP_DATA.map((item, index) => (
                        <tr
                          key={index}
                          className={`border-b border-gray-50 hover:bg-sky-50/50 ${
                            index % 2 === 0 ? "bg-white" : "bg-[#f8fafc]"
                          }`}
                        >
                          <td className="px-4 py-3 md:px-8 md:py-5 font-semibold text-gray-700 max-w-[200px] truncate md:whitespace-normal">
                            {item.eselon}
                          </td>
                          <td className="px-4 py-3 md:px-8 md:py-5 font-medium">
                            {item.target.toLocaleString("id-ID")}
                          </td>
                          <td className="px-4 py-3 md:px-8 md:py-5 font-medium">
                            {item.realisasi.toLocaleString("id-ID")}
                          </td>
                          <td className="px-4 py-3 md:px-8 md:py-5 text-center">
                            <span className="bg-[#e8f5e9] text-[#2e7d32] px-2 py-1 md:px-4 md:py-1.5 rounded-full font-black text-[9px] md:text-[10px]">
                              {item.persentase}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Mobile Scroll Indicator */}
                <div className="md:hidden text-center py-2 text-[10px] text-gray-400 bg-gray-50">
                  ← Geser untuk lihat detail →
                </div>
              </div>
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
}
