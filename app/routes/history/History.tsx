import { DatePicker, Input, Select } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Calendar,
  PlusCircle,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router";
import type { Caterori } from "~/Types/caterori";
import type { Transaction } from "~/Types/transaction";
import { formatCurrency } from "~/lib/format";
import SkeletonHistory from "./SkeletonHistory";
import AddHistory from "./addHistory/addHistory";
import useHistory from "./useHistory";
const { MonthPicker } = DatePicker;

const History = () => {
  const {
    data,
    isLoading,
    istotalTransactionLoading,
    totalTransaction,
    dataCaterori,
    isCateroriLoading,
  } = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [params, setParams] = useSearchParams();
  const [selectedMonth, setSelectedMonth] = useState<Dayjs | null>(dayjs());
  const updateParam = (key: string, value: string) => {
    const urlParams = new URLSearchParams(params);
    if (value) {
      urlParams.set(key, value.toString());
    } else {
      urlParams.delete(key);
    }
    setParams(urlParams);
  };
  const monthParam = params.get("month");
  const parsedMonth = dayjs(monthParam, "MM/YYYY");
  const defaultMonth =
    monthParam && parsedMonth.isValid() ? parsedMonth : selectedMonth;

  const totalIncome = totalTransaction?.totals?.totalIncome;
  const totalExpense = totalTransaction?.totals?.totalExpense;
  const balance = totalIncome - totalExpense;

  const handleChange = (date: Dayjs | null, dateString: string | string[]) => {
    const ds = Array.isArray(dateString) ? dateString[0] : dateString;
    updateParam("month", ds || "");
    setSelectedMonth(date);
  };

  const disabledDate = (current: Dayjs) => {
    return current && current > dayjs();
  };

  return isLoading || istotalTransactionLoading || isCateroriLoading ? (
    <SkeletonHistory />
  ) : (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-3">
        {/* Income Card */}
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 px-6 py-4 shadow-sm border border-emerald-200/50 dark:border-emerald-800/50 transition-all hover:shadow-lg hover:scale-[1.02]">
          <div className="flex items-start justify-between mb-4">
            <div className="rounded-full bg-emerald-500/10 px-3 py-1">
              <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
                Thu nhập
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-emerald-900/60 dark:text-emerald-100/60">
                Tổng Thu Nhập
              </p>
              <p className="text-3xl font-bold text-emerald-700 dark:text-emerald-400">
                {formatCurrency(totalIncome)}
              </p>
            </div>
            <div className="rounded-xl bg-emerald-500/10 p-3 ring-1 ring-emerald-500/20">
              <TrendingUp className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <div className="absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-emerald-500/5 blur-2xl" />
        </div>

        {/* Expense Card */}
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-50 to-red-50 dark:from-rose-950/30 dark:to-red-950/30 px-6 py-4 shadow-sm border border-rose-200/50 dark:border-rose-800/50 transition-all hover:shadow-lg hover:scale-[1.02]">
          <div className="flex items-start justify-between mb-4">
            <div className="rounded-full bg-rose-500/10 px-3 py-1">
              <span className="text-xs font-medium text-rose-700 dark:text-rose-300">
                Chi tiêu
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-rose-900/60 dark:text-rose-100/60">
                Tổng Chi Tiêu
              </p>
              <p className="text-3xl font-bold text-rose-700 dark:text-rose-400">
                {formatCurrency(totalExpense)}
              </p>
            </div>
            <div className="rounded-xl bg-rose-500/10 p-3 ring-1 ring-rose-500/20">
              <TrendingDown className="h-6 w-6 text-rose-600 dark:text-rose-400" />
            </div>
          </div>
          <div className="absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-rose-500/5 blur-2xl" />
        </div>

        {/* Balance Card */}
        <div
          className={`group relative overflow-hidden rounded-2xl px-6 py-4 shadow-sm border transition-all hover:shadow-lg hover:scale-[1.02] ${
            balance >= 0
              ? "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200/50 dark:border-blue-800/50"
              : "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-200/50 dark:border-amber-800/50"
          }`}
        >
          <div className="flex items-start justify-between mb-4">
            <div
              className={`rounded-full px-3 py-1 ${balance >= 0 ? "bg-blue-500/10" : "bg-amber-500/10"}`}
            >
              <span
                className={`text-xs font-medium ${
                  balance >= 0
                    ? "text-blue-700 dark:text-blue-300"
                    : "text-amber-700 dark:text-amber-300"
                }`}
              >
                {balance >= 0 ? "Dương" : "Âm"}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <p
                className={`text-sm font-medium ${
                  balance >= 0
                    ? "text-blue-900/60 dark:text-blue-100/60"
                    : "text-amber-900/60 dark:text-amber-100/60"
                }`}
              >
                Số Dư
              </p>
              <p
                className={`text-3xl font-bold ${
                  balance >= 0
                    ? "text-blue-700 dark:text-blue-400"
                    : "text-amber-700 dark:text-amber-400"
                }`}
              >
                {formatCurrency(balance)}
              </p>
            </div>
            <div
              className={`rounded-xl p-3 ring-1 ${
                balance >= 0
                  ? "bg-blue-500/10 ring-blue-500/20"
                  : "bg-amber-500/10 ring-amber-500/20"
              }`}
            >
              <Wallet
                className={`h-6 w-6 ${
                  balance >= 0
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-amber-600 dark:text-amber-400"
                }`}
              />
            </div>
          </div>
          <div
            className={`absolute -right-8 -bottom-8 h-32 w-32 rounded-full blur-2xl ${
              balance >= 0 ? "bg-blue-500/5" : "bg-amber-500/5"
            }`}
          />
        </div>
      </div>

      <div className="border border-gray-300 p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-8">
          <div className="">
            <h2 className="text-xl font-semibold">Lịch Sử Giao Dịch</h2>
            <div>Xem tất cả các giao dịch thu chi của bạn</div>
          </div>
          <button
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg transition-all hover:shadow-xl hover:scale-105 active:scale-100"
            onClick={showModal}
          >
            <PlusCircle className="transition-transform group-hover:rotate-90" />
            <span className="font-semibold">Thêm giao dịch</span>
          </button>
        </div>
        <div>
          <div className="flex gap-4 mb-6 lg:flex-row flex-col ">
            <div className="flex-1 relative">
              <Input
                name={"description"}
                allowClear
                defaultValue={params.get("description") || ""}
                placeholder="Tìm kiếm giao dịch..."
                // onChange={(e) => updateParam("description", e.target.value)}
                onPressEnter={(e: any) => {
                  updateParam("description", e.target.value);
                }}
                className="h-12 !min-w-[200px]"
              />
            </div>

            <div className="flex gap-2 ">
              <Select
                style={{ width: "100px", height: "48px" }}
                defaultValue="Tất cả "
                options={dataCaterori.map((item: Caterori) => ({
                  value: item._id,
                  label: item.name,
                }))}
              />

              <MonthPicker
                onChange={handleChange}
                disabledDate={disabledDate}
                placeholder="Chọn tháng"
                format="MM/YYYY"
                defaultValue={defaultMonth}
                allowClear={false}
              />
              <button
                onClick={() => updateParam("transactionType", "")}
                className={`h-12 px-6 cursor-pointer border-2 border-slate-200 rounded-xl font-medium transition-all
                 ${
                   params.get("transactionType") === null
                     ? "bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 shadow-lg "
                     : "bg-white dark:bg-slate-900"
                 }`}
              >
                Tất cả
              </button>
              <button
                onClick={() => updateParam("transactionType", "income")}
                className={`h-12 px-6 rounded-xl border-2 border-slate-200 cursor-pointer font-medium 
                  transition-all
                 ${
                   params.get("transactionType") === "income"
                     ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/30"
                     : "bg-white dark:bg-slate-900 hover:bg-emerald-600 hover:text-white"
                 }`}
              >
                Thu nhập
              </button>
              <button
                onClick={() => updateParam("transactionType", "expense")}
                className={`h-12 px-6 rounded-xl border-2 border-slate-200 cursor-pointer font-medium transition-all ${
                  params.get("transactionType") === "expense"
                    ? "bg-rose-600 text-white shadow-lg shadow-rose-500/30"
                    : "bg-white dark:bg-slate-900 hover:bg-rose-600 hover:text-white"
                }`}
              >
                Chi tiêu
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {data?.transactions?.map((transaction: Transaction) => (
              <div
                key={transaction._id}
                className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-sm border border-slate-200/50 dark:border-slate-800/50 transition-all hover:shadow-lg hover:scale-[1.01] hover:border-slate-300 dark:hover:border-slate-700"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div
                      className={`relative rounded-2xl p-3 shadow-sm ${
                        transaction.transactionType === "income"
                          ? "bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-950/50 dark:to-teal-950/50"
                          : "bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-950/50 dark:to-pink-950/50"
                      }`}
                    >
                      {transaction.transactionType !== "income" ? (
                        <ArrowDownLeft className="h-6 w-6 text-rose-600 dark:text-rose-400" />
                      ) : (
                        <ArrowUpRight className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-lg text-slate-900 dark:text-slate-50 mb-1">
                          {transaction.description}
                        </h4>
                        <div
                          className={` w-[70px] py-[3px] flex justify-center rounded-md ${
                            transaction.transactionType === "income"
                              ? "bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-950/50 dark:to-teal-950/50"
                              : "bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-950/50 dark:to-pink-950/50"
                          }`}
                        >
                          {transaction?.categoryId.name}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {dayjs(transaction.createdAt).format(
                              "DD/MM/YYYY HH:mm:ss"
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div
                      className={`text-2xl font-bold ${
                        transaction.transactionType === "income"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-rose-600 dark:text-rose-400"
                      }`}
                    >
                      {transaction.transactionType === "income" ? "+" : "-"}
                      {formatCurrency(transaction.amount)}
                    </div>
                  </div>
                </div>

                {/* Hover effect gradient */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${
                    transaction.transactionType === "income"
                      ? "bg-gradient-to-r from-emerald-500/5 to-transparent"
                      : "bg-gradient-to-r from-rose-500/5 to-transparent"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <AddHistory
        dataCaterori={dataCaterori}
        handleCancel={handleCancel}
        handleOk={handleOk}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};
export default History;
