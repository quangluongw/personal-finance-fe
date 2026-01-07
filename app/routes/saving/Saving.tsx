import {
  DollarSign,
  Edit2,
  PiggyBank,
  Plus,
  Target,
  TrendingUp,
  Wallet,
  X,
} from "lucide-react";
import { useState } from "react";
import SkeletonSaving from "./SkeletonSaving";
import useSaving from "./useSaving";
import { useForm, type SubmitHandler } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { savingSchema } from "~/schemas/Saving";
interface Isaving {
  userId: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  description: string;
}
function formatCurrency(amount: number) {
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1)} triệu`;
  }
  return new Intl.NumberFormat("vi-VN").format(amount) + " đ";
}

function calculateProgress(current: number, target: number) {
  return Math.min((current / target) * 100, 100);
}

export default function Saving() {
  const { data, isLoading } = useSaving();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Isaving>({
    resolver: joiResolver(savingSchema),
  });
  // Tính toán thống kê
  const totalGoals = data?.length;
  const totalTarget = data?.reduce(
    (sum: Isaving, goal: any) => sum + goal.targetAmount,
    0
  );
  const totalSaved = data?.reduce(
    (sum: Isaving, goal: any) => sum + goal.currentAmount,
    0
  );
  const totalRemaining = totalTarget - totalSaved;
  const overallProgress = (totalSaved / totalTarget) * 100;

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<any>(null);

  const handleCreateGoal = () => {
    setShowCreateModal(true);
  };

  const handleUpdateGoal = (goal: any) => {
    setSelectedGoal(goal);

    setShowUpdateModal(true);
  };

  const onSubmit: SubmitHandler<Isaving> = (data) => {
    // setShowCreateModal(false);
    // setShowUpdateModal(false);
    console.log(data);
    
  };

  return isLoading ? (
    <SkeletonSaving />
  ) : (
    <div>
      <main>
        <div className="space-y-8">
          {/* Thống kê tổng quan */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Tổng mục tiêu */}
            <div className="group rounded-2xl border border-green-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex size-12 items-center justify-center rounded-xl bg-green-100 text-green-600 transition-transform group-hover:scale-110">
                  <Target className="size-6" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-600">
                  Tổng Mục Tiêu
                </p>
                <p className="text-3xl font-bold text-gray-900">{totalGoals}</p>
                <p className="text-xs text-gray-500">mục tiêu đang theo dõi</p>
              </div>
            </div>

            {/* Tổng tiết kiệm */}
            <div className="group rounded-2xl border border-green-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 transition-transform group-hover:scale-110">
                  <Wallet className="size-6" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-600">
                  Đã Tiết Kiệm
                </p>
                <p className="text-3xl font-bold text-emerald-600">
                  {formatCurrency(totalSaved)}
                </p>
                <p className="text-xs text-gray-500">
                  {overallProgress.toFixed(1)}% tổng mục tiêu
                </p>
              </div>
            </div>

            {/* Còn lại */}
            <div className="group rounded-2xl border border-green-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex size-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600 transition-transform group-hover:scale-110">
                  <TrendingUp className="size-6" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-600">Còn Thiếu</p>
                <p className="text-3xl font-bold text-orange-600">
                  {formatCurrency(totalRemaining)}
                </p>
                <p className="text-xs text-gray-500">cần tiết kiệm thêm</p>
              </div>
            </div>

            {/* Tổng mục tiêu */}
            <div className="group rounded-2xl border border-green-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex size-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition-transform group-hover:scale-110">
                  <DollarSign className="size-6" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-600">
                  Tổng Mục Tiêu
                </p>
                <p className="text-3xl font-bold text-blue-600">
                  {formatCurrency(totalTarget)}
                </p>
                <p className="text-xs text-gray-500">tổng số tiền cần đạt</p>
              </div>
            </div>
          </div>

          {/* Biểu đồ cột so sánh */}
          <div className="rounded-2xl border border-green-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-balance text-2xl font-semibold text-gray-900">
                So Sánh Tiến Độ
              </h2>
              <p className="text-pretty text-gray-600">
                Tiền đã tiết kiệm so với mục tiêu của từng hạng mục
              </p>
            </div>

            <div className="space-y-6">
              {data.map((goal: Isaving) => {
                const progress = calculateProgress(
                  goal.currentAmount,
                  goal.targetAmount
                );
                const maxAmount = Math.max(
                  goal.targetAmount,
                  goal.currentAmount
                );

                return (
                  <div key={goal.userId} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        {goal.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {progress.toFixed(0)}%
                      </span>
                    </div>

                    <div className="flex gap-2">
                      {/* Thanh đã tiết kiệm */}
                      <div className="relative flex-1">
                        <div className="h-12 overflow-hidden rounded-lg bg-gray-100">
                          <div
                            className="flex h-full items-center justify-end bg-gradient-to-r from-green-500 to-emerald-500 px-3 transition-all duration-500"
                            style={{
                              width: `${(goal.currentAmount / maxAmount) * 100}%`,
                            }}
                          >
                            <span className="text-xs font-semibold text-white">
                              {formatCurrency(goal.currentAmount)}
                            </span>
                          </div>
                        </div>
                        <span className="mt-1 block text-xs text-gray-600">
                          Đã tiết kiệm
                        </span>
                      </div>

                      {/* Thanh mục tiêu */}
                      <div className="relative flex-1">
                        <div className="h-12 overflow-hidden rounded-lg bg-gray-100">
                          <div
                            className="flex h-full items-center justify-end bg-gradient-to-r from-blue-400 to-blue-500 px-3"
                            style={{
                              width: `${(goal.targetAmount / maxAmount) * 100}%`,
                            }}
                          >
                            <span className="text-xs font-semibold text-white">
                              {formatCurrency(goal.targetAmount)}
                            </span>
                          </div>
                        </div>
                        <span className="mt-1 block text-xs text-gray-600">
                          Mục tiêu
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Chú thích */}
            <div className="mt-6 flex flex-wrap gap-4 border-t border-gray-200 pt-4">
              <div className="flex items-center gap-2">
                <div className="size-4 rounded bg-gradient-to-r from-green-500 to-emerald-500"></div>
                <span className="text-sm text-gray-600">Đã Tiết Kiệm</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-4 rounded bg-gradient-to-r from-blue-400 to-blue-500"></div>
                <span className="text-sm text-gray-600">Mục Tiêu</span>
              </div>
            </div>
          </div>

          {/* Danh sách mục tiêu chi tiết */}
          <div>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-balance text-2xl font-semibold text-gray-900">
                  Mục Tiêu Tiết Kiệm Của Bạn
                </h2>
                <p className="text-pretty text-gray-600">
                  Theo dõi tiến độ hướng tới từng cột mốc tài chính
                </p>
              </div>
              <button
                onClick={handleCreateGoal}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:from-green-700 hover:to-emerald-700 hover:shadow-xl"
              >
                <Plus className="size-5" />
                Tạo Mục Tiêu Mới
              </button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {data.map((goal: Isaving) => {
                const progress = calculateProgress(
                  goal.currentAmount,
                  goal.targetAmount
                );
                const remaining = goal.targetAmount - goal.currentAmount;

                return (
                  <div
                    key={goal.userId}
                    className="group rounded-2xl border border-green-200 bg-white p-6 shadow-sm transition-all hover:border-green-300 hover:shadow-md"
                  >
                    {/* Tiêu đề */}
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {goal.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600">
                          {goal.description}
                        </p>
                      </div>
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-600">
                        <PiggyBank className="size-5" />
                      </div>
                    </div>

                    {/* Thanh tiến độ */}
                    <div className="mb-4">
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="font-medium text-gray-700">
                          Tiến độ
                        </span>
                        <span className="font-semibold text-green-600">
                          {progress.toFixed(1)}%
                        </span>
                      </div>
                      <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Thông tin số tiền */}
                    <div className="grid grid-cols-2 gap-4 rounded-xl bg-gray-50 p-4">
                      <div>
                        <p className="text-xs text-gray-500">Đã tiết kiệm</p>
                        <p className="mt-1 text-lg font-bold text-green-600">
                          {formatCurrency(goal.currentAmount)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Còn lại</p>
                        <p className="mt-1 text-lg font-bold text-orange-600">
                          {formatCurrency(remaining)}
                        </p>
                      </div>
                      <div className="col-span-2 border-t border-gray-200 pt-3">
                        <p className="text-xs text-gray-500">Mục tiêu</p>
                        <p className="mt-1 text-xl font-bold text-gray-900">
                          {formatCurrency(goal.targetAmount)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <button
                        onClick={() => handleUpdateGoal(goal)}
                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-2.5 font-medium text-green-700 transition-all hover:border-green-300 hover:bg-green-100"
                      >
                        <Edit2 className="size-4" />
                        Cập Nhật Tiết Kiệm
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm ">
          <div className="w-full max-w-lg rounded-2xl border border-green-200 bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">
                Tạo Mục Tiêu Mới
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Tên Mục Tiêu
                </label>
                <input
                  type="text"
                  {...register("name")}
                  className={`w-full rounded-lg border  outline-none transition-colors px-4 py-2.5 text-gray-900 ${errors?.name ? "border-red-500 focus:ring-red-500 focus:border-red-500 text-red-600" : "focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"}`}
                  placeholder="Ví dụ: Quỹ Du Lịch"
                />
                <div className="text-red-500">
                  {errors?.name?.message as string}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Số Tiền Mục Tiêu
                  </label>
                  <input
                    type="number"
                    {...register("currentAmount")}
                    placeholder="0"
                    className={`w-full rounded-lg border  outline-none transition-colors px-4 py-2.5 text-gray-900 ${errors?.currentAmount ? "border-red-500 focus:ring-red-500 focus:border-red-500 text-red-600" : "focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"}`}
                  />
                  <div className="text-red-500">
                    {errors?.currentAmount?.message as string}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Số Tiền Hiện Tại
                  </label>
                  <input
                    type="number"
                    {...register("targetAmount")}
                    className={`w-full rounded-lg border  outline-none transition-colors px-4 py-2.5 text-gray-900 ${errors?.targetAmount ? "border-red-500 focus:ring-red-500 focus:border-red-500 text-red-600" : "focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"}`}
                    placeholder="0"
                  />
                  <div className="text-red-500">
                    {errors?.targetAmount?.message as string}
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Mô Tả
                </label>
                <textarea
                  rows={3}
                  {...register("description")}
                  className={`w-full rounded-lg border  outline-none transition-colors px-4 py-2.5 text-gray-900 ${errors?.description ? "border-red-500 focus:ring-red-500 focus:border-red-500 text-red-600" : "focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"}`}
                />
                <div className="text-red-500">
                  {errors?.description?.message as string}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 rounded-lg border  outline-none bg-white px-4 py-2.5 font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-2.5 font-semibold text-white shadow-lg transition-all hover:from-green-700 hover:to-emerald-700"
                >
                  Tạo Mục Tiêu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showUpdateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-green-200 bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">
                Cập Nhật: {selectedGoal?.name}
              </h3>
              <button
                onClick={() => setShowUpdateModal(false)}
                className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Tên Mục Tiêu
                </label>
                <input
                  type="text"
                  {...register("name")}
                  className={`w-full rounded-lg border  outline-none transition-colors px-4 py-2.5 text-gray-900 ${errors?.name ? "border-red-500 focus:ring-red-500 focus:border-red-500 text-red-600" : "focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"}`}
                  placeholder="Ví dụ: Quỹ Du Lịch"
                />
                <div className="text-red-500">
                  {errors?.name?.message as string}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Số Tiền Mục Tiêu
                  </label>
                  <input
                    type="number"
                    {...register("currentAmount")}
                    placeholder="0"
                    className={`w-full rounded-lg border  outline-none transition-colors px-4 py-2.5 text-gray-900 ${errors?.currentAmount ? "border-red-500 focus:ring-red-500 focus:border-red-500 text-red-600" : "focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"}`}
                  />
                  <div className="text-red-500">
                    {errors?.currentAmount?.message as string}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Số Tiền Hiện Tại
                  </label>
                  <input
                    type="number"
                    {...register("targetAmount")}
                    className={`w-full rounded-lg border  outline-none transition-colors px-4 py-2.5 text-gray-900 ${errors?.targetAmount ? "border-red-500 focus:ring-red-500 focus:border-red-500 text-red-600" : "focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"}`}
                    placeholder="0"
                  />
                  <div className="text-red-500">
                    {errors?.targetAmount?.message as string}
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Mô Tả
                </label>
                <textarea
                  rows={3}
                  {...register("description")}
                  className={`w-full rounded-lg border  outline-none transition-colors px-4 py-2.5 text-gray-900 ${errors?.description ? "border-red-500 focus:ring-red-500 focus:border-red-500 text-red-600" : "focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"}`}
                />
                <div className="text-red-500">
                  {errors?.description?.message as string}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 rounded-lg border  outline-none bg-white px-4 py-2.5 font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-2.5 font-semibold text-white shadow-lg transition-all hover:from-green-700 hover:to-emerald-700"
                >
                  Tạo Mục Tiêu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
