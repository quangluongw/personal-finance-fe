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
  History,
  Plus,
  Search,
  User,
  Wallet,
  X,
} from "lucide-react";
import { useState } from "react";

import type { IDept } from "~/Types/dept";
import { parseISOToVN } from "~/lib/format";
import AddDept from "./AddDept/AddDept";
import DebtManagementSkeleton from "./DebtSkeleton";
import UpdateDept from "./UpdateDept/updateDept";
import useDept from "./useDept";

const DebtManagement = () => {
  const [activeTab, setActiveTab] = useState<"lending" | "borrowing">(
    "lending"
  );
  const [showPayment, setShowPayment] = useState(false);
  const [selectedDebt, setSelectedDebt] = useState<IDept | null>(null);
  const { data, isLoading } = useDept();
  const [showAddDebtDialog, setShowAddDebtDialog] = useState(false);
  const [action, setAction] = useState("payment");
  const getStatusColor = (status: string) => {
    switch (status) {
      case "borrowing":
        return "bg-red-50 text-red-600 border-red-100";
      case "lending":
        return "bg-green-50 text-green-600 border-green-100";
      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  const getStatusLabel = (remain: number) => {
    if (remain > 0) {
      return " Đang vay";
    } else {
      return " Hoàn Thành";
    }
  };

  return isLoading ? (
    <DebtManagementSkeleton />
  ) : (
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
          <button
            className="bg-gradient-to-r cursor-pointer from-emerald-600 to-green-600 text-white
           px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5
           transition-all duration-300 font-medium flex items-center gap-2"
            onClick={() => setShowAddDebtDialog(true)}
          >
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
              {data?.summary?.lend.total.toLocaleString("vi-VN")} đ
            </div>
            <div className="h-1 w-full bg-emerald-800/30 rounded-full mt-4 overflow-hidden">
              <div
                className="h-full bg-white rounded-full"
                style={{ width: `${data?.summary?.lend?.percent || 0}%` }}
              ></div>
            </div>
            <div className="text-emerald-100 text-xs mt-2 flex justify-between">
              <span>
                Đã thu: {data?.summary?.lend?.paid.toLocaleString("vi-VN")} đ
              </span>
              <span>{data?.summary?.lend?.percent}%</span>
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
              {data?.summary?.borrow.total.toLocaleString("vi-VN")} đ
            </div>
            <div className="h-1 w-full bg-emerald-800/30 rounded-full mt-4 overflow-hidden">
              <div
                className="h-full bg-white rounded-full"
                style={{ width: `${data?.summary?.borrow?.percent || 0}%` }}
              ></div>
            </div>
            <div className="text-orange-100 text-xs mt-2 flex justify-between">
              <span>
                Đã trả: {data?.summary?.borrow.paid.toLocaleString("vi-VN")} đ
              </span>
              <span>{data?.summary?.borrow?.percent}%</span>
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
              {data?.summary?.netAsset.toLocaleString("vi-VN")} đ
            </div>
          </div>
          <div
            className="flex items-center gap-2 p-3 bg-blue-50 text-blue-600 rounded-xl text-sm font-medium 
          border border-blue-100"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>{data?.summary?.activeCount} khoản đang hoạt động</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-emerald-900/5 border 
          border-emerald-100 overflow-hidden"
          >
            <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between flex-wrap gap-4">
              <div className="flex p-1 bg-gray-100/80 rounded-xl">
                <button
                  onClick={() => {
                    setActiveTab("lending");
                    setSelectedDebt(null);
                  }}
                  className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer
                   ${
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
                  className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer
                   ${
                     activeTab === "borrowing"
                       ? "bg-white text-orange-600 shadow-md"
                       : "text-gray-500 hover:text-gray-700"
                   }`}
                >
                  Phải trả (Đi vay)
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {data.list
                .filter((debt: IDept) => debt.type === activeTab)
                .map((debt: IDept) => {
                  const progress = Math.min(
                    (debt.paid / debt.total) * 100,
                    100
                  );
                  const remaining = debt.total - debt.paid;
                  const isSelected = selectedDebt?.id === debt.id;
                  const baseClasses =
                    "group relative rounded-2xl border-2 transition-all duration-300 cursor-pointer overflow-hidden";

                  const isLending = activeTab === "lending";

                  const selectedClasses = isLending
                    ? "bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-400 shadow-xl shadow-emerald-500/20"
                    : "bg-gradient-to-br from-red-50 to-red-50 border-red-200 shadow-xl shadow-red-500/20";

                  const unselectedClasses = isLending
                    ? "bg-white border-gray-100 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-500/5 hover:-translate-y-1"
                    : "bg-white border-gray-100 hover:border-red-200 hover:shadow-lg hover:shadow-red-500/5 hover:-translate-y-1";
                  return (
                    <div
                      key={debt.id}
                      onClick={() => setSelectedDebt(debt)}
                      className={`${baseClasses} ${isSelected ? `${selectedClasses} scale-[1.02]` : unselectedClasses}`}
                    >
                      {/* Gradient Accent Bar */}
                      <div
                        className={`absolute top-0 left-0 w-2 h-full ${
                          debt.type === "lending"
                            ? "bg-gradient-to-b from-emerald-400 via-green-500 to-teal-600"
                            : "bg-gradient-to-b from-orange-400 via-red-500 to-rose-600"
                        }`}
                      ></div>

                      <div className="p-6 pl-8">
                        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-5">
                          {/* Avatar & Person Info */}
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            {/* Enhanced Avatar */}
                            <div className="relative flex-shrink-0">
                              <div
                                className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg 
                              ${isSelected ? "ring-4 ring-emerald-200" : "group-hover:scale-110"} transition-all duration-300`}
                              >
                                <User className="w-8 h-8" />
                              </div>
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-gray-800 text-lg truncate">
                                  {debt.person}
                                </h3>
                              </div>
                              <p className="text-sm text-gray-600 line-clamp-1 mb-2">
                                {debt.description}
                              </p>

                              {/* Tags Row */}
                              <div className="flex items-center gap-2 flex-wrap">
                                <span
                                  className={`inline-flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-full border font-bold uppercase tracking-wider ${getStatusColor(debt.type)}`}
                                >
                                  <div
                                    className={`w-1.5 h-1.5 rounded-full ${debt.type === "borrowing" ? "bg-red-500 animate-pulse" : "bg-green-500"}`}
                                  ></div>
                                  {getStatusLabel(debt.remain)}
                                </span>
                                <span className="inline-flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">
                                  <Calendar className="w-3 h-3" />
                                  {parseISOToVN(debt.createdAt)}
                                </span>
                                {debt.transactions.length > 0 && (
                                  <span className="inline-flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-full bg-purple-50 text-purple-600 border border-purple-200 font-semibold">
                                    <History className="w-3 h-3" />
                                    {debt.transactions.length} giao dịch
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Amount Section - Enhanced */}
                          <div className="w-full lg:w-auto lg:min-w-[240px] flex flex-col gap-3">
                            {/* Progress Section */}
                            <div className="flex items-center gap-4">
                              {/* Circular Progress */}
                              <div className="relative w-16 h-16 flex-shrink-0">
                                <svg className="w-16 h-16 transform -rotate-90">
                                  <circle
                                    cx="32"
                                    cy="32"
                                    r="28"
                                    stroke="#e5e7eb"
                                    strokeWidth="6"
                                    fill="none"
                                  />
                                  <circle
                                    cx="32"
                                    cy="32"
                                    r="28"
                                    stroke={
                                      debt.type === "lending"
                                        ? "#10b981"
                                        : "#f97316"
                                    }
                                    strokeWidth="6"
                                    fill="none"
                                    strokeDasharray={`${2 * Math.PI * 28}`}
                                    strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress / 100)}`}
                                    strokeLinecap="round"
                                    className="transition-all duration-500"
                                  />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <span
                                    className={`text-xs font-bold ${debt.type === "lending" ? "text-emerald-600" : "text-orange-600"}`}
                                  >
                                    {Math.round(progress)}%
                                  </span>
                                </div>
                              </div>

                              {/* Amount Details */}
                              <div className="flex-1">
                                <div className="flex items-baseline gap-2 mb-1">
                                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                    Còn lại
                                  </span>
                                  {remaining < debt.total * 0.1 &&
                                    remaining > 0 && (
                                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-yellow-100 text-yellow-700 rounded text-[9px] font-bold">
                                        <AlertTriangle className="w-2.5 h-2.5" />
                                        Sắp xong
                                      </span>
                                    )}
                                </div>
                                <div
                                  className={`text-2xl font-black mb-0.5 ${debt.type === "lending" ? "text-emerald-600" : "text-orange-600"}`}
                                >
                                  {remaining.toLocaleString("vi-VN")} đ
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                      className={`h-full transition-all duration-500 rounded-full ${
                                        debt.type === "lending"
                                          ? "bg-gradient-to-r from-emerald-400 to-green-500"
                                          : "bg-gradient-to-r from-orange-400 to-red-500"
                                      }`}
                                      style={{ width: `${progress}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-[10px] text-gray-400 font-medium tabular-nums">
                                    {debt.paid.toLocaleString("vi-VN")} /
                                    {debt.total.toLocaleString("vi-VN")}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  setSelectedDebt(debt);
                                  setShowPayment(true);
                                }}
                                className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer
                                 ${
                                   debt.type === "lending"
                                     ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-200"
                                     : "bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-200"
                                 }`}
                              >
                                {debt.type === "lending"
                                  ? "+ Thu tiền"
                                  : "+ Trả nợ"}
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedDebt(debt);
                                }}
                                className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors"
                              >
                                <ChevronRight
                                  className={`w-4 h-4 transition-transform duration-300 ${isSelected ? "rotate-90 text-emerald-600" : ""}`}
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Hover Glow Effect */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${
                          debt.type === "lending"
                            ? "from-emerald-500/0 via-green-500/5 to-emerald-500/0"
                            : "from-orange-500/0 via-red-500/5 to-orange-500/0"
                        } opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                      ></div>
                    </div>
                  );
                })}

              {data.list.length === 0 && (
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

        <div className="lg:col-span-1">
          {selectedDebt ? (
            <div
              className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-emerald-100
             overflow-hidden sticky top-6 animate-in slide-in-from-right-4 duration-300"
            >
              <div
                className={`h-24 ${selectedDebt.type === "lending" ? "bg-gradient-to-br from-emerald-500 to-green-600" : "bg-gradient-to-br from-orange-500 to-red-600"} relative`}
              >
                <button
                  onClick={() => setSelectedDebt(null)}
                  className="absolute cursor-pointer top-4 right-4 p-2 bg-white/20 hover:bg-white/30 
                  rounded-full text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute -bottom-10 left-6">
                  <div
                    className={`w-20 h-20 rounded-2xl shadow-lg border-4 border-white flex items-center 
                    justify-center bg-white`}
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
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="text-xs text-gray-500 mb-1">
                      Tổng số tiền
                    </div>
                    <div className="font-bold text-gray-800">
                      {selectedDebt.total.toLocaleString("vi-VN")}
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="text-xs text-gray-500 mb-1">
                      Đã thanh toán
                    </div>
                    <div
                      className={`font-bold ${selectedDebt.type === "lending" ? "text-emerald-600" : "text-orange-600"}`}
                    >
                      {selectedDebt.paid.toLocaleString("vi-VN")}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
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

                <div className="grid grid-cols-2 gap-3 mb-8">
                  <button
                    onClick={() => {
                      setAction("nopayment");
                      setShowPayment(true);
                    }}
                    className="py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold
                   rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> Tạo khoản nợ
                  </button>
                  <button
                    onClick={() => {
                      setShowPayment(true);
                    }}
                    className={`py-2.5 px-4 text-white font-semibold rounded-xl text-sm transition-colors flex
                    cursor-pointer items-center justify-center gap-2 shadow-lg ${
                      selectedDebt.type === "lending"
                        ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200"
                        : "bg-orange-500 hover:bg-orange-600 shadow-orange-200"
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                    {selectedDebt.type === "lending" ? "Thu tiền" : "Trả nợ"}
                  </button>
                </div>

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
                              <p className="text-xs text-gray-400">
                                {parseISOToVN(t.date)}
                              </p>
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
            <div className="space-y-6 sticky top-6">
              <div className="bg-white rounded-3xl p-6 shadow-xl shadow-gray-200/50 border border-emerald-100">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  Đang hoạt động
                </h3>
                <div className="space-y-3">
                  {data.list.map((d: IDept) => (
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
                          {d.total > 1000000
                            ? `${d.total / 1000000}M`
                            : d.total}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <AddDept
        setShowAddDebtDialog={setShowAddDebtDialog}
        showAddDebtDialog={showAddDebtDialog}
      />
      <UpdateDept
        setShowPayment={setShowPayment}
        showPayment={showPayment}
        data={selectedDebt}
        action={action}
        setAction={setAction}
      />
    </div>
  );
};

export default DebtManagement;
