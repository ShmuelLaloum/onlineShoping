import { makeAutoObservable, reaction } from "mobx";
import { authStore } from "./authStore";
import type { CartItem } from "../types/componentProps";

export function createCartStore() {
  const store = {
    items: [] as CartItem[],

    setItems(items: CartItem[]) {
      store.items = items;
    },

    addItem(product: Omit<CartItem, "quantity">) {
      const existingItem = store.items.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        store.items.push({ ...product, quantity: 1 });
      }
    },

    removeItem(id: string) {
      store.items = store.items.filter((item) => item.id !== id);
    },

    clearCart() {
      store.items = [];
    },

    get itemCount() {
      return store.items.length;
    },

    get totalItems() {
      return store.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
    },

    get totalPrice() {
      return store.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
  };

  makeAutoObservable(store);

  reaction(
    () => store.items.slice(),
    (items) => {
      authStore.syncCart(items);
    }
  );

  return store;
}

export const cartStore = createCartStore();
