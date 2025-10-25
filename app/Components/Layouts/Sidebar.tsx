import {
  CreditCard,
  History,
  Home,
  Receipt,
  Target,
  Wallet,
} from "lucide-react";
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
      icon: CreditCard,
      label: "Chi tiêu",
      href: "/spending",
      key: "chi-tieu",
      mobile: true,
    },
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
      <aside
        className="hidden md:block w-60 bg-sidebar border-r border-gray-300 p-4 h-full min-h-[100vh] fixed
     bg-white z-30"
      >
        <nav className="flex flex-col gap-2">
          <div className="flex items-center mb-2">
            <img src={icon} alt="" width={50} />
            <h2 className="text-2xl">SpendSense</h2>
          </div>
          {menuItems.map((item) => (
            <Link key={item.key} to={item.href}>
              <button
                className={`w-full flex items-center text-base font-semibold cursor-pointer text-black hover:bg-green-600 hover:text-white py-3 px-2 rounded-xl ${item.href === pathname && "bg-green-600 text-white"} `}
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.label}
              </button>
            </Link>
          ))}
        </nav>
      </aside>
      <div className="md:hidden block fixed z-50 bottom-0 w-full bg-white p-4">
        <nav className="flex gap-2 justify-between">
          {menuItems
            .filter((item) => item.mobile === true)
            .map((item) => (
              <Link key={item.key} to={item.href}>
                <button
                  className={`w-full flex flex-col items-center text-base font-semibold cursor-pointer text-black hover:text-green-600  py-3 px-2 rounded-xl ${item.href === pathname && "text-green-600 "} `}
                >
                  <item.icon className="mr-3 h-4 w-4" />
                  {item.label}
                </button>
              </Link>
            ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
