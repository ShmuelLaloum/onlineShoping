import React from "react";

export interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export interface MainLayoutProps {
  children: React.ReactNode;
}

export interface UserEditModalProps {
  visible: boolean;
  user: User | null;
  onCancel: () => void;
  onUpdate: (values: UserFormValues) => void;
}

export interface UserFormValues {
  name: string;
  email: string;
  role: "admin" | "user";
}

export interface SidebarMenuProps {
  onItemClick?: () => void;
  mode?: "vertical" | "inline" | "horizontal";
  theme?: "light" | "dark";
}

export interface ProductCardProps {
  product: Product;
}

export interface CartTableProps {
  onPayment: () => void;
}

export interface CartListProps {
  onPayment: () => void;
  disabled: boolean;
}
export type UserRole = "admin" | "user";

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  username: string;
  password?: string;
  role: UserRole;
  cart: CartItem[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface FetchProductsResponse {
  items: Product[];
  nextPage: number | undefined;
}
export interface ProductsPage {
  items: Product[];
  nextPage?: number;
}
