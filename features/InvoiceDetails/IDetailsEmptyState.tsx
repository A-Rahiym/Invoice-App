import Link from "next/link";

function ArrowLeft() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="m15 18-6-6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function InvoiceDetailsEmptyState({ invoiceId }: { invoiceId: string }) {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
      <Link
        href="/invoices"
        className="inline-flex w-fit items-center gap-3 text-sm font-bold fg transition hover:text-primary"
      >
        <span className="text-primary" aria-hidden="true">
          <ArrowLeft />
        </span>
        Go back
      </Link>

      <section className="rounded-2xl border border-default bg-surface p-8">
        <h1 className="text-2xl font-bold fg">Invoice not found</h1>
        <p className="mt-3 text-muted">
          We could not find invoice {invoiceId}. Please pick one from the invoice list.
        </p>
        <Link
          href="/invoices"
          className="mt-6 inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-on-primary transition hover:bg-primary-hover"
        >
          Back to invoices
        </Link>
      </section>
    </div>
  );
}