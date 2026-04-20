"use client";

import { useThemeStore } from "@/store/themeStore";
export default function Home() {
const theme = useThemeStore((state) => state.theme);
const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans bg-app">
      <h1 className="text-4xl font-bold text-base">Welcome to Invoice App</h1>
      <p className="mt-4 text-gray-600">Manage your invoices efficiently and effortlessly.</p>
      <button
        onClick={toggleTheme}
        className="mt-6 px-4 py-2 bg-primary text-white rounded hover:bg-secondary transition"
      >
        Toggle Theme {theme === 'light' ? '🌞' : '🌜'}
      </button>
    </div>
  );
}
