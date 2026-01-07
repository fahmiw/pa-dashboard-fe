import React from "react";
import ReactECharts from "echarts-for-react";


export default function DonutChart({
  height = "h-72", 
}) {
  const option = {
    color: ["#59C7FF","#FC0166","#FFBE02","#BCDD51","#898A8D","#6155F5","#0A0A0A"], 
    legend: {
      orient: "vertical",
      right: 0,          // ✅ legend di kanan
      top: "middle",
      icon: "circle",
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 8,

      textStyle: {
        fontSize: 11,
        width: 90,       // ✅ biar jadi ...
        overflow: "truncate",
      },
    },
    title: {
      show: false, // pastikan tidak ada title
    },

    series: [
      {
        type: "pie",
        radius: ["35%", "75%"], 
        avoidLabelOverlap: false,
        center: ["40%", "50%"],
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
          // { value: 50},
          // { value: 50},
          // { value: 50},
          // { value: 50},
          // { value: 50},
          // { value: 20},
          // { value: 20},
        ],
      },
    ],
  };

  return (
    <div className={`w-[400px] ${height}`}>
      <ReactECharts
        option={option}
        style={{ height: "100%", width: "100%" }}
        notMerge
        lazyUpdate
      />
    </div>
  );
}
