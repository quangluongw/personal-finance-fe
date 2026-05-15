import React, { useEffect, useState } from "react";

import { CheckCircle2, DollarSign, Hash, Sparkles, Star } from "lucide-react";
import type { AccountFormValues } from "~/Types/account";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/ui/dialog";
import { accountTypes, bankOptions, ewalletOptions } from "./account-constants";
import useAddAccount from "./useAddAccount";

type AccountType = "bank" | "wallet" | "cash";

interface AddAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddAccount = ({ open, onOpenChange }: AddAccountDialogProps) => {
  const {
    errors,
    handleSubmit,
    mutate,
    register,
    setValue,
    watch,
    reset,
    token,
  } = useAddAccount();

  const [step, setStep] = useState(1);
  const [accountType, setAccountType] = useState<AccountType>("bank");
  const [selectedBank, setSelectedBank] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  // Watch field values for display purposes
  const watchedName = watch("name");
  const watchedBalance = watch("balance");
  const watchedIsPrimary = watch("isPrimary");

  // Reset everything when dialog closes

  // Sync accountType into the form
  useEffect(() => {
    setValue("type", accountType);
    // Clear bank-specific fields when switching type
    setSelectedBank("");
    setValue("name", "");
    setValue("accountNumber", "");
  }, [accountType, setValue]);

  const onSubmit = (value: AccountFormValues) => {
    const data = {
      userId: token?.id,
      ...value,
    };
    mutate(data, {
      onSuccess: () => {
        setShowSuccess(true);
        setTimeout(() => {
          onOpenChange(false);
          reset()
        }, 2500);
      },
    });
  };

