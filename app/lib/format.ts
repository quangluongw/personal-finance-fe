export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

export const formatVND = (value: string) => {
  const onlyNumber = value.replace(/\D/g, "");
  return onlyNumber ? Number(onlyNumber).toLocaleString("vi-VN") : "";
};
