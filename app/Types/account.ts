export type Account = {
  _id: string;

  userId: string;

  name: string; // Techcombank
  type: "bank" | "wallet" | "cash";

  balance: number;

  accountNumber?: string;

  icon: string; // "Landmark"

  change: number; // % thay đổi
  isPrimary?: boolean;

  linkedAccounts?: number;

  lastTransaction?: string; // ISO string (frontend format lại)

  createdAt?: string;
};

export interface AccountFormValues {
  name: string;
  accountNumber?: string;
  balance: number | string;
  isPrimary: boolean;
  icon: string;
  // UI data
  selectedBank?: string;

  // account type
  type: "bank" | "wallet" | "cash";
}
export type AccountType = "bank" | "wallet" | "cash";
