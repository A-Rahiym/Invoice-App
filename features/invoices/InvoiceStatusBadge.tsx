import type { Status } from "@/types/status";

const statusClassMap: Record<Status, string> = {
  paid: "status-paid",
  pending: "status-pending",
  draft: "status-draft",
};

export function InvoiceStatusBadge({ status }: { status: Status }) {
  return (
    <span className={`${statusClassMap[status]} inline-flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold capitalize`}>
      <span className="h-2.5 w-2.5 rounded-full bg-current" />
      {status}
    </span>
  );
}