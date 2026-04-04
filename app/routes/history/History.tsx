import {
  CarOutlined,
  CoffeeOutlined,
  FileTextOutlined,
  PlayCircleOutlined,
  ShoppingCartOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { DatePicker, Input, Select } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import {
  PlusCircle,
  Search,
  Tag,
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

  const categoryIcons: Record<string, React.ReactNode> = {
    "ăn uống": <CoffeeOutlined style={{ fontSize: 20 }} />,
    "đi lại": <CarOutlined style={{ fontSize: 20 }} />,
    "mua sắm": <ShoppingCartOutlined style={{ fontSize: 20 }} />,
    "giải trí": <PlayCircleOutlined style={{ fontSize: 20 }} />,
    "hóa đơn": <FileTextOutlined style={{ fontSize: 20 }} />,
    lương: <WalletOutlined style={{ fontSize: 20 }} />,
  };

  return isLoading || istotalTransactionLoading || isCateroriLoading ? (
    <SkeletonHistory />
  ) : (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-3">
        {/* Income Card */}
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 px-6 py-4 shadow-sm border border-emerald-200/50 transition-all hover:shadow-lg hover:scale-[1.02]">
          <div className="flex items-start justify-between mb-4">
            <div className="rounded-full bg-emerald-500/10 px-3 py-1">
              <span className="text-xs font-medium text-emerald-700 ">
                Thu nhập
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-emerald-900/60 ">
                Tổng Thu Nhập
              </p>
              <p className="text-3xl font-bold text-emerald-700">
                {formatCurrency(totalIncome)}
              </p>
            </div>
            <div className="rounded-xl bg-emerald-500/10 p-3 ring-1 ring-emerald-500/20">
              <TrendingUp className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
          <div className="absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-emerald-500/5 blur-2xl" />
        </div>

        {/* Expense Card */}
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-50 to-red-50 px-6 py-4 shadow-sm border border-rose-200/50 transition-all hover:shadow-lg hover:scale-[1.02]">
          <div className="flex items-start justify-between mb-4">
            <div className="rounded-full bg-rose-500/10 px-3 py-1">
              <span className="text-xs font-medium text-rose-700">
                Chi tiêu
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-rose-900/60 ">
                Tổng Chi Tiêu
              </p>
              <p className="text-3xl font-bold text-rose-700">
                {formatCurrency(totalExpense)}
              </p>
            </div>
            <div className="rounded-xl bg-rose-500/10 p-3 ring-1 ring-rose-500/20">
              <TrendingDown className="h-6 w-6 text-rose-600" />
            </div>
          </div>
          <div className="absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-rose-500/5 blur-2xl" />
        </div>

        {/* Balance Card */}
        <div
          className={`group relative overflow-hidden rounded-2xl px-6 py-4 shadow-sm border transition-all hover:shadow-lg hover:scale-[1.02] ${
            balance >= 0
              ? "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200/50"
              : "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200/50 "
          }`}
        >
          <div className="flex items-start justify-between mb-4">
            <div
              className={`rounded-full px-3 py-1 ${balance >= 0 ? "bg-blue-500/10" : "bg-amber-500/10"}`}
            >
              <span
                className={`text-xs font-medium ${
                  balance >= 0 ? "text-blue-700" : "text-amber-700"
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
                  balance >= 0 ? "text-blue-900/60 " : "text-amber-900/60 "
                }`}
              >
                Số Dư
              </p>
              <p
                className={`text-3xl font-bold ${
                  balance >= 0 ? "text-blue-700 " : "text-amber-700"
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
                  balance >= 0 ? "text-blue-600 " : "text-amber-600"
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
          <div className="flex gap-3 mb-6 lg:flex-row flex-col">
            <div className="flex-1 relative min-w-0">
              <Input
                name="description"
                allowClear
                defaultValue={params.get("description") || ""}
                placeholder="Tìm kiếm giao dịch..."
                onPressEnter={(e: any) => {
                  updateParam("description", e.target.value);
                }}
                className="h-10 md:h-12 w-full"
              />
            </div>

            <div className="flex gap-2 flex-wrap items-center">
              <Select
                className="w-24 md:w-28"
                style={{ height: "40px" }}
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
                className="h-10 md:h-12"
                style={{ minWidth: "120px" }}
              />

              <button
                onClick={() => updateParam("transactionType", "")}
                className={`h-10 md:h-12 px-3 md:px-6 cursor-pointer border-2 border-slate-200 rounded-xl 
            text-xs md:text-sm font-medium transition-all whitespace-nowrap
            ${
              params.get("transactionType") === null
                ? "bg-slate-900 text-white shadow-lg"
                : "bg-white"
            }`}
              >
                Tất cả
              </button>

              <button
                onClick={() => updateParam("transactionType", "income")}
                className={`h-10 md:h-12 px-3 md:px-6 rounded-xl border-2 border-slate-200 cursor-pointer 
            text-xs md:text-sm font-medium transition-all whitespace-nowrap
            ${
              params.get("transactionType") === "income"
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/30"
                : "bg-white hover:bg-emerald-600 hover:text-white"
            }`}
              >
                Thu nhập
              </button>

              <button
                onClick={() => updateParam("transactionType", "expense")}
                className={`h-10 md:h-12 px-3 md:px-6 rounded-xl border-2 border-slate-200 cursor-pointer 
            text-xs md:text-sm font-medium transition-all whitespace-nowrap
            ${
              params.get("transactionType") === "expense"
                ? "bg-rose-600 text-white shadow-lg shadow-rose-500/30"
                : "bg-white hover:bg-rose-600 hover:text-white"
            }`}
              >
                Chi tiêu
              </button>
            </div>
          </div>

          {/* <div className="space-y-3">
            {data?.transactions?.map((transaction: Transaction) => (
              <div
                key={transaction._id}
                className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-slate-200/50 transition-all hover:shadow-lg hover:scale-[1.01] hover:border-slate-300 "
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div
                      className={`relative rounded-2xl p-3 shadow-sm ${
                        transaction.transactionType === "income"
                          ? "bg-gradient-to-br from-emerald-100 to-teal-100 "
                          : "bg-gradient-to-br from-rose-100 to-pink-100"
                      }`}
                    >
                      {transaction.transactionType !== "income" ? (
                        <ArrowDownLeft className="h-6 w-6 text-rose-600" />
                      ) : (
                        <ArrowUpRight className="h-6 w-6 text-emerald-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-lg text-slate-900 mb-1">
                          {transaction.description}
                        </h4>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-500 ">
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

                  <div className="flex items-end gap-4 flex-col">
                    <div
                      className={` w-[70px] py-[3px] flex justify-center rounded-md ${
                        transaction.transactionType === "income"
                          ? "bg-gradient-to-br from-emerald-100 to-teal-100 "
                          : "bg-gradient-to-br from-rose-100 to-pink-100 "
                      }`}
                    >
                      {transaction?.categoryId.name}
                    </div>
                    <div
                      className={`text-2xl font-bold ${
                        transaction.transactionType === "income"
                          ? "text-emerald-600"
                          : "text-rose-600"
                      }`}
                    >
                      {transaction.transactionType === "income" ? "+" : "-"}
                      {formatCurrency(transaction.amount)}
                    </div>
                  </div>
                </div>

                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${
                    transaction.transactionType === "income"
                      ? "bg-gradient-to-r from-emerald-500/5 to-transparent"
                      : "bg-gradient-to-r from-rose-500/5 to-transparent"
                  }`}
                />
              </div>
            ))}
          </div> */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50/50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Giao dịch
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Danh mục
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Phương thức
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Số tiền
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {data.transactions.map((transaction: Transaction) => {
                    const Icon =
                      categoryIcons[transaction.categoryId.name.toLowerCase()];
                    return (
                      <tr
                        key={transaction._id}
                        // onClick={() => setSelectedTransaction(transaction)}
                        className="hover:bg-emerald-50/30 transition-colors group cursor-pointer"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${
                                transaction.transactionType === "income"
                                  ? "bg-emerald-100 text-emerald-600"
                                  : "bg-orange-100 text-orange-600"
                              }`}
                            >
                              {Icon}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800">
                                {transaction.description}
                              </p>
                              <p className="text-sm text-gray-500">
                                {dayjs(transaction.createdAt).format(
                                  "DD/MM/YYYY HH:mm:ss"
                                )}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                            <Tag className="w-3.5 h-3.5" />
                            {transaction.categoryId.name}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-600 font-medium">
                            {transaction.accPay.name}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-right">
                          <span
                            className={`text-base font-bold ${
                              transaction.transactionType === "income"
                                ? "text-emerald-600"
                                : "text-orange-600"
                            }`}
                          >
                            {transaction.transactionType === "income"
                              ? "+"
                              : "-"}
                            {transaction.amount.toLocaleString("vi-VN")} đ
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {data.transactions.length === 0 && (
              <div className="text-center py-16">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  Không tìm thấy giao dịch
                </h3>
                <p className="text-gray-500">
                  Thử thay đổi bộ lọc hoặc tìm kiếm với từ khóa khác
                </p>
              </div>
            )}
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
