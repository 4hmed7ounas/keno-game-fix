// src/types/tauri.d.ts

declare global {
  interface Window {
    __TAURI__?: any;
  }
}

export {};
