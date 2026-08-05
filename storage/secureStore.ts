// platform-aware storage wrapper
// uses expo-secure-store on native and localStorage on web
// falls back to no-ops during static rendering where localStorage is unavailable
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

const hasLocalStorage = () =>
  typeof globalThis !== "undefined" && typeof globalThis.localStorage !== "undefined";

export function getItem(key: string): string | null {
  if (Platform.OS === "web") {
    return hasLocalStorage() ? globalThis.localStorage.getItem(key) : null;
  }
  return SecureStore.getItem(key);
}

export function setItem(key: string, value: string): void {
  if (Platform.OS === "web") {
    if (hasLocalStorage()) {
      globalThis.localStorage.setItem(key, value);
    }
    return;
  }
  SecureStore.setItem(key, value);
}

export async function getItemAsync(key: string): Promise<string | null> {
  if (Platform.OS === "web") {
    return getItem(key);
  }
  return SecureStore.getItemAsync(key);
}

export async function setItemAsync(key: string, value: string): Promise<void> {
  if (Platform.OS === "web") {
    setItem(key, value);
    return;
  }
  return SecureStore.setItemAsync(key, value);
}

export async function deleteItemAsync(key: string): Promise<void> {
  if (Platform.OS === "web") {
    if (hasLocalStorage()) {
      globalThis.localStorage.removeItem(key);
    }
    return;
  }
  return SecureStore.deleteItemAsync(key);
}
