import React from "react";
import ReactECharts from "echarts-for-react";

export default function UnitPieChart({ height = "h-40" }) {
  // Data Dummy
  const data = [
    { value: 30, name: "BINALAVOTAS", itemStyle: { color: "#60A5FA" } },
    { value: 20, name: "BINWASNAKER", itemStyle: { color: "#F43F5E" } }, 
    { value: 15, name: "Sekretariat Jenderal", itemStyle: { color: "#FACC15" } }, 
    { value: 15, name: "BINAPENTA", itemStyle: { color: "#A3E635" } }, 
    { value: 10, name: "PHI dan Jamsostek", itemStyle: { color: "#9CA3AF" } }, 
    { value: 5, name: "BARENBANG", itemStyle: { color: "#8B5CF6" } }, 
    { value: 5, name: "INSPEKTORAT", itemStyle: { color: "#000000" } }, 
  ];

  const option = {
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c}%",
    },
    legend: {
      orient: "vertical",
      right: "0%", // Legend tetap di kanan mentok
      top: "middle", // Legend di tengah vertikal
      icon: "circle",
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 10, // Jarak antar item legend
      textStyle: {
        fontSize: 11,
        color: "#334155",
        fontWeight: "500"
      },
    },
    series: [
      {
        name: "Unit",
        type: "pie",
        // UBAH DISINI: Radius dibesarkan mentok, Center digeser ke kiri
        radius: ["0%", "95%"], 
        center: ["30%", "50%"], // Geser ke kiri (30%) biar ada tempat buat legend
        
        data: data,
        label: { show: false },
        itemStyle: {
          borderWidth: 2,
          borderColor: "#fff",
        },
      },
    ],
  };

  return (
    <div className={`w-full ${height}`}>
      <ReactECharts
        option={option}
        style={{ width: "100%", height: "100%" }}
        opts={{ renderer: "svg" }}
      />
    </div>
  );
}