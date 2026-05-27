// AdvancedCategoryChart.tsx
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

// Màu mặc định xoay vòng cho các category
const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
  "#06b6d4",
  "#f97316",
  "#6b7280",
  "#14b8a6",
  "#ef4444",
];

interface CategoryItem {
  categoryId: string;
  categoryName: string;
  total: number;
}

interface AdvancedCategoryChartProps {
  data: CategoryItem[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-xl shadow-xl border border-gray-200">
        <p className="font-semibold text-gray-900 mb-2">{payload[0].name}</p>
        <p className="text-sm text-gray-600">
          Số tiền:{" "}
          <span className="font-semibold text-gray-900">
            {payload[0].value.toLocaleString("vi-VN")} đ
          </span>
        </p>
        <p className="text-sm text-gray-600">
          Tỷ lệ:{" "}
          <span className="font-semibold text-gray-900">
            {payload[0].payload.percent}%
          </span>
        </p>
      </div>
    );
  }
  return null;
};

export function AdvancedCategoryChart({
  data = [],
}: AdvancedCategoryChartProps) {
  const total = data.reduce((sum, item) => sum + item.total, 0);

  // Chuyển sang format cho recharts, tính % và gán màu
  const chartData = data.map((item, index) => ({
    name: item.categoryName,
    value: item.total,
    color: COLORS[index % COLORS.length],
    percent: total > 0 ? Math.round((item.total / total) * 1000) / 10 : 0,
    // Không có change từ API nên bỏ qua hoặc ẩn
  }));

  if (data.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-7 shadow-xl border border-emerald-100/50 flex flex-col items-center justify-center min-h-[400px]">
        <div className="text-6xl mb-4">📊</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Chi Tiêu Theo Danh Mục
        </h3>
        <p className="text-gray-500 text-sm text-center">
          Chưa có chi tiêu nào trong kỳ này
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-7 shadow-xl border border-emerald-100/50">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900">
          Chi Tiêu Theo Danh Mục
        </h3>
        <p className="text-sm text-gray-500 mt-1.5">
          Phân bổ ngân sách tháng này
        </p>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Total in center */}
      <div className="text-center -mt-44 mb-32 pointer-events-none">
        <p className="text-sm text-gray-600 font-medium">Tổng chi tiêu</p>
        <p className="text-2xl font-bold text-gray-900">
          {total >= 1_000_000
            ? `${(total / 1_000_000).toFixed(1)}M`
            : total.toLocaleString("vi-VN")}
        </p>
      </div>

      {/* Category List */}
      <div className="space-y-3">
        {chartData.map((category, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3 flex-1">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: category.color }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {category.name}
                </p>
                <p className="text-xs text-gray-500">
                  {category.percent}% tổng chi tiêu
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">
                {category.value >= 1_000_000
                  ? `${(category.value / 1_000_000).toFixed(1)}M`
                  : category.value.toLocaleString("vi-VN")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
