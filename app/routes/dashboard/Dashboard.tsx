// Dashboard.tsx
import { PiggyBank, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { useState } from "react";
import { AdvancedStatCard } from "./AdvancedStatCard";
import { AdvancedRevenueChart } from "./AdvancedRevenueChart";
import { AdvancedCategoryChart } from "./AdvancedCategoryChart";
import { AdvancedTransactionList } from "./AdvancedTransactionList";
import { SavingsGoals } from "./SavingsGoals";
import { DashboardSkeleton } from "./DashboardSkeleton";
import useDashboard, { type ViewType } from "./useDashboard";
import { formatCurrency } from "~/lib/format";

export function meta() {
  return [{ title: "Thống kê" }];
}

function buildMiniChart(
  chart: { income: number; expense: number }[],
  key: "income" | "expense" | "saving"
): number[] {
  if (!chart || chart.length === 0) return [0];
  return chart.map((c) =>
    key === "saving" ? Math.max(0, c.income - c.expense) : (c[key] ?? 0)
  );
}

export default function Dashboard() {
  const [view, setView] = useState<ViewType>("month");
  const [offset, setOffset] = useState(0);
  const { data, isLoading } = useDashboard(view, offset);
  const handleViewChange = (v: ViewType) => {
    setView(v);
    setOffset(0); // reset về kỳ hiện tại khi đổi loại
  };

  if (isLoading || !data) {
    return <DashboardSkeleton />;
  }

  const {
    summary,
    chart,
    expenseByCategory,
    recentTransactions,
    savingsGoals,
  } = data;
  const saving = summary.income - summary.expense;

  return (
    <div className="flex flex-col gap-8">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AdvancedStatCard
          title="Tổng Số Dư"
          value={formatCurrency(summary.balance)}
          change={12.5}
          icon={Wallet}
          gradient="from-emerald-600 via-green-600 to-teal-600"
          chartData={buildMiniChart(chart, "income")}
          tooltip="Tổng số dư = Thu nhập - Chi tiêu trong kỳ được chọn"
        />
        <AdvancedStatCard
          title="Thu Nhập"
          value={formatCurrency(summary.income)}
          change={8.2}
          icon={TrendingUp}
          gradient="from-green-600 via-emerald-600 to-green-600"
          chartData={buildMiniChart(chart, "income")}
          tooltip="Tổng thu nhập trong kỳ này"
        />
        <AdvancedStatCard
          title="Chi Tiêu"
          value={formatCurrency(summary.expense)}
          change={-3.1}
          icon={TrendingDown}
          gradient="from-orange-500 via-amber-500 to-yellow-500"
          chartData={buildMiniChart(chart, "expense")}
          tooltip="Tổng chi tiêu trong kỳ này"
        />
        <AdvancedStatCard
          title="Tiết Kiệm"
          value={formatCurrency(saving)}
          change={15.8}
          icon={PiggyBank}
          gradient="from-teal-600 via-cyan-600 to-emerald-600"
          chartData={buildMiniChart(chart, "saving")}
          tooltip="Tiết kiệm = Thu nhập - Chi tiêu"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <AdvancedRevenueChart
            data={data?.chart ?? []}
            totalIncome={data?.summary.income ?? 0}
            totalExpense={data?.summary.expense ?? 0}
            totalSaving={data?.summary.balance ?? 0}
            currentView={view}
            offset={offset}
            onViewChange={handleViewChange}
            onOffsetChange={setOffset}
          />
        </div>
        <div className="lg:col-span-1">
          <AdvancedCategoryChart data={expenseByCategory} />
        </div>
      </div>

      {/* Transactions + Savings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <AdvancedTransactionList transactions={recentTransactions} />
        </div>
        <div className="lg:col-span-1">
          <SavingsGoals goals={savingsGoals} />
        </div>
      </div>

      <div className="h-8" />
    </div>
  );
}
