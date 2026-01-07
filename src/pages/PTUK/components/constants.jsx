import { Flame, FileText, Banknote, Target, Coins } from "lucide-react";
import React from "react";

// Data untuk Chart Donut LHP
export const lhpChartData = [
  // Biru Cyan Cerah (Mirip Gambar 2)
  { value: 1399, name: "TL Status Sesuai", itemStyle: { color: "#59C7FF" } }, 
  // Pink Rose Cerah (Mirip Gambar 2)
  { value: 655, name: "TL Status belum sesuai", itemStyle: { color: "#FC0166" } }, 
  // Abu-abu
  { value: 18, name: "TPTD", itemStyle: { color: "#898A8D" } }, 
];

// Data Statistik Dashboard PTUK (6 Kartu di Bawah)
export const ptukStats = [
  {
    title: "Kerugian Negara",
    value: "Rp 397.328.376.733",
    icon: <Flame size={24} className="text-pink-600" />,
    bgIcon: "bg-pink-100",
    border: "border-l-pink-500",
  },
  {
    title: "Jumlah Tindak Lanjut",
    value: "Rp 83.328.376.733",
    icon: <FileText size={24} className="text-lime-600" />,
    bgIcon: "bg-lime-100",
    border: "border-l-lime-600",
  },
  {
    title: "Jumlah Realisasi PNBP",
    value: "Rp 1.407.328.376.733",
    icon: <Banknote size={24} className="text-lime-600" />,
    bgIcon: "bg-lime-100",
    border: "border-l-lime-600",
  },
  {
    title: "Target PNBP Kementrian",
    value: "Rp 397.328.376.733",
    icon: <Target size={24} className="text-pink-600" />,
    bgIcon: "bg-pink-100",
    border: "border-l-pink-500",
  },
  {
    title: "Pagu DIPA Sumber Dana PNBP",
    value: "Rp 1.407.328.376.733",
    icon: <Coins size={24} className="text-yellow-600" />,
    bgIcon: "bg-yellow-100",
    border: "border-l-yellow-500",
  },
  {
    title: "Jumlah Realisasi Penggunaan Dana PNBP",
    value: "Rp 397.328.376.733",
    icon: <Flame size={24} className="text-blue-500" />,
    bgIcon: "bg-blue-100",
    border: "border-l-blue-500",
  },
];

// --- TAMBAHAN DATA: PENGELOLA KEUANGAN (SECTION BARU) ---
export const pengelolaCards = [
  {
    title: "Pejabat Pembuat Komitmen",
    value: "100",
    icon: <Flame size={24} className="text-pink-500" />,
    bgIcon: "bg-pink-100",
    border: "border-l-pink-500",
  },
  {
    title: "Pejabat Penandatangan SPM",
    value: "51",
    icon: <Flame size={24} className="text-yellow-500" />,
    bgIcon: "bg-yellow-100",
    border: "border-l-yellow-500",
  },
  {
    title: "Bendahara Pengeluaran",
    value: "72",
    icon: <Flame size={24} className="text-blue-500" />,
    bgIcon: "bg-blue-100",
    border: "border-l-blue-500",
  },
  {
    title: "Bendahara Penerimaan",
    value: "24",
    icon: <Flame size={24} className="text-lime-600" />, // Lime/Green
    bgIcon: "bg-lime-100",
    border: "border-l-lime-500",
  },
];