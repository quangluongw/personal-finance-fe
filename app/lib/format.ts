export const formatCurrency = (amount: number): string => {
  if (amount >= 1_000_000_000) {
    const value = amount / 1_000_000_000;
    return `${value % 1 === 0 ? value : value.toFixed(1)} B`;
  }

  if (amount >= 1_000_000) {
    const value = amount / 1_000_000;
    return `${value % 1 === 0 ? value : value.toFixed(1)} M`;
  }

  if (amount >= 1_000) {
    const value = amount / 1_000;
    return `${value % 1 === 0 ? value : value.toFixed(1)} K`;
  }

  return `${amount} ₫`;
};
export const formatVND = (value: string) => {
  const onlyNumber = value.replace(/\D/g, "");
  return onlyNumber ? Number(onlyNumber).toLocaleString("vi-VN") : "";
};

export function parseISOToVN(isoString: any): any {
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return "";

  // Chuyển sang giờ VN (UTC+7)
  const vnDate = new Date(date.getTime() + 7 * 60 * 60 * 1000);

  const d = String(vnDate.getUTCDate()).padStart(2, "0");
  const m = String(vnDate.getUTCMonth() + 1).padStart(2, "0");
  const y = vnDate.getUTCFullYear();
  const h = String(vnDate.getUTCHours()).padStart(2, "0");
  const min = String(vnDate.getUTCMinutes()).padStart(2, "0");
  const sec = String(vnDate.getUTCSeconds()).padStart(2, "0");

  return `${d}/${m}/${y} ${h}:${min}:${sec}`;
}
