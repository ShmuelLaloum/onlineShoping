import React from "react";
import type { User, Product } from "./index";

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
  onUpdate: (values: any) => void;
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
}
