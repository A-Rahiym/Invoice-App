import { Button } from "@/components/Button";

export function InvoiceEmptyState() {
  return (
    <section className="rounded-3xl border border-dashed border-default bg-surface px-6 py-16 text-center shadow-sm sm:px-10">
      <h2 className="text-2xl font-semibold text-base">No invoices found</h2>
      <p className="mx-auto mt-3 max-w-md text-sm text-muted">
        Start by creating a new invoice or clear the current filter to see the full list.
      </p>
      <div className="mt-6 flex justify-center">
        <Button variant="primary" className="gap-3 px-5 py-3">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-surface text-primary">
            +
          </span>
          New Invoice
        </Button>
      </div>
    </section>
  );
}