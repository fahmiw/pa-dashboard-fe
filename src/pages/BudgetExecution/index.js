import React, { useContext, useEffect, useState } from "react";
import Title from "@/components/Title";
import Breadcrumbs from "@/components/Breadcrumbs";
import Card from "@/components/Card";
import User from "@/components/User";
import IKPAChart from "./GaugeChart";
import moment from "moment";
import "moment/locale/id";
import { dataTable } from "./constants";
import { Menu, AlignLeft } from "lucide-react";
import { apiRequest } from "@/services/APIHelper";
import { AppContext } from "@/contexts/AppContext";
import Select from "@/components/Select";
import BarChart from "./BarChart";

// Helper Warna Badge
const getBadgeColor = (name) => {
  if (name.includes("Sekretariat")) return "bg-orange-100 text-orange-600";
  if (name.includes("Inspektorat")) return "bg-lime-100 text-lime-700";
  if (name.includes("Ditjen Binapenta")) return "bg-sky-100 text-sky-600";
  if (name.includes("PHI")) return "bg-pink-100 text-pink-600";
  if (name.includes("Binwasnaker")) return "bg-yellow-100 text-yellow-700";
  if (name.includes("Barenbang")) return "bg-green-100 text-green-700";
  if (name.includes("Binalavotas")) return "bg-lime-200 text-lime-800";
  return "bg-gray-100 text-gray-700";
};

