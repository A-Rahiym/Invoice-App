"use client";

import Link from "next/link";
import { useInvoiceStore } from "@/store/invoiceStore";
import { InvoiceDetailsEmptyState } from "./IDetailsEmptyState";
import { InvoiceDetailsShell } from "./IDetailsShell";
import { InvoiceDetailsStatusRow } from "./DetailsStatusRow";
import { InvoiceDetailsSummary } from "./DetailsSummary";
import { InvoiceDetailsItems } from "./DetailsItems";
import { InvoiceDetailsActions } from "./DetailsActions";

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
      <InvoiceDetailsShell mobileLabel="Invoices" mobileSubtitle="Invoice details">
        <InvoiceDetailsEmptyState invoiceId={resolvedId} />
      </InvoiceDetailsShell>
    );
  }

  return (
    <InvoiceDetailsShell mobileLabel="Invoice" mobileSubtitle="Invoice details">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <Link
          href="/invoices"
          className="inline-flex w-fit items-center gap-3 text-sm font-bold fg transition hover:text-primary"
        >
          <span className="text-primary" aria-hidden="true">
            <ArrowLeft />
          </span>
          Go back
        </Link>

        <InvoiceDetailsStatusRow status={invoice.status} />
        <InvoiceDetailsSummary invoice={invoice} />
        <InvoiceDetailsItems invoice={invoice} />
      </div>

      <div className="fixed inset-x-0 bottom-0 border-t border-default bg-surface px-4 py-5 md:hidden">
        <InvoiceDetailsActions compact />
      </div>
    </InvoiceDetailsShell>
  );
}