// AdvancedStatCard.tsx
import { Info, TrendingDown, TrendingUp, type LucideIcon } from "lucide-react";
import { useState } from "react";

interface AdvancedStatCardProps {
  title: string;
  value: string;
  change: number;
  icon: LucideIcon;
  gradient: string;
  chartData?: number[];
  tooltip?: string;
}

export function AdvancedStatCard({
  title,
  value,
  change,
  icon: Icon,
  gradient,
  tooltip,
}: AdvancedStatCardProps) {
  const isPositive = change >= 0;

  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${gradient} p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 group`}
    >
      {/* Animated background patterns */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white rounded-full -mr-24 -mt-24 group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white rounded-full -ml-20 -mb-20 group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white rounded-full opacity-30 blur-2xl group-hover:scale-125 transition-transform duration-700" />
      </div>

      {/* Shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-5">
          <div className="bg-white/25 backdrop-blur-xl p-3.5 rounded-2xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
            <Icon className="w-7 h-7 text-white drop-shadow-lg" />
          </div>
          <div className="flex items-center gap-1.5 px-4 py-2 rounded-full backdrop-blur-md shadow-lg bg-white/25">
            {isPositive ? (
              <TrendingUp className="w-4 h-4 text-white drop-shadow" />
            ) : (
              <TrendingDown className="w-4 h-4 text-white drop-shadow" />
            )}
            <span className="text-white text-sm font-bold drop-shadow">
              {isPositive ? "+" : ""}
              {change}%
            </span>
          </div>
        </div>

        <div className="space-y-2 mb-5">
          <div className="flex items-center gap-2">
            <p className="text-white/90 text-sm font-semibold drop-shadow">
              {title}
            </p>
            {tooltip && (
              <div className="relative">
                <button
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <Info className="w-4 h-4 drop-shadow" />
                </button>
                {showTooltip && (
                  <div className="absolute left-0 top-6 w-72 bg-gray-900/95 backdrop-blur-xl text-white text-xs p-4 rounded-2xl shadow-2xl z-20 border border-white/10">
                    {tooltip}
                    <div className="absolute -top-1 left-3 w-2 h-2 bg-gray-900/95 transform rotate-45" />
                  </div>
                )}
              </div>
            )}
          </div>
          <p className="text-white text-3xl font-bold drop-shadow-lg">
            {value}
          </p>
          <p className="text-white/70 text-xs font-medium drop-shadow">
            so với tháng trước
          </p>
        </div>
      </div>
    </div>
  );
}
