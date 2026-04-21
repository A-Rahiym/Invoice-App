import Link from "next/link";

export default function InvoiceDetailIndexPage() {
  return (
    <main className="min-h-screen bg-app px-6 py-12 fg sm:px-8 md:px-10 md:py-16 lg:px-12 xl:px-16">
      <div className="mx-auto max-w-3xl rounded-2xl border border-default bg-surface p-8 sm:p-10">
        <h1 className="text-3xl font-bold">Select an invoice</h1>
        <p className="mt-3 text-muted">
          Open an invoice from the list to view its details.
        </p>
        <Link
          href="/invoices"
          className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-on-primary transition hover:bg-primary-hover"
        >
          Go to invoices
        </Link>
      </div>
    </main>
  );
}