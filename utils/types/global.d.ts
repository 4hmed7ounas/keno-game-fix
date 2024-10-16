// types/global.d.ts
export {}; // This file should be a module

declare global {
  interface Window {
    balance?: number; // Use a more specific type if possible, instead of any
  }
}
