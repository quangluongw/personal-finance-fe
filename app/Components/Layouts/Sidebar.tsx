import {
  BookOpen,
  ChevronRight,
  History,
  Home,
  LogOut,
  Receipt,
  Sparkles,
  Target,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import useUserInfoAction from "./user-info/useUserInfoAction";

// interface SidebarProps {
//   currentPage?: string;
// }

const Sidebar = () => {
    const { data } = useUserInfoAction();
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();
  const menuItems = [
    { icon: Home, label: "Thống kê", href: "/", key: " ", mobile: true },
    {
      icon: Receipt,
      label: "Thu nhập",
      href: "/income",
      key: "thu-nhap",
      mobile: false,
    },
    {
      icon: Target,
      label: "Ngân sách",
      href: "/budget",
      key: "ngan-sach",
      mobile: false,
    },
    {
      icon: BookOpen,
      label: "Sổ nợ",
      href: "/dept",
      key: "so-no",
      mobile: false,
    },
    {
      icon: Wallet,
      label: "Mục tiêu tiết kiệm",
      href: "/savings",
      key: "tiet-kiem",
      mobile: true,
    },
    {
      icon: History,
      label: "Lịch sử giao dịch",
      href: "/history",
      key: "lich-su",
      mobile: true,
    },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`bg-gradient-to-b from-emerald-900 via-green-900 to-emerald-950 text-white transition-all duration-300 ${collapsed ? "w-20" : "w-72"} md:flex hidden flex-col h-screen sticky top-0 shadow-2xl `}
      >
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-green-500/10 pointer-events-none"></div>

        {/* Logo */}
        <div className="relative p-6 border-b border-emerald-700/50">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-400 blur-xl opacity-50 animate-pulse"></div>
                  <div className="relative bg-gradient-to-br from-emerald-400 to-green-500 p-2.5 rounded-xl shadow-lg">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h2 className="font-bold text-xl bg-gradient-to-r from-emerald-300 via-green-200 to-emerald-400 bg-clip-text text-transparent">
                    SpendSense
                  </h2>
                  <p className="text-xs text-emerald-300 mt-0.5 font-medium">
                    Quản lý thông minh
                  </p>
                </div>
              </div>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="relative p-2 hover:bg-emerald-800/50 rounded-xl transition-all duration-300 group cursor-pointer"
            >
              <ChevronRight
                className={`w-5 h-5 transition-transform duration-300 ${!collapsed ? "rotate-180" : ""} group-hover:scale-110`}
              />
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="relative flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.href === pathname;
            return (
              <Link key={item.key} to={item.href} className="w-full px-[1px]">
                <button
                  className={`relative text-white cursor-pointer w-full flex items-center gap-3 px-4 py-3.5
                   rounded-xl transition-all duration-300 group overflow-hidden ${
                     isActive
                       ? "bg-gradient-to-r from-emerald-500 to-green-500 shadow-lg shadow-emerald-500/40 scale-105"
                       : "hover:bg-emerald-800/30 hover:scale-102"
                   }`}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-green-400/20 animate-pulse"></div>
                  )}
                  <Icon
                    className={`relative w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110 ${isActive ? "drop-shadow-lg" : ""}`}
                  />
                  {!collapsed && (
                    <>
                      <span className="relative flex-1 text-left text-sm font-semibold">
                        {item.label}
                      </span>

                    </>
                  )}
                </button>
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="relative p-4 border-t border-emerald-700/50">
          <div
            className={`flex items-center gap-3 p-3 rounded-xl hover:bg-emerald-800/30 transition-all duration-300 cursor-pointer group ${collapsed ? "justify-center" : ""}`}
          >
            <div className="relative">
              <img
                src={`${data?.avatar || "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"}`}
                width={34}
                className="rounded-full"
                alt=""
              />
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">
                  {data?.userName}
                </p>
                <p className="text-xs text-emerald-300 truncate">
                  {data?.email}
                </p>
              </div>
            )}
          </div>
          {!collapsed && (
            <button className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 hover:text-red-200 transition-all duration-300 group">
              <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Đăng xuất</span>
            </button>
          )}
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-300 safe-area-inset-bottom">
        <nav className="flex justify-around items-center px-2 py-3">
          {menuItems
            .filter((item) => item.mobile === true)
            .map((item) => (
              <Link
                key={item.key}
                to={item.href}
                className="flex-1 max-w-[100px]"
              >
                <button
                  className={`w-full flex flex-col items-center gap-1 text-xs font-semibold cursor-pointer py-2 px-1 rounded-lg transition-colors ${
                    item.href === pathname
                      ? "text-green-600"
                      : "text-gray-600 hover:text-green-600"
                  }`}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  <span className="truncate w-full text-center leading-tight">
                    {item.label}
                  </span>
                </button>
              </Link>
            ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
