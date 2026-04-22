"use client";


import { useInvoiceStore } from "@/store/invoiceStore";
import { InvoiceEmptyState } from "./EmptyState";
import { InvoiceHeader } from "./Header";
import { useEffect , useState } from "react";
import { InvoiceList } from "./InvoiceList";
import { AppChrome } from "@/components/AppChrome";
import InvoiceModal from "@/components/InvoiceModal";

export function InvoiceDashboard() {
  const hydrated = useInvoiceStore((state) => state.hydrated);
  const hydratedInvoices = useInvoiceStore((state) => state.hydratedInvoices);

  const [open, setOpen] = useState(false);
  const invoices = useInvoiceStore((state) => state.invoices);
  const activeFilter = useInvoiceStore((state) => state.activefilter);
  const setFilter = useInvoiceStore((state) => state.setFilter);

  useEffect(() => {
    if (!hydrated) {
      hydratedInvoices();
    }
  }, [hydratedInvoices]);

  const visibleInvoices = invoices.filter((invoice) =>
    activeFilter.includes(invoice.status)
  );

  return (
    <AppChrome mobileLabel="Invoices" mobileSubtitle="Invoice overview">
      <div className="min-h-screen bg-app fg lg:flex">
        {open ? <InvoiceModal
          mode="create"
          onClose={() => setOpen(false)}
        /> : null}
        {/* <AppChrome */}
        <main className="flex-1 px-6 py-8 sm:px-8 md:px-10 md:py-12 lg:px-12 xl:px-16">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
            <InvoiceHeader
              count={visibleInvoices.length}
              activeFilter={activeFilter}
              onFilterChange={setFilter}
              onAddInvoice={() => setOpen((s) => !s)}
            />
            {visibleInvoices.length > 0 ? <InvoiceList invoices={visibleInvoices} /> : <InvoiceEmptyState />}
          </div>
        </main>
      </div>
    </AppChrome>
  );
}