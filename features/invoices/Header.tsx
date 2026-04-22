import { Button } from "@/components/Button";
import type { FilterOptions } from "@/types/filter";
import { FilterCheckboxes } from "./FilterCheckboxes";
import Image from "next/image";

export function InvoiceHeader({
  count,
  activeFilter,
  onFilterChange,
  onAddInvoice
}: {
  count: number;
  activeFilter: FilterOptions;
  onFilterChange: (filter: FilterOptions) => void;
  onAddInvoice: () => void;
}) {
  return (
    <section className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-4xl font-bold tracking-tight fg md:text-5xl">Invoices</h1>
        <p className="mt-2 text-sm text-muted">
          {count === 1 ? "There is 1 total invoice" : `There are ${count} total invoices`}
        </p>
      </div>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between w-full sm:w-auto">
        <FilterCheckboxes activeFilter={activeFilter} onFilterChange={onFilterChange} />

        <Button 
        onClick={onAddInvoice}
        variant="primary" className="flex-row justify-between gap-3 px-5 py-3 sm:px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface text-2xl font-black text-primary">
            <Image
            src={'/+.png'}
            alt="plus sign"
            width={8}
            height={8}
            />
          </div>
          <span>New Invoice</span>
        </Button>
      </div>
    </section>
  );
}