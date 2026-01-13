const updateSaving = ({ selectedGoal, setShowUpdateModal }) => {
  return (
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
              onClick={() => setShowUpdateModal(false)}
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
  );
};

export default updateSaving;
