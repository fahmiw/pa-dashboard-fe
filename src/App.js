import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AppLayout from "./Layouts/AppLayout";
import ListSatuanKerjaPage from "./pages/ListSatuankerja";
import { ToastContainer } from "react-toastify";
import CompilationPage from "./pages/Compilation";
import SoonPage from "./pages/Soon";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import UserManagementPage from "./pages/UserManagement";
import MenuPage from "./pages/Menu";
import { AppContext } from "./contexts/AppContext";
import PrivateRoute from "./components/PrivateRoute";
import DashboardPage from "./pages/Dashboard";
import DashboardManagementPage from "./pages/DashboardManagement";
import IkpaPage from "./pages/Ikpa";
import PTUKSub1Page from "./pages/PTUKSub1";
import MainDashboard from "./pages/MainDashboard";
import BudgetExecution from "./pages/BudgetExecution";
import TandaTerimaPage from "./pages/TandaTerima";
import TataUsaha from "./pages/TataUsaha";
import RealisasiPage from "./pages/Realisasi";
import ReportingAccounting from "./pages/AkuntansiPelaporan";
import LLATPage from "./pages/LLAT";
import Helpdesk from "./pages/Helpdesk"; 
import StrukturOrganisasi from "./pages/StrukturOrganisasi";
import PNBP from "./pages/PNBP";
import KelolaKeuangan from "./pages/pengelolaKeuangan";
import KerugianNegara from "./pages/kerugianNegara";
import LPH from "./pages/LHP";
import PTUK from "./pages/PTUK";
// --- IMPORT SUB-PAGE BARANG MILIK NEGARA ---
import StatusPSP from "./pages/BarangMilikNegara/StatusPSP"; 
import KondisiAset from "./pages/BarangMilikNegara/KondisiAset"; 
// PERUBAHAN: Import disesuaikan dengan nama file baru
import JumlahJenisBMN from "./pages/BarangMilikNegara/JumlahJenisBMN";

