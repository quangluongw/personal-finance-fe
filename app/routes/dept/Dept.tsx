import {
  AlertCircle,
  AlertTriangle,
  ArrowDownLeft,
  ArrowUpRight,
  Calendar,
  ChevronRight,
  Clock,
  DollarSign,
  FileText,
  Filter,
  History,
  MessageCircle,
  Phone,
  Plus,
  Search,
  Sparkles,
  User,
  Wallet,
  X,
} from "lucide-react";
import { useState } from "react";

// Mock types
type Transaction = {
  id: number;
  date: string;
  amount: number;
  type: "payment" | "interest";
  note?: string;
};

type Debt = {
  id: number;
  type: "lending" | "borrowing";
  person: string;
  phone?: string;
  avatarColor: string;
  amount: number;
  date: string; // Ngày tạo khoản vay
  status: "active" | "paid";
  description: string;
  paidAmount: number;
  transactions: Transaction[];
};

const DebtManagement=()=> {
  const [activeTab, setActiveTab] = useState<"lending" | "borrowing">(
    "lending"
  );
  const [selectedDebt, setSelectedDebt] = useState<Debt | null>(null);

  // Mock data
  const debts: Debt[] = [
    {
      id: 1,
      type: "lending",
      person: "Trần Văn B",
      phone: "0912345678",
      avatarColor: "bg-emerald-100 text-emerald-600",
      amount: 15000000,
      date: "20/12/2025",
      status: "active",
      description: "Cho vay vốn kinh doanh",
      paidAmount: 5000000,
      transactions: [
        {
          id: 101,
          date: "10/01/2026",
          amount: 2000000,
          type: "payment",
          note: "Trả đợt 1",
        },
        {
          id: 102,
          date: "25/01/2026",
          amount: 3000000,
          type: "payment",
          note: "Trả đợt 2",
        },
      ],
    },
    {
      id: 2,
      type: "lending",
      person: "Nguyễn Thị C",
      phone: "0987654321",
      avatarColor: "bg-blue-100 text-blue-600",
      amount: 2000000,
      date: "15/01/2026",
      status: "active",
      description: "Thanh toán tiền ăn hộ",
      paidAmount: 0,
      transactions: [],
    },
    {
      id: 3,
      type: "borrowing",
      person: "Lê Văn D",
      phone: "0909090909",
      avatarColor: "bg-purple-100 text-purple-600",
      amount: 10000000,
      date: "01/01/2026",
      status: "active",
      description: "Vay mua laptop",
      paidAmount: 3000000,
      transactions: [
        {
          id: 201,
          date: "15/01/2026",
          amount: 3000000,
          type: "payment",
          note: "Chuyển khoản trả trước",
        },
      ],
    },
    {
      id: 4,
      type: "borrowing",
      person: "Ngân hàng Techcombank",
      avatarColor: "bg-red-100 text-red-600",
      amount: 50000000,
      date: "10/12/2025",
      status: "active",
      description: "Vay tiêu dùng (Thẻ tín dụng)",
      paidAmount: 5000000,
      transactions: [
        {
          id: 301,
          date: "05/01/2026",
          amount: 2500000,
          type: "payment",
          note: "Thanh toán tối thiểu",
        },
        {
          id: 302,
          date: "05/02/2026",
          amount: 2500000,
          type: "payment",
          note: "Thanh toán tối thiểu",
        },
      ],
    },
  ];

  const filteredDebts = debts.filter((d) => d.type === activeTab);
  const totalLending = debts
    .filter((d) => d.type === "lending")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const totalBorrowing = debts
    .filter((d) => d.type === "borrowing")
    .reduce((acc, curr) => acc + curr.amount, 0);

  // Calculate active debts for sidebar
  const activeDebtsList = debts
    .filter((d) => d.status === "active")
    .slice(0, 4);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-50 text-blue-600 border-blue-100";
      case "paid":
        return "bg-green-50 text-green-600 border-green-100";
      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Đang vay";
      case "paid":
        return "Hoàn thành";
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            Sổ Quản Lý Nợ
          </h1>
          <p className="text-gray-500 mt-1">
            Quản lý chi tiết các khoản vay, cho vay và lịch sử thanh toán
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white border border-gray-200 text-gray-600 px-4 py-2.5 rounded-xl hover:bg-gray-50 font-medium transition-colors flex items-center gap-2 shadow-sm">
            <Filter className="w-4 h-4" />
            <span>Lọc & Sắp xếp</span>
          </button>
          <button className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition-all duration-300 font-medium flex items-center gap-2">
            <Plus className="w-5 h-5" />
            <span>Thêm khoản mới</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-6 text-white shadow-xl shadow-emerald-500/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
            <Wallet className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
                <ArrowUpRight className="w-6 h-6 text-white" />
              </div>
              <span className="text-emerald-50 font-medium">Đang cho vay</span>
            </div>
            <div className="text-3xl font-bold mb-1">
              {totalLending.toLocaleString("vi-VN")} đ
            </div>
            <div className="h-1 w-full bg-emerald-800/30 rounded-full mt-4 overflow-hidden">
              <div className="h-full bg-white/30 w-[65%] rounded-full"></div>
            </div>
            <div className="text-emerald-100 text-xs mt-2 flex justify-between">
              <span>
                Đã thu: {(totalLending * 0.65).toLocaleString("vi-VN")} đ
              </span>
              <span>65%</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl p-6 text-white shadow-xl shadow-orange-500/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
            <AlertCircle className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
                <ArrowDownLeft className="w-6 h-6 text-white" />
              </div>
              <span className="text-orange-50 font-medium">Đang nợ</span>
            </div>
            <div className="text-3xl font-bold mb-1">
              {totalBorrowing.toLocaleString("vi-VN")} đ
            </div>
            <div className="h-1 w-full bg-orange-800/30 rounded-full mt-4 overflow-hidden">
              <div className="h-full bg-white/30 w-[40%] rounded-full"></div>
            </div>
            <div className="text-orange-100 text-xs mt-2 flex justify-between">
              <span>
                Đã trả: {(totalBorrowing * 0.4).toLocaleString("vi-VN")} đ
              </span>
              <span>40%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-xl shadow-gray-200/50 border border-emerald-100 relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-emerald-100 rounded-xl">
                <DollarSign className="w-6 h-6 text-emerald-600" />
              </div>
              <span className="text-gray-600 font-medium">
                Tài sản ròng (Vay/Nợ)
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-1">
              {(totalLending - totalBorrowing).toLocaleString("vi-VN")} đ
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 bg-blue-50 text-blue-600 rounded-xl text-sm font-medium border border-blue-100">
            <AlertTriangle className="w-4 h-4" />
            <span>4 khoản đang hoạt động</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Main List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-100 overflow-hidden min-h-[600px]">
            {/* Tabs */}
            <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between flex-wrap gap-4">
              <div className="flex p-1 bg-gray-100/80 rounded-xl">
                <button
                  onClick={() => {
                    setActiveTab("lending");
                    setSelectedDebt(null);
                  }}
                  className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    activeTab === "lending"
                      ? "bg-white text-emerald-700 shadow-md"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Phải thu (Cho vay)
                </button>
                <button
                  onClick={() => {
                    setActiveTab("borrowing");
                    setSelectedDebt(null);
                  }}
                  className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    activeTab === "borrowing"
                      ? "bg-white text-orange-600 shadow-md"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Phải trả (Đi vay)
                </button>
              </div>
            </div>

            {/* List */}
            <div className="p-6 space-y-4">
              {filteredDebts.map((debt) => {
                const progress = Math.min(
                  (debt.paidAmount / debt.amount) * 100,
                  100
                );
                return (
                  <div
                    key={debt.id}
                    onClick={() => setSelectedDebt(debt)}
                    className={`group relative flex flex-col sm:flex-row items-center gap-4 p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                      selectedDebt?.id === debt.id
                        ? "bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500"
                        : "bg-white border-gray-100 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-500/5"
                    }`}
                  >
                    {/* Progress Bar Background */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-100 rounded-b-2xl overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${debt.type === "lending" ? "bg-emerald-500" : "bg-orange-500"}`}
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>

                    {/* Icon & Person */}
                    <div className="flex items-center gap-4 w-full sm:w-auto flex-1">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm ${debt.avatarColor}`}
                      >
                        <User className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 text-lg">
                          {debt.person}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-1">
                          {debt.description}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded border ${getStatusColor(debt.status)} font-bold uppercase tracking-wider`}
                          >
                            {getStatusLabel(debt.status)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Amount Info */}
                    <div className="w-full sm:w-auto sm:text-right flex flex-row sm:flex-col justify-between items-center sm:items-end">
                      <div className="text-gray-500 text-xs font-medium">
                        Còn lại
                      </div>
                      <div
                        className={`text-xl font-bold ${debt.type === "lending" ? "text-emerald-600" : "text-orange-600"}`}
                      >
                        {(debt.amount - debt.paidAmount).toLocaleString(
                          "vi-VN"
                        )}{" "}
                        đ
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        Tổng: {debt.amount.toLocaleString("vi-VN")} đ
                      </div>
                    </div>

                    <ChevronRight
                      className={`w-5 h-5 text-gray-300 transition-transform ${selectedDebt?.id === debt.id ? "rotate-90 text-emerald-500" : ""}`}
                    />
                  </div>
                );
              })}

              {filteredDebts.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-300" />
                  </div>
                  <h3 className="text-gray-500 font-medium">
                    Chưa có dữ liệu nào
                  </h3>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Detail View */}
        <div className="lg:col-span-1">
          {selectedDebt ? (
            <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-emerald-100 overflow-hidden sticky top-6 animate-in slide-in-from-right-4 duration-300">
              <div
                className={`h-24 ${selectedDebt.type === "lending" ? "bg-gradient-to-br from-emerald-500 to-green-600" : "bg-gradient-to-br from-orange-500 to-red-600"} relative`}
              >
                <button
                  onClick={() => setSelectedDebt(null)}
                  className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute -bottom-10 left-6">
                  <div
                    className={`w-20 h-20 rounded-2xl shadow-lg border-4 border-white flex items-center justify-center ${selectedDebt.avatarColor} bg-white`}
                  >
                    <User className="w-10 h-10" />
                  </div>
                </div>
              </div>

              <div className="pt-12 pb-6 px-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      {selectedDebt.person}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {selectedDebt.type === "lending" ? "Người vay" : "Chủ nợ"}
                    </p>
                  </div>
                  {selectedDebt.phone && (
                    <div className="flex gap-2">
                      <button className="p-2 bg-green-50 text-green-600 rounded-full hover:bg-green-100 transition-colors">
                        <Phone className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Main Stats in Detail */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="text-xs text-gray-500 mb-1">
                      Số tiền gốc
                    </div>
                    <div className="font-bold text-gray-800">
                      {selectedDebt.amount.toLocaleString("vi-VN")}
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="text-xs text-gray-500 mb-1">
                      Đã thanh toán
                    </div>
                    <div
                      className={`font-bold ${selectedDebt.type === "lending" ? "text-emerald-600" : "text-orange-600"}`}
                    >
                      {selectedDebt.paidAmount.toLocaleString("vi-VN")}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 text-gray-500">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Ngày tạo</p>
                      <p className="font-medium text-gray-800">
                        {selectedDebt.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-500">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Ghi chú</p>
                      <p className="font-medium text-gray-800 line-clamp-2">
                        {selectedDebt.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  <button className="py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
                    <History className="w-4 h-4" /> Lịch sử
                  </button>
                  <button
                    className={`py-2.5 px-4 text-white font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-lg ${
                      selectedDebt.type === "lending"
                        ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200"
                        : "bg-orange-500 hover:bg-orange-600 shadow-orange-200"
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                    {selectedDebt.type === "lending"
                      ? "Thêm khoản thu"
                      : "Trả nợ"}
                  </button>
                </div>

                {/* History Mock */}
                <div>
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center justify-between">
                    Lịch sử giao dịch
                    <span className="text-xs font-normal text-gray-500">
                      Gần nhất
                    </span>
                  </h3>
                  <div className="space-y-4">
                    {selectedDebt.transactions &&
                    selectedDebt.transactions.length > 0 ? (
                      selectedDebt.transactions.map((t) => (
                        <div
                          key={t.id}
                          className="relative pl-6 pb-4 border-l border-gray-200 last:pb-0"
                        >
                          <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-4 ring-white"></div>
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm font-semibold text-gray-800">
                                {t.note}
                              </p>
                              <p className="text-xs text-gray-400">{t.date}</p>
                            </div>
                            <span className="text-sm font-bold text-emerald-600">
                              +{t.amount.toLocaleString("vi-VN")}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-400 text-center italic py-2">
                        Chưa có giao dịch nào
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Empty State / Dashboard for Details */
            <div className="space-y-6 sticky top-6">
              <div className="bg-white rounded-3xl p-6 shadow-xl shadow-gray-200/50 border border-emerald-100">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  Đang hoạt động
                </h3>
                <div className="space-y-3">
                  {activeDebtsList.map((d) => (
                    <div
                      key={d.id}
                      className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-xl border border-gray-100"
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm ${
                          d.type === "lending"
                            ? "bg-emerald-500"
                            : "bg-orange-500"
                        }`}
                      >
                        {d.type === "lending" ? "VAY" : "NỢ"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-800 truncate">
                          {d.person}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {d.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <div
                          className={`text-sm font-bold ${d.type === "lending" ? "text-emerald-600" : "text-orange-600"}`}
                        >
                          {d.amount > 1000000
                            ? `${d.amount / 1000000}M`
                            : d.amount}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 text-white shadow-xl shadow-indigo-500/20">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg">Mẹo tài chính</h3>
                    <p className="text-indigo-100 text-sm mt-1">
                      Quản lý nợ hiệu quả
                    </p>
                  </div>
                  <Sparkles className="w-6 h-6 text-yellow-300" />
                </div>
                <p className="text-sm text-indigo-50 leading-relaxed bg-white/10 p-3 rounded-xl backdrop-blur-md">
                  "Hãy ưu tiên trả các khoản nợ có lãi suất cao trước. Ghi chép
                  đầy đủ các lần trả nợ để tránh nhầm lẫn."
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DebtManagement;