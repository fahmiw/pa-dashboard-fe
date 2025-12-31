import React, { useContext, useEffect, useState } from "react";
import Title from "@/components/Title";
import Paper from "@/components/Paper";
import Breadcrumbs from "@/components/Breadcrumbs";
import Card from "@/components/Card";
import BarChart from "./BarChart";
import moment from "moment";
import { formatCurrency } from "@/services/GeneralHelper";
import User from "@/components/User";

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
      {/* HEADER: Responsive User Alignment */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <Breadcrumbs
          items={[{ name: "Dashboard Utama", path: "/dashboard" }]}
        />
        <div className="self-end sm:self-auto">
          <User name={"Test"} previlege={"Administrator"} />
        </div>
      </div>

      <Title>Dashboard Akuntansi Pelaporan</Title>

      {/* GRID UTAMA: 1 Kolom di HP, 2 Kolom di Laptop Besar */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* === CARD 1: OPINI BPK === */}
        <Card className="">
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
        <Card className="">
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-4 items-center">
              <span className="font-semibold text-2xl">
                Nilai Maturitas SPIP
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-4 md:mt-12">
            {/* BOX 1 */}
            <div className="flex flex-col items-center gap-2 w-full md:w-auto">
              <div className="bg-gradient-to-tr from-[#C2C3C8] to-[#CCC] rounded-2xl text-center h-[140px] md:h-[180px] w-full md:w-[260px] flex items-center justify-center shadow-md">
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
              <div className="bg-gradient-to-b from-[#5C90FD] to-[#2D71FE] rounded-2xl text-center h-[140px] md:h-[180px] w-full md:w-[260px] flex items-center justify-center shadow-md">
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

      {/* === CARD 3: CHART LRA === */}
      <div className="grid mt-4 gap-4">
        <Card className="">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
            <span className="font-semibold text-xl md:text-2xl">
              LRA 30 Juni 2025 & 2024
            </span>
          </div>

          {/* Layout Chart: Stack di HP, Grid di Desktop */}
          <div className="flex flex-col lg:grid lg:grid-cols-[70%_30%] gap-6 items-center">
            <div className="w-full">
              <BarChart data={dataset} height="h-56" />
            </div>

            {/* Info Legend */}
            <div className="flex flex-row lg:flex-col gap-8 lg:gap-2 justify-center lg:justify-start w-full lg:w-auto">
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex gap-2 items-center mb-1">
                  <div className="w-3 h-3 bg-[#296CF8] rounded-full"></div>
                  <span className="text-sm">Jul 2025</span>
                </div>
                <span className="text-2xl md:text-3xl font-bold">3.59</span>
              </div>
              {/* Contoh jika ada data pembanding lain */}
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex gap-2 items-center mb-1">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <span className="text-sm">Jul 2024</span>
                </div>
                <span className="text-2xl md:text-3xl font-bold text-gray-500">
                  3.20
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default AkuntansiPelaporan;
