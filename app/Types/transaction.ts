export interface Transaction {
  _id: string;
  transactionType: "income" | "expense";
  amount: number;
  description: string;
  categoryId: {
    _id: string;
    name: string;
  };
  createdAt: string;
}

export interface TransactionForm {
  userId: string;
  categoryId: string;
  transactionType: string;
  amount: number;
  description?: string;
}
