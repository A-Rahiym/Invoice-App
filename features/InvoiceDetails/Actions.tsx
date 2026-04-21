"use client";
import { Button } from "@/components/Button";
export function InvoiceDetailsActions({ compact = false }: { compact?: boolean }) {
  const baseButton =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-lg font-semibold transition";

  return (
    <div className={`flex items-center gap-3 ${compact ? "w-full" : ""}`}>
      <Button variant="secondary" className={compact ? "flex-1" : ""}>
        Edit
      </Button>
      <Button variant="destructive" className={compact ? "flex-1" : ""}>
        Delete
      </Button>
      <Button variant="primary" className={compact ? "flex-1" : ""}>
        Mark as Paid
      </Button>
    </div>
  );
}