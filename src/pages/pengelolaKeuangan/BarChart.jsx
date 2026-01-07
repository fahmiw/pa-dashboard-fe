import React from "react";
import ReactECharts from "echarts-for-react";

export default function BarChart({ height = "h-[450px]" }) {
  const categories = [
    "04 - Ditjen Pembinaan Penempatan Tenaga Kerja dan Perluasan Kesempatan Kerja",
    "08 - Ditjen Pembinaan Pengawasan Ketenagakerjaan dan Keselamatan dan Kesehatan Kerja",
    "13 - Direktorat Jenderal Pembinaan Pelatihan Vokasi dan Produktivitas",
    "01 - Sekretariat Jenderal",
    "11 - Badan Perencanaan dan Pengembangan Ketenagakerjaan",
    "05 - Ditjen Pembinaan Hubungan Industrial dan Jaminan Sosial Tenaga Kerja",
    "02 - Inspektorat Jenderal",
  ].reverse();

  const dataTdkLanjut = [300, 450, 600, 800, 200, 150, 100];
  const dataKerugian = [280, 400, 550, 750, 180, 140, 90];

  const option = {
    grid: {
      left: "5%",      // Menambah ruang di kiri agar teks tidak terpotong
      right: "10%",
      bottom: "5%",
      top: "5%",
      containLabel: true, // Memastikan label unit kerja tetap di dalam grid
    },
    legend: { show: false },
    xAxis: {
      type: "value",
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: { show: false } 
    },
    yAxis: {
  type: "category",
  data: categories,
  // 1. MEMUNCULKAN GARIS VERTIKAL UTAMA
  axisLine: { 
    show: false, 
    
  },
  // 2. MEMUNCULKAN GARIS PENUNJUK HORIZONTAL (TICKS)
  axisTick: { 
    show: true, 
    alignWithLabel: true, // Membuat garis berada tepat di tengah kategori
    length: 20, // Mengatur panjang garis horizontalnya
    lineStyle: {
      color: "#6B7280",
    }
  },
  axisLabel: { 
    color: "#374151", 
    fontSize: 10,
    fontWeight: "bold",
    width: 150, 
    overflow: "break",
    margin: 25 // Memberi jarak yang cukup agar garis horizontal terlihat
  },
},
    series: [
      {
        name: "Jumlah Tindak Lanjut",
        type: "bar",
        data: dataTdkLanjut,
        itemStyle: {
          color: "#2f8afd", 
          borderRadius: [0, 4, 4, 0],
        },
        barWidth: "25%",
        label: { show: false },
      },
      {
        name: "Kerugian Negara",
        type: "bar",
        data: dataKerugian,
        itemStyle: {
          color: "#fc0166", 
          borderRadius: [0, 4, 4, 0],
        },
        barWidth: "25%",
        barGap: "40%", 
        label: { show: false },
      },
    ],
    animationDuration: 1000,
  };

  return (
    <div className={`w-full ${height} rounded-lg p-5`}>
      <ReactECharts 
        option={option} 
        style={{ width: "100%", height: "100%" }} 
        notMerge={true} // Memastikan perubahan opsi langsung diterapkan
      />
    </div>
  );
}