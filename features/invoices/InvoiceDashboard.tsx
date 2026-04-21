"use client";

import { useThemeStore } from "@/store/themeStore";
import { useInvoiceStore } from "@/store/invoiceStore";
import { InvoiceEmptyState } from "./InvoiceEmptyState";
import { InvoiceHeader } from "./InvoiceHeader";
import { InvoiceList } from "./InvoiceList";

function LogoMark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8 text-on-primary">
      <path
        d="M16 3.5c5.52 0 10 4.48 10 10 0 2.97-1.3 5.63-3.35 7.45L16 28.5 9.35 20.95A9.95 9.95 0 0 1 6 13.5c0-5.52 4.48-10 10-10Z"
        fill="currentColor"
      />
      <path
        d="M16 8.5c2.76 0 5 2.24 5 5 0 1.8-.95 3.37-2.38 4.25L16 20.5l-2.62-2.75A4.98 4.98 0 0 1 11 13.5c0-2.76 2.24-5 5-5Z"
        fill="var(--color-secondary)"
      />
    </svg>
  );
}

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

export function InvoiceDashboard() {
  const invoices = useInvoiceStore((state) => state.invoices);
  const activeFilter = useInvoiceStore((state) => state.activefilter);
  const setFilter = useInvoiceStore((state) => state.setFilter);

  const visibleInvoices =
    activeFilter === "all"
      ? invoices
      : invoices.filter((invoice) => invoice.status === activeFilter);

  return (
    <div className="min-h-screen bg-app text-base lg:flex">
      <aside className="hidden w-24 flex-col overflow-hidden rounded-r-[2rem] bg-secondary lg:flex">
        <div className="flex h-24 items-center justify-center rounded-br-[2rem] bg-primary">
          <LogoMark />
        </div>

        <div className="mt-auto flex flex-col items-center gap-6 px-0 py-6">
          <ThemeToggle />

          <div className="grid h-11 w-11 place-items-center rounded-full border border-default bg-surface text-sm font-semibold text-muted">
            A
          </div>
        </div>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-default px-6 py-4 lg:hidden">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary">
              <LogoMark />
            </div>
            <div>
              <p className="text-lg font-semibold text-base">Invoices</p>
              <p className="text-xs text-muted">Invoice overview</p>
            </div>
          </div>

          <ThemeToggle />
        </header>

        <main className="flex-1 px-6 py-8 sm:px-8 md:px-10 md:py-12 lg:px-12 xl:px-16">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
            <InvoiceHeader
              count={visibleInvoices.length}
              activeFilter={activeFilter}
              onFilterChange={() => {
                console.warn('setting se')
                setFilter
              }}
            />

            {visibleInvoices.length > 0 ? <InvoiceList invoices={visibleInvoices} /> : <InvoiceEmptyState />}
          </div>
        </main>
      </div>
    </div>
  );
}