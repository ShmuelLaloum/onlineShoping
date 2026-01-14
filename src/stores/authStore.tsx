import { makeAutoObservable } from "mobx";
import { cartStore } from "./cartStore";
import type { User, UserRole, CartItem } from "../types/componentProps";

class AuthStore {
  currentUser: User | null = null;
  users: User[] = [];

  constructor() {
    makeAutoObservable(this);
    this.loadUsersFromStorage();
  }

  login(username: string, password?: string): string | null {
    const existingUser = this.users.find((u) => u.username === username);

    if (!existingUser) {
      return "User not found. Please register first.";
    }

    if (existingUser.password !== password) {
      return "Incorrect password!";
    }

    this.currentUser = existingUser;
    this.updateCartFromUser(); 
    return null;
  }

  register(
    username: string,
    password?: string,
    role: UserRole = "user"
  ): string | null {
    if (this.users.some((u) => u.username === username)) {
      return "Username already exists!";
    }

    const newUser: User = {
      username,
      password,
      role,
      cart: [],
    };
    this.users.push(newUser);
    this.saveUsersToStorage();
    return null;
  }

  logout() {
    this.syncCurrentCart();

    this.currentUser = null;
    cartStore.clearCart(); 
  }

  syncCart(items: CartItem[]) {
    if (this.currentUser) {
      this.currentUser.cart = items;
      this.saveUsersToStorage();
    }
  }

  private updateCartFromUser() {
    if (this.currentUser) {
      cartStore.setItems(this.currentUser.cart);
    }
  }

  private syncCurrentCart() {
    if (this.currentUser) {
      this.currentUser.cart = cartStore.items;
      this.saveUsersToStorage();
    }
  }

  deleteUser(username: string) {
    this.users = this.users.filter((u) => u.username !== username);
    this.saveUsersToStorage();
    if (this.currentUser?.username === username) {
      this.logout();
    }
  }

  updateUser(username: string, updates: Partial<User>) {
    const user = this.users.find((u) => u.username === username);
    if (user) {
      Object.assign(user, updates);
      this.saveUsersToStorage();
    }
  }

  private saveUsersToStorage() {
    localStorage.setItem("users_db", JSON.stringify(this.users));
  }

  private loadUsersFromStorage() {
    const data = localStorage.getItem("users_db");
    if (data) {
      this.users = JSON.parse(data);
    }
  }

  get isAuthenticated() {
    return !!this.currentUser;
  }

  get isAdmin() {
    return this.currentUser?.role === "admin";
  }
}

export const authStore = new AuthStore();
