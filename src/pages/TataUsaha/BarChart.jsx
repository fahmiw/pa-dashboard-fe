import React from "react";
import ReactECharts from "echarts-for-react";

export default function BarChart({
  height = "h-64",
  dataset,
}) {
  const years = dataset?.labels || [];
  const values = dataset?.values || [];

  const option = {
    grid: {
      top: 25,
      right: 0,
      bottom: 20,
      left: 30,
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: years,
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: { 
        fontSize: 11, 
        color: "#6B7280", 
        margin: 15 
      },
    },
    yAxis: {
      type: "value",
      splitLine: { show: false }, // Hilangkan garis grid horizontal
      axisLine: { show: false },
      axisLabel: { show: true, fontSize: 10, color: "#9CA3AF" },
    },
    series: [
      {
        type: "bar",
        data: values.map((val, idx) => ({
          value: val,
          // Logic: Bar terakhir (Realisasi) warna Biru, sisanya (Target) Abu-abu
          itemStyle: {
            color: idx === values.length - 1 ? "#5CC2F6" : "#E5E7EB", 
            borderRadius: [4, 4, 4, 4], // Rounded semua sisi
          },
          label: {
            show: true,
            position: "top",
            formatter: val.toString(),
            color: idx === values.length - 1 ? "#2563EB" : "#6B7280",
            fontWeight: "bold",
            fontSize: 12,
            distance: 5
          },
        })),
        barWidth: "45%", // Bar sedikit lebih ramping
      },
    ],
  };

  return (
    <div className={`w-full ${height}`}>
      <ReactECharts option={option} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}