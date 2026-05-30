// SavingsGoals.tsx
import { Calendar, Target, TrendingUp } from "lucide-react";

// Màu gradient xoay vòng cho các goal
const GRADIENTS = [
  "from-blue-500 to-blue-600",
  "from-pink-500 to-pink-600",
  "from-purple-500 to-purple-600",
  "from-green-500 to-green-600",
  "from-orange-500 to-orange-600",
  "from-teal-500 to-teal-600",
];

const EMOJIS = ["🎯", "✈️", "💻", "🏦", "🚗", "🏠", "💰", "🌟"];

interface SavingGoal {
  _id: string;
  name: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  progress: number; 
  remaining: number;
}

interface SavingsGoalsProps {
  goals: SavingGoal[];
  onAdd?: () => void;
}

export function SavingsGoals({ goals = [], onAdd }: SavingsGoalsProps) {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-7 shadow-xl border border-emerald-100/50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Target className="w-6 h-6 text-emerald-600" />
            Mục Tiêu Tiết Kiệm
          </h3>
          <p className="text-sm text-gray-500 mt-1.5">
            Theo dõi tiến độ mục tiêu của bạn
          </p>
        </div>
      </div>

      {goals.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
          <p className="text-5xl mb-3">🎯</p>
          <p className="text-sm">Chưa có mục tiêu tiết kiệm nào</p>
          <button
            onClick={onAdd}
            className="mt-4 px-4 py-2 text-sm text-emerald-600 border border-emerald-300 rounded-xl hover:bg-emerald-50 transition-colors"
          >
            Thêm mục tiêu đầu tiên
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {goals.map((goal, index) => {
            const gradient = GRADIENTS[index % GRADIENTS.length];
            const emoji = EMOJIS[index % EMOJIS.length];
            const isDone = goal.progress >= 100;

            return (
              <div key={goal._id} className="group">
                <div
                  className={`p-4 rounded-2xl bg-gradient-to-r ${gradient} text-white mb-3 hover:shadow-lg transition-all`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{emoji}</span>
                      <div>
                        <h4 className="font-semibold text-lg">{goal.name}</h4>
                        {goal.description ? (
                          <p className="text-white/80 text-xs mt-0.5 line-clamp-1">
                            {goal.description}
                          </p>
                        ) : (
                          <div className="flex items-center gap-1 mt-1 text-white/90 text-sm">
                            <Calendar className="w-3 h-3" />
                            <span>Không có hạn</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{goal.progress}%</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/90">Đã tiết kiệm</span>
                      <span className="font-semibold">
                        {goal.currentAmount.toLocaleString("vi-VN")} đ
                      </span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2.5 overflow-hidden backdrop-blur-sm">
                      <div
                        className="h-2.5 bg-white rounded-full transition-all duration-500 shadow-lg"
                        style={{ width: `${Math.min(goal.progress, 100)}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/90">Còn lại</span>
                      <span className="font-semibold">
                        {goal.remaining.toLocaleString("vi-VN")} đ
                      </span>
                    </div>
                  </div>
                </div>

                {isDone ? (
                  <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-xl text-sm font-medium">
                    <TrendingUp className="w-4 h-4" />
                    <span>Chúc mừng! Bạn đã đạt mục tiêu này 🎉</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-sm">
                    <TrendingUp className="w-4 h-4" />
                    <span>Còn {100 - goal.progress}% để đạt mục tiêu</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
