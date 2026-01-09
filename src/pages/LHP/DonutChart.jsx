import React from "react";
import ReactECharts from "echarts-for-react";

export default function DonutChart({ summary , height = "h-[300px]" }) {
  // Data chart diambil dari props summary
  const chartData = [
    { value: summary.sesuai, name: "TL Status Sesuai", color: "#59C7FF" },
    { value: summary.belumSesuai, name: "TL Status belum sesuai", color: "#FC0166" },
    { value: summary.tptd, name: "TPTD", color: "#898A8D" },
  ];

  const option = {
    color: chartData.map(item => item.color),
    tooltip: { trigger: 'item' },
    series: [
      {
        name: "Status",
        type: "pie",
        radius: ["40%", "95%"],
        center: ["50%", "50%"], // Center di mobile, nanti bisa diatur via props
        avoidLabelOverlap: false,
        label: { show: false },
        itemStyle: { borderColor: "#fff", borderWidth: 4 },
        data: chartData,
      },
    ],
  };

  return (
    <div className={`w-full ${height} flex items-center justify-center`}>
      <ReactECharts option={option} style={{ height: "100%", width: "100%" }} />
    </div>
  );
}