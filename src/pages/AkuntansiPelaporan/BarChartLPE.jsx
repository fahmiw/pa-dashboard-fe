import React from "react";
import ReactECharts from "echarts-for-react";

export default function BarChartLPES({ height = "h-56" }) {

  const neraca = {
    2024: {
      aset: 1411469409000,
      surplusLO: 1030290409607,
      ekuitas: 1030290409607,
      realisasi: 1030290409607,
    },
    2025: {
      aset: 1411469409000,
      surplusLO: 1030290409607,
      ekuitas: 1030290409607,
      realisasi: 1030290409607,
    },
  };  

  const categories = ["Aset", "Surplus atau Defisit LO","Ekuitas","Realisasi"];

    const neraca2024 = [
      neraca[2024].aset,
      neraca[2024].surplusLO,
      neraca[2024].ekuitas,
      neraca[2024].realisasi,
    ];
    const neraca2025 = [
      neraca[2025].aset,
      neraca[2025].surplusLO,
      neraca[2025].ekuitas,
      neraca[2025].realisasi,
    ];


 const option1 = {
  tooltip: {
    trigger: "axis",
    axisPointer: { type: "shadow" },
    formatter: (params) => `
      <strong>${params[0].axisValue}</strong><br/>
      ${params[0].marker} 2024: ${params[0].value.toLocaleString("id-ID")}<br/>
      ${params[1].marker} 2025: ${params[1].value.toLocaleString("id-ID")}
    `,
  },

  grid: {
    left: "4%",
    right: "4%",
    top: "10%",
    bottom: "18%",
    containLabel: false,
  },

  xAxis: {
    type: "category",
    data: categories,
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: {
      show:true,
      fontSize: 11,
      color: "#6B7280",
    },
  },

  yAxis: {
    type: "value",
    show: false,        //  HILANGKAN ANGKA & GARIS
  },

  series: [
    {
      name: "2024",
      type: "bar",
      data: neraca2024,
      barWidth: "28%",
      itemStyle: {
        color: "#F6B41B",
        borderRadius: [6, 6, 0, 0],
      },
    },
    {
      name: "2025",
      type: "bar",
      data: neraca2025,
      barWidth: "28%",
      itemStyle: {
        color: "#3B82F6",
        borderRadius: [6, 6, 0, 0],
      },
    },
  ],
};


  return (
    <div className="bg-white rounded-xl p-4 flex flex-col gap-3">
      <div>
      <div>
        <h3 className="text-sm font-semibold text-gray-800">
        
        </h3>
      </div>

      {/* TABLE */}
      <div className="rounded-md border border-gray-200 overflow-hidden">
        <table className="w-full text-[11px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 py-1 border-b text-left font-semibold text-gray-600">
                Tahun
              </th>
              <th className="px-2 py-1 border-b text-left font-semibold text-gray-600">
                Aset
              </th>
              <th className="px-2 py-1 border-b text-left font-semibold text-gray-600">
                Surplus atau Defisit Lo
              </th>
              <th className="px-2 py-1 border-b text-left font-semibold text-gray-600">
                Koreksi Ekuitas
              </th>
               <th className="px-2 py-1 border-b text-left font-semibold text-gray-600">
                Realisasi
              </th>
            </tr>
          </thead>
          <tbody>
          <tr className="odd:bg-white even:bg-gray-50">
            <td className="px-2 py-1 border-b">2024</td>
            <td className="px-2 py-1 border-b">
              {neraca[2024].aset.toLocaleString("id-ID")}
            </td>
            <td className="px-2 py-1 border-b">
              {neraca[2024].surplusLO.toLocaleString("id-ID")}
            </td>
            <td className="px-2 py-1 border-b">
              {neraca[2024].ekuitas.toLocaleString("id-ID")}
            </td>
            <td className="px-2 py-1 border-b">
              {neraca[2024].realisasi.toLocaleString("id-ID")}
            </td>
          </tr>
          <tr className="odd:bg-white even:bg-gray-50">
            <td className="px-2 py-1">2025</td>
            <td className="px-2 py-1">
              {neraca[2025].aset.toLocaleString("id-ID")}
            </td>
            <td className="px-2 py-1">
              {neraca[2025].surplusLO.toLocaleString("id-ID")}
            </td>
            <td className="px-2 py-1">
              {neraca[2025].ekuitas.toLocaleString("id-ID")}
            </td>
            <td className="px-2 py-1 border-b">
              {neraca[2024].realisasi.toLocaleString("id-ID")}
            </td>
          </tr>
        </tbody>

        </table>
      </div>
        {/* CHART */}
            <div className={`w-full ${height}`}>
              <ReactECharts
                option={option1}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
    </div>
    </div>
      );
}