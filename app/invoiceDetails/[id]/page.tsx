import { InvoiceDetailsScreen } from "@/features/InvoiceDetails/InvoiceDetailsScreen";

export default async function InvoiceDetailsRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <InvoiceDetailsScreen invoiceId={id} />;
}
