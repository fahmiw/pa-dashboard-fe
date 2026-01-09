import React, { useContext, useEffect, useState } from "react";
import Table from "@/components/Table";
import TableRow from "@/components/TableRow";
import TableHeader from "@/components/TableHeader";
import TableCell from "@/components/TableCell";
import { TableBody } from "@/components/TableBody";
import Title from "@/components/Title";
import Paper from "@/components/Paper";
import Breadcrumbs from "@/components/Breadcrumbs";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { buildQueryString } from "@/services/GeneralHelper";
import moment from "moment";
import { apiRequest } from "@/services/APIHelper";
import { Download, Upload } from "lucide-react";
import { fetchHelperGET } from "@/services/FetchHelper";
import { toast } from "react-toastify";
import FileInput from "@/components/FileInput";
import Select from "@/components/Select";
import { AppContext } from "@/contexts/AppContext";
import User from "@/components/User";
import { useBudgetExecution } from "../BudgetExecution/useBudgetExecution";
import Card from "@/components/Card";
import { dataTable } from "../BudgetExecution/constants";
import { Wallet } from "lucide-react";

const columns = [
  {
    label: "Eselon",
    key: "eselon",
    rowSpan: 2,
  },
  {
    label: "Total",
    children: [
      { label: "Pagu", key: "total_pagu" },
      { label: "Realisasi", key: "total_realisasi" },
      { label: "Sisa", key: "total_sisa" },
    ],
  },
  {
    label: "Pegawai",
    children: [
      { label: "Pagu", key: "pegawai_pagu" },
      { label: "Realisasi", key: "pegawai_realisasi" },
      { label: "Sisa", key: "pegawai_sisa" },
    ],
  },
  {
    label: "Barang",
    children: [
      { label: "Pagu", key: "barang_pagu" },
      { label: "Realisasi", key: "barang_realisasi" },
      { label: "Sisa", key: "barang_sisa" },
    ],
  },
  {
    label: "Modal",
    children: [
      { label: "Pagu", key: "modal_pagu" },
      { label: "Realisasi", key: "modal_realisasi" },
      { label: "Sisa", key: "modal_sisa" },
    ],
  },
];

