import { useInvoiceStore } from '@/store/invoiceStore';
import { useInvoiceForm } from '@/utils/useInvoiceForm';
import { FormField, inputBase, inputError, cx } from '@/features/AddInvoice/FormField';
import { PaymentTermsDropdown } from '@/features/AddInvoice/PaymentTermsDropdown';
import { ItemList } from '@/features/AddInvoice/ItemList';
import { Button } from '@/components/Button';
import type { Invoice } from '@/types/invoice';
import type { InvoiceFormMode } from '@/utils/useInvoiceForm';

interface AddInvoiceProps {
  mode: InvoiceFormMode;
  invoice?: Invoice;
  onClose: () => void;
}

export default function AddInvoice({ mode, invoice, onClose }: AddInvoiceProps) {
  const addInvoice = useInvoiceStore((s) => s.addInvoice);
  const updateInvoice = useInvoiceStore((s) => s.update);
  const form = useInvoiceForm({ mode, initialInvoice: invoice });

  if (mode === 'edit' && !invoice) {
    return null;
  }

  const title = mode === 'edit' ? `Edit ${invoice?.id}` : 'New Invoice';

  function handleSaveDraft() {
    const nextInvoice = form.submit('draft');
    if (!nextInvoice) return;
    if (mode === 'edit' && invoice) {
      updateInvoice(invoice.id, nextInvoice);
    } else {
      addInvoice(nextInvoice);
    }
    onClose();
  }

  function handleSaveAndSend() {
    const nextInvoice = form.submit('pending');
    if (!nextInvoice) return;
    if (mode === 'edit' && invoice) {
      updateInvoice(invoice.id, nextInvoice);
    } else {
      addInvoice(nextInvoice);
    }
    onClose();
  }

  const { errors, submitted: se } = form;
  return (
    <div className="fixed inset-0 z-40 flex">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative z-50 bg-surface flex flex-col h-full overflow-hidden w-full md:w-[616px] md:rounded-r-2xl lg:ml-[103px] lg:w-[719px]">

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-8 md:px-14">

          {/* Mobile back */}
          <button
            className="flex items-center gap-3 text-sm font-bold fg mb-6 md:hidden"
            onClick={onClose}
          >
            <svg width="7" height="10" viewBox="0 0 7 10" fill="none">
              <path d="M6 1L2 5l4 4" stroke="var(--color-primary)" strokeWidth="2" />
            </svg>
            Go back
          </button>

          <h1 className="text-2xl font-bold fg mb-10">{title}</h1>

          {/* ── Bill From ── */}
          <section className="mb-8">
            <h2 className="text-sm font-bold text-primary mb-6">Bill From</h2>

            <FormField label="Street Address" error={errors.senderStreet} showError={se} className="mb-4">
              <input
                className={cx(inputBase, se && errors.senderStreet && inputError)}
                value={form.senderStreet}
                onChange={(e) => form.setSenderStreet(e.target.value)}
              />
            </FormField>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <FormField label="City" error={errors.senderCity} showError={se}>
                <input className={cx(inputBase, se && errors.senderCity && inputError)} value={form.senderCity} onChange={(e) => form.setSenderCity(e.target.value)} />
              </FormField>
              <FormField label="Post Code" error={errors.senderPostCode} showError={se}>
                <input className={cx(inputBase, se && errors.senderPostCode && inputError)} value={form.senderPostCode} onChange={(e) => form.setSenderPostCode(e.target.value)} />
              </FormField>
              <FormField label="Country" error={errors.senderCountry} showError={se} className="col-span-2 md:col-span-1">
                <input className={cx(inputBase, se && errors.senderCountry && inputError)} value={form.senderCountry} onChange={(e) => form.setSenderCountry(e.target.value)} />
              </FormField>
            </div>
          </section>

          {/* ── Bill To ── */}
          <section className="mb-8">
            <h2 className="text-sm font-bold text-primary mb-6">Bill To</h2>

            <FormField label="Client's Name" error={errors.clientName} showError={se} className="mb-4">
              <input className={cx(inputBase, se && errors.clientName && inputError)} value={form.clientName} onChange={(e) => form.setClientName(e.target.value)} />
            </FormField>

            <FormField label="Client's Email" error={errors.clientEmail} showError={se} className="mb-4">
              <input type="email" className={cx(inputBase, se && errors.clientEmail && inputError)} value={form.clientEmail} onChange={(e) => form.setClientEmail(e.target.value)} />
            </FormField>

            <FormField label="Street Address" error={errors.clientStreet} showError={se} className="mb-4">
              <input className={cx(inputBase, se && errors.clientStreet && inputError)} value={form.clientStreet} onChange={(e) => form.setClientStreet(e.target.value)} />
            </FormField>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <FormField label="City" error={errors.clientCity} showError={se}>
                <input className={cx(inputBase, se && errors.clientCity && inputError)} value={form.clientCity} onChange={(e) => form.setClientCity(e.target.value)} />
              </FormField>
              <FormField label="Post Code" error={errors.clientPostCode} showError={se}>
                <input className={cx(inputBase, se && errors.clientPostCode && inputError)} value={form.clientPostCode} onChange={(e) => form.setClientPostCode(e.target.value)} />
              </FormField>
              <FormField label="Country" error={errors.clientCountry} showError={se} className="col-span-2 md:col-span-1">
                <input className={cx(inputBase, se && errors.clientCountry && inputError)} value={form.clientCountry} onChange={(e) => form.setClientCountry(e.target.value)} />
              </FormField>
            </div>
          </section>

          {/* ── Invoice Meta ── */}
          <section className="mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <FormField label="Invoice Date" error={errors.invoiceDate} showError={se}>
                <div className="relative">
                  <input
                    type="date"
                    className={cx(inputBase, 'pr-10', se && errors.invoiceDate && inputError)}
                    value={form.invoiceDate}
                    onChange={(e) => form.setInvoiceDate(e.target.value)}
                  />
                  <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M14 2H13V0H11V2H5V0H3V2H2C.9 2 0 2.9 0 4v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H2V6h12v10z" fill="var(--color-primary)" />
                  </svg>
                </div>
              </FormField>

              <div>
                <label className="block text-xs text-muted font-medium mb-2">Payment Terms</label>
                <PaymentTermsDropdown value={form.paymentTerms} onChange={form.setPaymentTerms} />
              </div>
            </div>

            <FormField label="Project Description" error={errors.projectDescription} showError={se}>
              <input
                className={cx(inputBase, se && errors.projectDescription && inputError)}
                value={form.projectDescription}
                onChange={(e) => form.setProjectDescription(e.target.value)}
              />
            </FormField>
          </section>

          {/* ── Item List ── */}
          <ItemList
            items={form.items}
            itemErrors={errors.itemErrors}
            showErrors={se}
            onAdd={form.addItem}
            onRemove={form.removeItem}
            onUpdate={form.updateItem}
          />
          {se && errors.items && (
            <p className="text-xs text-danger mt-2">{errors.items}</p>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="bg-surface px-6 py-5 md:px-14 flex items-center gap-2 shadow-[0_-8px_24px_rgba(0,0,0,0.1)]">

          {mode === "edit" ? (
            <>
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSaveAndSend}>
                Save Changes
              </Button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={onClose}
                className="text-sm font-bold text-muted hover:fg transition-colors mr-auto"
              >
                Discard
              </button>
              <Button variant="secondary" onClick={handleSaveDraft}>
                Save as Draft
              </Button>
              <Button variant="primary" onClick={handleSaveAndSend}>
                Save &amp; Send
              </Button>
            </>
          )}

        </div>
      </div>
    </div>
  );
}