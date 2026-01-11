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
