import { InvoiceDetailsScreen } from "@/features/InvoiceDetails/DetailsScreen";

export default async function InvoiceDetailsRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <InvoiceDetailsScreen invoiceId={id} />;
}
