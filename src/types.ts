export interface MenuItem {
  name: string;
  code: string;
  price: string;
  desc: string;
  id: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  paymentMethod: string;
  timestamp: string;
  date: string;
  userId?: string;
}

export interface SupplyItem {
  id: string;
  name: string;
  note: string;
  quantity: string;
  isChecked: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CheckoutStep = "cart" | "payment" | "receipt";
