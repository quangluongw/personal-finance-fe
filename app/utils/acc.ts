import type { AccountType } from "~/Types/account";

// ─── Label ────────────────────────────────────────────────────────────────────
export const ACCOUNT_TYPE_LABELS: Record<AccountType, string> = {
  bank: "Ngân hàng",
  wallet: "Ví điện tử",
  cash: "Tiền mặt",
};

export const getTypeLabel = (type: AccountType) =>
  ACCOUNT_TYPE_LABELS[type] ?? type;

// ─── Colors ───────────────────────────────────────────────────────────────────
export const ACCOUNT_TYPE_COLORS: Record<string, string> = {
  bank: "#3b82f6",
  wallet: "#f59e0b",
  cash: "#10b981",
};

// ─── Clipboard ────────────────────────────────────────────────────────────────
export const copyToClipboard = (
  text: string,
  onCopied: (id: string) => void
) => {
  navigator.clipboard.writeText(text.replace(/\s/g, ""));
  onCopied(text);
  setTimeout(() => onCopied(""), 2000);
};
