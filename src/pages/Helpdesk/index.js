import React, { useContext } from "react";
import User from "@/components/User";
import { Phone, User as UserIcon, Calendar, Menu } from "lucide-react";
import { AppContext } from "@/contexts/AppContext"; // Import Context
import Title from "@/components/Title";
export default function Helpdesk() {
  // Ambil fungsi saklar menu dari Context
  const { setMobileMenuOpen } = useContext(AppContext);

  return (
    <div className="flex flex-col h-screen font-sans bg-white">

      {/* HEADER (*/}
      <div className="flex justify-between items-center px-4 md:px-4 border-b border-gray-100 z-20 bg-white shrink-0 pl-20 md:pl-8 transition-all">
        <div className="flex items-center">
          <Title>Helpdesk</Title>
        </div>
        <div className="w-auto">
          <User name={"Mas Febri"} previlege={"Administrator"} />
        </div>
      </div>

      {/* === 3. MAIN CONTENT (Biru Muda Full) === */}
      <div className="relative flex-1 bg-[#DDF4FF] flex flex-col items-center justify-start md:justify-center p-4 overflow-y-auto overflow-x-hidden">
        
        {/* --- BACKGROUND WATERMARK --- */}
        <div className="absolute bottom-0 left-0 pointer-events-none z-0 w-full h-full overflow-hidden">
           <img 
             src="/kemnaker-logo-bg.png" 
             srcSet="/kemnaker-logo-bg.png?v=1"
             alt="Background Watermark" 
             // Tetap hidden di HP sesuai request sebelumnya
             className="hidden md:block absolute bottom-[-50px] left-[-280px] w-[850px] h-auto object-contain opacity-80"
           />
        </div>

        {/* --- KONTEN UTAMA --- */}
        <div className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center space-y-6 md:space-y-8 mt-4 md:mt-0 mb-8">
          
          {/* A. LOGO KECIL & JUDUL */}
          <div className="flex flex-col items-center space-y-3">
            {/* Logo Kementerian */}
            <img 
              src="/logo-kemnaker-ori.png" 
              alt="Logo Kemnaker" 
              className="h-10 md:h-14 object-contain mb-2"
            />
            
            <h1 className="text-xl md:text-4xl font-extrabold text-gray-900 tracking-tight px-2">
              Biro Keuangan dan Barang Milik Negara
            </h1>
            <p className="text-gray-600 text-sm md:text-lg font-medium max-w-xs md:max-w-xl leading-relaxed">
              Layanan Konsultasi terkait pengelolaan dan barang milik 
              negara di lingkungan Kementerian Ketenagakerjaan
            </p>
          </div>

          {/* B. SCAN DISINI (QR CODE) */}
          <div className="flex flex-col items-center space-y-3">
            <h3 className="text-base md:text-lg font-bold text-gray-800">Scan Disini</h3>
            
            <div className="p-2 bg-white rounded-xl shadow-lg border-2 border-white/50">
              <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://wa.me/6281234567890" 
                alt="QR Code WhatsApp" 
                className="w-24 h-24 md:w-32 md:h-32 object-contain rounded-lg"
              />
            </div>
          </div>

          {/* C. KETENTUAN KONSULTASI */}
          <div className="w-full max-w-2xl mt-2 px-2 md:px-0">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6">Ketentuan Konsultasi</h3>
            
            <div className="space-y-4">
              
              {/* Item 1 */}
              <div className="flex items-start md:items-center gap-3 md:gap-4 text-left">
                <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-white/50 border border-white/60 rounded-lg shadow-sm shrink-0">
                  <Phone size={18} className="text-gray-700 md:w-5 md:h-5" />
                </div>
                <p className="text-gray-700 font-medium text-sm md:text-base pt-1 md:pt-0">
                  Pertanyaan dan Konsultasi dilakukan melalui nomor Whatsapp
                </p>
              </div>

              {/* Item 2 */}
              <div className="flex items-start md:items-center gap-3 md:gap-4 text-left">
                <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-white/50 border border-white/60 rounded-lg shadow-sm shrink-0">
                  <UserIcon size={18} className="text-gray-700 md:w-5 md:h-5" />
                </div>
                <p className="text-gray-700 font-medium text-sm md:text-base pt-1 md:pt-0">
                  Hanya Diperuntukan bagi pegawai ASN Kementerian Ketenagakerjaan
                </p>
              </div>

              {/* Item 3 (Jadwal) */}
              <div className="flex items-start gap-3 md:gap-4 text-left">
                <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-white/50 border border-white/60 rounded-lg shadow-sm shrink-0">
                  <Calendar size={18} className="text-gray-700 md:w-5 md:h-5" />
                </div>
                
                <div className="flex flex-col md:flex-row gap-1 md:gap-8 w-full pt-1">
                  <span className="text-gray-700 font-medium text-sm md:text-base md:min-w-[180px]">
                    Operasional Senin s.d Jumat,
                  </span>
                  <ul className="text-gray-700 text-sm list-disc list-inside font-medium ml-1 md:ml-0">
                    <li>08.00 WIB s.d 12.00 WIB</li>
                    <li>13.00 WIB s.d 16.00 WIB</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* --- COPYRIGHT --- */}
        <div className="w-full text-center md:text-left md:absolute md:bottom-4 md:left-6 z-20 mt-8 md:mt-0 text-xs text-gray-500 md:text-gray-400 font-light pb-4 md:pb-0">
           © Rokeu BMN 2025, Version 2.0
        </div>

      </div>
    </div>
  );
}