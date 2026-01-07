import { History, Home, Receipt, Target, Wallet } from "lucide-react";
import { Link, useLocation } from "react-router";
import icon from "../../Image/icon.png";

// interface SidebarProps {
//   currentPage?: string;
// }

const Sidebar = () => {
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
      mobile: true,
    },
    {
      icon: Wallet,
      label: "Mục tiêu tiết kiệm",
      href: "/savings",
      key: "tiet-kiem",
      mobile: false,
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
      <aside className="hidden md:flex md:flex-col w-64 bg-white border-r border-gray-300 p-4 fixed top-0 left-0 h-screen z-30 overflow-y-auto">
        <nav className="flex flex-col gap-2">
          {/* Logo Section */}
          <div className="flex items-center gap-2 mb-4 px-2">
            <img
              src={icon || "/placeholder.svg"}
              alt="SpendSense Logo"
              width={50}
              height={50}
              className="flex-shrink-0"
            />
            <h2 className="text-2xl font-bold truncate">SpendSense</h2>
          </div>

          {/* Menu Items */}
          {menuItems.map((item) => (
            <Link key={item.key} to={item.href} className="w-full">
              <button
                className={`w-full flex items-center gap-3 text-base font-semibold cursor-pointer text-black hover:bg-green-600 hover:text-white py-3 px-3 rounded-xl transition-colors ${
                  item.href === pathname ? "bg-green-600 text-white" : ""
                }`}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            </Link>
          ))}
        </nav>
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
