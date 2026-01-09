import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";

export default function BarChart({ height = "h-[450px]" }) {
  const [isMobile, setIsMobile] = useState(false);
useEffect(() => {
  const checkMobile = () => setIsMobile(window.innerWidth < 768);
  checkMobile();
  window.addEventListener("resize", checkMobile);
  return () => window.removeEventListener("resize", checkMobile);
}, []);

  // Label Unit Kerja (Eselon 1) 
  const categories = [
    "DITJEN BINAPENTA & PKK",
    "DITJEN BINALAVOTAS",
    "DITJEN BINWASNAKER & K3",
    "SEKRETARIAT JENDERAL",
    "DITJEN PHI & JAMSOS",
    "BARENBANG",
    "ITJEN",
    "DITJEN BINALAVOTAS (Euro)"
  ].reverse(); 

  // Data dummy yang disesuaikan
  const dataTdkLanjut = [450, 300, 600, 500, 480, 320, 310, 580];
  const dataKerugian = [100, 550, 100, 580, 430, 130, 470, 300];

  const option = {
    grid: {
      left: isMobile ? "1%" : "3%",  // Geser pol ke kiri di HP
      right: isMobile ? "5%" : "15%",
      bottom: "5%",
      top: "5%",
      containLabel: true,
    },
    legend: { show: false },
    xAxis: {
      type: "value",
      // MENYEMBUNYIKAN GARIS PUTUS-PUTUS DAN LABEL X
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false }, // Ini untuk menghilangkan garis putus-putus
      axisLabel: { show: false }  // Menyembunyikan angka di sumbu X agar bersih
    },
   yAxis: {
    type: "category",
    data: categories,
    axisLine: { 
        show: false, 
        
    },
    // 2. MEMUNCULKAN GARIS PENUNJUK HORIZONTAL (TICKS)
    axisTick: { 
        show: true, 
        alignWithLabel: true, // Membuat garis berada tepat di tengah kategori
        length: isMobile ? 10 : 20, // Mengatur panjang garis horizontalnya
        lineStyle: {
        color: "#6B7280",
        }
    },
    axisLabel: { 
        color: "#374151", 
        fontSize: isMobile ? 8 : 10,
        fontWeight: "bold",
        width: isMobile ? 70 : 150,
        overflow: "break",
        lineHeight: isMobile ? 10 : 14, // Mengatur jarak antar baris teks label
        margin: isMobile ? 10 : 25 // Memberi jarak yang cukup agar garis horizontal terlihat
    },
    },
    series: [
      {
        name: "Jumlah Tindak Lanjut",
        type: "bar",
        data: dataTdkLanjut,
        itemStyle: {
          color: "#bcdd51", 
          borderRadius: [0, 4, 4, 0],
        },
        barWidth: "35%",
        label: {
          show: false 
        },
      },
      {
        name: "Kerugian Negara",
        type: "bar",
        data: dataKerugian,
        itemStyle: {
          color: "#fc0166", 
          borderRadius: [0, 4, 4, 0],
        },
        barWidth: "35%",
        barGap: "30%", 
        label: {
          show: false
        },
      },
    ],
    animationDuration: 1000,
  };

  return (
    <div className={`w-full ${height}`}>
      <ReactECharts option={option} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}