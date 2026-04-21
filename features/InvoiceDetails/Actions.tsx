"use client";

import { Button } from "@/components/Button";

type InvoiceDetailsActionsProps = {
  compact?: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onMarkAsPaid?: () => void;
};

export function InvoiceDetailsActions({
  compact = false,
  onEdit,
  onDelete,
  onMarkAsPaid,
}: InvoiceDetailsActionsProps) {
  return (
    <div className={`flex items-center gap-3 ${compact ? "w-full" : ""}`}>
      <Button variant="secondary" fullWidth={compact} onClick={onEdit}>
        Edit
      </Button>
      <Button variant="destructive" fullWidth={compact} onClick={onDelete}>
        Delete
      </Button>
      <Button variant="primary" fullWidth={compact} onClick={onMarkAsPaid}>
        Mark as Paid
      </Button>
    </div>
  );
}