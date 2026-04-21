import { Button } from "@/components/Button";
import type { FilterOptions } from "@/types/filter";

const filterOptions: Array<{ label: string; value: FilterOptions }> = [
  { label: "All", value: "all" },
  { label: "Draft", value: "draft" },
  { label: "Pending", value: "pending" },
  { label: "Paid", value: "paid" },
];
export function InvoiceHeader({
  count,
  activeFilter,
  onFilterChange,
}: {
  count: number;
  activeFilter: FilterOptions;
  onFilterChange: (filter: FilterOptions) => void;
}) {
  return (
    <section className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-4xl font-bold tracking-tight fg md:text-5xl">Invoices</h1>
        <p className="mt-2 text-sm text-muted">
          {count === 1 ? "There is 1 total invoice" : `There are ${count} total invoices`}
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative inline-flex items-center">
          <span className="sr-only">Filter invoices</span>
          <select
            value={activeFilter}
            onChange={(event) => onFilterChange(event.target.value as FilterOptions)}
            className="min-w-40 appearance-none rounded-full border border-transparent bg-transparent px-3 py-2 pr-10 text-sm font-semibold fg outline-none transition focus:border-default sm:bg-surface sm:px-4 sm:py-3"
          >
            {filterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 inline-flex items-center text-primary">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-none">
              <path
                d="m6 9 6 6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </label>

        <Button variant="primary" className="flex-row justify-between gap-3 px-5 py-3 sm:px-6">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface text-2xl font-black text-primary">
            +
          </span>
          <span>New Invoice</span>
        </Button>
      </div>
    </section>
  );
}