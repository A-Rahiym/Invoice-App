"use client";

import type { ReactNode } from "react";
import { useThemeStore } from "@/store/themeStore";
import Image from "next/image";

function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="grid h-11 w-11 place-items-center rounded-full text-muted transition hover:text-primary"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
    >
      {theme === "light" ? (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-none">
          <path
            d="M21 13.2A8.2 8.2 0 1 1 10.8 3 7 7 0 0 0 21 13.2Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-none">
          <path
            d="M12 4v2.5M12 17.5V20M4 12h2.5M17.5 12H20M6.4 6.4l1.8 1.8M15.8 15.8l1.8 1.8M6.4 17.6l1.8-1.8M15.8 8.2l1.8-1.8"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      )}
    </button>
  );
}

type AppChromeProps = {
  children: ReactNode;
  mobileLabel: string;
  mobileSubtitle: string;
};

export function AppChrome({ children, mobileLabel, mobileSubtitle }: AppChromeProps) {
  return (
    <div className="h-screen overflow-hidden bg-app fg lg:flex">
      <aside className="hidden w-24 flex-col overflow-hidden rounded-r-4xl bg-sidebar lg:flex">

        <Image
          src={"/logo.png"}
          alt="logo"
          width={96}
          height={64}
        />
        <div className="mt-auto flex flex-col items-center gap-6 px-0 py-6">
          <ThemeToggle />
        <span className="my-4 w-full border-[#494E6E] border-t " />
          <Image
            src={"/man.png"}
            alt="logo"
            width={64}
            height={64}
          />
        </div>
      </aside>

      <div className="flex h-full flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-default bg-secondary pr-6 lg:hidden">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Invoice logo"
              width={96}
              height={64}
            />
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <span aria-hidden="true" className="h-24 mr-6 border-l border-[#494E6E]"></span>
            <Image
              src="/man.png"
              alt="User avatar"
              width={48}
              height={48}
              className="rounded-full"
            />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto px-6 py-8 sm:px-8 md:px-10 md:py-12 lg:px-12 xl:px-16">{children}</main>
      </div>
    </div>
  );
}