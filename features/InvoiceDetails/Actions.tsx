"use client";

export function InvoiceDetailsActions({ compact = false }: { compact?: boolean }) {
  const baseButton =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-lg font-semibold transition";

  return (
    <div className={`flex items-center gap-3 ${compact ? "w-full" : ""}`}>
      <button
        type="button"
        className={`${baseButton} bg-app text-muted hover:bg-surface ${compact ? "flex-1" : ""}`}
      >
        Edit
      </button>
      <button
        type="button"
        className={`${baseButton} bg-danger text-on-primary hover:bg-danger-hover ${compact ? "flex-1" : ""}`}
      >
        Delete
      </button>
      <button
        type="button"
        className={`${baseButton} bg-primary text-on-primary hover:bg-primary-hover ${compact ? "flex-1" : ""}`}
      >
        Mark as Paid
      </button>
    </div>
  );
}