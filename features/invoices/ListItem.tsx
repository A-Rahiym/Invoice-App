import type { Invoice } from "@/types/invoice";
import Link from "next/link";
import { formatCurrency, formatInvoiceDate } from "../../store/invoiceFormatters";
import { InvoiceStatusBadge } from "./StatusBadge";

function ChevronRight() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function InvoiceListItem({ invoice }: { invoice: Invoice }) {
  const invoicePath = `/invoiceDetails/${encodeURIComponent(invoice.id)}`;

  return (
    <Link
      href={invoicePath}
      className="block rounded-2xl border border-default bg-surface px-6 py-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:px-8"
      aria-label={`View invoice ${invoice.id}`}
    >
      <div className="flex flex-col gap-4 md:hidden">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xl font-semibold fg">{invoice.id}</p>
            <p className="text-sm text-muted">Due {formatInvoiceDate(invoice.paymentDue)}</p>
          </div>
          <p className="text-xl font-semibold fg">{formatCurrency(invoice.total)}</p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-muted">{invoice.clientName}</p>
          <InvoiceStatusBadge status={invoice.status} />
        </div>

        <div className="flex items-center justify-end text-primary">
          <ChevronRight />
        </div>
      </div>

      <div className="hidden md:grid md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)_auto_auto] md:items-center md:gap-6">
        <div className="space-y-1">
          <p className="text-xl font-semibold fg">{invoice.id}</p>
          <p className="text-sm text-muted">Due {formatInvoiceDate(invoice.paymentDue)}</p>
        </div>

        <p className="text-sm text-muted">{invoice.clientName}</p>

        <p className="text-right text-xl font-semibold fg">{formatCurrency(invoice.total)}</p>

        <InvoiceStatusBadge status={invoice.status} />

        <span className="inline-flex justify-end text-primary" aria-hidden="true">
          <ChevronRight />
        </span>
      </div>
    </Link>
  );
}