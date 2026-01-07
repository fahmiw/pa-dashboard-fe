import { useAuth } from "@/contexts/AuthContexts";
import {
  Building,
  Layers,
  LogOut,
  UserRoundCog,
  ChevronDown,
  ChevronUp,
  AlignEndHorizontal,
  TrendingUpDown,
  FolderCheck,
  HandCoins,
  FileChartColumn,
  Package,
  BookUser,
  Settings,
  GaugeCircle,
  LayoutDashboard,
  MessageSquare,
  Network,
  Archive,
  Table,
  CircleDollarSign,
  Calendar,
  Axis3D,
  FileText, // Icon Baru
  Box,      // Icon Baru
  Activity, // Icon Baru
  Leaf,     // Icon Baru untuk PTUK
  Flame,    // Icon Baru untuk Kerugian Negara
  DollarSign, // Icon Baru untuk PNBP
  ArrowRightLeft // Icon Baru untuk Pengelola Keuangan
} from "lucide-react";
import React, { useState, useContext, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "@/contexts/AppContext";

// --- MENU ITEMS CONFIGURATION ---
const menuItems = [
  {
    name: "Dashboard Utama",
    path: "/dashboard-utama",
    icon: <LayoutDashboard size={20} />,
  },
  
  // === UPDATE BAGIAN INI (PTUK) ===
  {
    name: "PTUK",
    path: "/ptuk/dashboard", // <--- PERBAIKAN: Sesuai dengan App.js
    adminOnly: true,
    children: [
      {
        name: "LHP Kementrian",
        path: "/ptuk/lhp",
        icon: <FileText size={18} />,
      },
      {
        name: "Kerugian Negara",
        path: "/ptuk/kerugian-negara",
        icon: <Flame size={18} />,
      },
      {
        name: "PNBP",
        path: "/ptuk/pnbp",
        icon: <DollarSign size={18} />,
      },
      {
        name: "Pengelola Keuangan",
        path: "/ptuk/pengelola-keuangan",
        icon: <ArrowRightLeft size={18} />,
      },
    ],
    icon: <Leaf size={20} />, 
  },
  // ================================

  {
    name: "Pelaksanaan Anggaran",
    path: "/pelaksanaan-anggaran",
    children: [
      {
        name: "Tanda Terima SPP",
        path: "/tanda-terima",
        icon: <Table size={18} />,
      },
      {
        name: "Pengajuan SPP",
        path: "/satuan-kerja/pengajuan",
        icon: <FolderCheck size={18} />,
      },
      {
        name: "IKPA",
        path: "/ikpa",
        icon: <AlignEndHorizontal size={18} />,
      },
      {
        name: "Realisasi",
        path: "/realisasi",
        icon: <CircleDollarSign size={18} />,
      },
      {
        name: "Arsip SPM",
        path: "/satuan-kerja",
        icon: <Archive size={18} />,
      },
      {
        name: "Kompilasi",
        path: "/compilation",
        icon: <TrendingUpDown size={18} />,
        adminOnly: true,
      },
      {
        name: "LLAT",
        path: "/llat",
        icon: <Calendar size={18} />,
      },
    ],
    icon: <HandCoins size={20} />,
  },
  
  {
    name: "Barang Milik Negara",
    adminOnly: true,
    children: [
      {
        name: "Status PSP",
        path: "/barang-milik-negara/status-psp",
        icon: <FileText size={18} />,
      },
      {
        name: "Kondisi Aset",
        path: "/barang-milik-negara/kondisi-aset",
        icon: <Activity size={18} />,
      },
      {
        name: "Jumlah Jenis BMN",
        path: "/barang-milik-negara/jumlah-jenis",
        icon: <Box size={18} />,
      },
    ],
    icon: <Package size={20} />,
  },
  
  {
    name: "Akuntansi Pelaporan",
    adminOnly: true,
    children: [
      {
        name: "Dashboard",
        path: "/akuntansi-pelaporan",
        icon: <Axis3D size={18} />,
      },
    ],
    icon: <FileChartColumn size={20} />,
  },
  {
    name: "Tata Usaha",
    adminOnly: true,
    children: [
      {
        name: "Dashboard",
        path: "/tata-usaha",
        icon: <Axis3D size={18} />,
      },
    ],
    icon: <BookUser size={20} />,
  },
  {
    name: "Struktur Organisasi",
    path: "/dashboard/struktur-organisasi",
    icon: <Network size={20} />,
  },
  {
    name: "Helpdesk",
    path: "/dashboard/helpdesk",
    icon: <MessageSquare size={20} />,
  },
  {
    name: "Management",
    icon: <Settings size={20} />,
    children: [
      {
        name: "User Manage",
        path: "/user-management",
        icon: <UserRoundCog size={18} />,
      },
      {
        name: "Dashboard Manage",
        path: "/dashboard-management",
        icon: <GaugeCircle size={18} />,
      },
    ],
    adminOnly: true,
  },
];

function Sidebar({ onNavigate }) {
  const { userData } = useContext(AppContext);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);
  const role = userData?.role;
  const location = useLocation();

  const handleLogout = () => logout();

  const handleNavigate = () => {
    if (onNavigate) {
      onNavigate();
    }
  };

  // --- FILTER LOGIC ---
  const getFilteredMenuItems = () => {
    if (role === "super_admin") return menuItems;

    if (role === "user" || role === "pic") {
      return menuItems
        .filter((item) => item.name === "Pelaksanaan Anggaran")
        .map((item) => ({
          ...item,
          children: item.children?.filter((child) =>
            ["Pengajuan SPP", "Arsip SPM", "Tanda Terima SPP", "LLAT"].includes(
              child.name
            )
          ),
        }));
    }

    if (role === "admin") {
      return menuItems
        .filter(
          (item) =>
            // Update: Menambahkan "PTUK" agar muncul untuk admin
            item.name === "PTUK" ||
            item.name === "Pelaksanaan Anggaran" || 
            item.name === "Management" || 
            item.name === "Barang Milik Negara"
        )
        .map((item) => {
           // Jika menu BMN atau PTUK, kembalikan semua anaknya
           if (item.name === "Barang Milik Negara" || item.name === "PTUK") return item;

           // Filter untuk menu lain
           return {
            ...item,
            children: item.children?.filter((child) =>
              [
                "Pengajuan SPP",
                "Arsip SPM",
                "Tanda Terima SPP",
                "User Manage",
                "LLAT",
              ].includes(child.name)
            ),
          }
        });
    }

    if (role !== "guest") {
      return menuItems.map((item) => ({
        ...item,
        children: item.children?.filter((child) => child.name !== "About"),
      }));
    }

    if (role === "guest") {
      return menuItems
        .filter((item) => item.name !== "Management")
        .map((item) => {
          if (item.name === "Pelaksanaan Anggaran") {
            return {
              ...item,
              children: item.children?.filter((child) =>
                ["Dashboard", "IKPA", "Realisasi", "LLAT", "About"].includes(
                  child.name
                )
              ),
            };
          }
          return item;
        });
    }

    return [];
  };

  const toggleDropdown = (item) => {
    const isOpen = openDropdown === item.name;

    if (!item.children && item.path) {
      setOpenDropdown(null);
      navigate(item.path);
      return;
    }

    if (!isOpen && item.path) {
      navigate(item.path);
    }

    setOpenDropdown(isOpen ? null : item.name);
  };

  useEffect(() => {
    const currentPath = location.pathname;
    const matchedMenu = getFilteredMenuItems().find((item) =>
      item.children?.some((child) => currentPath.startsWith(child.path))
    );

    if (matchedMenu) {
      setOpenDropdown(matchedMenu.name);
    } else {
      setOpenDropdown(null);
    }
  }, [location.pathname]);

  return (
    <div className="w-[260px] h-screen fixed top-0 left-0 flex flex-col text-white shadow-xl overflow-hidden font-sans z-50 bg-gradient-to-b from-[#38bdf8] to-[#3b82f6]">
      
      <div className="absolute -bottom-10 -right-10 pointer-events-none opacity-90">
         <img 
            src="/logo-kemnaker-sidebar.png" 
            alt="Decoration" 
            className="w-56 h-auto object-contain"
         />
      </div>

      <div className="p-6 flex items-center justify-center z-10 mt-2">
        <div className="flex flex-col justify-center">
            <img 
                src="/rokeu-bmn.png" 
                alt="ROKEU BMN" 
                className="h-10 object-contain" 
            />
        </div>
      </div>

      {/* --- MENU SCROLL AREA --- */}
      <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-1 sidebar-scroll z-10">
        <nav className="space-y-1">
          {getFilteredMenuItems().map((item, index) => {
            const isActiveParent = openDropdown === item.name;

            if (item.children) {
              return (
                <div key={index} className="mb-1">
                  <div
                    onClick={() => toggleDropdown(item)}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 group
                      ${
                        isActiveParent
                          ? "bg-white/10 text-white font-medium"
                          : "text-white/80 hover:bg-white/10 hover:text-white"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    {isActiveParent ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </div>

                  {/* SUBMENU */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isActiveParent ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="pl-3 space-y-1">
                      {item.children.map((subItem) => (
                        <NavLink
                          to={subItem.path}
                          key={subItem.path}
                          end
                          onClick={handleNavigate}
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                              isActive
                                ? "bg-white text-blue-500 font-bold shadow-md"
                                : "text-white/70 hover:text-white hover:bg-white/10"
                            }`
                          }
                        >
                            {subItem.icon ? subItem.icon : <div className="w-1.5 h-1.5 rounded-full bg-current"></div>}
                          <span className="font-medium">{subItem.name}</span>
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <NavLink
                  to={item.path}
                  key={item.path}
                  end
                  onClick={handleNavigate}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-200 mb-1 ${
                      isActive
                        ? "bg-white text-blue-500 font-bold shadow-md"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </NavLink>
              );
            }
          })}
        </nav>
      </div>

      {/* --- FOOTER (Rapih pakai Tailwind) --- */}
      <div className="p-4 z-10 border-t border-white/10 bg-white/5 backdrop-blur-sm">
         <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2 w-full text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-sm mb-4 font-medium"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
        
        <div className="text-center relative z-20">
          <p className="text-[10px] text-white/70 font-light tracking-wide drop-shadow-md">
            © Rokeu BMN 2025, Version 2.0
          </p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;