export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  stock: number;
  images: string[];
  isActive: boolean;
  createdAt: string;
}

export interface Order {
  id: string;
  userId?: string;
  guestEmail?: string;
  guestName?: string;
  status: OrderStatus;
  subtotal: number;
  shippingCost: number;
  total: number;
  shippingAddress: ShippingAddress;
  items: OrderItem[];
  createdAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
}

export interface ShippingAddress {
  name: string;
  street: string;
  city: string;
  state?: string;
  country: string;
  zip: string;
  phone?: string;
}

export type OrderStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'REFUNDED';

export interface User {
  id: string;
  email: string;
  name: string | null;
  role: 'CUSTOMER' | 'ADMIN' | 'SUPERADMIN';
  phone?: string;
  createdAt: string;
}
