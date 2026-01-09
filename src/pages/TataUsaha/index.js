import React, { useContext } from "react";
import Title from "@/components/Title";
import Card from "@/components/Card";
import DonutChart from "./DonutChart";
import BarChart from "./BarChart";
import User from "@/components/User";
import { AppContext } from "@/contexts/AppContext"; 
import {
  datasetBarChart,
  datasetKehadiran,
  datasetPegawai,
  datasetPendidikan,
} from "./constants";
import moment from "moment";
import { Users, GraduationCap, TrendingUp, Activity, Menu } from "lucide-react"; 

function TataUsaha() {
  // Ambil fungsi saklar dari Context
  const { setMobileMenuOpen } = useContext(AppContext);

  const handleToggleSidebar = () => {
    // Logic: Ubah state jadi true (buka) atau toggle (!prev)
    setMobileMenuOpen(prev => !prev);
  };

  const dataGaji = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct"],
    values: [100, 85, 10, 55, 65, 100, 70, 68, 85, 90]
  };

  return (
   <div>
      {/* HEADER */}
      <div className="flex justify-between items-center px-4 md:px-4 border-b border-gray-100 z-20 bg-white shrink-0 pl-20 md:pl-8 transition-all">
        <div className="flex items-center">
          <Title>Tata Usaha</Title>
        </div>
        <div className="w-auto">
          <User name={"Administrator"} previlege={"Administrator"} />
        </div>
      </div>
      
    <div className="bg-gray-50 min-h-screen font-sans p-4 md:p-8">

      {/* CONTENT GRID */}
      <div className="space-y-8">
         {/* ROW 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 gap-x-6 pt-4 md:pt-0">
          <Card className="relative overflow-visible p-6 rounded-3xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border-none bg-white">
            <div className="flex flex-col h-full">
              <div className="flex flex-col mb-4">
                 <div className="absolute -top-5 left-6 w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 shadow-sm border border-white">
                    <Users size={20} />
                 </div>
                 <h3 className="font-bold text-lg text-gray-900 mt-2">Jumlah Pegawai</h3>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center">
                 <div className="w-full mb-6">
                    <DonutChart dataset={datasetPegawai} colors={["#C1D857", "#8F9298"]} height="h-64" />
                 </div>
                 <div className="flex flex-row justify-between w-full px-0 md:px-12 gap-2">
                    <div className="text-center flex-1">
                       <div className="flex flex-col md:flex-row items-center gap-1 justify-center mb-1">
                          <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-blue-400 block"></span>
                          <span className="text-[10px] md:text-xs font-semibold text-gray-600">Total</span>
                       </div>
                       <span className="text-xl md:text-2xl font-bold text-gray-900">48</span>
                    </div>
                    <div className="text-center flex-1">
                       <div className="flex flex-col md:flex-row items-center gap-1 justify-center mb-1">
                          <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#C1D857] block"></span>
                          <span className="text-[10px] md:text-xs font-semibold text-gray-600">Pria</span>
                       </div>
                       <span className="text-xl md:text-2xl font-bold text-gray-900">31</span>
                    </div>
                    <div className="text-center flex-1">
                       <div className="flex flex-col md:flex-row items-center gap-1 justify-center mb-1">
                          <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#8F9298] block"></span>
                          <span className="text-[10px] md:text-xs font-semibold text-gray-600">Wanita</span>
                       </div>
                       <span className="text-xl md:text-2xl font-bold text-gray-900">17</span>
                    </div>
                 </div>
              </div>
            </div>
          </Card>

          <Card className="relative overflow-visible p-6 rounded-3xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border-none bg-white">
            <div className="flex flex-col h-full">
               <div className="flex flex-col mb-4">
                 <div className="absolute -top-5 left-6 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shadow-sm border border-white">
                    <GraduationCap size={20} />
                 </div>
                 <h3 className="font-bold text-lg text-gray-900 mt-2">Pendidikan Pegawai</h3>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center">
                 <div className="w-full mb-6">
                    <DonutChart dataset={datasetPendidikan} colors={["#C1D857", "#5CC2F6", "#8F9298"]} height="h-64" />
                 </div>
                 <div className="flex flex-row justify-between w-full px-0 md:px-12 gap-2">
                    <div className="text-center flex-1">
                       <div className="flex flex-col md:flex-row items-center gap-1 justify-center mb-1">
                          <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#C1D857] block"></span>
                          <span className="text-[10px] md:text-xs font-semibold text-gray-600">Diploma</span>
                       </div>
                       <span className="text-xl md:text-2xl font-bold text-gray-900">13</span>
                    </div>
                    <div className="text-center flex-1">
                       <div className="flex flex-col md:flex-row items-center gap-1 justify-center mb-1">
                          <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#5CC2F6] block"></span>
                          <span className="text-[10px] md:text-xs font-semibold text-gray-600">Sarjana</span>
                       </div>
                       <span className="text-xl md:text-2xl font-bold text-gray-900">32</span>
                    </div>
                    <div className="text-center flex-1">
                       <div className="flex flex-col md:flex-row items-center gap-1 justify-center mb-1">
                          <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#8F9298] block"></span>
                          <span className="text-[10px] md:text-xs font-semibold text-gray-600">Magister</span>
                       </div>
                       <span className="text-xl md:text-2xl font-bold text-gray-900">3</span>
                    </div>
                 </div>
              </div>
            </div>
          </Card>
        </div>

        {/* ROW 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 gap-x-6">
          <Card className="relative overflow-visible p-6 rounded-3xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border-none bg-white">
             <div className="flex flex-col h-full">
               <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-col">
                    <div className="absolute -top-5 left-6 w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-500 shadow-sm border border-white">
                        <Users size={20} />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mt-2">Rekap Kehadiran</h3>
                  </div>
                  <span className="text-xs font-medium text-gray-400 uppercase mt-2">{moment().format("MMMM YYYY")}</span>
               </div>
               <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="w-full mb-6">
                     <DonutChart dataset={datasetKehadiran} colors={["#C1D857", "#8F9298", "#5CC2F6"]} height="h-64" />
                  </div>
                  <div className="flex flex-row justify-between w-full px-0 md:px-12 gap-2">
                     <div className="text-center flex-1">
                        <div className="flex flex-col md:flex-row items-center gap-1 justify-center mb-1">
                           <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#C1D857] block"></span>
                           <span className="text-[10px] md:text-xs font-semibold text-gray-600">Hadir</span>
                        </div>
                        <span className="text-xl md:text-2xl font-bold text-gray-900">210</span>
                     </div>
                     <div className="text-center flex-1">
                        <div className="flex flex-col md:flex-row items-center gap-1 justify-center mb-1">
                           <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#5CC2F6] block"></span>
                           <span className="text-[10px] md:text-xs font-semibold text-gray-600">Alfa</span>
                        </div>
                        <span className="text-xl md:text-2xl font-bold text-gray-900">1</span>
                     </div>
                     <div className="text-center flex-1">
                        <div className="flex flex-col md:flex-row items-center gap-1 justify-center mb-1">
                           <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#8F9298] block"></span>
                           <span className="text-[10px] md:text-xs font-semibold text-gray-600">Telat</span>
                        </div>
                        <span className="text-xl md:text-2xl font-bold text-gray-900">44</span>
                     </div>
                  </div>
               </div>
             </div>
          </Card>

          <Card className="relative overflow-visible p-6 rounded-3xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border-none bg-white">
             <div className="flex flex-col h-full">
                <div className="flex flex-col mb-2">
                   <div className="absolute -top-5 left-6 w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-pink-500 shadow-sm border border-white">
                      <TrendingUp size={20} />
                   </div>
                   <h3 className="font-bold text-lg text-gray-900 mt-2">Kenaikan Gaji Berkala</h3>
                </div>
                <div className="flex-1 w-full pt-4 overflow-x-auto">
                   <div className="min-w-[300px]">
                     <BarChart dataset={dataGaji} height="h-72" /> 
                   </div>
                </div>
             </div>
          </Card>
        </div>

        {/* ROW 3: IKK */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <IKKCard 
             title="IKK Tindak Lanjut LK" 
             dataset={datasetBarChart?.IKK} 
             target="70.55" 
             realisasi="69.88" 
          />
          <IKKCard 
             title="IKK Tingkat Maturitas SPIP" 
             dataset={datasetBarChart?.IKK_SPIP} 
             target="3.81" 
             realisasi="3.99" 
          />
          <IKKCard 
             title="IKK Pengelolaan Aset" 
             dataset={datasetBarChart?.IKK_IPA} 
             target="3.2" 
             realisasi="4.4" 
          />
          <IKKCard 
             title="IKK IKPA" 
             dataset={datasetBarChart?.IKK_IKPA} 
             target="91.2" 
             realisasi="92.7" 
          />
        </div>

      </div>
    </div>
     </div>
  );
}

function IKKCard({ title, dataset, target, realisasi }) {
   return (
      <Card className="p-5 rounded-3xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border-none bg-white flex flex-col">
          <div className="mb-4">
             <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600 mb-2">
                <Activity size={16} />
             </div>
             <h4 className="font-bold text-gray-900 text-sm h-10 leading-tight">
               {title}
             </h4>
          </div>
          <div className="flex-1 flex items-end justify-center">
             <BarChart dataset={dataset} height="h-40" />
          </div>
          <div className="flex justify-between mt-4 pt-3 border-t border-gray-100">
             <div>
                <div className="flex items-center gap-1 mb-1">
                   <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                   <span className="text-[10px] font-bold text-gray-500 uppercase">Target</span>
                </div>
                <span className="block text-lg font-bold text-gray-900">{target}</span>
             </div>
             <div className="text-right">
                <div className="flex items-center gap-1 justify-end mb-1">
                   <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                   <span className="text-[10px] font-bold text-gray-500 uppercase">Realisasi</span>
                </div>
                <span className="block text-lg font-bold text-gray-900">{realisasi}</span>
             </div>
          </div>
      </Card>
     
   )
}

export default TataUsaha;