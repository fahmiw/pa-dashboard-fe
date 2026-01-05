import React from "react";
import ReactECharts from "echarts-for-react";

const Donut = ({ title, option, items }) => (
  <div className="flex flex-col items-center gap-4">
    {/* TITLE */}
    <span className="text-[#8C8C8C] font-semibold text-base">
      {title}
    </span>

    {/* DONUT */}
    <div className="w-[200px] aspect-square">
      <ReactECharts
        option={option}
        style={{ width: "100%", height: "100%" }}
      />
    </div>

    {/* LEGEND */}
    <div className="w-full flex flex-col gap-3">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-3">
          <div
            className="w-4 h-4 rounded-full mt-1"
            style={{ backgroundColor: item.color }}
          />
          <div>
            <div className="font-bold  text-sm sm:text-base md:text-xl">{item.label}</div>
            <div className="font-semibold  text-sm sm:text-base md:text-xl">
              {item.value}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function DonutChartAkuntansi() {
  const baseSeries = {
    type: "pie",
    radius: ["35%", "70%"],
    center: ["50%", "50%"],
    label: { show: false },
    labelLine: { show: false },
    itemStyle: {
      borderColor: "#fff",
      borderWidth: 2,
    },
  };

  const optionAnggaran = {
    color: ["#BCDD51", "#59C7FF"],
    series: [
      {
        ...baseSeries,
        data: [
          { value: 40 },
          { value: 35 },
        ],
      },
    ],
  };

  const optionPendapatan = {
    color: ["#E8E8E8", "#59C7FF"],
    series: [
      {
        ...baseSeries,
        data: [
          { value: 45 },
          { value: 55 },
        ],
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <Donut
        title="Realisasi Anggaran"
        option={optionAnggaran}
        items={[
          {
            label: "Realisasi",
            value: "Rp 10.504.149.944.398",
            color: "#BCDD51",
          },
          {
            label: "TPTD",
            value: "Rp 10.504.149.944.398",
            color: "#59C7FF",
          },
        ]}
      />

      <Donut
        title="Realisasi Pendapatan"
        option={optionPendapatan}
        items={[
          {
            label: "Realisasi",
            value: "Rp 10.504.149.944.398",
            color: "#E8E8E8",
          },
          {
            label: "Target",
            value: "Rp 10.504.149.944.398",
            color: "#59C7FF",
          },
        ]}
      />
    </div>
  );
}
