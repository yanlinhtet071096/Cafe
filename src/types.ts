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

export interface Branch {
  id: string;
  name: string;
  location: string;
}

export interface UserProfile {
  id: string;
  branch_id: string;
  role: 'staff' | 'manager' | 'admin';
  full_name: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  paymentMethod: string;
  timestamp: string;
  date: string;
  userId?: string;
  branchId: string;
}

export interface SupplyItem {
  id: string;
  name: string;
  note: string;
  quantity: string;
  isChecked: boolean;
  user_id?: string;
  branch_id?: string;
  createdAt: string;
  updatedAt: string;
}

export type CheckoutStep = "cart" | "payment" | "receipt";
