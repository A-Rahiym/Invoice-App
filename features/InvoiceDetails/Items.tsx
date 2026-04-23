import { formatCurrency } from "@/utils/invoiceFormatters";
import type { Invoice } from "@/types/invoice";

export function InvoiceDetailsItems({ invoice }: { invoice: Invoice }) {
  return (
    <section className="mt-9 overflow-hidden rounded-2xl bg-scroll bg-extra">
      <div className="hidden p-8 md:block">
        <div className="grid grid-cols-[1.5fr_0.5fr_0.8fr_0.8fr] gap-4 text-sm font-semibold text-muted">
          <p>Item Name</p>
          <p className="text-center">QTY.</p>
          <p className="text-right">Price</p>
          <p className="text-right">Total</p>
        </div>

        <div className="mt-7 space-y-5">
          {invoice.items.map((item) => (
            <div key={item.name} className="grid grid-cols-[1.5fr_0.5fr_0.8fr_0.8fr] gap-4 text-lg">
              <p className="font-bold fg">{item.name}</p>
              <p className="text-center font-bold text-muted">{item.quantity}</p>
              <p className="text-right font-bold text-muted">{formatCurrency(item.price)}</p>
              <p className="text-right font-bold fg">{formatCurrency(item.total)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6 p-6 md:hidden">
        {invoice.items.map((item) => (
          <div key={`mobile-${item.name}`} className="flex items-start justify-between gap-3">
            <div>
              <p className="text-2xl font-bold fg">{item.name}</p>
              <p className="mt-1 text-4xl font-semibold text-muted md:text-2xl">
                {item.quantity} x {formatCurrency(item.price)}
              </p>
            </div>
            <p className="text-3xl font-bold fg md:text-2xl">{formatCurrency(item.total)}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-4 bg-secondary px-6 py-7 sm:px-8">
        <p className="text-sm font-semibold text-on-primary">Grand Total</p>
        <p className="text-4xl font-bold text-on-primary md:text-5xl">{formatCurrency(invoice.total)}</p>
      </div>
    </section>
  );
}