import Image from "next/image";
import { Button } from "@/components/Button";

export function InvoiceEmptyState() {
  return (
    <section className="flex flex-col items-center justify-center px-6 py-16 text-center sm:px-10">
      <div className="relative mb-8 h-48 w-48">
        <Image
          src="/EmptyLight.svg"
          alt="No invoices"
          fill
          className="object-contain"
        />
      </div>
      <h2 className="text-2xl font-semibold fg">There is nothing here</h2>
      <p className="mx-auto mt-4 max-w-md text-sm text-muted">
        Create a new invoice by clicking the New Invoice button and get started
      </p>
    </section>
  );
}