function App() {
  const { isAdmin, listMenu } = useContext(AppContext);
  const token = localStorage.getItem("token");

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/dashboard-utama" /> : <LoginPage />}
        />
        <Route
          path="/satuan-kerja"
          element={
            <PrivateRoute>
              <AppLayout isAdmin={isAdmin}>
                <MenuPage />
              </AppLayout>
            </PrivateRoute>
          }
        />
       
        <Route
          path="/dashboard-utama"
          element={
            <PrivateRoute>
              <AppLayout isAdmin={isAdmin}>
                <MainDashboard />
              </AppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/pelaksanaan-anggaran"
          element={
            <PrivateRoute>
              <AppLayout isAdmin={isAdmin}>
                <BudgetExecution />
              </AppLayout>
            </PrivateRoute>
          }
        />

        {/* === GROUP BARANG MILIK NEGARA (Updated) === */}
        
        {/* 1. Redirect Route Utama ke Sub-Page Pertama (Status PSP) */}
        <Route
          path="/barang-milik-negara"
          element={<Navigate to="/barang-milik-negara/status-psp" replace />}
        />
        
        {/* 2. Sub-Page: Status PSP */}
        <Route
          path="/barang-milik-negara/status-psp"
          element={
            <PrivateRoute>
              <AppLayout isAdmin={isAdmin}>
                <StatusPSP />
              </AppLayout>
            </PrivateRoute>
          }
        />

        {/* 3. Sub-Page: Kondisi Aset */}
        <Route
          path="/barang-milik-negara/kondisi-aset"
          element={
            <PrivateRoute>
              <AppLayout isAdmin={isAdmin}>
                <KondisiAset />
              </AppLayout>
            </PrivateRoute>
          }
        />

        {/* 4. Sub-Page: Jumlah Jenis BMN */}
        <Route
          path="/barang-milik-negara/jumlah-jenis"
          element={
            <PrivateRoute>
              <AppLayout isAdmin={isAdmin}>
                {/* Panggil Component dengan nama baru */}
                <JumlahJenisBMN />
              </AppLayout>
            </PrivateRoute>
          }
        />
        {/* =========================================== */}
        
        {/* 1. Tata Usaha */}
        <Route
          path="/tata-usaha"
          element={
            <PrivateRoute>
              <AppLayout isAdmin={isAdmin}>
                <TataUsaha />
              </AppLayout>
            </PrivateRoute>
          }
        />

        {/* 2. Struktur Organisasi */}
        <Route
          path="/dashboard/struktur-organisasi"
          element={
            <PrivateRoute>
              <AppLayout isAdmin={isAdmin}>
                <StrukturOrganisasi />
              </AppLayout>
            </PrivateRoute>
          }
        />

        {/* 3. Helpdesk */}
        <Route
          path="/dashboard/helpdesk"
          element={
            <PrivateRoute>
              <AppLayout isAdmin={isAdmin}>
                <Helpdesk />
              </AppLayout>
            </PrivateRoute>
          }
        />

        {/* === DYNAMIC ROUTES (Menu List) === */}
        {listMenu.map((data) => (
          <Route
            key={data?.id}
            path={`${data?.path}`}
            element={
              <PrivateRoute>
                <AppLayout isAdmin={isAdmin}>
                  <ListSatuanKerjaPage />
                </AppLayout>
              </PrivateRoute>
            }
          />
        ))}
        <Route
          path="/satuan-kerja/:subPage"
          element={
            <PrivateRoute>
              <AppLayout isAdmin={isAdmin}>
                <MenuPage />
              </AppLayout>
            </PrivateRoute>
          }
        />
        {listMenu.map((data) => (
          <Route
            key={data?.id}
            path={(() => {
              const pathParts = data.path.split("/").filter(Boolean);
              const base = "/" + pathParts[0];
              const end = pathParts.slice(1).join("/");
              return `${base}/pengajuan/${end}`;
            })()}
            element={
              <PrivateRoute>
                <AppLayout isAdmin={isAdmin}>
                  <ListSatuanKerjaPage />
                </AppLayout>
              </PrivateRoute>
            }
          />
        ))}

        {/* === MENU LAINNYA === */}
        <Route
          path="/compilation"
          element={
            <PrivateRoute>
              <AppLayout isAdmin={isAdmin}>
                <CompilationPage />
              </AppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/user-management"
          element={
            <PrivateRoute>
              <AppLayout isAdmin={isAdmin}>
                <UserManagementPage />
              </AppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/soon"
          element={
            <PrivateRoute>
              <AppLayout isAdmin={isAdmin}>
                <SoonPage />
              </AppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <AppLayout isAdmin={isAdmin}>
                <DashboardPage />
              </AppLayout>
            </PrivateRoute>
          }
        />

        {/* === ROUTE DINAMIS DASHBOARD (Catch-All) === */}
        <Route
          path="/dashboard/:subPage"
          element={
            <PrivateRoute>
              <AppLayout isAdmin={isAdmin}>
                <DashboardPage />
              </AppLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard-management"
          element={
            <PrivateRoute>
              <AppLayout isAdmin={isAdmin}>
                <DashboardManagementPage />
              </AppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/ikpa"
          element={
            <PrivateRoute>
              <AppLayout isAdmin={isAdmin}>
                <IkpaPage />
              </AppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/realisasi"
          element={
            <PrivateRoute>
              <AppLayout isAdmin={isAdmin}>
                <RealisasiPage />
              </AppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/llat"
          element={
            <PrivateRoute>
              <AppLayout isAdmin={isAdmin}>
                <LLATPage />
              </AppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/tanda-terima"
          element={
            <PrivateRoute>
              <AppLayout isAdmin={isAdmin}>
                <TandaTerimaPage />
              </AppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/akuntansi-pelaporan"
          element={
            <PrivateRoute>
              <AppLayout isAdmin={isAdmin}>
                <ReportingAccounting />
              </AppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/ptuk/tuntutan-ganti-rugi"
          element={
            <PrivateRoute>
              <AppLayout isAdmin={isAdmin}>
                <PTUKSub1Page />
              </AppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/ptuk"
          element={
            <PrivateRoute>
              <AppLayout isAdmin={isAdmin}>
                <PTUK />
              </AppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/ptuk/pnbp"
          element={
            <PrivateRoute>
              <AppLayout isAdmin={isAdmin}>
                <PNBP />
              </AppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/ptuk/lhp-kementrian"
          element={
            <PrivateRoute>
              <AppLayout isAdmin={isAdmin}>
                <LPH />
              </AppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/ptuk/pengelola-keuangan"
          element={
            <PrivateRoute>
              <AppLayout isAdmin={isAdmin}>
                <KelolaKeuangan />
              </AppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/ptuk/kerugian-negara"
          element={
            <PrivateRoute>
              <AppLayout isAdmin={isAdmin}>
                <KerugianNegara/>
              </AppLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;