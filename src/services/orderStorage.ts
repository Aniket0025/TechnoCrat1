// Local order storage and retrieval for user and admin order history
import type { Product } from "@/data/products";

export interface Order {
  id: string;
  items: { product: Product; quantity: number }[];
  total: number;
  email: string;
  date: string;
}

const ORDER_KEY = "ecocart_orders";
const USER_CART_KEY = "ecocart_user_cart";

export function saveOrder(order: Order) {
  const orders: Order[] = JSON.parse(localStorage.getItem(ORDER_KEY) || "[]");
  orders.push(order);
  localStorage.setItem(ORDER_KEY, JSON.stringify(orders));
}

export function getOrders(): Order[] {
  return JSON.parse(localStorage.getItem(ORDER_KEY) || "[]");
}

export function clearOrders() {
  localStorage.removeItem(ORDER_KEY);
}

// Cart storage for current user
export function getUserCart(): { product: Product; quantity: number }[] {
  return JSON.parse(localStorage.getItem(USER_CART_KEY) || "[]");
}

export function setUserCart(cart: { product: Product; quantity: number }[]): void {
  localStorage.setItem(USER_CART_KEY, JSON.stringify(cart));
}
