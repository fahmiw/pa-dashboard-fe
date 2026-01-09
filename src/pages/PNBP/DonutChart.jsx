import React from "react";
import ReactECharts from "echarts-for-react";


export default function DonutChart({
  height = "h-72", 
}) {
  const option = {
    color: ["#59C7FF","#FC0166","#FFBE02","#BCDD51","#898A8D","#6155F5","#0A0A0A"], 
    legend: {
      orient: "vertical",
      right: 70,          // ✅ legend di kanan
      top: "middle",
      icon: "circle",
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 5,

      textStyle: {
        fontSize: 11,
        width: 80,     
        overflow: "truncate",
      },
    },
    title: {
      show: false, // pastikan tidak ada title
    },

    series: [
      {
        type: "pie",
        radius: ["30%", "70%"], 
        avoidLabelOverlap: false,
        center: ["28%", "50%"],
        label: {
          show: false, // ❌ hide percentage labels
        },
        labelLine: {
          show: false,
        },

        itemStyle: {
          borderRadius: 1, // ❌ remove rounded corners
          borderColor: "#fff",
          borderWidth: 2,
        },
        data: [
          { value: 50, name: "BINALAVOTAS" },
          { value: 50, name: "BINWASNAKER" },
          { value: 50, name: "SEKRETARIAT JENDERAL KEMNAKER" },
          { value: 50, name: "BINAPENTA" },
        { value: 50, name: "PHI & JAMSOS" },
        { value: 20, name: "BARENBANG" },
        { value: 20, name: "INSPEKTORAT JENDERAL" },
        ],
      },
    ],
  };

  return (
    <div className={`w-[380px] ${height}`}>
      <ReactECharts
        option={option}
        style={{ height: "100%", width: "100%" }}
        notMerge
        lazyUpdate
      />
    </div>
  );
}
