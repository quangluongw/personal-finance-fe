export interface IDeptForm {
  type: string;
  person: string;
  amount: number;
  status: string;
  description: string;
  paidAmount: number;
  action:string;
}
export interface IDept {
  id: string;
  type: string;
  person: string;
  total: number;
  paid: number;
  remain: number;
  description: string;
  paidAmount: number;
  createdAt: string;
  transactions: [
    {
      id: string;
      amount: number;
      date: string;
      note: string;
    },
  ];
}
