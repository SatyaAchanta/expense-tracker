export interface iExpenseEntry {
  name: string;
  price: number;
  purchaseDate: Date;
  description: string;
  place: string;
}

export interface iExpenseResponse {
  status: number;
  data: any;
}