function BudgetExecution() {
  const { userData, setMobileMenuOpen } = useContext(AppContext);
  const [cardsData, setCardsData] = useState([]);
  const [es1Data, setEs1Data] = useState({ columns: [], data: [] });
  const [year, setYear] = useState("2025");

  const dataset = [
    { name: "Completed", value: 320 },
    { name: "In Progress", value: 180 },
    { name: "Blocked", value: 60 },
    { name: "Backlog", value: 140 },
  ];
  const [values, setValues] = useState([
    70.7, 33.39, 50.48, 9.41, 83.77, 33.1, 31.96, 29.94,
  ]);

  const es1Options = async () => {
    try {
      const data = await apiRequest({
        url: `/api/pa/ikpa/all`,
      });
      let mapped = data?.data
        .filter((q) => q.satker_code === null)
        .map((item, index) => {
          const constantItem = dataTable.data[index];
          return {
            eselon: constantItem?.eselon || item.name,
            nilaiIKPA: item.nilai_ikpa,
          };
        });

      setEs1Data({
        columns: dataTable.columns,
        data: mapped,
      });

      let mappedCards = mapped
        .filter((q) => q.eselon !== "Kementerian Ketenagakerjaan")
        .map((item) => ({
          title: item.eselon,
          value: item.nilaiIKPA.toFixed(2),
        }));
      setCardsData(mappedCards);
    } catch (error) {
      console.error(error);
    }
  };

  const eselons = es1Data.data.map((item) => item.eselon);

  useEffect(() => {
    es1Options();
  }, [year]);

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans p-4 md:p-8 space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-center px-4 md:px-4 border-b border-gray-100 z-20 bg-white shrink-0 pl-20 md:pl-8 transition-all">
        <Title>Pelaksanaan Anggaran</Title>
        <User
            name={userData?.name || "Administrator"}
            previlege={userData?.role?.toUpperCase() || "Administrator"}
            username={userData?.biro_code}
            role={userData?.role}
          />
      </div>

      {/* CARD GRID OVERLAPPING */}
      <div className="flex flex-col lg:flex-row relative">
        {/* A. KARTU BIRU (Fixed Width + Negative Margin Right) */}
        <div className="w-full lg:w-[360px] flex-shrink-0 relative z-0 mb-6 lg:mb-0 lg:-mr-16">
          <div className="h-full min-h-[440px] rounded-[2.5rem] bg-gradient-to-b from-[#3B9EFF] to-[#2E70FD] text-white p-8 pt-12 relative overflow-hidden shadow-2xl flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-5 rounded-full blur-3xl -translate-y-10 translate-x-10"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-5 rounded-full blur-2xl translate-y-10 -translate-x-10"></div>

            <div className="relative z-10 flex flex-col justify-between h-full lg:max-w-[80%]">
              <div>
                <span className="font-bold text-3xl block mb-2 tracking-wide">
                  Nilai IKPA
                </span>
                {/* --- UPDATE DI SINI: Menambahkan teks "Per " --- */}
                <span className="text-sm font-semibold opacity-80 uppercase tracking-widest">
                  Per{" "}
                  {moment()
                    .locale("id")
                    .subtract(1, "months")
                    .format("MMMM YYYY")}
                </span>
              </div>
              <div className="text-[5.5rem] leading-none font-bold tracking-tighter drop-shadow-lg">
                {es1Data?.data?.[0]?.nilaiIKPA
                  ? es1Data.data[0].nilaiIKPA.toFixed(2)
                  : "93.46"}
              </div>
              <div>
                <span className="font-bold text-lg block leading-tight opacity-90 max-w-[200px]">
                  Kementrian Ketenagakerjaan
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* B. GRID KARTU PUTIH (Flex Grow) */}
        <div className="flex-1 z-10 py-6 lg:py-8 pl-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 w-full h-full">
            {cardsData.slice(0, 7).map((item, index) => (
              <div
                key={index}
                className="p-5 rounded-2xl bg-white shadow-lg shadow-gray-100/50 border border-gray-50 flex flex-col justify-between min-h-[140px] hover:scale-[1.02] transition-transform duration-300 cursor-default"
              >
                <div
                  className={`self-start px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider mb-2 ${getBadgeColor(
                    item.title
                  )}`}
                >
                  {item.title}
                </div>
                <div className="text-[3.5rem] leading-none font-bold text-gray-900 mt-1 tracking-tighter">
                  {item.value}
                </div>
              </div>
            ))}

            {/* Legend Warna */}
            <div className="p-5 rounded-2xl bg-white shadow-lg shadow-gray-100/50 border border-gray-50 flex flex-col justify-center gap-2.5">
              <span className="font-bold text-gray-900 text-xs mb-1">
                Indikator Warna
              </span>
              <div className="space-y-2 text-[11px] font-medium text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#84CC16] rounded-sm shrink-0"></div>
                  <span>
                    Nilai IKPA ≥ 95 :{" "}
                    <strong className="text-gray-900">Sangat Baik</strong>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#38BDF8] rounded-sm shrink-0"></div>
                  <span>
                    89 ≤ Nilai IKPA &lt; 95 :{" "}
                    <strong className="text-gray-900">Baik</strong>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#FACC15] rounded-sm shrink-0"></div>
                  <span>
                    70 ≤ Nilai IKPA &lt; 89 :{" "}
                    <strong className="text-gray-900">Cukup</strong>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#F43F5E] rounded-sm shrink-0"></div>
                  <span>
                    Nilai IKPA &lt; 70 :{" "}
                    <strong className="text-gray-900">Kurang</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION BAWAH */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {/* CARD BAR CHART */}
        <div className="p-8 pt-12 rounded-[2.5rem] shadow-sm border border-gray-100 bg-white relative overflow-visible w-full">
          <div className="absolute -top-6 left-8 w-14 h-14 bg-[#5AB2FF] rounded-full flex items-center justify-center shadow-lg z-20">
            <AlignLeft size={32} color="white" strokeWidth={3} />
          </div>
          <div className="mb-4">
            <h3 className="font-bold text-xl text-gray-900 tracking-tight">
              Persentase Realisasi Anggaran per Eselon 1
            </h3>
          </div>
          <div className="w-full">
            <BarChart
              data={dataset}
              height="h-80"
              labels={eselons}
              values={values}
            />
          </div>
        </div>

        {/* CARD PERINGKAT */}
        <div className="p-8 pt-12 rounded-[2.5rem] shadow-sm border border-gray-100 bg-white flex flex-col justify-center relative overflow-visible w-full">
          <div className="absolute -top-6 left-8 w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg z-20">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="white"
              className="animate-pulse"
            >
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </div>

          <div className="flex items-center justify-around h-full gap-2">
            <div className="flex flex-col items-center text-center group cursor-pointer w-1/2">
              <div className="w-40 h-40 rounded-[2.5rem] bg-gradient-to-r from-[#5AB2FF] to-[#2E70FD] flex items-center justify-center shadow-lg shadow-blue-200 mb-5 transform group-hover:scale-105 transition-transform duration-300">
                <span className="text-white text-6xl sm:text-7xl md:text-8xl font-bold">
                  9
                </span>
              </div>
              <h4 className="font-bold text-gray-800 text-sm leading-tight">
                Peringkat Realisasi <br /> Kemnaker
              </h4>
            </div>

            <div className="w-px h-32 bg-gray-100"></div>

            <div className="flex flex-col items-center text-center group cursor-pointer w-1/2">
              <div className="w-40 h-40 rounded-[2.5rem] bg-gradient-to-r from-[#5AB2FF] to-[#2E70FD] flex items-center justify-center shadow-lg shadow-blue-200 mb-5 transform group-hover:scale-105 transition-transform duration-300">
                <span className="text-white text-6xl sm:text-7xl md:text-8xl font-bold">
                  15
                </span>
              </div>
              <h4 className="font-bold text-gray-800 text-sm leading-tight">
                Peringkat Alokasi <br /> Seluruh Kementrian
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BudgetExecution;
