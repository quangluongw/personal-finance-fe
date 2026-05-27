// DashboardSkeleton.tsx
import React from "react";
// Hiển thị khi dashboard đang loading

function Shimmer({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-gray-200 rounded-xl ${className}`}
      style={style}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
    </div>
  );
}

function StatCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gray-200 p-6 shadow-xl">
      <div className="flex items-start justify-between mb-5">
        <Shimmer className="w-14 h-14 rounded-2xl bg-gray-300" />
        <Shimmer className="w-20 h-8 rounded-full bg-gray-300" />
      </div>
      <Shimmer className="w-24 h-4 mb-2 bg-gray-300" />
      <Shimmer className="w-32 h-8 mb-2 bg-gray-300" />
      <Shimmer className="w-28 h-3 mb-5 bg-gray-300" />
      <div className="flex items-end gap-1.5 h-14">
        {[60, 80, 70, 90, 75, 95, 85, 100].map((h, i) => (
          <Shimmer
            key={i}
            className="flex-1 rounded-t-lg bg-gray-300"
            style={{ height: `${h}%` } as any}
          />
        ))}
      </div>
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-7 shadow-xl border border-emerald-100/50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Shimmer className="w-44 h-7 mb-2" />
          <Shimmer className="w-36 h-4" />
        </div>
        <div className="flex gap-2">
          <Shimmer className="w-28 h-10 rounded-2xl" />
          <Shimmer className="w-28 h-10 rounded-2xl" />
        </div>
      </div>
      {/* Chart area */}
      <div className="relative h-[350px] flex items-end gap-2 px-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="flex-1 flex flex-col justify-end gap-1">
            <Shimmer
              className="w-full rounded-t-lg"
              style={{ height: `${40 + Math.random() * 50}%` } as any}
            />
          </div>
        ))}
      </div>
      {/* Summary row */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-emerald-100">
        {[1, 2, 3].map((i) => (
          <div key={i} className="text-center p-4 rounded-2xl bg-gray-50">
            <Shimmer className="w-24 h-4 mx-auto mb-2" />
            <Shimmer className="w-32 h-6 mx-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}

function PieSkeleton() {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-7 shadow-xl border border-emerald-100/50">
      <Shimmer className="w-40 h-7 mb-2" />
      <Shimmer className="w-52 h-4 mb-6" />
      {/* Pie placeholder */}
      <div className="flex justify-center mb-4">
        <Shimmer className="w-48 h-48 rounded-full" />
      </div>
      {/* List */}
      <div className="space-y-3 mt-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-3">
            <Shimmer className="w-3 h-3 rounded-full flex-shrink-0" />
            <div className="flex-1">
              <Shimmer className="w-20 h-4 mb-1" />
              <Shimmer className="w-28 h-3" />
            </div>
            <Shimmer className="w-12 h-4" />
          </div>
        ))}
      </div>
    </div>
  );
}

function TransactionSkeleton() {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-emerald-100/50 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-emerald-100 bg-gradient-to-r from-emerald-50 to-green-50">
        <div className="flex items-center justify-between mb-4">
          <div>
            <Shimmer className="w-44 h-7 mb-2" />
            <Shimmer className="w-24 h-4" />
          </div>
          <Shimmer className="w-36 h-10 rounded-2xl" />
        </div>
        <div className="flex gap-3">
          <Shimmer className="flex-1 h-11 rounded-2xl" />
          <Shimmer className="w-20 h-11 rounded-2xl" />
          <Shimmer className="w-16 h-11 rounded-2xl" />
          <Shimmer className="w-16 h-11 rounded-2xl" />
        </div>
      </div>
      {/* Rows */}
      <div className="divide-y divide-emerald-100">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="p-4 flex items-center gap-4">
            <Shimmer className="w-11 h-11 rounded-xl flex-shrink-0" />
            <div className="flex-1">
              <Shimmer className="w-40 h-4 mb-2" />
              <Shimmer className="w-52 h-3" />
            </div>
            <div className="text-right">
              <Shimmer className="w-28 h-4 mb-1 ml-auto" />
              <Shimmer className="w-14 h-3 ml-auto" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SavingsSkeleton() {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-7 shadow-xl border border-emerald-100/50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Shimmer className="w-44 h-7 mb-2" />
          <Shimmer className="w-52 h-4" />
        </div>
        <Shimmer className="w-11 h-11 rounded-2xl" />
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i}>
            <div className="p-4 rounded-2xl bg-gray-200 mb-3">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Shimmer className="w-10 h-10 rounded-full bg-gray-300" />
                  <div>
                    <Shimmer className="w-28 h-5 mb-1 bg-gray-300" />
                    <Shimmer className="w-24 h-3 bg-gray-300" />
                  </div>
                </div>
                <Shimmer className="w-12 h-8 bg-gray-300" />
              </div>
              <Shimmer className="w-full h-2.5 rounded-full bg-gray-300 my-2" />
              <div className="flex justify-between">
                <Shimmer className="w-24 h-3 bg-gray-300" />
                <Shimmer className="w-24 h-3 bg-gray-300" />
              </div>
            </div>
            <Shimmer className="w-full h-9 rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-8 animate-pulse">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ChartSkeleton />
        </div>
        <div className="lg:col-span-1">
          <PieSkeleton />
        </div>
      </div>

      {/* Transactions + Savings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <TransactionSkeleton />
        </div>
        <div className="lg:col-span-1">
          <SavingsSkeleton />
        </div>
      </div>

      <div className="h-8" />
    </div>
  );
}
