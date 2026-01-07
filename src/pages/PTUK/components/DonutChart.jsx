import React from "react";
import ReactECharts from "echarts-for-react";

export default function DonutChart({ data, height = "h-64" }) {
  const option = {
    tooltip: {
      trigger: "item",
      formatter: "{b}: <br/><b>{c}</b> ({d}%)",
    },
    legend: { show: false },
    series: [
      {
        name: "LHP Kementrian",
        type: "pie",
        // UBAH DISINI: Radius diatur agar sangat tebal (inner kecil, outer besar)
        radius: ["40%", "95%"], 
        center: ["50%", "50%"],
        avoidLabelOverlap: false,
        label: { show: false },
        labelLine: { show: false },
        data: data,
        // HAPUS itemStyle border agar tidak ada jarak antar warna
        itemStyle: {
           // borderWidth: 0, 
           // borderColor: 'transparent',
        }
      },
    ],
  };

  return (
    // Flex center penting agar chart berada tepat di tengah container-nya
    <div className={`w-full ${height} flex items-center justify-center`}>
      <ReactECharts 
        option={option} 
        style={{ width: "100%", height: "100%" }} 
        opts={{ renderer: 'svg' }} 
      />
    </div>
  );
}