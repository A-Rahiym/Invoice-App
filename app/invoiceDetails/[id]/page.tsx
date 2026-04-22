"use client";

import { use, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useInvoiceStore } from "@/store/invoiceStore";
import { InvoiceDetailsEmptyState } from "@/features/InvoiceDetails/EmptyState";
import { InvoiceDetailsItems } from "@/features/InvoiceDetails/Items";
import { InvoiceDetailsActions } from "@/features/InvoiceDetails/Actions";
import { AppChrome } from "@/components/AppChrome";
import { InvoiceStatusBadge } from "@/features/invoices/StatusBadge";
import { formatInvoiceDate } from "@/utils/invoiceFormatters";
import InvoiceModal from "@/components/InvoiceModal";
import { Modal } from "@/components/Modal";
import { Button } from "@/components/Button";
/* helpers */
function normalizeInvoiceId(value: string) {
  return value.trim().toLowerCase();
}

function decodeInvoiceId(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function ArrowLeft() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="m15 18-6-6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}



/* page */
export default function InvoiceDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const invoices = useInvoiceStore((state) => state.invoices);
  const removeInvoice = useInvoiceStore((state) => state.removeInvoice);
  const markInvoiceAsPaid = useInvoiceStore((state) => state.updateInvoiceStatus);
  const resolvedId = decodeInvoiceId(id);

  const invoice = useMemo(
    () =>
      invoices.find(
        (item) => normalizeInvoiceId(item.id) === normalizeInvoiceId(resolvedId),
      ),
    [invoices, resolvedId],
  );

  const handleDelete = () => setShowDeleteModal(true);
  const handleEdit = () => setShowEditModal((prev) => !prev);
  const handleMarkAsPaid = () => markInvoiceAsPaid(resolvedId, "paid");

  const confirmDelete = () => {
    removeInvoice(resolvedId);
    setShowDeleteModal(false);
    router.push("/invoices");
  };


  if (!invoice) {
    return (
      <AppChrome mobileLabel="Invoices" mobileSubtitle="Invoice details">
        <InvoiceDetailsEmptyState invoiceId={resolvedId} />
      </AppChrome>
    );
  }

  return (
    <AppChrome mobileLabel="Invoice" mobileSubtitle="Invoice details">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">

        <Link
          href="/invoices"
          className="inline-flex w-fit items-center gap-3 text-sm font-bold fg transition hover:text-primary"
        >
          <span className="text-primary">
            <ArrowLeft />
          </span>
          Go back
        </Link>

        {/* status */}
        <section className="rounded-2xl border border-default bg-surface px-6 py-6 sm:px-8">
          <div className="flex items-center justify-between md:hidden">
            <p className="text-sm font-semibold text-muted">Status</p>
            <InvoiceStatusBadge status={invoice.status} />
          </div>

          <div className="hidden items-center justify-between md:flex">
            <div className="flex items-center gap-4">
              <p className="text-sm font-semibold text-muted">Status</p>
              <InvoiceStatusBadge status={invoice.status} />
            </div>
            <InvoiceDetailsActions
              onEdit={handleEdit}
              onDelete={handleDelete}
              onMarkAsPaid={handleMarkAsPaid}
            />
          </div>
        </section>

        {/* details */}
        <section className="rounded-2xl border border-default bg-surface p-6 sm:p-8 md:p-10">
          <header className="flex flex-col gap-6 md:flex-row md:justify-between">
            <div>
              <h1 className="text-3xl font-bold fg">{invoice.id}</h1>
              <p className="mt-1 text-lg text-muted">
                {invoice.description}
              </p>
            </div>

            <address className="not-italic text-muted md:text-right">
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
                <p className="mt-2 text-2xl font-bold fg">
                  {formatInvoiceDate(invoice.createdAt)}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted">Payment Due</p>
                <p className="mt-2 text-2xl font-bold fg">
                  {formatInvoiceDate(invoice.paymentDue)}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted">Bill To</p>
              <p className="mt-2 text-2xl font-bold fg">
                {invoice.clientName}
              </p>

              <address className="mt-2 text-muted not-italic">
                <p>{invoice.clientAddress.street}</p>
                <p>{invoice.clientAddress.city}</p>
                <p>{invoice.clientAddress.postCode}</p>
                <p>{invoice.clientAddress.country}</p>
              </address>
            </div>

            <div>
              <p className="text-sm text-muted">Sent to</p>
              <p className="mt-2 break-all text-2xl font-bold fg">
                {invoice.clientEmail}
              </p>
            </div>
          </div>
        </section>

        <InvoiceDetailsItems invoice={invoice} />
      </div>

      {/* mobile actions */}
      <div className="fixed inset-x-0 bottom-0 border-t border-default bg-surface px-4 py-5 md:hidden">
        <InvoiceDetailsActions
          compact
          onEdit={handleEdit}
          onDelete={handleDelete}
          onMarkAsPaid={handleMarkAsPaid}
        />
      </div>

      {showDeleteModal ? (
        <Modal
          title="Confirm Deletion"
          titleId="delete-modal-title"
          onDismiss={() => setShowDeleteModal(false)}
          actions={
            <>
              <Button onClick={() => setShowDeleteModal(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Delete
              </Button>
            </>
          }
        >
          Are you sure you want to delete invoice {invoice.id}? This action cannot be undone.
        </Modal>
      ) : null}

      {showEditModal ? (
        <InvoiceModal mode="edit" invoice={invoice} onClose={handleEdit} />
      ) : null}
    </AppChrome>
  );
}