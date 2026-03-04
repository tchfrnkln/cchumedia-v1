// src/lib/stores/customCookieStorage.ts
import Cookies from 'js-cookie';

interface Storage {
  getItem: (name: string) => string | null;
  setItem: (name: string, value: string) => void;
  removeItem: (name: string) => void;
}

export const cookieStorage: Storage = {
  getItem: (name) => Cookies.get(name) || null,
  setItem: (name, value) => Cookies.set(name, value, { expires: 7, path: '/' }),  // 7 days
  removeItem: (name) => Cookies.remove(name, { path: '/' }),
};