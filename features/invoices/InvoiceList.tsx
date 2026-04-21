import type { Invoice } from "@/types/invoice";
import { InvoiceListItem } from "./InvoiceListItem";

export function InvoiceList({ invoices }: { invoices: Invoice[] }) {
  return (
    <ul className="space-y-4">
      {invoices.map((invoice) => (
        <li key={invoice.id}>
          <InvoiceListItem invoice={invoice} />
        </li>
      ))}
    </ul>
  );
}