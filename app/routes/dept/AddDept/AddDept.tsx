import { DollarSign, FileText, User } from "lucide-react";
import { useState } from "react";
import type { IDeptForm } from "~/Types/dept";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/ui/dialog";
import useAddDept from "./useAddDept";

const AddDept = ({
  showAddDebtDialog,
  setShowAddDebtDialog,
}: {
  showAddDebtDialog: boolean;
  setShowAddDebtDialog: any;
}) => {
  const [newDebtType, setNewDebtType] = useState<"lending" | "borrowing">(
    "lending"
  );
  const { errors, handleSubmit, mutate, register, token } = useAddDept();
  const onSubmit = (value: IDeptForm) => {
    const data = {
      ...value,
      userId: token?.id,
      type: newDebtType,
    };
    mutate(data);
    setShowAddDebtDialog(false);
  };
  return (
    <Dialog open={showAddDebtDialog} onOpenChange={setShowAddDebtDialog}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Thêm Khoản Nợ Mới</DialogTitle>
          <DialogDescription>
            Nhập thông tin chi tiết cho khoản nợ mới.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 text-gray-500">
              <DollarSign className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <label className="text-sm text-gray-500">Loại khoản nợ</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setNewDebtType("lending")}
                  type="button"
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer ${
                    newDebtType === "lending"
                      ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-200"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                  }`}
                >
                  Cho vay
                </button>
                <button
                  onClick={() => setNewDebtType("borrowing")}
                  type="button"
                  className={`px-4 cursor-pointer py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    newDebtType === "borrowing"
                      ? "bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-200"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                  }`}
                >
                  Đi vay
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 text-gray-500">
              <User className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <label className="text-sm text-gray-500">Người vay/Chủ nợ</label>
              <input
                type="text"
                {...register("person")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {errors.person && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.person.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 text-gray-500">
              <DollarSign className="w-4 h-4" />
            </div>

            <div className="flex-1">
              <label className="text-sm text-gray-500">Số tiền</label>
              <input
                type="number"
                {...register("amount")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {errors.amount && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.amount.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 text-gray-500">
              <DollarSign className="w-4 h-4" />
            </div>

            <div className="flex-1">
              <label className="text-sm text-gray-500">Đã trả</label>
              <input
                type="number"
                {...register("paidAmount", {
                  setValueAs: (v) => (v === "" ? null : Number(v)),
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {errors.paidAmount && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.paidAmount.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 text-gray-500">
              <FileText className="w-4 h-4" />
            </div>

            <div className="flex-1">
              <label className="text-sm text-gray-500">Ghi chú</label>
              <input
                type="text"
                {...register("description")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <button
              onClick={() => setShowAddDebtDialog(false)}
              className="px-4 py-2 bg-gray-100 cursor-pointer hover:bg-gray-200 text-gray-600 rounded-lg transition-colors"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-500 cursor-pointer hover:bg-emerald-600 text-white rounded-lg 
          transition-colors"
            >
              Thêm khoản nợ
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDept;
