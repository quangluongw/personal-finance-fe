import { LogOut, Moon, Settings, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useUserInfoAction from "./user-info/useUserInfoAction";

const Header = () => {
  const [drop, setDrop] = useState(false);
  const { data } = useUserInfoAction();

  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (
        dropdownRef.current &&
        target &&
        !dropdownRef.current.contains(target)
      ) {
        setDrop(false);
      }
    };

    if (drop) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [drop]);
  return (
    <header className="flex items-center justify-end px-6 border-b-[1px] border-[#e9ebec] bg-white h-16 shrink-0 sticky top-0 z-10">
      <div ref={dropdownRef}>
        <div className="flex items-center gap-4 relative">
          <Moon color="#878a99" size={24} />
          <div onClick={() => setDrop(!drop)} className="cursor-pointer">
            <img
              src="https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
              width={34}
              className="rounded-full"
              alt=""
            />
          </div>
          <div
            className={` mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700
             shadow-xl rounded-xl p-2 absolute top-10 right-0 transition-all duration-300 ease-out origin-top-right
              ${
                drop
                  ? "opacity-100 scale-100 translate-y-0 rotate-0"
                  : "opacity-0 scale-0 -translate-y-2 -rotate-1 pointer-events-none"
              }`}
          >
            <div className="px-3 py-2 mb-2">
              <p className="font-medium text-slate-800 dark:text-slate-200">
                {data?.fullName}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {data?.email}
              </p>
            </div>
            <hr className="mb-1 text-gray-400" />
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors duration-150">
              <User className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              <span className="text-slate-700 dark:text-slate-300">
                Hồ sơ cá nhân
              </span>
            </div>

            <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors duration-150">
              <Settings className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              <span className="text-slate-700 dark:text-slate-300">
                Cài đặt
              </span>
            </div>

            <hr className="text-gray-400" />

            <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer transition-colors duration-150 text-red-600 dark:text-red-400">
              <LogOut className="h-4 w-4" />
              <span>Đăng xuất</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
