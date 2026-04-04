import { DollarSign, FileText } from "lucide-react";
import type { IDept, IDeptForm } from "~/Types/dept";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/ui/dialog";
import useUpdateDept from "./useUpdateDept";
const UpdateDept = ({
  showPayment,
  setShowPayment,
  data,
  action,
  setAction,
}: {
  showPayment: boolean;
  setShowPayment: any;
  data: IDept;
  setAction: any;
  action: string;
}) => {
  const { errors, handleSubmit, mutate, register,reset } = useUpdateDept();

  const onSubmit = (value: IDeptForm) => {
    mutate({
      id: data.id,
      data: { ...value, action },
    });
    setShowPayment(false);
    setAction("payment");
    reset()
  };
  return (
    <div>
      <Dialog open={showPayment} onOpenChange={setShowPayment}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Thêm Giao Dịch Thanh Toán</DialogTitle>
            <DialogDescription>
              Nhập thông tin giao dịch thanh toán mới cho khoản nợ này.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                <FileText className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <label className="text-sm text-gray-500">Ghi chú</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowPayment(false);
                  setAction("payment")
                }}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg 
            transition-colors"
              >
                Thêm giao dịch
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateDept;
