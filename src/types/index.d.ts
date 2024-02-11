export interface iExpenseEntry {
  name: string;
  price: number;
  purchaseDate: Date;
  place: string;
  description?: string;
  id?: string;
}

export interface iExpenseResponse {
  status: number;
  data: any;
}

interface iIconProps {
  fill?: string;
  filled?: boolean;
  size?: number;
  height?: number;
  width?: number;
  label?: string;
}
