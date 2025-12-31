import React from "react";
import ReactECharts from "echarts-for-react";

export default function DonutChart({
  height = "h-72",
  dataset,
  colors = ["#C1D857", "#8F9298", "#6EC8F8"],
}) {
  const option = {
    color: colors,
    tooltip: {
      trigger: "item",
    },
    legend: {
      show: false,
    },
    series: [
      {
        name: "Data",
        type: "pie",
        // PERUBAHAN DISINI:
        // ["40%", "90%"] -> Lubang 40% (lebih kecil), Luar 90% (tetap besar)
        // Hasilnya chart jadi lebih TEBAL / GEMUK
        radius: ["40%", "90%"], 
        avoidLabelOverlap: false,
        center: ["50%", "50%"],
        label: {
          show: false,
          position: "center",
        },
        labelLine: {
          show: false,
        },
        data: dataset,
        itemStyle: {
          borderRadius: 0,
          borderColor: "#fff",
          borderWidth: 3,
        },
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