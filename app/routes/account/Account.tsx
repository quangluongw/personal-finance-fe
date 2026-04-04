import {
  ArrowDownLeft,
  ArrowRight,
  ArrowUpRight,
  Building,
  DollarSign,
  Eye,
  EyeOff,
  Landmark,
  MoreVertical,
  Plus,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Wallet,
  Zap,
} from "lucide-react";
import { useState } from "react";
import useAccount from "./useAccount";
import { formatCurrency } from "~/lib/format";
import type { Account } from "~/Types/account";
import AccountsPageSkeleton from "./accountSkeleton";

const AccountsPage = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const { data, isLoading } = useAccount();

  return isLoading ? (
    AccountsPageSkeleton
  ) : (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <Wallet className="w-8 h-8 text-emerald-600" />
            Tài Khoản
          </h1>
          <p className="text-gray-500 mt-1">
            Quản lý tất cả tài khoản và ví tiền của bạn
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="bg-white border border-gray-200 text-gray-600 px-4 py-2.5 rounded-xl hover:bg-gray-50 font-medium transition-colors flex items-center gap-2 shadow-sm"
          >
            {showBalance ? (
              <Eye className="w-4 h-4" />
            ) : (
              <EyeOff className="w-4 h-4" />
            )}
            <span>{showBalance ? "Ẩn số dư" : "Hiện số dư"}</span>
          </button>
          <button className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition-all duration-300 font-medium flex items-center gap-2">
            <Plus className="w-5 h-5" />
            <span>Thêm tài khoản</span>
          </button>
        </div>
      </div>

      {/* Total Balance Card - Enhanced */}
      <div className="bg-gradient-to-br from-emerald-500 via-green-600 to-teal-600 rounded-3xl p-8 text-white shadow-2xl shadow-emerald-500/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10">
          <Sparkles className="w-64 h-64 animate-pulse" />
        </div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                  <Wallet className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-emerald-100 font-medium">Tổng tài sản</p>
                  <p className="text-xs text-emerald-200">
                    Cập nhật lúc
                    {data?.summary?.updatedAt}
                  </p>
                </div>
              </div>
              <h2 className="text-6xl font-black mb-2">
                {showBalance
                  ? `${data?.summary?.totalAssets.toLocaleString("vi-VN")}`
                  : "•••••••••"}
                <span className="text-3xl ml-2">đ</span>
              </h2>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 bg-white/20 rounded-full backdrop-blur-md">
                  <span className="text-sm font-semibold">
                    {data?.summary?.totalAccounts} tài khoản
                  </span>
                </div>
                <div className="flex items-center gap-1 px-3 py-1 bg-emerald-400/30 rounded-full backdrop-blur-md">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-semibold">
                    {data?.summary?.monthlyChangePercent}% tháng này
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-6 border-t border-white/20">
            <div className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-md rounded-2xl">
              <div className="p-2.5 bg-white/20 rounded-xl">
                <ArrowUpRight className="w-6 h-6" />
              </div>
              <div>
                <p className="text-emerald-100 text-sm mb-0.5">
                  Thu nhập tháng này
                </p>
                <p className="text-2xl font-bold">
                  {formatCurrency(data?.summary?.monthlyIncome)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-md rounded-2xl">
              <div className="p-2.5 bg-white/20 rounded-xl">
                <ArrowDownLeft className="w-6 h-6" />
              </div>
              <div>
                <p className="text-emerald-100 text-sm mb-0.5">
                  Chi tiêu tháng này
                </p>
                <p className="text-2xl font-bold">
                  {formatCurrency(data?.summary?.monthlyExpense)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-md rounded-2xl">
              <div className="p-2.5 bg-white/20 rounded-xl">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <p className="text-emerald-100 text-sm mb-0.5">Tiết kiệm</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(data?.summary?.monthlySaving)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-md rounded-2xl">
              <div className="p-2.5 bg-white/20 rounded-xl">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <p className="text-emerald-100 text-sm mb-0.5">Giao dịch</p>
                <p className="text-2xl font-bold">
                  {data?.summary?.totalTransactions}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bank Accounts */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Landmark className="w-6 h-6 text-emerald-600" />
            Tài khoản ngân hàng
          </h2>
          <span className="text-sm text-gray-500">
            {data?.summary?.totalAccounts} tài khoản
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.accounts?.map((account: Account) => (
            <div
              key={account._id}
              // onClick={() => setSelectedAccount(account)}
              className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-emerald-100 overflow-hidden group hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div
                className={`h-40 bg-gradient-to-br from-blue-600 to-blue-700 relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                <div className="absolute top-0 right-0 opacity-10 group-hover:scale-110 transition-transform duration-500">
                  <Building className="w-32 h-32" />
                </div>
                <div className="relative p-6 text-white h-full flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
                        <Building className="w-5 h-5" />
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedAccount(account);
                      }}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">
                      {account.bankName}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-1">Số dư hiện tại</p>
                  <p
                    className={`text-3xl font-bold ${account.balance >= 0 ? "text-gray-800" : "text-red-600"}`}
                  >
                    {showBalance
                      ? `${account.balance.toLocaleString("vi-VN")} đ`
                      : "••••••••"}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    {account.monthlyChange >= 0 ? (
                      <>
                        <div className="p-1.5 bg-emerald-100 rounded-lg">
                          <TrendingUp className="w-4 h-4 text-emerald-600" />
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-emerald-600">
                            +{account.monthlyChange}%
                          </span>
                          <span className="text-xs text-gray-500 ml-1">
                            Tháng này
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="p-1.5 bg-red-100 rounded-lg">
                          <TrendingDown className="w-4 h-4 text-red-600" />
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-red-600">
                            {account.monthlyChange}%
                          </span>
                          <span className="text-xs text-gray-500 ml-1">
                            Tháng này
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Account Detail Modal */}
    </div>
  );
};
export default AccountsPage;
