import React, { useContext, useEffect, useState } from "react";
import Title from "@/components/Title";
import Paper from "@/components/Paper";
import Breadcrumbs from "@/components/Breadcrumbs";
import Card from "@/components/Card";
import { Database } from "lucide-react";
import DonutChart from "./DonutChart";
import BarChart from "./BarChart";
import moment from "moment";
import BarChartIPA from "./BarChartIPA";
import DonutChartAkuntansi from "./DonutChartAkuntansi";
import { formatCurrency } from "@/services/GeneralHelper";
import User from "@/components/User";
import { Leaf,Landmark,ClipboardList,ChartColumn } from "lucide-react";

function MainDashboard() {
  const dataset = [
    { name: "Completed", value: 320 },
    { name: "In Progress", value: 180 },
    { name: "Blocked", value: 60 },
    { name: "Backlog", value: 140 },
  ];

  return (
    <div>
      <div className="flex justify-between items-center px-4 md:px-4 border-b border-gray-100 z-20 bg-white shrink-0 pl-20 md:pl-8 transition-all">
        <Title>Dashboard Utama</Title>
        <User name={"Test"} previlege={"Administrator"} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 pt-2 gap-4">
        <Card className="relative p-4 m-3">
          <div className="flex justify-between items-center mb-4 ">
            <div className="flex gap-4 items-center">
              <div className="absolute -top-4 bg-[#D4F0B2] rounded-full content-center p-3">
                <Leaf size={20} className="text-[#6FCE00]"/>
              </div>
              <span className="font-bold text-[16px] sm:text-[18px] md:text-[20px] font-extrabold pr-2 m-3 size">PTUK</span>
            </div>
            
            <span className="text-base text-[10px] md:text-[16px] color-[#898A8D]">
              Pengelolaan Keuangan
            </span>
          </div>
          <div className="grid grid-cols-1 place-items-center">
            <DonutChart data={dataset} />
            <div className="grid grid-cols-2 gap-5 ">
              <div key="info" className="flex flex-col items-start">
                <div className="flex gap-2 items-center">
                  <div className="w-3 h-3 bg-[#000000] rounded-full"></div>
                  <span className="text">Jumlah Temuan</span>
                </div>
                <span className="text-[40px] ml-4 font-extrabold  leading-none">
                  2072
                </span>
              </div>
              <div key="info" className="flex flex-col">
                <div className="flex gap-2 items-center">
                  <div className="w-3 h-3 bg-[#BCDD51] rounded-full"></div>
                  <span className="text-sm">Pelaksana Anggaran</span>
                </div>
                <span className="text-[40px] ml-4 font-extrabold  leading-none">
                  655
                </span>
              </div>
              <div key="info" className="flex flex-col">
                <div className="flex gap-2 items-center">
                  <div className="w-3 h-3 bg-[#47B5FF] rounded-full"></div>
                  <span className="text-sm">TPTD</span>
                </div>
                <span className="text-[40px] ml-4 font-extrabold  leading-none">
                  54
                </span>
              </div>
              <div key="info" className="flex flex-col">
                <div className="flex gap-2 items-center">
                  <div className="w-3 h-3 bg-[#898A8D] rounded-full"></div>
                  <span className="text-sm">TL Status Sesuai</span>
                </div>
                <span className="text-[40px] ml-4 font-extrabold  leading-none">
                  1399
                </span>
              </div>
            </div>
          </div>
        </Card>
        <Card className="relative p-4 m-3">
          <div className="flex justify-between items-center  gap-2">
            <div className="flex gap-4 items-center ">
              <div className="bg-[#FFCFE2]  absolute -top-4 rounded-full content-center p-3 ">
                <Landmark  size={20} color="#FC0166" />
              </div>
              <span className="font-bold pt-4">Pelaksanaan Anggaran</span>
            </div>
            <span className="text-base color-[#898A8D] mt-3">
              Nilai IKPA dan Target Tahun {moment().format("YYYY")}
            </span>
          </div>
          <div className="grid grid-cols-1  items-center gap-2">
            <div className="grid items-center">
              <BarChart data={dataset} height="h-72" />
            </div>
            <div className="flex gap-2 flex-col place-items-center ">
              <div className="bg-gradient-to-r from-[#59C7FF] to-[#2F8AFD] rounded-2xl text-center px-4 py-5">
                <span className="text-7xl md:text-[85px] font-black text-white ">94</span>
              </div>
              <span className="font-bold text-sm  ">
                Target Nilai IKPA Kemnaker 2025
              </span>
            </div>
          </div>
        </Card>
        <Card className="relative p-4 m-3">
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-4 items-center">
              <div className="bg-[#FFF3D0]  items-center absolute -top-4 rounded-full content-center p-3 pb-1">
                <span className="material-icons text-[#FFBC00] text-[20px]">corporate_fare</span>
              </div>
              <span className="font-bold mt-4">Barang Milik Negara</span>
            </div>
            <span className="text-base  mt-4 H">
              Nilai IKPA dan Target Tahun {moment().format("YYYY")}
            </span>
          </div>
           <div className="flex gap-2 flex-col items-center">
              <div className="bg-gradient-to-r from-[#59C7FF] to-[#2F8AFD] rounded-2xl text-center px-1 py-5">
                <span className="text-7xl lg:text-[85px] font-black text-white">3.2</span>
              </div>
              <span className="font-bold text-sm ">
                Target Nilai IPA Kemnaker 2025
              </span>
            </div>
          <div className="grid grid-cols gap-2 items-center">
            <div className="grid grid-cols-[80%_20%] items-center">
              <BarChartIPA data={dataset} height="h-80" />
              <div className="flex flex-col">
                <div className="w-3 h-3 bg-[#296CF8]"></div>
                <span className="text-sm">Nilai IPA 2025</span>
                <span className="text-xl font-bold">3.59</span>
              </div>
            </div>
           
          </div>
        </Card>
        <Card className="relative p-4 m-3">
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-4 items-center">
              <div className="bg-[#D5F1FF] absolute -top-4 rounded-full content-center p-3 ">
                <ChartColumn size={20} color="#59C7FF" />
              </div>
              <span className="font-bold text-sm sm:text-base md:text-lg mt-4">Akuntansi dan Pelaporan</span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2">
            <DonutChartAkuntansi data={dataset} height="h-64" />
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2">
              <div>
                <div className="flex flex-col justify-evenly">
                  <div key="info" className="flex flex-col tems-center">
                    <div className="flex gap-2 items-center">
                      <div className="w-4 h-4 bg-[#FC0166] rounded-full"></div>
                        <span className="text-sm sm:text-base md:text-xl font-bold">Blokir</span>
                    </div>
                    <span className=" text-sm sm:text-base md:text-xl font-semibold leading-none">
                        {formatCurrency("15261272133000")}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex flex-col my-10 justify-evenly">
                  
                </div>
              </div>
            </div>
            
          </div>
        </Card>
      </div>
    </div>
  );
}

export default MainDashboard;
