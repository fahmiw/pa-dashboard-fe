import React, { useEffect, useState } from "react";
import Title from "@/components/Title";
import User from "@/components/User";
import DonutChart from "./DonutChart";
import { BarChart3 } from "lucide-react";

export default function LHPKementrian() {
  const [tableData, setTableData] = useState([]);
  const [summary, setSummary] = useState({
    sesuai: 0,
    belumSesuai: 0,
    tptd: 0,
    total: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const mockApiRes = [
        {
          id: 1,
          unit: "BARENBANG",
          reko_smstr2: 5,
          blkk: 0,
          kinerja: 0,
          reko_smstr1: 5,
          ajukan_bpk: 2,
          progress: 1,
          estimasi: 1,
        },
        {
          id: 2,
          unit: "BINALAVOTAS",
          reko_smstr2: 151,
          blkk: 10,
          kinerja: 0,
          reko_smstr1: 161,
          ajukan_bpk: 39,
          progress: 3,
          estimasi: 1,
        },
        {
          id: 3,
          unit: "BINAPENTA & PKK",
          reko_smstr2: 245,
          blkk: 0,
          kinerja: 0,
          reko_smstr1: 245,
          ajukan_bpk: 25,
          progress: 1,
          estimasi: 1,
        },
        {
          id: 4,
          unit: "BINWASNAKER & K3",
          reko_smstr2: 27,
          blkk: 0,
          kinerja: 17,
          reko_smstr1: 4,
          ajukan_bpk: 15,
          progress: 0,
          estimasi: 1,
        },
        {
          id: 5,
          unit: "ITJEN",
          reko_smstr2: 51,
          blkk: 2,
          kinerja: 0,
          reko_smstr1: 53,
          ajukan_bpk: 0,
          progress: 0,
          estimasi: 1,
        },
        {
          id: 9,
          unit: "SEKERTARIAT JENDERAL",
          reko_smstr2: 151,
          blkk: 0,
          kinerja: 0,
          reko_smstr1: 115,
          ajukan_bpk: 20,
          progress: 1,
          estimasi: 1,
        },
      ];
      setTableData(mockApiRes);
      setSummary({ sesuai: 1399, belumSesuai: 655, tptd: 18, total: 2072 });
      setLoading(false);
    };
    fetchData();
  }, []);

  const calculateTotal = (key) =>
    tableData.reduce((acc, curr) => acc + (curr[key] || 0), 0);

  if (loading)
    return <div className="p-10 text-center font-bold">Loading Data...</div>;

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      {/* HEADER  */}
      <div className="flex justify-between items-center px-4 md:px-4 border-b border-gray-100 z-20 bg-white shrink-0 pl-20 md:pl-8 transition-all">
        <div className="flex items-center">
          <Title>PTUK</Title>
        </div>
        <div className="w-auto">
          <User name={"Test"} previlege={"Administrator"} />
        </div>
      </div>

      <div className="p-4 md:p-8">
        {/* CONTAINER UTAMA */}
        <div className="bg-white relative rounded-[1.5rem] shadow-sm border border-gray-100 ">
          <div className="absolute -top-5 left-6 w-10 h-10 rounded-full bg-[#ecfdf3] flex items-center justify-center text-[#bcdd51] shadow-sm border border-white">
            <BarChart3 size={20} />
          </div>

          {/* JUDUL */}
          <div className="flex flex-col md:flex-row justify-between items-start  md:m-6 gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-black text-gray-800 uppercase tracking-tighter">
                LHP Kementrian
              </h1>
              <p className="text-[9px] md:text-[10px] text-gray-400 font-bold max-w-xl mt-1 uppercase leading-tight">
                Data berdasarkan TLHP Semester II tahun 2024 + LHP Kepatuhan
                terkait BLKK...
              </p>
            </div>
            <span className="text-[10px] md:text-[11px] font-bold text-gray-400 tracking-widest uppercase">
              2005 - 2025
            </span>
          </div>

          {/* CHART & STATS SECTION */}
          <div className="flex justify-center items-center w-full mb-8 md:mb-16 px-4">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-20 w-full lg:max-w-5xl">
              {/* DONUT CHART */}
              <div className="w-full lg:w-[40%] flex justify-center">
                <DonutChart
                  summary={summary}
                  height="h-56 w-56 sm:h-64 sm:w-64 md:h-80 md:w-80"
                />
              </div>

              <div className="w-full lg:w-[50%] grid grid-cols-2 sm:grid-cols-2 gap-x-4 gap-y-6 md:gap-x-8 md:gap-y-8">
                <StatItem
                  color="#59C7FF"
                  label="TL Status Sesuai"
                  value={summary.sesuai}
                />
                <StatItem
                  color="#FC0166"
                  label="TL Status belum"
                  value={summary.belumSesuai}
                />
                <StatItem color="#898A8D" label="TPTD" value={summary.tptd} />

                {/* TOTAL BOX  */}
                <div className="bg-[#3b82f6] rounded-2xl p-4 md:p-6 text-white shadow-lg shadow-blue-100 flex flex-col justify-center">
                  <p className="text-[8px] md:text-[10px] font-bold opacity-80 uppercase tracking-wider">
                    Total Rekomendasi
                  </p>
                  <p className="text-xl md:text-3xl font-black leading-none mt-1">
                    {summary.total.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* TABLE SECTION  */}
          <div className="m-2 md:m-3 rounded-[15px] md:rounded-[20px] shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto scrollbar-hide">
              <table className="w-full text-left border-collapse min-w-[1000px]">
                <thead>
                  <tr className="bg-[#3b82f6] text-white">
                    <th className="px-6 py-6 text-[10px] font-black uppercase w-48">
                      Unit Eselon 1
                    </th>
                    <TableHead label="Jumlah Rekomendasi Semester II 2025" />
                    <TableHead label="LHP Kepatuhan BLKK" />
                    <TableHead label="LHP Kinerja Pengawasan" />
                    <TableHead label="Total Semester I 2025" />
                    <TableHead label="Diajukan ke BPK" />
                    <TableHead label="Progress TL" />
                    <TableHead label="Estimasi Sesuai" />
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, idx) => (
                    <tr
                      key={row.id}
                      className={`${
                        idx % 2 === 1 ? "bg-sky-50/30" : "bg-white"
                      } border-b border-gray-50`}
                    >
                      <td className="px-6 py-4 text-[11px] font-black text-gray-800 ">
                        {row.unit}
                      </td>
                      <TableCell value={row.reko_smstr2} />
                      <TableCell value={row.blkk} />
                      <TableCell value={row.kinerja} />
                      <TableCell value={row.reko_smstr1} />
                      <TableCell value={row.ajukan_bpk} />
                      <TableCell value={row.progress} />
                      <TableCell value={row.estimasi} />
                    </tr>
                  ))}
                  <tr className="bg-[#fff9e1] text-gray-800 font-black border-t-2 border-yellow-100">
                    <td className="px-6 py-6 text-xs md:text-sm uppercase">
                      Total
                    </td>
                    <TableCell value={calculateTotal("reko_smstr2")} />
                    <TableCell value={calculateTotal("blkk")} />
                    <TableCell value={calculateTotal("kinerja")} />
                    <TableCell value={calculateTotal("reko_smstr1")} />
                    <TableCell value={calculateTotal("ajukan_bpk")} />
                    <TableCell value={calculateTotal("progress")} />
                    <TableCell value={calculateTotal("estimasi")} />
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const StatItem = ({ color, label, value }) => (
  <div className="flex flex-col">
    <div className="flex items-center gap-1.5 md:gap-2 mb-0.5 md:mb-1">
      <div
        className="w-2 md:w-3 h-2 md:h-3 rounded-full shrink-0"
        style={{ backgroundColor: color }}
      ></div>
      <span className="text-[9px] md:text-xs font-bold text-gray-500 uppercase tracking-tighter truncate">
        {label}
      </span>
    </div>
    {/* text-2xl di HP, md:text-4xl di PC */}
    <span className="text-2xl md:text-4xl font-black text-gray-900 leading-none">
      {value.toLocaleString("id-ID")}
    </span>
  </div>
);

const TableHead = ({ label }) => (
  <th className="px-4 py-6 text-[9px] font-black uppercase text-center border-l border-white/10 leading-tight">
    {label}
  </th>
);

const TableCell = ({ value }) => (
  <td className="px-4 py-4 text-center text-[10px] md:text-xs font-bold text-gray-700">
    {value}
  </td>
);
