import React, { useEffect, useRef, useState } from "react";
import Title from "@/components/Title";
import Paper from "@/components/Paper";
import User from "@/components/User";
import DonutChart from "./DonutChart";
import { formatCurrency } from "@/services/GeneralHelper";
import { Flame, BarChart3 } from "lucide-react";


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

const JABATAN_OPTIONS = ["Pejabat Pembuat Komitmen"];
const FUNGSIONAL_OPTIONS = ["PKAPBN - BP", "APKAPBN - PPSPM"];

/* ================= MULTISELECT ================= */
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
    <div ref={ref} className="relative w-full h-[50px]"> {/* min-w dihapus agar responsif */}
      <p className="absolute -top-2 left-2 bg-[#f8fafc] px-1 text-[10px] text-gray-400 uppercase font-bold z-10">{label}</p>
      <div onClick={() => setOpen(!open)} className="h-full flex items-center justify-between border rounded-lg px-3 bg-white cursor-pointer shadow-sm">
        <div className="flex gap-1 overflow-hidden items-center max-w-[85%]">
          {value.length === 0 ? <span className="text-gray-400 text-xs">Pilih {label}</span> : 
            <>
              {/* Di HP cuma tampil 1 tag agar tidak numpuk */}
              <span className="bg-sky-400 text-white px-2 py-0.5 rounded-md text-[11px] md:text-xs whitespace-nowrap">
                {value[0]}
              </span>
              {value.length > 1 && <span className="text-[10px] text-gray-500 font-bold">+{value.length - 1}</span>}
            </>
          }
        </div>
        <span className="text-gray-400 text-[10px]">▼</span>
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
const SUMMARY_DATA = [
  { label: "Pejabat Pembuat Komitmen", value: 100, color: "border-[#fc0166]", bg: "bg-[#ffcfe2]", iconColor: "text-[#fc0166]" },
  { label: "Pejabat Penandatangan SPM", value: 51, color: "border-[#ffbe02]", bg: "bg-[#fff3d0]", iconColor: "text-[#ffbe02]" },
  { label: "Bendahara Pengeluaran", value: 72, color: "border-[#2f8afd]", bg: "bg-[#d5f1ff]", iconColor: "text-[#2f8afd]" },
  { label: "Bendahara Penerimaan", value: 24, color: "border-[#bcdd51]", bg: "bg-[#edf6d0]", iconColor: "text-[#bcdd51]" },
];

const TABLE_DATA = Array(7).fill({
  nama: "Zulaepa Chaironisa, A. Md",
  nip: "199306..",
  jabatan: "Bendahara Pengeluaran",
  unit: "0261.626011 Pusat Pasar Ke",
  fungsional: "-",
  tanggal: "16 Des 2022"
});

// ambil data dari summary_data
const StatCard = ({ label, value, color, bg, iconColor }) => (
  <div className={`bg-white p-5 rounded-xl shadow-xl border-l-4 ${color} flex flex-col justify-between h-40`}>
    <div className={`w-10 h-10 rounded-full ${bg} flex items-center justify-center text-xl shadow-inner ${iconColor}`}>
  <Flame />
    </div>
    <div>
      <p className="text-gray-600 text-sm font-medium">{label}</p>
      <p className="text-4xl font-bold mt-1">{value}</p>
    </div>
  </div>
);


