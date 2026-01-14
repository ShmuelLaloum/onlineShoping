import { makeAutoObservable } from "mobx";
import { cartStore } from "./cartStore";
import type { User, UserRole, CartItem } from "../types/componentProps";

export function createAuthStore() {
  const store = {
    currentUser: null as User | null,
    users: [] as User[],

    login(username: string, password?: string): string | null {
      const existingUser = store.users.find(
        (u) => u.username === username
      );

      if (!existingUser) {
        return "User not found. Please register first.";
      }

      if (existingUser.password !== password) {
        return "Incorrect password!";
      }

      store.currentUser = existingUser;
      store.updateCartFromUser();
      return null;
    },

    register(
      username: string,
      password?: string,
      role: UserRole = "user"
    ): string | null {
      if (store.users.some((u) => u.username === username)) {
        return "Username already exists!";
      }

      const newUser: User = {
        username,
        password,
        role,
        cart: [],
      };

      store.users.push(newUser);
      store.saveUsersToStorage();
      return null;
    },

    logout() {
      store.syncCurrentCart();
      store.currentUser = null;
      cartStore.clearCart();
    },

    syncCart(items: CartItem[]) {
      if (store.currentUser) {
        store.currentUser.cart = items;
        store.saveUsersToStorage();
      }
    },

    updateCartFromUser() {
      if (store.currentUser) {
        cartStore.setItems(store.currentUser.cart);
      }
    },

    syncCurrentCart() {
      if (store.currentUser) {
        store.currentUser.cart = cartStore.items;
        store.saveUsersToStorage();
      }
    },

    deleteUser(username: string) {
      store.users = store.users.filter(
        (u) => u.username !== username
      );

      store.saveUsersToStorage();

      if (store.currentUser?.username === username) {
        store.logout();
      }
    },

    updateUser(username: string, updates: Partial<User>) {
      const user = store.users.find(
        (u) => u.username === username
      );

      if (user) {
        Object.assign(user, updates);
        store.saveUsersToStorage();
      }
    },

    saveUsersToStorage() {
      localStorage.setItem(
        "users_db",
        JSON.stringify(store.users)
      );
    },

    loadUsersFromStorage() {
      const data = localStorage.getItem("users_db");
      if (data) {
        store.users = JSON.parse(data);
      }
    },

    get isAuthenticated() {
      return !!store.currentUser;
    },

    get isAdmin() {
      return store.currentUser?.role === "admin";
    },
  };

  makeAutoObservable(store);

  store.loadUsersFromStorage();

  return store;
}

export const authStore = createAuthStore();
