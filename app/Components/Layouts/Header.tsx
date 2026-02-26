import { AlertTriangle, Bell, Calendar, CheckCircle2, DollarSign, Info, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Header = () => {
  const today = new Date();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
    const notificationRef = useRef<HTMLDivElement>(null);

    // Handle click outside to close notifications
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (
          notificationRef.current &&
          !notificationRef.current.contains(event.target as Node)
        ) {
          setNotificationsOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
    const formattedDate = today.toLocaleDateString("vi-VN", {
      day: "numeric",
      month: "long",
    year: "numeric",
  });

    const notifications = [
      {
        id: 1,
        type: "warning",
        title: "Sắp đến hạn thanh toán",
        message: "Hóa đơn Internet (280k) hết hạn vào ngày mai.",
        time: "30 phút trước",
        read: false,
      },
      {
        id: 2,
        type: "alert",
        title: "Cảnh báo chi tiêu",
        message: "Bạn đã dùng 85% ngân sách Ăn uống tháng này.",
        time: "2 giờ trước",
        read: false,
      },
      {
        id: 3,
        type: "success",
        title: "Mục tiêu đạt được",
        message: 'Chúc mừng! Bạn đã hoàn thành mục tiêu "Mua Laptop".',
        time: "1 ngày trước",
        read: true,
      },
      {
        id: 4,
        type: "info",
        title: "Nhắc nhở nợ",
        message: "Đến hạn thu nợ từ Nguyễn Thị C (2.000.000đ).",
        time: "2 ngày trước",
        read: true,
      },
    ];
    
    const unreadCount = notifications.filter((n) => !n.read).length;
  return (
    <header className="bg-white/70 backdrop-blur-2xl border-b border-emerald-200/50 sticky top-0 z-20 shadow-sm">
      <div className="px-6 lg:px-8 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-700 via-green-600 to-teal-600 bg-clip-text text-transparent flex items-center gap-3">
              Dashboard Tài Chính
              <Sparkles className="w-6 h-6 text-emerald-500 animate-pulse" />
            </h1>
            <p className="text-sm text-gray-600 mt-1.5 font-medium">
              Chúc bạn một ngày tốt lành!
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 bg-white/80 backdrop-blur-xl rounded-2xl px-5 py-3 shadow-lg border border-emerald-200/50">
              <Calendar className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-semibold text-gray-700">
                {formattedDate}
              </span>
            </div>
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className={`cursor-pointer relative p-3 rounded-2xl transition-all duration-300 group ${notificationsOpen ? "bg-emerald-100 text-emerald-700" : "hover:bg-emerald-50 text-gray-600"}`}
              >
                <Bell
                  className={`w-6 h-6 transition-colors ${notificationsOpen ? "text-emerald-700" : "group-hover:text-emerald-600"}`}
                />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50 border-2 border-white"></span>
                )}
              </button>

              {/* Notification Dropdown */}
              {notificationsOpen && (
                <div className="absolute right-0 top-full mt-4 w-80 md:w-96 bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-500 origin-top-right z-50 ">
                  <div className="p-4 border-b border-gray-50 flex items-center justify-between bg-emerald-50/50">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2">
                      Thông báo
                      <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                        {unreadCount} mới
                      </span>
                    </h3>
                    <button
                      onClick={() => setNotificationsOpen(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4 cursor-pointer" />
                    </button>
                  </div>

                  <div className="max-h-[400px] overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer flex gap-3 ${!notification.read ? "bg-emerald-50/30" : ""}`}
                      >
                        <div
                          className={`mt-1 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                            notification.type === "warning"
                              ? "bg-orange-100 text-orange-600"
                              : notification.type === "alert"
                                ? "bg-red-100 text-red-600"
                                : notification.type === "success"
                                  ? "bg-green-100 text-green-600"
                                  : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          {notification.type === "warning" && (
                            <AlertTriangle className="w-5 h-5" />
                          )}
                          {notification.type === "alert" && (
                            <Info className="w-5 h-5" />
                          )}
                          {notification.type === "success" && (
                            <CheckCircle2 className="w-5 h-5" />
                          )}
                          {notification.type === "info" && (
                            <DollarSign className="w-5 h-5" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <p
                              className={`text-sm font-semibold ${!notification.read ? "text-gray-900" : "text-gray-600"}`}
                            >
                              {notification.title}
                            </p>
                            <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap ml-2">
                              {notification.time}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                            {notification.message}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="self-center w-2 h-2 bg-emerald-500 rounded-full"></div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-gray-50 text-center border-t border-gray-100">
                    <button className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 hover:underline">
                      Đánh dấu tất cả đã đọc
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
