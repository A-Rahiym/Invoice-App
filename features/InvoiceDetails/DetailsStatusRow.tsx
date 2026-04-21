import { InvoiceStatusBadge } from "../invoices/StatusBadge";
import { InvoiceDetailsActions } from "./DetailsActions";

export function InvoiceDetailsStatusRow({ status }: { status: Parameters<typeof InvoiceStatusBadge>[0]["status"] }) {
  return (
    <section className="rounded-2xl border border-default bg-surface px-6 py-6 sm:px-8">
      <div className="flex items-center justify-between gap-4 md:hidden">
        <p className="text-sm font-semibold text-muted">Status</p>
        <InvoiceStatusBadge status={status} />
      </div>

      <div className="hidden items-center justify-between gap-4 md:flex">
        <div className="flex items-center gap-4">
          <p className="text-sm font-semibold text-muted">Status</p>
          <InvoiceStatusBadge status={status} />
        </div>
        <InvoiceDetailsActions />
      </div>
    </section>
  );
}