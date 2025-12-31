import React from "react";
import ReactECharts from "echarts-for-react";

export default function DonutChart({
  height = "h-64",
  data = [], // Expecting: [{ name: string, value: number, itemStyle: { color: string } }]
  center = ["50%", "50%"],
  radius = ["45%", "85%"], // Lebih tebal sesuai gambar target
}) {
  const option = {
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c} ({d}%)",
    },
    legend: {
      show: false, // Kita buat legend custom di luar chart agar sesuai desain target
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: radius,
        center: center,
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 0,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false, // Hide label lines on chart to look cleaner like Image 1
          position: "center",
        },
        emphasis: {
          label: {
            show: false,
            fontSize: 20,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: data,
      },
    ],
  };

  return (
    <div className={`w-full ${height}`}>
      <ReactECharts
        option={option}
        style={{ height: "100%", width: "100%" }}
        notMerge={true}
      />
    </div>
  );
}