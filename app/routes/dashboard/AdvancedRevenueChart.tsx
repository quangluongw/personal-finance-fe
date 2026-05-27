// AdvancedRevenueChart.tsx
import { TrendingUp } from "lucide-react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ChartItem {
  label: string;
  income: number;
  expense: number;
}

interface AdvancedRevenueChartProps {
  data: ChartItem[];
  totalIncome: number;
  totalExpense: number;
  totalSaving: number;
  onViewChange: (view: "week" | "month" | "year") => void;
  currentView: "week" | "month" | "year";
}

export function AdvancedRevenueChart({
  data = [],
  totalIncome = 0,
  totalExpense = 0,
  totalSaving = 0,
  onViewChange,
  currentView = "month",
}: AdvancedRevenueChartProps) {
  const [chartType, setChartType] = useState<"area" | "bar">("area");

  const enrichedData = data.map((item) => ({
    ...item,
    saving: Math.max(0, item.income - item.expense),
  }));

  const VIEW_TABS: { key: "week" | "month" | "year"; label: string }[] = [
    { key: "week", label: "Tuần" },
    { key: "month", label: "Tháng" },
    { key: "year", label: "Năm" },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-7 shadow-xl border border-emerald-100/50">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-emerald-600" />
            Biểu Đồ Thu Chi
          </h3>
          <p className="text-sm text-gray-500 mt-1.5">
            Theo dõi dòng tiền của bạn
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {/* Tuần / Tháng / Năm – luôn hiển thị, gọi API khi đổi */}
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-1.5 flex gap-1 shadow-inner justify-between">
            {VIEW_TABS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => onViewChange(key)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  currentView === key
                    ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg shadow-emerald-500/30"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Diện tích / Cột */}
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-1.5 flex gap-1 shadow-inner max-w-[200px]">
            <button
              onClick={() => setChartType("area")}
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                chartType === "area"
                  ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg shadow-emerald-500/30"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Diện tích
            </button>
            <button
              onClick={() => setChartType("bar")}
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                chartType === "bar"
                  ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg shadow-emerald-500/30"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Cột
            </button>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        {chartType === "area" ? (
          <AreaChart data={enrichedData} key="area-chart">
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorSaving" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="label"
              stroke="#6b7280"
              style={{ fontSize: "12px" }}
            />
            <YAxis
              stroke="#6b7280"
              tickFormatter={(v) => `${(v / 1_000_000).toFixed(0)}M`}
              style={{ fontSize: "12px" }}
            />
            <Tooltip
              formatter={(value: any, name: any) => [
                `${Number(value).toLocaleString("vi-VN")} đ`,
                name === "income"
                  ? "Thu nhập"
                  : name === "expense"
                    ? "Chi tiêu"
                    : "Tiết kiệm",
              ]}
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
              }}
            />
            <Legend
              formatter={(v) =>
                v === "income"
                  ? "Thu nhập"
                  : v === "expense"
                    ? "Chi tiêu"
                    : "Tiết kiệm"
              }
              wrapperStyle={{ fontSize: "14px" }}
            />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#10b981"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorIncome)"
              name="income"
            />
            <Area
              type="monotone"
              dataKey="expense"
              stroke="#ef4444"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorExpense)"
              name="expense"
            />
            <Area
              type="monotone"
              dataKey="saving"
              stroke="#3b82f6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorSaving)"
              name="saving"
            />
          </AreaChart>
        ) : (
          <BarChart data={enrichedData} key="bar-chart">
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="label"
              stroke="#6b7280"
              style={{ fontSize: "12px" }}
            />
            <YAxis
              stroke="#6b7280"
              tickFormatter={(v) => `${(v / 1_000_000).toFixed(0)}M`}
              style={{ fontSize: "12px" }}
            />
            <Tooltip
              formatter={(value: any, name: any) => [
                `${Number(value).toLocaleString("vi-VN")} đ`,
                name === "income"
                  ? "Thu nhập"
                  : name === "expense"
                    ? "Chi tiêu"
                    : "Tiết kiệm",
              ]}
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
              }}
            />
            <Legend
              formatter={(v) =>
                v === "income"
                  ? "Thu nhập"
                  : v === "expense"
                    ? "Chi tiêu"
                    : "Tiết kiệm"
              }
              wrapperStyle={{ fontSize: "14px" }}
            />
            <Bar
              dataKey="income"
              fill="#10b981"
              radius={[8, 8, 0, 0]}
              name="income"
            />
            <Bar
              dataKey="expense"
              fill="#ef4444"
              radius={[8, 8, 0, 0]}
              name="expense"
            />
            <Bar
              dataKey="saving"
              fill="#3b82f6"
              radius={[8, 8, 0, 0]}
              name="saving"
            />
          </BarChart>
        )}
      </ResponsiveContainer>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-emerald-100">
        <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50">
          <p className="text-sm text-gray-600 mb-1 font-medium">
            Tổng thu nhập
          </p>
          <p className="text-xl font-bold text-green-600">
            {totalIncome.toLocaleString("vi-VN")} đ
          </p>
        </div>
        <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50">
          <p className="text-sm text-gray-600 mb-1 font-medium">
            Tổng chi tiêu
          </p>
          <p className="text-xl font-bold text-orange-600">
            {totalExpense.toLocaleString("vi-VN")} đ
          </p>
        </div>
        <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50">
          <p className="text-sm text-gray-600 mb-1 font-medium">
            Tổng tiết kiệm
          </p>
          <p className="text-xl font-bold text-teal-600">
            {totalSaving.toLocaleString("vi-VN")} đ
          </p>
        </div>
      </div>
    </div>
  );
}
