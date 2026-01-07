import React from "react";
import ReactECharts from "echarts-for-react";

export default function BarChart({ height = "h-56" }) {

  const pendapatan = {
    2024: {
      anggaran: 1411469409000,
      realisasi: 1030290409607,
    },
    2025: {
      anggaran: 1411469409000,
      realisasi: 1030290409607,
    },
  };  

  const belanja = {
    2024: {
      anggaran: 1411469409000,
      realisasi: 1030290409607,
    },
    2025: {
      anggaran: 1411469409000,
      realisasi: 1030290409607,
    },
  };  

  const categories = ["Anggaran", "Realisasi"];

    const pendapatan2024 = [
      pendapatan[2024].anggaran,
      pendapatan[2024].realisasi,
    ];
    const pendapatan2025 = [
      pendapatan[2025].anggaran,
      pendapatan[2025].realisasi,
    ];

    const belanja2024 = [
      belanja[2024].anggaran,
      belanja[2024].realisasi,
    ];
    const belanja2025 = [
      belanja[2025].anggaran,
      belanja[2025].realisasi,
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
      data: pendapatan2024,
      barWidth: "28%",
      itemStyle: {
        color: "#F6B41B",
        borderRadius: [6, 6, 0, 0],
      },
    },
    {
      name: "2025",
      type: "bar",
      data: pendapatan2025,
      barWidth: "28%",
      itemStyle: {
        color: "#3B82F6",
        borderRadius: [6, 6, 0, 0],
      },
    },
  ],
};

 
  const option2 = {
    ...option1,
    series: [
      {
        name: "2024",
        type: "bar",
        data: belanja2024,
        barWidth: "28%",
        itemStyle: {
          color: "#F6B41B",
          borderRadius: [6, 6, 0, 0],
        },
      },
      {
        name: "2025",
        type: "bar",
        data: belanja2025,
        barWidth: "28%",
        itemStyle: {
          color: "#3B82F6",
          borderRadius: [6, 6, 0, 0],
        },
      },
    ],
  };

  return (
    <div className="bg-white rounded-xl  p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div>
      <div>
        <h3 className="text-sm font-semibold text-gray-800">
          Pendapatan
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
                Realisasi
              </th>
              <th className="px-2 py-1 border-b text-left font-semibold text-gray-600">
                Pendapatan
              </th>
            </tr>
          </thead>
          <tbody>
          <tr className="odd:bg-white even:bg-gray-50">
            <td className="px-2 py-1 border-b">2024</td>
            <td className="px-2 py-1 border-b">
              {pendapatan[2024].realisasi.toLocaleString("id-ID")}
            </td>
            <td className="px-2 py-1 border-b">
              {pendapatan[2024].anggaran.toLocaleString("id-ID")}
            </td>
          </tr>
          <tr className="odd:bg-white even:bg-gray-50">
            <td className="px-2 py-1">2025</td>
            <td className="px-2 py-1">
              {pendapatan[2025].realisasi.toLocaleString("id-ID")}
            </td>
            <td className="px-2 py-1">
              {pendapatan[2025].anggaran.toLocaleString("id-ID")}
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
      <div>
      <div>
        <h3 className="text-sm font-semibold text-gray-800">
          Belanja 
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
                Realisasi
              </th>
              <th className="px-2 py-1 border-b text-left font-semibold text-gray-600">
                Pendapatan
              </th>
            </tr>
          </thead>
          <tbody>
          <tr className="odd:bg-white even:bg-gray-50">
            <td className="px-2 py-1 border-b">2024</td>
            <td className="px-2 py-1 border-b">
              {belanja[2024].realisasi.toLocaleString("id-ID")}
            </td>
            <td className="px-2 py-1 border-b">
              {belanja[2024].anggaran.toLocaleString("id-ID")}
            </td>
          </tr>
          <tr className="odd:bg-white even:bg-gray-50">
            <td className="px-2 py-1">2025</td>
            <td className="px-2 py-1">
              {belanja[2025].realisasi.toLocaleString("id-ID")}
            </td>
            <td className="px-2 py-1">
              {belanja[2025].anggaran.toLocaleString("id-ID")}
            </td>
          </tr>
        </tbody>

        </table>
      </div>

      {/* CHART */}
      <div className={`w-full ${height}`}>
        <ReactECharts
          option={option2}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
    </div>
      );
}