/* ================= PAGE ================= */
export default function PNBP() {
  const [activeView, setActiveView] = useState("info");

  const [eselon, setEselon] = useState(["BINALAVOTAS", "BARENBANG"]);
  const [jabatan, setJabatan] = useState(["Pejabat Pembuat Komitmen"]);
  const [fungsional, setFungsional] = useState([
    "PKAPBN - BP",
    "APKAPBN - PPSPM",
  ]);

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-center px-4 md:px-4 border-b border-gray-100 z-20 bg-white shrink-0 pl-20 md:pl-8 transition-all">
        <Title>PTUK</Title>
        <User name={"Test"} previlege={"Administrator"} />
      </div>
      {/* button  */}
      <div className="flex items-center gap-4 px-2 m-3">
        <button
          onClick={() => setActiveView("info")}
          className={`w-8 h-8 flex items-center justify-center rounded-full transition
            ${activeView === "info"
              ? "bg-sky-500 text-white"
              : "bg-sky-100 text-sky-600 hover:bg-sky-200"}`}
          title="Informasi"
        >
          ???
        </button>

        <button
          onClick={() => setActiveView("keuangan")}
          className={`px-3 h-8 rounded-full text-sm font-medium transition
            ${activeView === "keuangan"
              ? "bg-sky-500 text-white"
              : "bg-sky-100 text-sky-700 hover:bg-sky-200"}`}
        >
          Pengelola Keuangan
        </button>
      </div>

      {activeView === "info" && (
      <>        
      <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
        {/* FILTER */}
       
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
            <MultiSelect
              label="Pengelola Keuangan"
              options={ESELON_OPTIONS}
              value={eselon}
              setValue={setEselon}
            />
            <MultiSelect
              label="Jabatan"
              options={JABATAN_OPTIONS}
              value={jabatan}
              setValue={setJabatan}
            />
            <MultiSelect
              label="Jabatan Fungsional"
              options={FUNGSIONAL_OPTIONS}
              value={fungsional}
              setValue={setFungsional}
            />
          </div>
   

        {/* CHART */}
        <Paper className="relative">
          <div className="absolute -top-5 left-6 w-10 h-10 rounded-full bg-[#ecfdf3] flex items-center justify-center text-[#bcdd51] shadow-sm border border-white">
                 <BarChart3 size={20} />
              </div>
          <div className="flex gap-12 px-8 py-3 w-full overflow-x-auto overflow-y-hidden">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[300px] "
              >
                <DonutChart />
              </div>
            ))}
          </div>
        

        {/* TABLE */}

          <div className="bg-blue-500 text-white px-4 py-3 flex justify-between rounded-t-lg">
            <span className="font-semibold">Eselon 1</span>
            <span className="font-semibold">Sisa</span>
          </div>

          <table className="w-full text-sm">
            <tbody>
              {ESELON_OPTIONS.map((item) => (
                <tr key={item} className="odd:bg-blue-50 even:bg-blue-100">
                  <td className="px-4 py-3">{item}</td>
                  <td className="px-4 py-3 text-right">
                    {formatCurrency(305715270781)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Paper>
      </div>
       </>
  )}

  {activeView === "keuangan" && (
 
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
        {/* FILTER */}
       
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
            <MultiSelect
              label="Pengelola Keuangan"
              options={ESELON_OPTIONS}
              value={eselon}
              setValue={setEselon}
            />
            <MultiSelect
              label="Jabatan"
              options={JABATAN_OPTIONS}
              value={jabatan}
              setValue={setJabatan}
            />
            <MultiSelect
              label="Jabatan Fungsional"
              options={FUNGSIONAL_OPTIONS}
              value={fungsional}
              setValue={setFungsional}
            />
          </div>
   

        {/* CHART */}
        <Paper>
          <div className="flex gap-12 px-8 py-3 w-full overflow-x-auto overflow-y-hidden">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[300px] "
              >
                <DonutChart />
              </div>
            ))}
          </div>
        <div className="pb-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SUMMARY_DATA.map((data, idx) => (
            <StatCard key={idx} {...data} />
          ))}
        </div>

        {/* TABLE */}

          <div className="m-4 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#42a5f5] text-white text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold">Eselon 1</th>
                  <th className="px-6 py-4 font-semibold">Jabatan</th>
                  <th className="px-6 py-4 font-semibold">Unit</th>
                  <th className="px-6 py-4 font-semibold">Jabatan Fungsional</th>
                  <th className="px-6 py-4 font-semibold">Tanggal Sertifikat</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm">
                {TABLE_DATA.map((row, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-sky-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-800">{row.nama}</div>
                      <div className="text-[11px] text-gray-400">{row.nip}</div>
                    </td>
                    <td className="px-6 py-4 text-xs">{row.jabatan}</td>
                    <td className="px-6 py-4 text-xs text-gray-500">{row.unit}</td>
                    <td className="px-6 py-4 text-xs">{row.fungsional}</td>
                    <td className="px-6 py-4 text-xs">{row.tanggal || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* PAGINATION SIMPLE */}
          <div className="p-4 flex justify-between items-center text-xs text-gray-500 bg-white border-t">
             <div>Rows per page: <b>10</b></div>
             <div>1-10 of 2032</div>
             <div className="flex gap-2">
                <button className="p-2 border rounded hover:bg-gray-50"> &lt; </button>
                <button className="p-2 border rounded hover:bg-gray-50"> &gt; </button>
             </div>
          </div>
          </div>
        </Paper>
      </div>
)}

    </>
    
  );
}
