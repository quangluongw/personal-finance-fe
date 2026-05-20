import { useQuery } from "@tanstack/react-query";
import {
  CheckCircle,
  Clock,
  Copy,
  DollarSign,
  Loader2,
  Star,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { detailAccount } from "~/Services/account.service";
import { formatCurrency, parseISOToVN } from "~/lib/format";
import { Dialog, DialogContent, DialogTitle } from "~/ui/dialog";
import {
  getTypeLabel,
  copyToClipboard
} from "~/utils/acc";
// ─── Chart Tooltip style ──────────────────────────────────────────────────────
const tooltipStyle = {
  backgroundColor: "white",
  border: "1px solid #e5e7eb",
  borderRadius: "12px",
};

// ─── Component ────────────────────────────────────────────────────────────────
const DetailAcc = ({
  selectedAccountId,
  setSelectedAccountId,
}: {
  selectedAccountId: string | null;
  setSelectedAccountId: (id: string | null) => void;
}) => {
  const [copiedId, setCopiedId] = useState("");

  const { data: detailAcc, isLoading } = useQuery({
    queryKey: ["account", selectedAccountId],
    queryFn: () => detailAccount(selectedAccountId!),
    enabled: !!selectedAccountId,
  });

  return (
    <Dialog
      open={!!selectedAccountId}
      onOpenChange={(open) => !open && setSelectedAccountId(null)}
    >
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl border-emerald-100">
        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
          </div>
        ) : detailAcc ? (
          <>
            {/* ── Header ── */}
            <div className="h-32 -mx-6 -mt-6 mb-6 bg-gradient-to-br from-emerald-500 to-teal-600 relative overflow-hidden ">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
              <div className="relative p-6 text-white flex items-center justify-between h-full">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      className="w-8 h-8 rounded-lg object-cover"
                      src={
                        detailAcc.account.icon ||
                        "https://img.pikbest.com/element_our/20230221/bg/ebab41b9c1ab9.png!w700wp"
                      }
                      alt=""
                    />
                    <span className="text-sm font-medium opacity-90">
                      {getTypeLabel(detailAcc.account.type)}
                    </span>
                    {detailAcc.account.isPrimary && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-400/30 backdrop-blur-md rounded-full text-xs font-semibold">
                        <Star className="w-3 h-3" fill="currentColor" />
                        Tài khoản chính
                      </span>
                    )}
                  </div>
                  <DialogTitle className="text-3xl font-bold text-white mb-1">
                    {detailAcc.account.name}
                  </DialogTitle>
                  {detailAcc.account.accountNumber && (
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-white/90">
                        {detailAcc.account.accountNumber}
                      </span>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            detailAcc.account.accountNumber!,
                            setCopiedId
                          )
                        }
                        className="p-1 hover:bg-white/20 rounded transition-colors"
                      >
                        {copiedId === detailAcc.account.accountNumber ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-white/80 text-sm mb-1">Số dư hiện tại</p>
                  <p className="text-4xl font-black">
                    {formatCurrency(detailAcc.account.balance)}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* ── Statistics ── */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  {
                    label: "Tổng thu",
                    value: formatCurrency(detailAcc.summary.total_income),
                    color: "text-emerald-600",
                    bg: "from-emerald-50 to-green-50 border-emerald-200",
                  },
                  {
                    label: "Tổng chi",
                    value: formatCurrency(detailAcc.summary.total_expense),
                    color: "text-orange-600",
                    bg: "from-orange-50 to-red-50 border-orange-200",
                  },
                  {
                    label: "TB/tháng",
                    value: formatCurrency(detailAcc.summary.monthly_average),
                    color: "text-blue-600",
                    bg: "from-blue-50 to-indigo-50 border-blue-200",
                  },
                  {
                    label: "Giao dịch",
                    value: detailAcc.summary.total_transactions,
                    color: "text-purple-600",
                    bg: "from-purple-50 to-pink-50 border-purple-200",
                  },
                ].map(({ label, value, color, bg }) => (
                  <div
                    key={label}
                    className={`p-4 bg-gradient-to-br ${bg} rounded-2xl border`}
                  >
                    <p className="text-sm text-gray-600 mb-1">{label}</p>
                    <p className={`text-2xl font-bold ${color}`}>{value}</p>
                  </div>
                ))}
              </div>

              {/* ── Charts ── */}
              <div className=" gap-6">
                {/* Xu hướng 6 tháng */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                    Xu hướng 6 tháng
                  </h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={detailAcc.charts.trend_6_months}>
                      <defs>
                        <linearGradient
                          id="colorBalance"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#10b981"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#10b981"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis
                        dataKey="month"
                        stroke="#9ca3af"
                        style={{ fontSize: "12px" }}
                      />
                      <YAxis
                        stroke="#9ca3af"
                        style={{ fontSize: "12px" }}
                        tickFormatter={formatCurrency}
                      />
                      <Tooltip
                        contentStyle={tooltipStyle}
                        formatter={(value: any) => [
                          formatCurrency(value),
                          "Số dư",
                        ]}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#10b981"
                        strokeWidth={2}
                        fill="url(#colorBalance)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Thu chi theo tháng */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                    Thu chi theo tháng
                  </h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={detailAcc.charts.income_expense_monthly}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis
                        dataKey="month"
                        stroke="#9ca3af"
                        style={{ fontSize: "12px" }}
                      />
                      <YAxis
                        stroke="#9ca3af"
                        style={{ fontSize: "12px" }}
                        tickFormatter={formatCurrency}
                      />
                      <Tooltip
                        contentStyle={tooltipStyle}
                        formatter={(value: any, name: any) => [
                          formatCurrency(value),
                          name === "income" ? "Thu" : "Chi",
                        ]}
                      />
                      <Bar
                        dataKey="income"
                        fill="#10b981"
                        radius={[8, 8, 0, 0]}
                      />
                      <Bar
                        dataKey="expense"
                        fill="#f97316"
                        radius={[8, 8, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* ── Recent Transactions ── */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-600" />
                  Giao dịch gần đây
                </h3>
                <div className="space-y-3">
                  {detailAcc.recent_transactions.length === 0 ? (
                    <p className="text-center text-gray-400 py-4">
                      Chưa có giao dịch nào
                    </p>
                  ) : (
                    detailAcc.recent_transactions.map((tx: any) => {
                      const isIncome = tx.type === "income";
                      return (
                        <div
                          key={tx.id}
                          className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-xl ${isIncome ? "bg-emerald-100" : "bg-orange-100"}`}
                            >
                              {isIncome ? (
                                <TrendingUp className="w-4 h-4 text-emerald-600" />
                              ) : (
                                <TrendingDown className="w-4 h-4 text-orange-600" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-800 text-sm">
                                {tx.description}
                              </p>
                              <p className="text-xs text-gray-400">
                                {parseISOToVN(tx.createdAt)}
                              </p>
                            </div>
                          </div>
                          <p
                            className={`font-bold text-sm ${isIncome ? "text-emerald-600" : "text-orange-600"}`}
                          >
                            {isIncome ? "+" : "-"}
                            {formatCurrency(tx.amount)}
                          </p>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default DetailAcc;
