import React, { useContext, useEffect, useState } from "react";
import Title from "@/components/Title";
import Paper from "@/components/Paper";
import Breadcrumbs from "@/components/Breadcrumbs";
import Card from "@/components/Card";
import BarChart from "./BarChart";
import BarChartLo from "./BarChartLo";
import BarChartNeraca from "./BarChartNeraca";
import BarChartLPE from "./BarChartLPE";
import moment from "moment";
import { formatCurrency } from "@/services/GeneralHelper";
import User from "@/components/User";
import { MessageSquareText,DollarSign,ArrowUpDown } from "lucide-react";

function AkuntansiPelaporan() {
  const dataset = [
    { name: "Completed", value: 320 },
    { name: "In Progress", value: 180 },
    { name: "Blocked", value: 60 },
    { name: "Backlog", value: 140 },
  ];

  const trophies = [
    { year: 2020, label: "WTP", img: "/trophy-gold.png" },
    { year: 2021, label: "WDP", img: "/trophy-silver.png" },
    { year: 2022, label: "WTP", img: "/trophy-gold.png" },
    { year: 2023, label: "WTP", img: "/trophy-gold.png" },
    { year: 2024, label: "WTP", img: "/trophy-gold.png" },
    {
      year: 2025,
      label: "Coming Soon",
      img: "/trophy-black.png",
      comingSoon: true,
    },
  ];

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center px-4 md:px-4 border-b border-gray-100 z-20 bg-white shrink-0 pl-20 md:pl-8 transition-all">
        <Title>Dashboard Akuntansi Pelaporan</Title>
        <User name={"Test"} previlege={"Administrator"} />
      </div>

      {/* GRID UTAMA: 1 Kolom di HP, 2 Kolom di Laptop Besar */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 pt-2">
        {/* === CARD 1: OPINI BPK === */}
        <Card className="relative mb-2">
          <div className="absolute -top-5 left-6 w-10 h-10 rounded-full bg-[#ecfdf3] flex items-center justify-center text-[#bcdd51] shadow-sm border border-white">
            <MessageSquareText size={20} />
          </div>
          <h2 className="font-bold text-2xl mb-4">
            Opini Badan Pemeriksa Keuangan
          </h2>
          {/* Mobile: 2 Kolom, Tablet/Desktop: 4 Kolom */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 justify-items-center">
            {trophies.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <span className="text-sm text-gray-500">{item.year}</span>

                <div className="relative flex items-center justify-center my-2">
                  <img
                    src={item.img}
                    alt={item.label}
                    className="w-20 h-20 md:w-25 md:h-25 object-contain"
                  />
                </div>

                <span
                  className={`font-semibold text-base ${
                    item.comingSoon ? "italic text-gray-600" : "text-gray-900"
                  }`}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* === CARD 2: NILAI MATURITAS SPIP === */}
        <Card className="relative mb-2">
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-4 items-center">
              <div className="absolute -top-5 left-6 w-10 h-10 rounded-full bg-[#ffcfe2] flex items-center justify-center text-green-600 shadow-sm border border-white">
                <div className=" w-6 h-6 rounded-full bg-[#fc0166] flex items-center justify-center text-[#ffcfe2] shadow-sm border border-white">
                  <ArrowUpDown   size={15 } />
              </div>
              </div>
              <span className="font-semibold text-2xl">
                Nilai Maturitas SPIP
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-4 md:mt-12">
            {/* BOX 1 */}
            <div className="flex flex-col items-center gap-2 w-full md:w-auto">
              <div className="bg-[#898a8d] rounded-3xl text-center h-[140px] md:h-[180px] w-full md:w-[260px] flex items-center justify-center shadow-md">
                <span className="text-6xl md:text-[85px] font-black text-white scale-y-125 md:scale-y-150 transition-all">
                  3.92
                </span>
              </div>
              <span className="text-base md:text-lg font-medium">
                Nilai SPIP Tahun 2024
              </span>
            </div>

            {/* GARIS PUTUS-PUTUS (Responsive Divider) */}
            <div className="hidden md:block h-[200px] border-l-2 border-dashed border-gray-300 mx-4"></div>
            <div className="block md:hidden w-[80%] border-t-2 border-dashed border-gray-300 my-2"></div>

            {/* BOX 2 */}
            <div className="flex flex-col items-center gap-2 w-full md:w-auto">
              <div className="bg-gradient-to-r from-[#59c7ff] to-[#2f8afd] rounded-3xl text-center h-[140px] md:h-[180px] w-full md:w-[260px] flex items-center justify-center shadow-md">
                <span className="text-6xl md:text-[85px] font-black text-white scale-y-125 md:scale-y-150 transition-all">
                  3.93
                </span>
              </div>
              <span className="text-base md:text-lg font-medium">
                Target SPIP Tahun 2025
              </span>
            </div>
          </div>
        </Card>
      </div>
           
        <div className="bg-white  relative rounded-xl border shadow-sm  gap-3">
        <div className=" p-5 grid grid-cols-1 sm:grid-cols-2 gap-3 ">
          <div  >
            <div className="absolute -top-5 left-6 w-10 h-10 rounded-full bg-[#fff3d0] flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-[#ffbe02] flex items-center justify-center text-[#fff3d0] shadow-sm border border-white">
                  <DollarSign size={15}  />
              </div>
            </div>
            <h1 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span />
              LRA 30 Juni 2024 dan 30 Juni 2025
            </h1>

                <BarChart height="h-32" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <span  />
                Neraca Semester I
              </h1>

                <BarChartNeraca height="h-32" />
            </div>
          </div>
        
        <div >
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div  >
            <h1 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span />
              LPE Semester 130 Juni 2025 & 30 Juni 2024
            </h1>

                <BarChartLPE height="h-32" />
            </div>
            <div>
            <h1 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span />
              Lo Semester 130 Juni 2025 & 30 Juni 2024
            </h1>

                <BarChartLo height="h-32" />
            </div>
        </div>
        </div>
        </div>
      </div> 
  );
}

export default AkuntansiPelaporan;
