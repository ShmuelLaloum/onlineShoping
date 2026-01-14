import { makeAutoObservable, reaction } from "mobx";
import { authStore } from "./authStore";
import type { CartItem } from "../types";

class CartStore {
  items: CartItem[] = [];

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.items.slice(),
      (items) => {
        authStore.syncCart(items);
      }
    );
  }

  setItems(items: CartItem[]) {
    this.items = items;
  }

  addItem(product: Omit<CartItem, "quantity">) {
    const existingItem = this.items.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
  }

  removeItem(id: string) {
    this.items = this.items.filter((item) => item.id !== id);
  }

  clearCart() {
    this.items = [];
  }

  get itemCount() {
    return this.items.length;
  }

  get totalItems() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  get totalPrice() {
    return this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }
}

export const cartStore = new CartStore();
