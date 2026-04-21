"use client";

import Link from "next/link";
import { useInvoiceStore } from "@/store/invoiceStore";
import { InvoiceDetailsEmptyState } from "./IDetailsEmptyState";
import { InvoiceDetailsItems } from "./DetailsItems";
import { InvoiceDetailsActions } from "./DetailsActions";
import { AppChrome } from "@/components/AppChrome";
import { InvoiceStatusBadge } from "../invoices/StatusBadge";
import { formatInvoiceDate } from "@/utils/invoiceFormatters";

function normalizeInvoiceId(value: string) {
  return value.trim().toLowerCase();
}

function decodeInvoiceId(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

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

export function InvoiceDetailsScreen({ invoiceId }: { invoiceId: string }) {
  const invoices = useInvoiceStore((state) => state.invoices);
  const resolvedId = decodeInvoiceId(invoiceId);
  const invoice = invoices.find(
    (item) => normalizeInvoiceId(item.id) === normalizeInvoiceId(resolvedId),
  );

  if (!invoice) {
    return (
      <AppChrome mobileLabel="Invoices" mobileSubtitle="Invoice details">
        <InvoiceDetailsEmptyState invoiceId={resolvedId} />
      </AppChrome>
    );
  }

  return (
    <AppChrome mobileLabel="Invoice" mobileSubtitle="Invoice details">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <Link href="/invoices" className="inline-flex w-fit items-center gap-3 text-sm font-bold fg transition hover:text-primary">
          <span className="text-primary" aria-hidden="true">
            <ArrowLeft />
          </span>
          Go back
        </Link>

        <section className="rounded-2xl border border-default bg-surface px-6 py-6 sm:px-8">
          <div className="flex items-center justify-between gap-4 md:hidden">
            <p className="text-sm font-semibold text-muted">Status</p>
            <InvoiceStatusBadge status={invoice.status} />
          </div>

          <div className="hidden items-center justify-between gap-4 md:flex">
            <div className="flex items-center gap-4">
              <p className="text-sm font-semibold text-muted">Status</p>
              <InvoiceStatusBadge status={invoice.status} />
            </div>
            <InvoiceDetailsActions />
          </div>
        </section>

        <section className="rounded-2xl border border-default bg-surface p-6 sm:p-8 md:p-10">
          <header className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="text-3xl font-bold fg">{invoice.id}</h1>
              <p className="mt-1 text-lg text-muted">{invoice.description}</p>
            </div>

            <address className="text-left text-lg not-italic text-muted md:text-right">
              <p>{invoice.senderAddress.street}</p>
              <p>{invoice.senderAddress.city}</p>
              <p>{invoice.senderAddress.postCode}</p>
              <p>{invoice.senderAddress.country}</p>
            </address>
          </header>

          <div className="mt-8 grid gap-8 md:grid-cols-3">
            <div className="space-y-7">
              <div>
                <p className="text-sm text-muted">Invoice Date</p>
                <p className="mt-2 text-4xl font-bold fg md:text-3xl">{formatInvoiceDate(invoice.createdAt)}</p>
              </div>

              <div>
                <p className="text-sm text-muted">Payment Due</p>
                <p className="mt-2 text-4xl font-bold fg md:text-3xl">{formatInvoiceDate(invoice.paymentDue)}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted">Bill To</p>
              <p className="mt-2 text-4xl font-bold fg md:text-3xl">{invoice.clientName}</p>
              <address className="mt-2 text-lg not-italic text-muted">
                <p>{invoice.clientAddress.street}</p>
                <p>{invoice.clientAddress.city}</p>
                <p>{invoice.clientAddress.postCode}</p>
                <p>{invoice.clientAddress.country}</p>
              </address>
            </div>

            <div>
              <p className="text-sm text-muted">Sent to</p>
              <p className="mt-2 break-all text-4xl font-bold fg md:text-3xl">{invoice.clientEmail}</p>
            </div>
          </div>
        </section>

        <InvoiceDetailsItems invoice={invoice} />
      </div>

      <div className="fixed inset-x-0 bottom-0 border-t border-default bg-surface px-4 py-5 md:hidden">
        <InvoiceDetailsActions compact />
      </div>
    </AppChrome>
  );
}