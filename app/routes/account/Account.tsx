import {
  ArrowDownLeft,
  ArrowUpRight,
  CheckCircle,
  Clock,
  Copy,
  Eye,
  EyeOff,
  MoreVertical,
  PieChartIcon,
  Plus,
  Search,
  Star,
  Trash2,
  TrendingDown,
  TrendingUp,
  Wallet,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { Account } from "~/Types/account";
import { formatCurrency, parseISOToVN } from "~/lib/format";
import {
  ACCOUNT_TYPE_COLORS,
  copyToClipboard,
  getTypeLabel,
} from "~/utils/acc";
import AddAccount from "./Add/AddAccount";
import AccountsPageSkeleton from "./accountSkeleton";
import DetailAcc from "./detailAccount";
import useAccount from "./useAccount";

const AccountsPage = () => {
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    null
  );
  const [showBalance, setShowBalance] = useState(true);
  const [copiedId, setCopiedId] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const { data, isLoading, deleteMutation } = useAccount();

  const renderCompactAccountCard = (account: Account) => (
    <div
      key={account._id}
      className="bg-white rounded-2xl border border-gray-200 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 group"
    >
      <div className="p-5">
        {/* Card Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-white">
              <img
                src={
                  account.icon ||
                  "https://img.pikbest.com/element_our/20230221/bg/ebab41b9c1ab9.png!w700wp"
                }
                className="w-10 h-10"
                alt=""
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-gray-800">{account.name}</h3>
                {account.isPrimary && (
                  <Star
                    className="w-4 h-4 text-amber-500"
                    fill="currentColor"
                  />
                )}
              </div>
              <p className="text-sm text-gray-500">
                {getTypeLabel(account.type)}
              </p>
            </div>
          </div>

          {/* Dropdown Menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() =>
                setOpenMenuId(openMenuId === account._id ? null : account._id)
              }
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <MoreVertical className="w-5 h-5 text-gray-400" />
            </button>

            {openMenuId === account._id && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-xl border border-gray-200 z-10 animate-menu-in">
                <button
                  onClick={() => {
                    setSelectedAccountId(account._id);
                    setOpenMenuId(null);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left transition-colors first:rounded-t-xl"
                >
                  <Eye className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Xem chi tiết
                  </span>
                </button>

                <button
                  onClick={() => {
                    deleteMutation.mutate(account._id as string);
                    setOpenMenuId(null);
                  }}
                  disabled={deleteMutation.isPending}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-left transition-colors last:rounded-b-xl border-t border-gray-100 disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-medium text-red-600">
                    {deleteMutation.isPending ? "Đang xóa..." : "Xóa tài khoản"}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Card Body */}
        <div className="space-y-3">
          <div>
            <p className="text-xs text-gray-500 mb-1">Số dư</p>
            <p
              className={`text-2xl font-bold ${account.balance >= 0 ? "text-gray-800" : "text-red-600"}`}
            >
              {showBalance ? formatCurrency(account.balance) : "••••••••"}
            </p>
          </div>

          {account.accountNumber && (
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <p className="text-sm text-gray-500 font-mono">
                {account.accountNumber}
              </p>
              <button
                onClick={() =>
                  copyToClipboard(account.accountNumber!, setCopiedId)
                }
                className="p-1.5 hover:bg-gray-100 rounded transition-colors"
              >
                {copiedId === account.accountNumber ? (
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            {account.change >= 0 ? (
              <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-50 rounded-lg">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-xs font-semibold text-emerald-600">
                  +{account.change}%
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-2 py-1 bg-red-50 rounded-lg">
                <TrendingDown className="w-3.5 h-3.5 text-red-600" />
                <span className="text-xs font-semibold text-red-600">
                  {account.change}%
                </span>
              </div>
            )}
            {account.lastTransaction && (
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Clock className="w-3.5 h-3.5" />
                <span>{parseISOToVN(account.lastTransaction)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (isLoading) return <AccountsPageSkeleton />;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      {/* ── Header ── */}
      <div className="flex flex-col gap-4">
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
              <span className="hidden sm:inline">
                {showBalance ? "Ẩn số dư" : "Hiện số dư"}
              </span>
            </button>
            <button
              onClick={() => setShowAddDialog(true)}
              className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-4 py-2.5 rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 font-medium transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm mới</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Overview Stats ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10">
            <Wallet className="w-24 h-24" />
          </div>
          <div className="relative z-10">
            <p className="text-emerald-100 text-sm font-medium mb-1">
              Tổng tài sản
            </p>
            <p className="text-3xl font-black mb-2">
              {showBalance
                ? formatCurrency(data?.summary.totalAssets)
                : "•••••"}
            </p>
            <div className="flex items-center gap-1 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>
                {data?.summary.monthlyChangePercent >= 0 ? "+" : ""}
                {data?.summary.monthlyChangePercent}% tháng này
              </span>
            </div>
          </div>
        </div>

        {[
          {
            icon: <ArrowDownLeft className="w-5 h-5 text-emerald-600" />,
            bg: "bg-emerald-100",
            label: "Tiền vào",
            value: data?.summary.monthlyIncome,
            color: "text-emerald-600",
            hover: "hover:border-emerald-500 hover:shadow-emerald-500/10",
          },
          {
            icon: <ArrowUpRight className="w-5 h-5 text-orange-600" />,
            bg: "bg-orange-100",
            label: "Tiền ra",
            value: data?.summary.monthlyExpense,
            color: "text-orange-600",
            hover: "hover:border-orange-500 hover:shadow-orange-500/10",
          },
        ].map(({ icon, bg, label, value, color, hover }) => (
          <div
            key={label}
            className={`bg-white rounded-2xl p-6 border border-gray-200 ${hover} hover:shadow-lg transition-all`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2.5 ${bg} rounded-xl`}>{icon}</div>
              <p className="text-gray-600 font-medium">{label}</p>
            </div>
            <p className={`text-2xl font-bold ${color} mb-1`}>
              {showBalance ? formatCurrency(value) : "•••••"}
            </p>
            <p className="text-sm text-gray-500">Tháng này</p>
          </div>
        ))}

        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-amber-100 rounded-xl">
              <Zap className="w-5 h-5 text-amber-600" />
            </div>
            <p className="text-gray-600 font-medium">Giao dịch</p>
          </div>
          <p className="text-2xl font-bold text-gray-800 mb-1">
            {data?.summary.totalTransactions}
          </p>
          <p className="text-sm text-gray-500">Tháng này</p>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Account List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">
              Danh sách tài khoản
              <span className="text-sm font-normal text-gray-500 ml-2">
                ({data?.accounts.length} tài khoản)
              </span>
            </h2>
          </div>

          {data?.accounts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-600 font-medium mb-1">
                Không tìm thấy tài khoản
              </p>
              <p className="text-sm text-gray-500">
                Thử tìm kiếm với từ khóa khác hoặc thay đổi bộ lọc
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data?.accounts?.map(renderCompactAccountCard)}
            </div>
          )}
        </div>

        {/* Asset Distribution */}
        <div className="space-y-6 mt-10">
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <PieChartIcon className="w-5 h-5 text-emerald-600" />
              Phân bổ tài sản
            </h3>

            {!data?.assetDistribution?.length ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <PieChartIcon className="w-10 h-10 text-gray-300 mb-3" />
                <p className="text-gray-500 font-medium">
                  Chưa có dữ liệu tài sản
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Thêm tài khoản để xem phân bổ tài sản
                </p>
              </div>
            ) : (
              <>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={data.assetDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="totalBalance"
                    >
                      {data.assetDistribution.map(
                        (entry: any, index: number) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={ACCOUNT_TYPE_COLORS[entry.type] ?? "#94a3b8"}
                          />
                        )
                      )}
                    </Pie>
                    <Tooltip
                      formatter={(value: any, _name, props) => [
                        formatCurrency(value) + " đ",
                        getTypeLabel(props.payload?.type),
                      ]}
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: "12px",
                        padding: "8px 12px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 mt-4">
                  {data.assetDistribution.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor:
                              ACCOUNT_TYPE_COLORS[item.type] ?? "#94a3b8",
                          }}
                        />
                        <span className="text-gray-700">
                          {getTypeLabel(item.type)}
                        </span>
                      </div>
                      <span className="font-semibold text-gray-800">
                        {item.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <AddAccount onOpenChange={setShowAddDialog} open={showAddDialog} />
      <DetailAcc
        selectedAccountId={selectedAccountId}
        setSelectedAccountId={setSelectedAccountId}
      />
    </div>
  );
};

export default AccountsPage;
