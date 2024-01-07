export interface iExpenseEntry {
  name: string;
  price: number;
  purchaseDate: Date;
  place: string;
  description?: string;
}

export interface iExpenseResponse {
  status: number;
  data: any;
}
