import { formatCurrency, formatInvoiceDate } from "@/utils/invoiceFormatters";
import type { Invoice } from "@/types/invoice";

export function InvoiceDetailsSummary({ invoice }: { invoice: Invoice }) {
  return (
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
            <p className="mt-2 text-4xl font-bold fg md:text-3xl">
              {formatInvoiceDate(invoice.createdAt)}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted">Payment Due</p>
            <p className="mt-2 text-4xl font-bold fg md:text-3xl">
              {formatInvoiceDate(invoice.paymentDue)}
            </p>
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
  );
}