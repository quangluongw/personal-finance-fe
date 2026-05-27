// AdvancedTransactionList.tsx
import {
  ArrowUpRight,
  Car,
  Coffee,
  Gamepad2,
  Home,
  MoreHorizontal,
  Search,
  ShoppingBag,
} from "lucide-react";
import { useState } from "react";
import { parseISOToVN } from "~/lib/format";

interface Transaction {
  _id: string;
  transactionType: "income" | "expense";
  amount: number;
  description: string;
  category: { _id: string; name: string } | null;
  account: { _id: string; name: string } | null;
  createdAt: string;
  updatedAt: string;
}

interface AdvancedTransactionListProps {
  transactions: Transaction[];
}

// Map tên category sang icon (fallback MoreHorizontal)
const getCategoryIcon = (categoryName?: string) => {
  const name = (categoryName || "").toLowerCase();
  if (name.includes("nhà") || name.includes("thuê")) return Home;
  if (name.includes("mua sắm") || name.includes("siêu thị")) return ShoppingBag;
  if (name.includes("đi lại") || name.includes("xe") || name.includes("xăng"))
    return Car;
  if (name.includes("ăn") || name.includes("cafe") || name.includes("cà phê"))
    return Coffee;
  if (name.includes("giải trí") || name.includes("game")) return Gamepad2;
  if (
    name.includes("thu nhập") ||
    name.includes("lương") ||
    name.includes("thưởng")
  )
    return ArrowUpRight;
  return MoreHorizontal;
};


  

export function AdvancedTransactionList({
  transactions = [],
}: AdvancedTransactionListProps) {
  const [filter, setFilter] = useState<"all" | "income" | "expense">("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = transactions.filter((t) => {
    const matchesFilter = filter === "all" || t.transactionType === filter;
    const matchesSearch =
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.category?.name || "").toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-emerald-100/50 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-emerald-100 bg-gradient-to-r from-emerald-50 to-green-50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              Giao Dịch Gần Đây
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {filtered.length} giao dịch
            </p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm giao dịch..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-emerald-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm"
            />
          </div>
          <div className="flex gap-2">
            {(["all", "income", "expense"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                  filter === f
                    ? f === "all"
                      ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg shadow-emerald-500/30"
                      : f === "income"
                        ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/30"
                        : "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg shadow-orange-500/30"
                    : "bg-white text-gray-600 border border-emerald-200 hover:border-emerald-400"
                }`}
              >
                {f === "all" ? "Tất cả" : f === "income" ? "Thu" : "Chi"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* List */}
      <div className="divide-y divide-emerald-100 max-h-[600px] overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <p className="text-4xl mb-3">📭</p>
            <p className="text-sm">Không có giao dịch nào</p>
          </div>
        ) : (
          filtered.map((tx) => {
            const Icon = getCategoryIcon(tx.category?.name);
            const isIncome = tx.transactionType === "income";
            const { date, time } = parseISOToVN(tx.createdAt);

            return (
              <div
                key={tx._id}
                className="p-4 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-50 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-xl transition-transform group-hover:scale-110 ${
                      isIncome
                        ? "bg-gradient-to-br from-green-100 to-green-50"
                        : "bg-gradient-to-br from-gray-100 to-gray-50"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${isIncome ? "text-green-600" : "text-gray-600"}`}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {tx.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      {tx.category && (
                        <span className="text-xs text-gray-500">
                          {tx.category.name}
                        </span>
                      )}
                      {tx.category && tx.account && (
                        <span className="text-xs text-gray-300">•</span>
                      )}
                      {tx.account && (
                        <span className="text-xs text-gray-500">
                          {tx.account.name}
                        </span>
                      )}
                      <span className="text-xs text-gray-300">•</span>
                      <span className="text-xs text-gray-500">
                        {date} {time}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div
                      className={`text-sm font-bold ${isIncome ? "text-green-600" : "text-red-600"}`}
                    >
                      {isIncome ? "+" : "-"}
                      {tx.amount.toLocaleString("vi-VN")} đ
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {isIncome ? "Tiền vào" : "Tiền ra"}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="p-5 border-t border-emerald-100 bg-gradient-to-r from-emerald-50/50 to-green-50/50">
        <button className="w-full text-sm text-emerald-600 font-bold hover:text-emerald-700 py-2 hover:scale-105 transition-transform duration-300">
          Xem tất cả {transactions.length} giao dịch →
        </button>
      </div>
    </div>
  );
}
