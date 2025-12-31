import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "@/contexts/AppContext"; 
import User from "@/components/User";
import Card from "@/components/Card";
import { Menu, Download, Share2, Loader2, ArrowRightLeft } from "lucide-react"; 
import { apiRequest } from "@/services/APIHelper"; 

export default function StrukturOrganisasi() {
  const { setMobileMenuOpen } = useContext(AppContext);
  
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchStruktur = async () => {
      try {
        setLoading(true);
        const response = await apiRequest({ url: `/api/dashboard/SOP` });
        
        if (response && response.data) {
            setImageUrl(response.data);
        } else {
            setError(true);
        }

      } catch (err) {
        console.error("Gagal mengambil struktur organisasi:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchStruktur();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen font-sans p-4 md:p-8">
      
      {/* 1. HAMBURGER MENU */}
      <button 
          onClick={() => setMobileMenuOpen(prev => !prev)}
          className="fixed top-4 left-4 z-50 p-2.5 bg-white/90 backdrop-blur-sm rounded-xl shadow-md border border-gray-100 text-gray-600 hover:bg-gray-50 active:scale-95 active:bg-gray-200 transition-all cursor-pointer md:hidden"
      >
          <Menu size={24} />
      </button>

      {/* 2. HEADER CLEAN */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 mb-6 md:mb-8 pl-14 md:pl-0 transition-all">
        <div>
          <h1 className="text-xl md:text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Struktur Organisasi
          </h1>
          <p className="text-gray-500 text-xs md:text-sm mt-1">
            Biro Keuangan dan Barang Milik Negara
          </p>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <User name={"Administrator"} previlege={"Administrator"} />
        </div>
      </div>

      {/* 3. CONTENT AREA */}
      <Card className="p-0 md:p-4 rounded-3xl shadow-sm border border-gray-100 bg-white min-h-[500px] flex flex-col relative overflow-hidden">
        
        {/* Toolbar */}
        <div className="flex justify-end items-center px-4 pt-4 md:px-2 md:pt-2 mb-2 z-10">
           {/* Tombol Download */}
           <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200">
              <Download size={16} />
              <span className="hidden sm:inline">Unduh</span>
           </button>
        </div>

        {/* Container Gambar */}
        <div className="flex-1 w-full bg-white rounded-b-2xl md:rounded-2xl p-2 md:p-4 relative min-h-[400px] flex items-start justify-center">
           
             {/* KONDISI 1: LOADING */}
             {loading && (
               <div className="flex flex-col items-center gap-3 text-blue-500 my-20">
                  <Loader2 size={40} className="animate-spin" />
                  <span className="text-sm font-medium text-gray-500">Memuat Struktur...</span>
               </div>
             )}

             {/* KONDISI 2: ERROR */}
             {!loading && (error || !imageUrl) && (
               <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-gray-200 rounded-xl w-full h-full bg-gray-50/50 m-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-200 rounded-full mb-4"></div>
                  <p className="text-gray-600 font-medium text-sm md:text-base">Gambar Tidak Ditemukan</p>
                  <button 
                    onClick={() => window.location.reload()}
                    className="mt-4 text-blue-600 hover:text-blue-700 text-xs md:text-sm font-semibold"
                  >
                    Coba Lagi
                  </button>
               </div>
             )}

             {/* KONDISI 3: SUKSES */}
             {/* PERUBAHAN: Gunakan w-full h-auto agar gambar mengecil mengikuti lebar layar HP */}
             {!loading && imageUrl && (
               <img 
                 src={imageUrl} 
                 alt="Bagan Struktur Organisasi" 
                 className="w-full h-auto object-contain mx-auto" 
               />
             )}

        </div>
      </Card>

    </div>
  );
}