function RealisasiPage() {
  const { state, getIKPAColor } = useBudgetExecution("Hello");
  const { userData } = useContext(AppContext);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectOpen, setSelectOpen] = useState(false);
  const [dataTables, setDataTable] = useState([
    {
      eselon_code: "026",
      name: "KEMENTERIAN KETENAGAKERJAAN",
      per_jenis: {
        51: {
          pagu: 96400154000,
          realisasi: 77706174313,
          persentase_real: 80.61,
          sisa: 18693979687,
        },
        52: {
          pagu: 419166503000,
          realisasi: 128313046987,
          persentase_real: 30.61,
          sisa: 290853456013,
        },
        53: {
          pagu: 13469240000,
          realisasi: 6747777064,
          persentase_real: 50.1,
          sisa: 6721462936,
        },
      },
      pagu: 529035897000,
      realisasi: 212766998364,
      sisa: 316268898636,
      persen_realisasi: 40.22,
      bulan: 10,
      tahun: 2025,
      tanggal_sumber_data: "2025-10-30 07:17:57",
    },
    {
      eselon_code: "02601",
      name: "SEKRETARIAT JENDERAL",
      per_jenis: {
        51: {
          pagu: 96400154000,
          realisasi: 77706174313,
          persentase_real: 80.61,
          sisa: 18693979687,
        },
        52: {
          pagu: 419166503000,
          realisasi: 128313046987,
          persentase_real: 30.61,
          sisa: 290853456013,
        },
        53: {
          pagu: 13469240000,
          realisasi: 6747777064,
          persentase_real: 50.1,
          sisa: 6721462936,
        },
      },
      pagu: 529035897000,
      realisasi: 212766998364,
      sisa: 316268898636,
      persen_realisasi: 40.22,
      bulan: 10,
      tahun: 2025,
      tanggal_sumber_data: "2025-10-30 07:17:57",
    },
    {
      eselon_code: "02602",
      name: "INSPEKTORAT JENDERAL",
      per_jenis: {
        51: {
          pagu: 24802040000,
          realisasi: 19387652052,
          persentase_real: 78.17,
          sisa: 5414387948,
        },
        52: {
          pagu: 33080460000,
          realisasi: 12279610799,
          persentase_real: 37.12,
          sisa: 20800849201,
        },
        53: {
          pagu: 200000000,
          realisasi: 196092600,
          persentase_real: 98.05,
          sisa: 3907400,
        },
      },
      pagu: 58082500000,
      realisasi: 31863355451,
      sisa: 26219144549,
      persen_realisasi: 54.86,
      bulan: 10,
      tahun: 2025,
      tanggal_sumber_data: "2025-10-30 07:17:57",
    },
    {
      eselon_code: "02604",
      name: "DITJEN PEMBINAAN PENEMPATAN TENAGA KERJA DAN PERLUASAN KESEMPATAN KERJA",
      per_jenis: {
        51: {
          pagu: 60230900000,
          realisasi: 53107121066,
          persentase_real: 88.17,
          sisa: 7123778934,
        },
        52: {
          pagu: 742889574000,
          realisasi: 43079726203,
          persentase_real: 5.8,
          sisa: 699809847797,
        },
        53: {
          pagu: 1000000000,
          realisasi: 994921362,
          persentase_real: 99.49,
          sisa: 5078638,
        },
      },
      pagu: 804120474000,
      realisasi: 97181768631,
      sisa: 706938705369,
      persen_realisasi: 12.09,
      bulan: 10,
      tahun: 2025,
      tanggal_sumber_data: "2025-10-30 07:17:57",
    },
    {
      eselon_code: "02605",
      name: "DITJEN PEMBINAAN HUBUNGAN INDUSTRIAL DAN JAMINAN SOSIAL TENAGA KERJA",
      per_jenis: {
        51: {
          pagu: 35837912000,
          realisasi: 31738116022,
          persentase_real: 88.56,
          sisa: 4099795978,
        },
        52: {
          pagu: 11737435764000,
          realisasi: 9384006887918,
          persentase_real: 79.95,
          sisa: 2353428876082,
        },
        53: {
          pagu: 7212500000,
          realisasi: 6999000,
          persentase_real: 0.1,
          sisa: 7205501000,
        },
      },
      pagu: 11780486176000,
      realisasi: 9415752002940,
      sisa: 2364734173060,
      persen_realisasi: 79.93,
      bulan: 10,
      tahun: 2025,
      tanggal_sumber_data: "2025-10-30 07:17:57",
    },
    {
      eselon_code: "02608",
      name: "DITJEN PEMBINAAN PENGAWASAN KETENAGAKERJAAN DAN KESELAMATAN DAN KESEHATAN KERJA",
      per_jenis: {
        51: {
          pagu: 92824800000,
          realisasi: 74654464053,
          persentase_real: 80.43,
          sisa: 18170335947,
        },
        52: {
          pagu: 190287708000,
          realisasi: 45925875840,
          persentase_real: 24.13,
          sisa: 144361832160,
        },
        53: {
          pagu: 7455653000,
          realisasi: 819232700,
          persentase_real: 10.99,
          sisa: 6636420300,
        },
      },
      pagu: 290568161000,
      realisasi: 121399572593,
      sisa: 169168588407,
      persen_realisasi: 41.78,
      bulan: 10,
      tahun: 2025,
      tanggal_sumber_data: "2025-10-30 07:17:57",
    },
    {
      eselon_code: "02611",
      name: "BADAN PERENCANAAN DAN PENGEMBANGAN KETENAGAKERJAAN",
      per_jenis: {
        51: {
          pagu: 26877940000,
          realisasi: 21586633652,
          persentase_real: 80.31,
          sisa: 5291306348,
        },
        52: {
          pagu: 166526226000,
          realisasi: 56890278699,
          persentase_real: 34.16,
          sisa: 109635947301,
        },
        53: {
          pagu: 25420000000,
          realisasi: 19625000,
          persentase_real: 0.08,
          sisa: 25400375000,
        },
      },
      pagu: 218824166000,
      realisasi: 78496537351,
      sisa: 140327628649,
      persen_realisasi: 35.87,
      bulan: 10,
      tahun: 2025,
      tanggal_sumber_data: "2025-10-30 07:17:57",
    },
    {
      eselon_code: "02613",
      name: "DIREKTORAT JENDERAL PEMBINAAN PELATIHAN VOKASI DAN PRODUKTIVITAS",
      per_jenis: {
        51: {
          pagu: 296279510000,
          realisasi: 270348230220,
          persentase_real: 91.25,
          sisa: 25931279780,
        },
        52: {
          pagu: 1215695350000,
          realisasi: 286004822265,
          persentase_real: 23.53,
          sisa: 929690527735,
        },
        53: {
          pagu: 68179899000,
          realisasi: 19883006417,
          persentase_real: 29.16,
          sisa: 48296892583,
        },
      },
      pagu: 1580154759000,
      realisasi: 576236058902,
      sisa: 1003918700098,
      persen_realisasi: 36.47,
      bulan: 10,
      tahun: 2025,
      tanggal_sumber_data: "2025-10-30 07:17:57",
    },
  ]);
  const PNBP_DATA_VISUAL = [
    {
      eselon: "0261 | Sekretariat Jenderal",
      pagu: 5290360987000,
      realisasi: 3290360987000,
      persentase: 98,
      sisa: 305715270781,
      blokir: 190578869000,
      paguEfektif: 3290360987000,
      color: "green",
    },
    {
      eselon: "Belanja Pegawai (51)",
      pagu: 5290360987000,
      realisasi: 3290360987000,
      persentase: 100,
      sisa: 305715270781,
      blokir: "-",
      paguEfektif: 3290360987000,
      color: "green",
    },
    {
      eselon: "Belanja Barang (52)",
      pagu: 5290360987000,
      realisasi: 3290360987000,
      persentase: 63.2,
      sisa: 305715270781,
      blokir: 190578869000,
      paguEfektif: 3290360987000,
      color: "orange",
    },
    {
      eselon: "Belanja Modal (53)",
      pagu: 5290360987000,
      realisasi: 3290360987000,
      persentase: 56,
      sisa: 305715270781,
      blokir: 578869000,
      paguEfektif: 3290360987000,
      color: "pink",
    },
    {
      eselon: "0262 | Inspektorat Jenderal",
      pagu: 5290360987000,
      realisasi: 3290360987000,
      persentase: 98,
      sisa: 305715270781,
      blokir: 190578869000,
      paguEfektif: 3290360987000,
      color: "green",
    },
    {
      eselon:
        "0264 | Ditjen Pembinaan Penempatan Tenaga Kerja dan  Perluasan Kesempatan Kerja",
      pagu: 5290360987000,
      realisasi: 3290360987000,
      persentase: 98,
      sisa: 305715270781,
      blokir: 190578869000,
      paguEfektif: 3290360987000,
      color: "green",
    },
    {
      eselon:
        "0265 | Ditjen Pembinaan Hubungan Industrial dan Jaminan  Sosial Tenaga Kerja ",
      pagu: 5290360987000,
      realisasi: 3290360987000,
      persentase: 98,
      sisa: 305715270781,
      blokir: 190578869000,
      paguEfektif: 3290360987000,
      color: "green",
    },
    {
      eselon:
        "0268 | Ditjen Pembinaan Pengawasan Ketenagakerjaan dan Keselamatan dan Kesahatan Kerja ",
      pagu: 5290360987000,
      realisasi: 3290360987000,
      persentase: 98,
      sisa: 305715270781,
      blokir: 190578869000,
      paguEfektif: 3290360987000,
      color: "green",
    },
    {
      eselon:
        "0265 | Direktorat Jenderal Pembinaan Pelatihan Vokasi dan Produktivitas ",
      pagu: 5290360987000,
      realisasi: 3290360987000,
      persentase: 98,
      sisa: 305715270781,
      blokir: 190578869000,
      paguEfektif: 3290360987000,
      color: "green",
    },
  ];
  const [es1Data, setEs1Data] = useState([]);
  const [filter, setFilter] = useState({
    searchKey: "",
    eselonKey: "",
  });
  const [formData, setFormData] = useState({
    dokumen: null,
  });
  const [cardsData, setCardsData] = useState([]);
  const formatMiliar = (num) => {
    if (!num && num !== 0) return "-";
    return (num / 1_000_000_000).toFixed(2) + " M";
  };

  const es1Options = async () => {
    try {
      const data = { success: true, data: dataTables };

      if (!data?.success || !data?.data) return;
      let mapped = data.data
        // .filter((q) => q.satker_code === null)
        .map((item, index) => {
          const constantItem = dataTable.data[index];
          const perJenis = item.per_jenis || {};

          const totalPagu = item.pagu || 0;
          const totalRealisasi = item.realisasi || 0;
          const totalPersen = item.persen_realisasi || 0;
          const totalSisa = item.sisa || 0;

          const pegawai = perJenis["51"] || {};
          const barang = perJenis["52"] || {};
          const modal = perJenis["53"] || {};

          return {
            title: constantItem?.eselon || item.name,
            pagu: totalPagu,
            realisasiNominal: totalRealisasi,
            realisasiPersen: totalPersen,
            blokir: totalSisa,
            blokirPersen: ((totalSisa / totalPagu) * 100).toFixed(2),
            targetNominal: totalPagu * 0.95,
            targetPersen: 95,
          };
        });

      console.log("cardsData mapped:", mapped);
      setCardsData(mapped);
    } catch (error) {
      console.error("Error mapping data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const submitData = async (formData) => {
    try {
      const payload = new FormData();
      payload.append("excel", formData.dokumen);

      const result = await apiRequest({
        url: "/api/pa/realization/import",
        method: "POST",
        options: {
          body: payload,
        },
        isMultiType: true,
      });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    let isAnyFile = formData?.dokumen || formData?.document;

    try {
      if (isAnyFile) {
        if (!formData.dokumen) {
          toast.error("Mohon lengkapi semua field yang diperlukan.");
          return;
        }
      }

      submitData(formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Data berhasil disimpan!");
      setIsOpenModal(false);
      setFormData({
        dokumen: null,
      });
      // fetchTable();
    } catch (err) {
      console.error(err);
      toast.error("Gagal menyimpan data. Silakan coba lagi.");
    }
  };

  const groupedData = dataTables.reduce((acc, row) => {
    const group = row.eselon_code;
    if (!acc[group]) acc[group] = { parent: null, children: [] };

    if (!row.satker_code) {
      acc[group].parent = row;
    } else {
      acc[group].children.push(row);
    }

    return acc;
  }, {});

  useEffect(() => {
    // fetchTable();
    es1Options();
  }, [filter.searchKey, filter.eselonKey]);

  return (
    <div>
      <div className="flex justify-between items-center px-4 md:px-4 border-b border-gray-100 z-20 bg-white shrink-0 pl-20 md:pl-8 transition-all">
        <div className="flex items-center">
          <Title>Realisasi</Title>
        </div>
        <div className="w-auto">
          <User
            name={userData?.name}
            previlege={userData?.role?.toUpperCase()}
            username={userData?.biro_code}
            role={userData?.role}
            access_code={userData?.access_code}
            id={userData?.id}
          />
        </div>
      </div>

      <Paper style={{ marginBottom: "1vw" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4 mb-4 mt-4">
          {/* CARD INDEX 0 (TOTAL) */}
          <Card className="row-span-2 p-4 relative shadow-md rounded-2xl border border-gray-100">
            <div className="absolute -top-6 left-8 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg z-20">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="white"
                className="animate-pulse"
              >
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </div>
            <div className="flex flex-col items-center mb-3">
              <span className="font-bold text-2xl text-center text-gray-800">
                Realisasi Kemnaker
              </span>
            </div>

            {/* Bulan */}
            <div className="bg-gradient-to-r from-[#3B82F6] to-[#1E40AF] rounded-lg text-center m-1 py-1.5 shadow-sm">
              <span className="font-semibold text-sm text-white">
                Bulan{" "}
                {moment().locale("id").subtract(1, "months").format("MMMM")}
              </span>
            </div>

            {/* Total Pagu */}
            <div className="grid grid-cols-3 items-center border border-blue-500 rounded-lg px-3 py-2 m-1 mb-5 mt-5">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 ">
                <Wallet size={20} className="text-blue-600" />
              </div>
              <span className="text-sm font-semibold">TOTAL PAGU</span>
              <span className="text-lg font-bold ">
                Rp {(2123 / 1_000).toFixed(2)} M
              </span>
            </div>

            {/* Blokir */}
            <div className="grid grid-cols-3 items-center border border-[#fc0166] rounded-lg px-3 py-2 m-1 mb-5 mt-5 ">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#FC0166] ">
                <Wallet size={20} className="text-[#FFCFE2]" />
              </div>
              <span className="text-sm font-semibold">Blokir</span>
              <span className="font-bold text-lg items-center flex flex-col justify-between">
                <span>Rp {(2123 / 1_000).toFixed(2)} M</span>
                <div className="self-end">
                  <span className="inline-block rounded-2xl bg-[#FC0166] px-2 text-[#FFCFE2]">
                    20%
                  </span>
                </div>
              </span>
            </div>

            {/* Realisasi */}
            <div className="grid grid-cols-3 items-center border border-[#bcdd51] rounded-lg px-3 py-2 m-1 mb-5 mt-5 ">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#BCDD51]">
                <Wallet size={20} className="text-[#EDF6D0]" />
              </div>
              <span className="text-sm font-semibold">Realisasi</span>
              <span className="font-bold text-lg items-center flex flex-col justify-end justify-between">
                <span>Rp {(2123 / 1_000).toFixed(2)} M</span>
                <div className="self-end">
                  <span className="inline-block rounded-2xl bg-[#EDF6D0] px-2 text-[#1C7D44]">
                    ▲ 58%
                  </span>
                </div>
              </span>
            </div>

            {/* Target */}
            <div className="grid grid-cols-3 items-center border border-[#ffbe02] rounded-lg px-3 py-2 m-1 mb-5 mt-5 ">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#FFBE02] border border-yellow-500">
                <Wallet size={20} className="text-[#FFF3D0]" />
              </div>
              <span className="text-sm font-semibold">Target</span>
              <span className="font-bold text-lg flex flex-col justify-end justify-between">
                <span>Rp {(2123 / 1_000).toFixed(2)} M</span>
                <div className="self-end">
                  <span className="inline-block rounded-2xl bg-[#fff3d0] px-2 text-[#ffbe02]">
                    ▼ 58%
                  </span>
                </div>
              </span>
            </div>
          </Card>

          {/* CARD PER UNIT (INDEX > 0) */}
          {cardsData
            ?.filter((_, index) => index !== 0)
            .map((item, index) => {
              const realisasiNaik = item.realisasiPersen >= 50; // contoh logika
              const targetNaik = item.targetPersen >= 50;

              return (
                <div className="bg-sky-400 rounded-2xl pt-[20px] overflow-hidden ">
                  <Card
                    key={index}
                    className="bg-white p-6 w-full shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl border border-gray-100"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-bold text-[#000000] text-[20px] tracking-tight">
                        {item.title}
                      </h3>
                    </div>

                    <div className="flex flex-col gap-3 text-sm font-medium">
                      {/* Pagu */}
                      <div className="border border-[#2f8afd] rounded-lg px-3 py-2 flex justify-between">
                        <span>Pagu:</span>
                        <span>
                          Rp {(item.pagu / 1_000_000_000).toFixed(2)} M
                        </span>
                      </div>

                      {/* Blokir */}
                      <div className="border border-[#fc0166] rounded-lg px-3 py-2 flex justify-between">
                        <span>Blokir:</span>
                        <span>
                          Rp {(item.blokir / 1_000_000_000).toFixed(2)} M (
                          {item.blokirPersen}%)
                        </span>
                      </div>

                      {/* Realisasi */}
                      <div className="border border-[#bcdd51] rounded-lg px-3 py-2 flex justify-between">
                        <span>Realisasi:</span>
                        <span>
                          Rp{" "}
                          {(item.realisasiNominal / 1_000_000_000).toFixed(2)} M{" "}
                          {realisasiNaik ? "▲" : "▼"} {item.realisasiPersen}%
                        </span>
                      </div>

                      {/* Target */}
                      <div className="border border-[#ffbe02] rounded-lg px-3 py-2 flex justify-between">
                        <span>Target:</span>
                        <span>
                          Rp {(item.targetNominal / 1_000_000_000).toFixed(2)} M{" "}
                          {targetNaik ? "▲" : "▼"} {item.targetPersen}%
                        </span>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
        </div>
      </Paper>
      <Paper
        elevation={3}
        // style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <div
          style={{
            display: "flex",
            gap: 10,
            marginBottom: "1rem",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
          className="flex flex-col lg:flex-row gap-4 mb-4 lg:items-end"
        >
          <Input
            label="Search"
            style={{ width: "200px" }}
            name="Search"
            value={filter.searchKey}
            onChange={(e) =>
              setFilter((prev) => ({
                ...prev,
                searchKey: e.target.value,
              }))
            }
          />
          <Select
            placeholder="Pilih Eselon 1"
            name="eselon_code"
            onChange={(e) =>
              setFilter((prev) => ({
                ...prev,
                eselonKey: e.target.value ?? "",
              }))
            }
            value={filter.eselonKey}
            options={es1Data.map((q) => ({
              label: q.name,
              value: q.eselon_code,
            }))}
            style={{ minWidth: "280px", maxWidth: "420px", marginLeft: "auto" }}
            isOpen={selectOpen}
            setIsOpen={setSelectOpen}
          />
          <div style={{ display: "flex", gap: 10 }}>
            {userData &&
              (userData.role === "admin" ||
                userData.role === "super_admin") && (
                <Button
                  onClick={() => setIsOpenModal(true)}
                  style={{ width: "fit-content" }}
                  variant="secondary"
                  icon={<Upload size={20} />}
                >
                  Import Data IKPA
                </Button>
              )}
            {/* <Button
              onClick={fetchTemplateDownload}
              style={{ width: "fit-content" }}
              variant="primary"
              icon={<Download size={20} />}
            >
              Download Template
            </Button> */}
          </div>
        </div>
        <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-lg">
          <table className="w-full text-left border-collapse min-w-[1000px] text-[12px]">
            {/* Header Sesuai Gambar */}
            <thead>
              <tr className="text-white font-bold">
                <th className="px-6 py-4 bg-[#42a5f5] border-r border-white/20">
                  Eselon 1
                </th>
                <th className="px-6 py-4 bg-[#42a5f5] border-r border-white/20 text-center">
                  Pagu
                </th>
                <th className="px-6 py-4 bg-[#42a5f5] border-r border-white/20 text-center">
                  Realisasi
                </th>
                <th className="px-6 py-4 bg-[#42a5f5] border-r border-white/20 text-center">
                  Persentase
                </th>
                <th className="px-6 py-4 bg-[#42a5f5] border-r border-white/20 text-center">
                  Sisa
                </th>
                <th className="px-6 py-4 bg-[#ff005c] border-r border-white/20 text-center uppercase">
                  Blokir
                </th>
                <th className="px-6 py-4 bg-[#42a5f5] text-center">
                  Pagu Efektif
                </th>
              </tr>
            </thead>

            <tbody className="text-gray-700">
              {PNBP_DATA_VISUAL.map((item, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-50 hover:bg-sky-50/30 transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-[#f8fbff]"
                  }`}
                >
                  <td className="px-6 py-4 font-bold text-gray-800">
                    {item.eselon}
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-gray-600">
                    {item.pagu.toLocaleString("id-ID")}
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-gray-600">
                    {item.realisasi.toLocaleString("id-ID")}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full font-bold text-[10px] 
              ${
                item.color === "green"
                  ? "bg-[#e8f5e9] text-[#2e7d32]"
                  : item.color === "orange"
                  ? "bg-[#fff3e0] text-[#ef6c00]"
                  : "bg-[#fce4ec] text-[#d81b60]"
              }`}
                    >
                      {item.persentase}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-gray-600">
                    {item.sisa.toLocaleString("id-ID")}
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-gray-600 bg-[#fff5f8]">
                    {item.blokir === "-"
                      ? "-"
                      : item.blokir.toLocaleString("id-ID")}
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-gray-600">
                    {item.paguEfektif.toLocaleString("id-ID")}
                  </td>
                </tr>
              ))}

              {/* Baris TOTAL (Warna Kuning) */}
              <tr className="bg-[#fff9c4] font-bold text-gray-800 border-t-2 border-gray-200">
                <td className="px-6 py-5 uppercase italic">Total</td>
                <td className="px-6 py-5 text-right font-mono">
                  529.036.0987.000
                </td>
                <td className="px-6 py-5 text-right font-mono">
                  329.036.0987.000
                </td>
                <td className="px-6 py-5 text-center">
                  <span className="bg-[#e8f5e9] text-[#2e7d32] px-3 py-1 rounded-full text-[10px]">
                    98%
                  </span>
                </td>
                <td className="px-6 py-5 text-right font-mono">
                  305.715.270.781
                </td>
                <td className="px-6 py-5 text-right font-mono bg-[#fff5f8]">
                  190.578.869.000
                </td>
                <td className="px-6 py-5 text-right font-mono">
                  329.036.0987.000
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Paper>
      <Modal
        open={isOpenModal}
        onClose={() => {
          setIsOpenModal(false);
          setFormData({
            dokumen: null,
          });
        }}
        title="Form Upload Excel"
      >
        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <FileInput
            accept=".xlsx"
            label="Dokumen"
            name="dokumen"
            onChange={handleChange}
            required
            value={formData?.dokumen}
          />
          <Button type="submit" style={{ float: "right" }}>
            Submit
          </Button>
        </form>
      </Modal>
    </div>
  );
}

export default RealisasiPage;
