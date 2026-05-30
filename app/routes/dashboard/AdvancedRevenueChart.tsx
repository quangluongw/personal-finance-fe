import { TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DateNavigator } from "./DateNavigator";
import type { ViewType } from "./useDashboard";

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
  currentView: ViewType;
  offset: number;
  onViewChange: (view: ViewType) => void;
  onOffsetChange: (offset: number) => void;
}

const VIEW_TABS: { key: ViewType; label: string }[] = [
  { key: "week", label: "Tuần" },
  { key: "month", label: "Tháng" },
  { key: "year", label: "Năm" },
];

const formatLabel = (name: string) =>
  name === "income"
    ? "Thu nhập"
    : name === "expense"
      ? "Chi tiêu"
      : "Tiết kiệm";

export function AdvancedRevenueChart({
  data = [],
  totalIncome = 0,
  totalExpense = 0,
  totalSaving = 0,
  currentView = "month",
  offset,
  onViewChange,
  onOffsetChange,
}: AdvancedRevenueChartProps) {
  const enrichedData = data.map((item) => ({
    ...item,
    saving: Math.max(0, item.income - item.expense),
  }));

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-7 shadow-xl border border-emerald-100/50">
      <div className="gap-4 mb-6">
        <div className="mb-3">
          <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-emerald-600" />
            Biểu Đồ Thu Chi
          </h3>
          <p className="text-sm text-gray-500 mt-1.5">
            Theo dõi dòng tiền của bạn
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 justify-between">
          <DateNavigator
            currentView={currentView}
            offset={offset}
            onOffsetChange={onOffsetChange}
          />

          <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-1.5 flex gap-1 shadow-inner">
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
        </div>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={enrichedData}>
          <defs>
            {[
              { id: "colorIncome", color: "#10b981" },
              { id: "colorExpense", color: "#ef4444" },
              { id: "colorSaving", color: "#3b82f6" },
            ].map(({ id, color }) => (
              <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.4} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            ))}
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
              formatLabel(name),
            ]}
            contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb" }}
          />
          <Legend formatter={formatLabel} wrapperStyle={{ fontSize: "14px" }} />
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
      </ResponsiveContainer>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-emerald-100">
        {[
          {
            label: "Tổng thu nhập",
            value: totalIncome,
            color: "text-green-600",
            bg: "from-green-50 to-emerald-50",
          },
          {
            label: "Tổng chi tiêu",
            value: totalExpense,
            color: "text-orange-600",
            bg: "from-orange-50 to-amber-50",
          },
          {
            label: "Tổng tiết kiệm",
            value: totalSaving,
            color: "text-teal-600",
            bg: "from-teal-50 to-cyan-50",
          },
        ].map(({ label, value, color, bg }) => (
          <div
            key={label}
            className={`text-center p-4 rounded-2xl bg-gradient-to-br ${bg}`}
          >
            <p className="text-sm text-gray-600 mb-1 font-medium">{label}</p>
            <p className={`text-xl font-bold ${color}`}>
              {value.toLocaleString("vi-VN")} đ
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