  const handleNext = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (step < 2) setStep(step + 1);
  };

  const handleBack = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (step > 1) setStep(step - 1);
  };

  const handleSelectBank = (option: { name: string; icon: string }) => {
    setSelectedBank(option.name);
    setValue("name", option.name, { shouldValidate: true });
    setValue("icon", option.icon);
  };

  const getOptions = () => {
    if (accountType === "bank") return bankOptions;
    if (accountType === "wallet") return ewalletOptions;
    return [];
  };

  const getAccountTypeLabel = () => {
    const type = accountTypes.find((t) => t.value === accountType);
    return type?.label || "Tài khoản";
  };

  // Step 2 validation: name and balance required
  const isStep2Valid = !!watchedName && !!watchedBalance;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-4xl max-h-[90vh] overflow-hidden bg-white rounded-3xl border-emerald-100
       flex flex-col"
      >
        {showSuccess ? (
          /* ── Success Screen ── */
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative mb-8">
              <div
                className="w-32 h-32 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex 
              items-center justify-center animate-bounce shadow-2xl shadow-emerald-500/50"
              >
                <CheckCircle2 className="w-20 h-20 text-white" />
              </div>
              <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-20" />
              <div className="absolute -inset-2 bg-emerald-400 rounded-full animate-pulse opacity-10" />
            </div>
            <h3 className="text-4xl font-black text-gray-800 mb-3">
              🎉 Tạo thành công!
            </h3>
            <p className="text-gray-600 text-lg mb-6">
              Tài khoản{" "}
              <span className="font-black text-emerald-600">{watchedName}</span>{" "}
              đã được thêm
            </p>
          </div>
        ) : (
          <>
            {/* ── Header ── */}
            <DialogHeader className="flex-shrink-0 pb-4 border-b border-gray-100">
              <DialogTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <div
                  className="p-3 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl text-white 
                shadow-lg shadow-emerald-500/30"
                >
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-black">Thêm tài khoản mới</div>
                  <div className="text-sm font-normal text-gray-500 mt-0.5">
                    Bước {step}/2 — {step === 1 ? "Chọn loại" : "Thông tin"}
                  </div>
                </div>
              </DialogTitle>
            </DialogHeader>

            {/* ── Progress Steps ── */}
            <div className="flex items-center justify-between mb-6 flex-shrink-0 px-8">
              {[1, 2].map((s) => (
                <React.Fragment key={s}>
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                        step >= s
                          ? "bg-gradient-to-br from-emerald-500 to-green-600 text-white scale-110 shadow-lg shadow-emerald-500/30"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {step > s ? <CheckCircle2 className="w-6 h-6" /> : s}
                    </div>
                    <p
                      className={`text-xs mt-2 font-semibold whitespace-nowrap transition-colors ${
                        step >= s ? "text-emerald-600" : "text-gray-400"
                      }`}
                    >
                      {s === 1 ? "Loại tài khoản" : "Thông tin"}
                    </p>
                  </div>
                  {s < 2 && (
                    <div
                      className={`h-1.5 flex-1 mx-3 rounded-full transition-all duration-500 ${
                        step > s
                          ? "bg-gradient-to-r from-emerald-500 to-green-600"
                          : "bg-gray-100"
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* ── Form ── */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col flex-1 min-h-0"
            >
              {/* Hidden field for accountType */}
              <input type="hidden" {...register("type")} />

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-1">
                {/* Step 1: Choose account type */}
                {step === 1 && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-right-5 duration-500 py-4">
                    <div className="text-center">
                      <h3 className="text-2xl font-black text-gray-800 mb-3">
                        Chọn loại tài khoản
                      </h3>
                      <p className="text-gray-600">
                        Lựa chọn loại tài khoản phù hợp với nhu cầu của bạn
                      </p>
                    </div>

                    <div className="max-w-2xl mx-auto">
                      <div className="grid grid-cols-1 gap-4">
                        {accountTypes.map((type) => {
                          const Icon = type.icon;
                          const isSelected = accountType === type.value;
                          return (
                            <button
                              key={type.value}
                              type="button"
                              onClick={() =>
                                setAccountType(type.value as AccountType)
                              }
                              className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                                isSelected
                                  ? "border-emerald-500 bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-50 shadow-xl shadow-emerald-500/20"
                                  : "border-gray-200 bg-white hover:border-emerald-300 hover:shadow-lg hover:-translate-y-1"
                              }`}
                            >
                              <div className="flex items-center gap-5">
                                <div
                                  className={`w-20 h-20 flex-shrink-0 rounded-2xl bg-gradient-to-br ${type.color} flex items-center justify-center text-white shadow-lg transition-all duration-300 ${
                                    isSelected
                                      ? "scale-105 shadow-xl"
                                      : "group-hover:scale-110"
                                  }`}
                                >
                                  <Icon className="w-10 h-10" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="text-xl font-bold text-gray-800 mb-1.5">
                                    {type.label}
                                  </h4>
                                  <p className="text-sm text-gray-600">
                                    {type.description}
                                  </p>
                                </div>
                                {isSelected && (
                                  <div className="flex-shrink-0">
                                    <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                                      <CheckCircle2 className="w-5 h-5 text-white" />
                                    </div>
                                  </div>
                                )}
                              </div>
                              {isSelected && (
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/5 to-green-500/5 pointer-events-none" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Tip */}
                    <div className="max-w-2xl mx-auto">
                      <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                        <Sparkles className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-blue-900 mb-1">
                            💡 Mẹo nhỏ
                          </p>
                          <p className="text-sm text-blue-700">
                            {accountType === "bank" &&
                              "Bạn có thể thêm nhiều tài khoản ngân hàng để quản lý dễ dàng hơn"}
                            {accountType === "wallet" &&
                              "Ví điện tử giúp bạn theo dõi chi tiêu hàng ngày tiện lợi"}
                            {accountType === "cash" &&
                              "Theo dõi tiền mặt giúp bạn kiểm soát ngân sách tốt hơn"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Account Info */}
                {step === 2 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-5 duration-500 py-2">
                    <div className="text-center">
                      <h3 className="text-2xl font-black text-gray-800 mb-3">
                        Thông tin {getAccountTypeLabel().toLowerCase()}
                      </h3>
                      <p className="text-gray-600">
                        Điền các thông tin chi tiết cho tài khoản của bạn
                      </p>
                    </div>

                    {/* Bank / Ewallet picker */}
                    {(accountType === "bank" || accountType === "wallet") && (
                      <div>
                        <label className="block text-base font-bold text-gray-800 mb-4">
                          {accountType === "bank"
                            ? "🏦 Chọn ngân hàng"
                            : "💳 Chọn ví điện tử"}
                        </label>
                        <div className="grid grid-cols-4 gap-3 p-5 bg-gradient-to-br rounded-2xl border max-h-[220px] overflow-y-auto">
                          {getOptions().map((option) => {
                            const isSelected = selectedBank === option.name;
                            return (
                              <button
                                key={option.name}
                                type="button"
                                onClick={() => handleSelectBank(option)}
                                className={`group relative p-4 rounded-xl border-2 transition-all duration-300 ${
                                  isSelected
                                    ? "border-emerald-500 shadow-xl shadow-emerald-500/30 scale-105"
                                    : "border-transparent hover:border-emerald-300 hover:shadow-lg hover:scale-105"
                                }`}
                              >
                                <div className="w-12 h-12 mx-auto mb-2 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
                                  <img
                                    src={option.icon}
                                    className="w-10 h-10 rounded-lg object-cover"
                                    alt={option.name}
                                  />
                                </div>
                                <p className="text-xs font-bold text-gray-800 text-center truncate">
                                  {option.name}
                                </p>
                                {isSelected && (
                                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                                  </div>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Account Name */}
                    <div className="bg-white p-5 rounded-2xl border-2 border-gray-200 hover:border-emerald-300 transition-all">
                      <label className="block text-base font-bold text-gray-800 mb-3">
                        <span>✏️ Tên tài khoản</span>{" "}
                        <span className="text-xs font-normal text-red-500">
                          *
                        </span>
                      </label>
                      <input
                        type="text"
                        {...register("name", {
                          required: "Vui lòng nhập tên tài khoản",
                        })}
                        placeholder={
                          accountType === "bank"
                            ? "VD: Techcombank Premium"
                            : accountType === "wallet"
                              ? "VD: Momo chính"
                              : "VD: Ví cá nhân"
                        }
                        className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-base font-semibold bg-gray-50 focus:bg-white "
                      />
                      {errors.name && (
                        <p className="mt-2 text-sm text-red-500 font-medium">
                          {errors.name.message as string}
                        </p>
                      )}
                    </div>

                    {/* Account Number */}
                    {(accountType === "bank" || accountType === "wallet") && (
                      <div className="bg-white p-5 rounded-2xl border-2 border-gray-200 hover:border-emerald-300 transition-all">
                        <label className="flex text-base font-bold text-gray-800 mb-3 items-center gap-2">
                          <Hash className="w-5 h-5 text-emerald-600" />
                          {accountType === "bank"
                            ? "Số tài khoản"
                            : "Số điện thoại"}
                          <span className="text-xs font-normal text-gray-500 ml-auto">
                            (Tùy chọn)
                          </span>
                        </label>
                        <input
                          type="text"
                          {...register("accountNumber")}
                          placeholder={
                            accountType === "bank" ? "1234567890" : "0912345678"
                          }
                          className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-mono font-semibold bg-gray-50 focus:bg-white"
                        />
                        {errors.accountNumber && (
                          <p className="mt-2 text-sm text-red-500 font-medium">
                            {errors.accountNumber.message as string}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Initial Balance */}
                    <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-2xl border-2 border-emerald-200">
                      <label className="flex text-base font-bold text-gray-800 mb-4 items-center gap-2">
                        <DollarSign className="w-5 h-5 text-emerald-600" />
                        Số dư ban đầu
                        <span className="text-xs font-normal text-red-500">
                          *
                        </span>
                      </label>
                      <div className="relative mb-3">
                        <input
                          type="text"
                          {...register("balance", {
                            required: "Vui lòng nhập số dư ban đầu",
                            onChange: (e) => {
                              // Strip non-numeric chars except minus
                              const cleaned = e.target.value.replace(
                                /[^0-9-]/g,
                                ""
                              );
                              setValue("balance", cleaned, {
                                shouldValidate: true,
                              });
                            },
                          })}
                          placeholder="0"
                          className="w-full px-6 py-5 pr-14 border-2 border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-right text-3xl font-black bg-white"
                        />
                        <span
                          className="absolute right-6 top-1/2 -translate-y-1/2 text-emerald-600 font-bold
                         text-xl"
                        >
                          đ
                        </span>
                      </div>
                      {watchedBalance &&
                        !isNaN(parseInt(watchedBalance as string)) && (
                          <div className="mb-4 p-3 bg-white rounded-lg border border-emerald-200">
                            <p className="text-sm text-emerald-700 font-bold text-center">
                              =
                              {parseInt(
                                watchedBalance as string
                              ).toLocaleString("vi-VN")}
                              đồng
                            </p>
                          </div>
                        )}
                      {errors.balance && (
                        <p className="mt-1 text-sm text-red-500 font-medium">
                          {errors.balance.message as string}
                        </p>
                      )}
                    </div>

                    {/* Primary Account */}
                    <div
                      className="bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-50 p-5 
                    rounded-2xl border-2 border-amber-300 hover:border-amber-400 transition-all"
                    >
                      <label
                        htmlFor="isPrimary"
                        className="flex items-center gap-4 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          id="isPrimary"
                          {...register("isPrimary")}
                          className="w-6 h-6 text-emerald-600 border-2 border-amber-400 rounded-lg focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                        />
                        <div className="flex items-center gap-3 flex-1">
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                              watchedIsPrimary ? "bg-amber-500" : "bg-amber-200"
                            }`}
                          >
                            <Star
                              className="w-7 h-7 text-white"
                              fill={watchedIsPrimary ? "currentColor" : "none"}
                            />
                          </div>
                          <div>
                            <span className="font-bold text-gray-800 block text-base">
                              ⭐ Tài khoản chính
                            </span>
                            <span className="text-sm text-amber-800">
                              Tài khoản mặc định cho giao dịch
                            </span>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* ── Footer Buttons ── */}
              <div className="flex items-center gap-4 pt-6 border-t-2 border-gray-200 mt-6 flex-shrink-0">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl
                     hover:bg-gray-50 font-bold transition-all hover:border-gray-400 hover:scale-105 text-base"
                  >
                    ← Quay lại
                  </button>
                )}

                {step < 2 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white
                     rounded-xl hover:shadow-2xl hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-300 font-black text-base"
                  >
                    Tiếp tục →
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!isStep2Valid}
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-emerald-600 via-green-600 
                        to-emerald-600 text-white rounded-xl hover:shadow-2xl hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-300 font-black text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:scale-100"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-6 h-6" />
                      Tạo tài khoản
                    </span>
                  </button>
                )}
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddAccount;
